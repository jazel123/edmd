$(document).ready(function() {
    loadUserDashboardInfo();

    $("#logout").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { type: "logout" },
            success: function(data) {
                const response = JSON.parse(data);
                if (response.status === "success") {
                    window.location.href = "login.php";
                }
            }
        });
    });

    $("#changePassword").click(function() {
        const newPassword = prompt("Enter new password:");
        if (newPassword) {
            changePassword(newPassword);
        }
    });

    function loadUserDashboardInfo() {
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { type: "getUserDashboardInfo" },
            success: function(data) {
                const userInfo = JSON.parse(data);
                if (userInfo.status === "success") {
                    $("#username").text(userInfo.username);
                    $("#email").text(userInfo.email);
                } else {
                    alert("Error loading user information");
                }
            },
            error: function() {
                alert("Error loading user information");
            }
        });
    }

    function changePassword(newPassword) {
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { 
                type: "changePassword",
                newPassword: newPassword
            },
            success: function(data) {
                const response = JSON.parse(data);
                if (response.status === "success") {
                    alert("Password changed successfully");
                } else {
                    alert("Failed to change password");
                }
            },
            error: function() {
                alert("Error changing password");
            }
        });
    }
});

