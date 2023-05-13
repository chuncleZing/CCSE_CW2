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
    
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $row['user_id'];
        $_SESSION['email'] = $row['email'];
        echo "success";
    } else {
        echo "Invalid username or password.";
    }
} else {
    echo "Please enter your email and password.";
}
// sources that helped me figure this out:
// https://www.geeksforgeeks.org/how-to-select-and-upload-multiple-files-with-html-and-php-using-http-post/
// https://www.geeksforgeeks.org/how-to-insert-form-data-into-database-using-php/
// https://www.w3schools.com/php/php_mysql_select.asp

mysqli_close($conn);
?>
