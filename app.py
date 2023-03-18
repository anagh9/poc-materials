import os
from datetime import datetime
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session
import json
import csv

app = Flask(__name__)
app.secret_key = 'secret-key'


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'mobile' not in session:
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/', methods=['GET', 'POST'])
def home():
    users = {}
    messages = None
    with open('data/login.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            users[row['mobile']] = row['password']
    if request.method == "POST":
        mobile = request.form.get('mobile')
        password = request.form.get('password')

        if mobile in users and users[mobile] == password:
            session['mobile'] = mobile
            return redirect(url_for('view_users'))
        else:
            messages = "Invalid Credentials!! Try Again"

    return render_template('index.html', messages=messages)


@app.route('/users')
@login_required
def view_users():
    mobile = session.get('mobile')
    with open('data/data.json') as f:
        data = json.load(f)
    return render_template('table.html', data=data, mobile=mobile)


@app.route('/edit-form/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_form(id):
    mobile = session.get('mobile')

    with open('data/data.json', 'r') as f:
        data = json.load(f)
    obj = next((item for item in data if item['member_id'] == id), None)

    if request.method == "POST":
        req_data = request.get_json()
        name = req_data.get("name") or obj.get("name")
        geo_location = req_data.get("geo_location") or obj.get("geo_location")

        obj['name'] = name
        obj['geo_location'] = geo_location
        with open('data/data.json', 'w') as f:
            json.dump(data, f, indent=2)
    return render_template('edit.html', obj=obj, mobile=mobile)


@app.route('/geo-location-log/<int:id>', methods=['POST'])
@login_required
def geo_location_log(id):
    req_data = request.get_json()
    geo_location = req_data.get("geoValue")
    write_log_file(geo_location)

    return {"status": True}


def write_log_file(geo_location):
    log_dir = 'data/logs'
    mobile = session.get("mobile")
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    log_file = os.path.join(log_dir, f"{mobile}.log")

    now = datetime.now().strftime("%d-%b-%Y %H:%M:%S")
    log_entry = f"{mobile}, {now}, {geo_location}\n"

    with open(log_file, 'a') as f:
        f.write(log_entry)


@app.route('/logout')
def logout():
    session.pop('mobile', None)
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)
