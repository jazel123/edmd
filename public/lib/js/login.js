$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "../../src/routes/routes.php",
      data: {
        type: "login",
        username: $("#username").val(),
        password: $("#password").val()
      },
      success: function (data) {
        try {
          const response = JSON.parse(data);
          if (response.status === "success") {
            window.location.href = response.redirect;
          } else {
            alert("Login failed. Please check your credentials.");
          }
        } catch (e) {
          console.error("Invalid JSON response:", data);
          alert("An unexpected error occurred. Please try again later.");
        }
      },
      error: function () {
        alert("An error occurred. Please try again later.");
      }
    });
  });
});
