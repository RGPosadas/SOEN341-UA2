
let id = 0;
let value = "";
// Get the id from the like button when its clicked
$('button').click(function(){
    id = $(this).attr('id');
    value = $(this).attr('value');
});

//Pass the id here to send to the database for the like and unlike 
$(document).ready(function(){
    $('form').on('submit', function(){
        if(value == 'like'){
            $.ajax({
                type: 'POST',
                url: '/like',
                dataType: "json",
                data: {
                    id: id
                },
                success: function(result){
                  console.log(result);
                  if(result.status == 200){
                    location.reload();
                  }
                }
              });
             }
        else{
            $.ajax({
                type: 'POST',
                url: '/unlike',
                dataType: "json",
                data: {
                    id: id
                },
                success: function(result){
                  console.log(result);
                  if(result.status == 200){
                    location.reload();
                  }                }
              });
              location.reload()
              return false;
        }

    });
  
  
  });
