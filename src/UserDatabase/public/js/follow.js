
let id = 0;

// Get the id from the follow button when its clicked
$('button').click(function(){
    id = $(this).attr('id');
});

//Pass the id here to send to the database
$(document).ready(function(){
    console.log("document ready")
    $('form').on('submit', function(){
        alert("You are now following!");

        $.ajax({
          type: 'POST',
          url: '/suggested',
          dataType: "json",
          data: {
              id: id
          },
          success: function(data){
            location.reload();
          }
        });
  
        return false;
  
    });
  
  
  });