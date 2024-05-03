$(document).ready(function() {
  $('#loginForm').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serialize();
      $.post('/submit', formData)
          .done(function(response) {
              $('#notification').html('<div class="alert alert-success">' + response + '</div>');
          })
          .fail(function(xhr, status, error) {
              $('#notification').html('<div class="alert alert-danger">' + xhr.responseText + '</div>');
          });
  });
});