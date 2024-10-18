$(document).ready(function() {
    $.ajax({
        type: "post",
        url: "../../src/routes/routes.php",
        data: { type: "getUserDashboardInfo" },
        success: function(data) {
            try {
                const response = JSON.parse(data);
                if (response.status === 'success') {
                    $('#welcomeUsername').text(response.username);
                    $('#username').text(response.username);
                    $('#email').text(response.email);
                    $('#age').text(response.age);
                    $('#address').text(response.address);
                } else {
                    console.error("Error:", response.message);
                    alert("Error loading user information: " + response.message);
                }
            } catch (e) {
                console.error("Error parsing JSON:", e, "Raw data:", data);
                alert("An unexpected error occurred. Please check the console for details.");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("AJAX error:", textStatus, errorThrown);
            alert("An error occurred while loading user information. Please check the console for details.");
        }
    });

    // Logout functionality
    $('#logout').click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { type: "logout" },
            success: function(data) {
                window.location.href = "login.php";
            }
        });
    });
});
