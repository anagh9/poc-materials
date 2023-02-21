function populateForm(){
    $.getJSON("../../json/data.json", function(data) {
        jsonData = data
        var table = $('#mytable').DataTable({
            data: data,
            columns: [
            { 
                data: 'member_id',
                render: function(data){
                    return `<b>${data}</b>`
                }
            },
            { data: 'name' },
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
                    return '<button class="btn btn-primary btn-sm mr-2" data-action="view" data-id="' + row.member_id + '"><span><i class="fa fa-eye" aria-hidden="true"></i></span></button>' +
                    '<button class="btn btn-info btn-sm" data-action="edit" data-id="' + row.member_id + '"><span><i class="fa fa-pencil" aria-hidden="true"></i></span></button>';
                }
            },
            ]
        });
    });

    $('#mytable tbody').on('click', 'button', function() {
        var action = $(this).data('action');
        var id = $(this).data('id');
        console.log('Button clicked: ' + action + ', ID: ' + id);
        if(action==='edit'){
            window.location.href = '/templates/edit.html?id='+id
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

    // $('#edit-form').submit(function(event) {
    //     event.preventDefault();
    //     const formData = $(this).serializeArray();
    //     const newData = {};
    //     formData.forEach(field => newData[field.name] = field.value);
    //     const memberIndex = globalJsonData.findIndex(member => member.member_id == memberId);
    //     if (memberIndex >= 0) {
    //         globalJsonData[memberIndex] = {...globalJsonData[memberIndex], ...newData};
    //         // save the updated data to a file or database as necessary
    //         // redirect to the view page or some other page as necessary
    //     }
    // });
}


function onSave(){
    window.scrollTo(0,0)
    showAlert();
    setTimeout(()=>{
        // window.location.href = window.location.href+ '&view=true'
        window.location.href = '/templates/table.html'
    },1000)
}

function changeFormData(){
    let field_value_name  =$("#editField").val()
    if(field_value_name){
        console.log(field_value_name)
        $("#editModelForm .close").click()
        $('input#name').val(field_value_name);
    }
    // showAlert()
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
    $('#editField').attr("placeholder", placeholder) 
}

$('#get-location-btn').on('click',function(){
    console.log("Focused")
    let geoInitialVal = $('#geo_location').val()
    $('#initialValueGeo').val(geoInitialVal)
    $('#detectLocation').on('click',()=>{
        console.log("Focused")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // locationField.value = `${lat},${lng}`;
            $('#initialValueGeo').val(`${lat},${lng}`)
            $('#editFieldGeo').val(`${lat},${lng}`)
            $('#geo_location').val(`${lat},${lng}`)
            setTimeout(()=>{
                $("#editModelFormGeo .close").click()
            },1000)

            }, (error) => {
            console.error(error);
            alert('Failed to get location.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    })

})


function editForm() {
        $.getJSON("../../json/data.json", function(data) {
            const jsonData = data
            const urlParams = new URLSearchParams(window.location.search);
            const memberId = parseInt(urlParams.get('id'));
            const view = urlParams.get('view');
            if(view){
                setFormToReadOnly()
            }
            const memberData = data.find(member => member.member_id == memberId);
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
                // alert("Your Data has been saved")
            });
        })
  }
  
  