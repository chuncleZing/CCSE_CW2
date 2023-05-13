<?php
session_start();
$localhost = "localhost"; // localhost
$dbusername = "root"; // username of phpmyadmin
$dbpassword = ""; // password of phpmyadmin
$dbname = "ccse"; // database name

// Creating a connection
$conn = mysqli_connect($localhost, $dbusername, $dbpassword, $dbname);

// Checking the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $sql = "SELECT * FROM admin WHERE email='$email' AND password='$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['admin_id'] = $row['admin_id'];
        $_SESSION['email'] = $row['email'];
        echo "success";
    } else {
        echo "Invalid username or password.";
    }
} else {
    echo "Please enter your email and password.";
}

mysqli_close($conn);
?>