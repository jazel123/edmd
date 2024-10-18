$(document).ready(function() {
    // Load user information
    loadUserInfo();

    // Change Password button click event
    $("#changePasswordBtn").click(function() {
        const currentPassword = $("#currentPassword").val();
        const newPassword = $("#newPassword").val();
        const confirmPassword = $("#confirmPassword").val();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        $.ajax({
            url: "../../src/routes/routes.php",
            type: "POST",
            data: {
                type: "changePassword",
                currentPassword: currentPassword,
                newPassword: newPassword
            },
            success: function(response) {
                const result = JSON.parse(response);
                if (result.status === "success") {
                    alert("Password changed successfully.");
                    $("#changePasswordModal").modal("hide");
                    $("#changePasswordForm")[0].reset();
                } else {
                    alert("Failed to change password: " + result.message);
                }
            },
            error: function() {
                alert("An error occurred while changing the password.");
            }
        });
    });

    // Logout functionality
    $("#logout").click(function() {
        $.ajax({
            url: "../../src/routes/routes.php",
            type: "POST",
            data: { type: "logout" },
            success: function() {
                window.location.href = "login.php";
            }
        });
    });

    function loadUserInfo() {
        $.ajax({
            url: "../../src/routes/routes.php",
            type: "POST",
            data: { type: "getUserInfo" },
            success: function(response) {
                const user = JSON.parse(response);
                $("#welcomeUsername").text(user.username);
                $("#username").text(user.username);
                $("#email").text(user.email);
                $("#age").text(user.age);
                $("#address").text(user.address);
            },
            error: function() {
                alert("An error occurred while loading user information.");
            }
        });
    }
});
