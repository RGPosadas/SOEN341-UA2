//when document is ready, run this function
$(document).ready(function(){

  // when you have a form and in that form you have an event of submit fire this function
  $('form').on('submit', function(){

      var item = $('form input'); // locate the input in the form
      var todo = {item: item.val()}; // grab the value from the input

      $.ajax({
        type: 'POST',
        url: '/tweet',
        data: todo, // passing this data to app.post
        //manipulate it in the app.post body
        //send the updated data to the success: at the bottom
        //Do something with that updated data
        success: function(data){//new data
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

 
});