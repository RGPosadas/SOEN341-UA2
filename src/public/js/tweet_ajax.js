$(document).ready(function(){
  console.log("document ready")
  $('form').on('submit', function(){
    
      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/profile/post',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
      return false;
  });
});
