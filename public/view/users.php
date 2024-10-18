<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management | System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="../lib/css/my.css">
    <style>
        .table th, .table td {
            padding: 1.2rem;
            vertical-align: middle;
        }
        .table {
            font-size: 1.1rem;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .table thead {
            background-color: #f8f9fa;
        }
        .table tbody tr:hover {
            background-color: #f1f3f5;
        }
        .action-icon {
            font-size: 1.2rem;
            margin: 0 0.5rem;
            cursor: pointer;
        }
        .action-icon.update {
            color: #007bff;
        }
        .action-icon.delete {
            color: #dc3545;
        }
    </style>
</head>
<body class="bg-light">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <!-- Main content -->
            <main class="col-md-11 col-lg-10 px-4">
                <div class="text-center mt-5 mb-4">
                    <h1 class="h2">User Management</h1>
                </div>
                
                <div class="d-flex justify-content-end mb-4">
                    <input type="text" class="form-control form-control-lg me-2" id="userSearch" placeholder="Search users..." style="width: 250px;">
                    <button class="btn btn-primary btn-lg" id="addUserBtn">
                        <i class="fas fa-user-plus"></i> Add User
                    </button>
                </div>

                <!-- User table -->
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th style="width: 10%">ID</th>
                                <th style="width: 35%">Username</th>
                                <th style="width: 35%">Created At</th>
                                <th style="width: 20%">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="userTableBody">
                            <!-- User data will be populated here -->
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="../lib/js/users.js"></script>
</body>
</html>
