$(document).ready(function () {
    // Load dashboard data
    loadDashboardData();

    // Logout functionality
    $("#logout").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { type: "logout" },
            success: function (data) {
                const response = JSON.parse(data);
                if (response.status === "success") {
                    window.location.href = "login.php";
                }
            },
        });
    });
});



