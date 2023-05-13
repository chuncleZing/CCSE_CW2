<?php
session_start();
$host = "localhost";
$username = "root";
$password = "";
$database = "ccse";
// Pretty sure this is file is no longer needed, as I am no longer using the database as part of sending verification codes
// I'll keep this in as it was part of my original plan
// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $admin_id = 2; // change this part

    // Query the admin table to check if email and password are valid
    $sql = "SELECT * FROM admin WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // If the email and password are valid, generate a verification code and store it in the admin_verification table
        $verificationCode = rand(100000, 999999);
        $sql = "INSERT INTO admin_verification (email, verification_code, admin_id) VALUES ('$email', '$verificationCode', '$admin_id')";
        $conn->query($sql);

        // Send an email to the user's email address containing the verification code
        $to = $email;
        $subject = "Verification Code for Admin Login";
        $message = "Your verification code is $verificationCode.";
        $headers = "From: admin@example.com";
        mail($to, $subject, $message, $headers);

        // Display the verification code popup
        echo "<script>
        var popup = document.getElementById('verificationPopup');
        popup.style.display = 'block';
        </script>";
    } else {
        // If the email and password are not valid, display an error message
        echo "<script>
        alert('Invalid email or password.');
        </script>";
    }
}

$conn->close();
?>
