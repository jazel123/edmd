$(document).ready(function() {
    loadAdminDashboardStats();

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

    function loadAdminDashboardStats() {
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { type: "getAdminDashboardStats" },
            success: function(data) {
                const stats = JSON.parse(data);
                if (stats.status === "success") {
                    $("#totalUsers").text(stats.totalUsers);
                    $("#newUsers").text(stats.newUsers);
                } else {
                    alert("Error loading dashboard statistics");
                }
            },
            error: function() {
                alert("Error loading dashboard statistics");
            }
        });
    }
});

