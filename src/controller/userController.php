<?php
class userController
{
    public function login($username, $password) {
        $db = new database();
        $con = $db->initDatabase();
        $statement = $con->prepare("SELECT * FROM user WHERE username = ?");
        $statement->execute([$username]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            return json_encode([
                'status' => 'success',
                'user_id' => $user['id'],
                'username' => $user['username'],
                'user_role' => $user['role']
            ]);
        }
        return json_encode(['status' => 'failed']);
    }

    public function register() {
        if (empty($_POST['username']) || empty($_POST['password'])) {
            return json_encode(['status' => 'error', 'message' => 'Username and password are required']);
        }
        $db = new database();
        $con = $db->initDatabase();
        $stmt = $con->prepare("INSERT INTO user (username, password, role) VALUES (?, ?, ?)");
        $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $role = 'user'; // Default role for new registrations
        try {
            $stmt->execute([$_POST['username'], $hashedPassword, $role]);
            return json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            return json_encode(['status' => 'error', 'message' => 'Registration failed: ' . $e->getMessage()]);
        }
    }

    public function getAllUsers() {
        $db = new database();
        $con = $db->initDatabase();
        $stmt = $con->query("SELECT id, username, created_at FROM user ORDER BY created_at DESC");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($users);
    }

    public function updateUser($userId, $newUsername) {
        $db = new database();
        $con = $db->initDatabase();
        $stmt = $con->prepare("UPDATE user SET user = ? WHERE id = ?");
        $result = $stmt->execute([$newUsername, $userId]);
        return json_encode(['status' => $result ? 'success' : 'failed']);
    }

    public function deleteUser($userId) {
        $db = new database();
        $con = $db->initDatabase();
        $stmt = $con->prepare("DELETE FROM user WHERE id = ?");
        $result = $stmt->execute([$userId]);
        return json_encode(['status' => $result ? 'success' : 'failed']);
    }

    public function getAdminDashboardStats() {
        $db = new database();
        $con = $db->initDatabase();
        
        $totalUsers = $con->query("SELECT COUNT(*) FROM user")->fetchColumn();
        $newUsers = $con->query("SELECT COUNT(*) FROM user WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)")->fetchColumn();
        
        return json_encode([
            'status' => 'success',
            'totalUsers' => $totalUsers,
            'newUsers' => $newUsers
        ]);
    }

    public function getUserDashboardInfo() {
        if (!isset($_SESSION['user_id'])) {
            return json_encode(['status' => 'failed']);
        }
        
        $db = new database();
        $con = $db->initDatabase();
        $stmt = $con->prepare("SELECT user, email FROM user WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            return json_encode([
                'status' => 'success',
                'username' => $user['user'],
                'email' => $user['email']
            ]);
        } else {
            return json_encode(['status' => 'failed']);
        }
    }

    public function createAdminAccount() {
        $db = new database();
        $con = $db->initDatabase();
        $stmt = $con->prepare("INSERT INTO user (user, pass, role) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE pass = ?, role = ?");
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt->execute(['Admin', $hashedPassword, 'admin', $hashedPassword, 'admin']);
        return json_encode(['status' => 'success']);
    }
}
