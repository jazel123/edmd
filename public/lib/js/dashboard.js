$(document).ready(function() {
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

function loadDashboardData() {
    $.ajax({
        type: "post",
        url: "../../src/routes/routes.php",
        data: { type: "getDashboardData" },
        success: function (data) {
            const dashboardData = JSON.parse(data);
            updateDashboard(dashboardData);
        },
        error: function () {
            alert("Error loading dashboard data");
        },
    });
}

function updateDashboard(data) {
    // Update your dashboard elements here
    // For example:
    // $("#totalItems").text(data.totalItems);
    // $("#totalValue").text("$" + data.totalValue.toFixed(2));
    // ... other updates ...
}

