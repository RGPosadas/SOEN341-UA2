
let id = 0;

// Get the id from the follow button when its clicked
$('button').click(function(){
    id = $(this).attr('id');
});

//Pass the id here to send to the database
$(document).ready(function(){

    $('form').on('submit', function(){

        $.ajax({
          type: 'POST',
          url: '/unfollow',
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
  
        $('#li-'+id).remove()

        return false;
  
    });
  
  
  });
