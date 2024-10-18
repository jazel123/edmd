$(document).ready(function() {
    loadUsers();

    // Search functionality
    $('#userSearch').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $("#userTableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // Add User button click event
    $('#addUserBtn').click(function() {
        // Implement your add user functionality here
        console.log('Add User button clicked');
    });

    function loadUsers() {
        $.ajax({
            type: "POST",
            url: "../../src/routes/routes.php",
            data: { type: "getAllUsers" },
            success: function(data) {
                try {
                    const users = JSON.parse(data);
                    updateUserTable(users);
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    $("#userTableBody").html("<tr><td colspan='4'>Error loading user data</td></tr>");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("AJAX error:", textStatus, errorThrown);
                $("#userTableBody").html("<tr><td colspan='4'>Error loading user data</td></tr>");
            }
        });
    }

    function updateUserTable(users) {
        let tableHtml = "";
        users.forEach(user => {
            tableHtml += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.created_at}</td>
                    <td>
                        <i class="fas fa-edit action-icon update" data-id="${user.id}" title="Update"></i>
                        <i class="fas fa-trash-alt action-icon delete" data-id="${user.id}" title="Delete"></i>
                    </td>
                </tr>
            `;
        });
        $("#userTableBody").html(tableHtml);

        // Add click event listeners for the icons
        $(".action-icon.update").click(function() {
            const userId = $(this).data("id");
            // Implement update functionality
            console.log("Update user with ID:", userId);
        });

        $(".action-icon.delete").click(function() {
            const userId = $(this).data("id");
            // Implement delete functionality
            console.log("Delete user with ID:", userId);
        });
    }
});
