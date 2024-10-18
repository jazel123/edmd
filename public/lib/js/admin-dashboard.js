$(document).ready(function() {
    loadAdminDashboardStats();
    loadRecentUserActivity();

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
                    $("#activeUsers").text(stats.activeUsers);
                    $("#inactiveUsers").text(stats.inactiveUsers);
                } else {
                    alert("Error loading dashboard statistics");
                }
            },
            error: function() {
                alert("Error loading dashboard statistics");
            }
        });
    }

    function loadRecentUserActivity() {
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { type: "getRecentUserActivity" },
            success: function(data) {
                const activities = JSON.parse(data);
                if (activities.status === "success") {
                    let tableHtml = "";
                    activities.data.forEach(activity => {
                        tableHtml += `
                            <tr>
                                <td>${activity.username}</td>
                                <td>${activity.action}</td>
                                <td>${activity.timestamp}</td>
                            </tr>
                        `;
                    });
                    $("#recentActivityTable").html(tableHtml);
                } else {
                    alert("Error loading recent user activity");
                }
            },
            error: function() {
                alert("Error loading recent user activity");
            }
        });
    }
});
