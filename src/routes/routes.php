<?php
include_once('../static/query.php');
include_once('../controller/database.php');
include_once('../controller/userController.php');

session_start();

// Add these lines after the existing includes
error_reporting(E_ALL);
ini_set('display_errors', 0);

try {
    if (isset($_POST['type'])) {
        $ctr = new userController();
        switch ($_POST['type']) {
            case 'login':
                $result = $ctr->login($_POST['username'], $_POST['password']);
                $response = json_decode($result, true);
                if ($response['status'] === 'success') {
                    $_SESSION['user_id'] = $response['user_id'];
                    $_SESSION['username'] = $response['username'];
                    $_SESSION['user_role'] = $response['user_role'];
                    
                    $redirect = ($_SESSION['user_role'] === 'admin') ? 'admin-dashboard.php' : 'user-dashboard.php';
                    
                    echo json_encode([
                        'status' => 'success',
                        'redirect' => $redirect
                    ]);
                } else {
                    echo $result;
                }
                break;
            case 'register':
                echo $ctr->register();
                break;
            case 'getAllUsers':
                echo $ctr->getAllUsers();
                break;
            case 'updateUser':
                echo $ctr->updateUser($_POST['userId'], $_POST['newUsername']);
                break;
            case 'deleteUser':
                echo $ctr->deleteUser($_POST['userId']);
                break;
            case 'logout':
                session_destroy();
                echo json_encode(['status' => 'success']);
                break;
            case 'getAdminDashboardStats':
                echo $ctr->getAdminDashboardStats();
                break;
            case 'getUserDashboardInfo':
                error_log("getUserDashboardInfo case reached");
                $result = $ctr->getUserDashboardInfo();
                error_log("getUserDashboardInfo result: " . $result);
                echo $result;
                break;
            case 'createAdminAccount':
                echo $ctr->createAdminAccount();
                break;
            default:
                echo json_encode(['status' => 'invalid_request']);
                break;
        }
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
