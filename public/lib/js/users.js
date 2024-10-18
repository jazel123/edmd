$(document).ready(function() {
    loadUsers();

    function loadUsers() {
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { type: "getAllUsers" },
            success: function(data) {
                try {
                    const users = JSON.parse(data);
                    if (Array.isArray(users)) {
                        let tableHtml = "";
                        users.forEach(user => {
                            tableHtml += `
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.username}</td>
                                    <td>${user.created_at}</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary edit-user" data-id="${user.id}" data-username="${user.username}">Edit</button>
                                        <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">Delete</button>
                                    </td>
                                </tr>
                            `;
                        });
                        $("#userTableBody").html(tableHtml);
                    } else {
                        console.error("Received data is not an array:", users);
                        $("#userTableBody").html("<tr><td colspan='4'>Error loading user data</td></tr>");
                    }
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

    $(document).on("click", ".edit-user", function() {
        const userId = $(this).data("id");
        const currentUsername = $(this).data("username");
        const newUsername = prompt("Enter new username:", currentUsername);
        if (newUsername && newUsername !== currentUsername) {
            updateUser(userId, newUsername);
        }
    });

    $(document).on("click", ".delete-user", function() {
        const userId = $(this).data("id");
        if (confirm("Are you sure you want to delete this user?")) {
            deleteUser(userId);
        }
    });

    function updateUser(userId, newUsername) {
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { 
                type: "updateUser",
                userId: userId,
                newUsername: newUsername
            },
            success: function(data) {
                const response = JSON.parse(data);
                if (response.status === "success") {
                    loadUsers();
                } else {
                    alert("Failed to update user");
                }
            },
            error: function() {
                alert("Error updating user");
            }
        });
    }

    function deleteUser(userId) {
        $.ajax({
            type: "post",
            url: "../../src/routes/routes.php",
            data: { 
                type: "deleteUser",
                userId: userId
            },
            success: function(data) {
                const response = JSON.parse(data);
                if (response.status === "success") {
                    loadUsers();
                } else {
                    alert("Failed to delete user");
                }
            },
            error: function() {
                alert("Error deleting user");
            }
        });
    }
});
