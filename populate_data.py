import json
from faker import Faker
import csv
import random
import string


def generate_mobile_password():
    mobile = [
        '9' + ''.join(random.choices(string.digits, k=9)) for i in range(200)]

    passwords = [''.join(random.choices(
        string.ascii_lowercase + string.digits, k=8)) for i in range(200)]

    users = list(zip(mobile, passwords))

    with open('data/login.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['mobile', 'password'])
        writer.writerows(users)


def create_fake():
    fake = Faker()

    entries = []
    for i in range(1, 1000):
        entry = {
            "member_id": i,
            "company_name": fake.company(),
            "name": fake.name(),
            "dob": fake.date_of_birth().strftime('%Y-%m-%d'),
            "dom": fake.date_of_birth().strftime('%Y-%m-%d'),
            "blood_grp": fake.random_element(elements=('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-')),
            "occupation": fake.random_element(elements=('Govt', 'Private', 'Business', 'Student')),
            "education": fake.random_element(elements=('PhD', 'Master', 'Bachelor', 'High School')),
            "spouse": fake.name(),
            "spouse_dob": fake.date_of_birth().strftime('%Y-%m-%d'),
            "spose_bg": fake.random_element(elements=('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-')),
            "spouse_occupation": fake.random_element(elements=('Govt', 'Private', 'Business', 'Student')),
            "child1": fake.name(),
            "child1_dob": fake.date_of_birth().strftime('%Y-%m-%d'),
            "child2": fake.name(),
            "child2_dob": fake.date_of_birth().strftime('%Y-%m-%d'),
            "child3": fake.name(),
            "child3_dob": fake.date_of_birth().strftime('%Y-%m-%d'),
            "child4": fake.name(),
            "child4_dob": fake.date_of_birth().strftime('%Y-%m-%d'),
            "work_address": "ABC",
            "redidence_address": "ABC",
            "phone1": fake.random_number(digits=8),
            "phone2": fake.random_number(digits=8),
            "mobile1": fake.random_number(digits=10),
            "mobile2": fake.random_number(digits=10),
            "email1": fake.email(),
            "email2": "",
            "geo_location": f"{fake.latitude()}, {fake.longitude()}",
            "website": fake.url()
        }
        entries.append(entry)

    json_data = entries

    with open("data/data.json", "w") as outfile:
        json.dump(json_data, outfile, indent=2)
    print(json_data)

# generate_mobile_password()
# create_fake()
