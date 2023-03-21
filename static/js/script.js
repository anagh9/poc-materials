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

// function postData(url, data) {
//     return fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response=>{
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();

//     })
//     .then(data=>{ 
//         console.log(data);
//         return data;
//      })
//     .catch(error => {
//       console.error('Error occurred while posting data:', error);
//     });
// }

async function postData(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error('Error occurred while posting data:', error);
      throw error;
    }
  }


function onSave(){
    let name = $('#name').val()
    let geoVal = $('#editFieldGeo').val();
    window.scrollTo(0,0)
    data = {'name':name, 'geo_location':geoVal}
    postData(`/edit-form/${user_obj.member_id}`,data)
    showAlert();
}

function changeFormData(){
    let field_value_name  =$("#editField").val()
    if(field_value_name){
        $("#editModelForm .close").click()
        $('input#name').val(field_value_name);
    }
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
            navigator.geolocation.getCurrentPosition(async (position) => {
                $('#detectLocation').attr('disabled', true);
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                $('#editFieldGeo').val(`${lat},${lng}`)
                let geoVal = $('#editFieldGeo').val();
                let data = {"geoValue": geoVal};
                let res = await postData(`/geo-location-log/${user_obj.member_id}`, data);
                setInterval(function(){
                    if(res.status==true){
                        $('#detectLocation').attr('disabled', false);
                    }
                }, 3000);
                
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
    let geoVal = $('#editFieldGeo').val();
    $('#geo_location').val(geoVal)
    $("#editModelFormGeo .close").click()
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
  
  