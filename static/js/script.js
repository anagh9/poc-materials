function populateForm(){
    function populateTable(data) {
        jsonData = data
        console.log(jsonData)
        var table = $('#mytable').DataTable({
            data: data,
            columns: [
            { 
                data: 'member_id',
                render: function(data){
                    return `<b>${data}</b>`
                }
            },
            { 
                data: 'name',
                render: function(data,type,row){
                    return `<a href="edit-form/${row.member_id}">${data}</a>`
                }
            },
            { data: 'company_name' },
            { data: 'mobile1' },
            { 
                data: 'work_address' ,
                render: function(data) {
                    return data.slice(0, 20) + '...';
                }
            },
            { 
                data: null,
                render: function(data,type,row){
                    return '<button class="btn btn-info btn-sm" data-action="edit" data-id="' + row.member_id + '"><span><i class="fa fa-pencil" aria-hidden="true"></i></span></button>';
                }
            },
            ]
        });
    }
    populateTable(user_data)

    $('#mytable tbody').on('click', 'button', function() {
        var action = $(this).data('action');
        var id = $(this).data('id');
        console.log('Button clicked: ' + action + ', ID: ' + id);
        if(action==='edit'){
            window.location.href = '/edit-form/'+id
        }else{
            window.location.href =  `/templates/edit.html?id=${id}&view=true`
        }

    });
}

function setFormToReadOnly() {
    const formElements = document.querySelectorAll('form input, form select, form textarea');
  
    formElements.forEach((element) => {
      element.disabled = true;
    });
    
    let form = document.getElementById("edit-form");
    let buttons = form.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
}


function onSave(){
    window.scrollTo(0,0)
    showAlert();
    setTimeout(()=>{
        window.location.href = '/users'
    },1000)
}


function showAlert(){
    const alertBox = document.querySelector('.alert');
    alertBox.style.display = 'block';
}

function changeName(){
    let name = $('#name').val()
    setEditField(name,"Enter new name")
}

function setEditField(initialValue,placeholder){
    $('#initialValue').val(initialValue);
    $('#editField').val(initialValue) 
}

$('#get-location-btn').on('click',function(){
    let geoInitialVal = $('#geo_location').val()
    $('#initialValueGeo').val(geoInitialVal)
    $('#editFieldGeo').val(geoInitialVal)
    $('#detectLocation').on('click',(event)=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                $('#editFieldGeo').val(`${lat},${lng}`)
                
            }, (error) => {
                alert('Failed to get location.');
                console.log(error)
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    })
})

const geoSubmit = document.getElementById('geo_location_submit');

geoSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let geoVal = $('#editFieldGeo').val();
    let data = {"geoValue": geoVal};
    fetch(`/geo-location/${user_obj.member_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        location.reload();
    })
    .catch(error => {
        location.reload();

        console.error('Error occurred while posting data to Flask function:', error);
    });
});


function dismiss(){
    $("#editModelFormGeo .close").click()
}


function editForm() {
        function populateData(data) {
            const memberData = data
   
            if (memberData) {
                $('#companyName').val(memberData.company_name);
                $('#name').val(memberData.name);
                $('#dob').val(memberData.dob);
                $('#dom').val(memberData.dom);
                $('#bloodGrp').val(memberData.blood_grp);
                $('#occupation').val(memberData.occupation);
                $('#education').val(memberData.education);
                $('#spouse').val(memberData.spouse);
                $('#spouseDob').val(memberData.spouse_dob);
                $('#spouseBg').val(memberData.spose_bg);
                $('#spouseOccupation').val(memberData.spouse_occupation);
                $('#child1').val(memberData.child1);
                $('#child2').val(memberData.child2);
                $('#child3').val(memberData.child3);
                $('#child4').val(memberData.child4);
                $('#child1Dob').val(memberData.child1_dob);
                $('#child2Dob').val(memberData.child2_dob);
                $('#child3Dob').val(memberData.child3_dob);
                $('#child4Dob').val(memberData.child4_dob);
                $('#phone1').val(memberData.phone1);
                $('#phone2').val(memberData.phone2);
                $('#mobile1').val(memberData.mobile1);
                $('#mobile2').val(memberData.mobile2);
                $('#email1').val(memberData.email1);
                $('#email2').val(memberData.email2);
                $('#website').val(memberData.website);
                $('#work_address').val(memberData.work_address);
                $('#geo_location').val(memberData.geo_location);
                $('#residence_address').val(memberData.redidence_address);
              }

            
            $('#edit-form').submit(function(event) {
                event.preventDefault();
            });
        }

        populateData(user_obj)

  }
  
  