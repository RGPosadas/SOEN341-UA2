
let id = 0;
let value = "";
// Get the id from the follow button when its clicked
$('button').click(function(){
    id = $(this).attr('id');
    value = $(this).attr('value');
});

//Pass the id here to send to the database
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
                success: function(data){
                  location.reload();
                }
              });
        
              //$('#li-'+id).remove()

              location.reload()
              return false;
            }

        else{
            $.ajax({
                type: 'POST',
                url: '/unlike',
                dataType: "json",
                data: {
                    id: id
                },
                success: function(data){
                  location.reload();
                }
              });
        
              //$('#li-'+id).remove()

              location.reload()
              return false;
        }

    });
  
  
  });