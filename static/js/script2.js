const populateTable = (data) => {
    const jsonData = data;
    console.log(jsonData);
    const table = $('#mytable').DataTable({
        data: data,
        columns: [
            { 
                data: 'member_id',
                render: (data) => `<b>${data}</b>`
            },
            { 
                data: 'name',
                render: (data,type,row) => `<a href="edit-form/${row.member_id}">${data}</a>`
            },
            { data: 'company_name' },
            { data: 'mobile1' },
            { 
                data: 'work_address' ,
                render: (data) => data.slice(0, 20) + '...'
            },
            { 
                data: null,
                render: (data,type,row) => '<button class="btn btn-info btn-sm" data-action="edit" data-id="' + row.member_id + '"><span><i class="fa fa-pencil" aria-hidden="true"></i></span></button>'
            }
        ]
    });
};

const populateForm = () => {
    populateTable(user_data);

    $('#mytable tbody').on('click', 'button', function() {
        const action = $(this).data('action');
        const id = $(this).data('id');
        console.log(`Button clicked: ${action}, ID: ${id}`);
        if (action === 'edit') {
            window.location.href = `/edit-form/${id}`;
        } else {
            window.location.href = `/edit-form/${id}&view=true`;
        }
    });
};

const setFormToReadOnly = () => {
    const formElements = document.querySelectorAll('form input, form select, form textarea');
    formElements.forEach((element) => {
        element.disabled = true;
    });
    const form = document.getElementById('edit-form');
    const buttons = form.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none';
    }
};

const onSave = () => {
    window.scrollTo(0,0);
    showAlert();
    setTimeout(() => {
        window.location.href = '/users';
    }, 1000);
};

const changeFormData = () => {
    const field_value_name = $('#editField').val();
    if (field_value_name) {
        console.log(field_value_name);
        $('#editModelForm .close').click();
        $('input#name').val(field_value_name);
    }
};

const showAlert = () => {
    const alertBox = document.querySelector('.alert');
    alertBox.style.display = 'block';
};

const changeName = () => {
    const name = $('#name').val();
    setEditField(name, 'Enter new name');
};

const setEditField = (initialValue, placeholder) => {
    $('#initialValue').val(initialValue);
    $('#editField').val(initialValue);
};

// Cache the selectors
const $geoLocation = $('#geo_location');
const $initialValueGeo = $('#initialValueGeo');
const $editFieldGeo = $('#editFieldGeo');
const $editForm = $('#edit-form');

// Click handler for #get-location-btn
$('#get-location-btn').on('click', function() {
    $initialValueGeo.val($geoLocation.val());
    $editFieldGeo.val($geoLocation.val());
});

// Click handler for #detectLocation
$('#detectLocation').on('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude: lat, longitude: lng } = position.coords;
            const value = `${lat},${lng}`;
            $initialValueGeo.val(value);
            $editFieldGeo.val(value);
            $geoLocation.val(value);
        }, (error) => {
            alert('Failed to get location.');
            console.log(error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Click handler for closing the form
function dismiss() {
    $("#editModelFormGeo .close").click();
}

// Populate the form fields with the user data
$('#companyName').val(user_obj.company_name);
$('#name').val(user_obj.name);
$('#dob').val(user_obj.dob);
$('#dom').val(user_obj.dom);
$('#bloodGrp').val(user_obj.blood_grp);
$('#occupation').val(user_obj.occupation);
$('#education').val(user_obj.education);
$('#spouse').val(user_obj.spouse);
$('#spouseDob').val(user_obj.spouse_dob);
$('#spouseBg').val(user_obj.spose_bg);
$('#spouseOccupation').val(user_obj.spouse_occupation);
$('#child1').val(user_obj.child1);
$('#child2').val(user_obj.child2);
$('#child3').val(user_obj.child3);
$('#child4').val(user_obj.child4);
$('#child1Dob').val(user_obj.child1_dob);
$('#child2Dob').val(user_obj.child2_dob);
$('#child3Dob').val(user_obj.child3_dob);
$('#child4Dob').val(user_obj.child4_dob);
$('#phone1').val(user_obj.phone1);
$('#phone2').val(user_obj.phone2);
$('#mobile1').val(user_obj.mobile1);
$('#mobile2').val(user_obj.mobile2);
$('#email1').val(user_obj.email1);
$('#email2').val(user_obj.email2);
$('#website').val(user_obj.website);
$('#work_address').val(user_obj.work_address);
$geoLocation.val(user_obj.geo_location);
$('#residence_address').val(user_obj.redidence_address);

// Prevent form submission
$editForm.submit(function(event) {
    event.preventDefault();
});
