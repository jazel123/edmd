$(document).ready(function () {
  $("#registerForm").submit(function (e) {
    e.preventDefault();
    
    const username = $("#username").val().trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    if (!username || !password) {
      alert("Username and password are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    $.ajax({
      type: "post",
      url: "../../src/routes/routes.php",
      data: {
        type: "register",
        username: username,
        password: password
      },
      success: function (data) {
        try {
          const response = JSON.parse(data);
          if (response.status === "success") {
            alert("Registration successful! Please login.");
            window.location.href = "login.php";
          } else {
            alert("Registration failed: " + (response.message || "Unknown error"));
          }
        } catch (e) {
          console.error("Invalid JSON response:", data);
          alert("An unexpected error occurred. Please try again later.");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("AJAX error:", textStatus, errorThrown);
        alert("An error occurred. Please try again later.");
      }
    });
  });
});
