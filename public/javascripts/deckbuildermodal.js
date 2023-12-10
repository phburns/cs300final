var form = document.getElementById('deck-form');
  var formData;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    formData = new FormData(form);
    $('#successModal').modal('show');
  });

  $('.modal-footer .btn').click(function() {
    $('#successModal').modal('hide');
    $.ajax({
      type: form.method,
      url: form.action,
      data: formData,
      processData: false,
      contentType: false,
      success: function() {
        window.location.href = '/'; // Redirect to the home page
      }
    });
  });