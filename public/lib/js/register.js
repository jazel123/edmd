$(document).ready(function () {
  $("#registerForm").submit(function (e) {
    e.preventDefault();
    
    // Get form data
    var formData = {
      username: $("#username").val(),
      email: $("#email").val(),
      age: $("#age").val(),
      address: $("#address").val(),
      password: $("#password").val(),
      confirmPassword: $("#confirmPassword").val()
    };

    // Send AJAX request
    $.ajax({
      type: "POST",
      url: "../controller/register.php",
      data: formData,
      dataType: "json",
      encode: true
    })
    .done(function (data) {
      if (data.success) {
        // Show success alert using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You can now log in to your account.',
          confirmButtonText: 'Go to Login',
          confirmButtonColor: '#28a745',
          timer: 3000,
          timerProgressBar: true
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
            window.location.href = "login.php";
          }
        });
        
        // Clear form fields
        $("#registerForm")[0].reset();
      } else {
        // Show error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message || 'Please try again.',
          confirmButtonColor: '#dc3545'
        });
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX request failed:", textStatus, errorThrown);
      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: '#dc3545'
      });
    });
  });
});
