<?php 
$localhost = "localhost"; //localhost
$dbusername = "root"; //username of phpmyadmin
$dbpassword = "";  //password of phpmyadmin (none)
$dbname = "ccse";  //name of my database
 
// Create a connection - this is the script that uploads files to the database
$conn = mysqli_connect($localhost, $dbusername, $dbpassword, $dbname);
 
if (isset($_FILES["file"]))
{
    // This generates a unique file name to avoid replacing existing files 
    $pname = rand(1000,10000)."-".$_FILES["file"]["name"];
 
    // Temporary file name to store the uploaded file - not uploading this
    $tname = $_FILES["file"]["tmp_name"];
   
    // Upload directory path
    $uploads_dir = 'C:\Users\joelh\CCSE_CW1\uploads';
 
    // This will move the uploaded file to the uploads directory (so that it can be accessed later)
    move_uploaded_file($tname, $uploads_dir.'/'.$pname);

    // Retrieve file title from input field
    $title = isset($_POST["title"]) ? $_POST["title"] : "";

   
    session_start();

    // Retrieve user_id from session
    $user_id = $_SESSION['user_id'];

    // Check if user_id is even set
    if (!$user_id) {
        die("User is not logged in.");
    }
    // retrieves email address from database
    $query = "SELECT email FROM users WHERE user_id='$user_id'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    $email = $row['email'];



    // SQL query that inserts the file path, and user_id into the database
    $sql = "INSERT INTO documents (filepath, email, user_id, filename) VALUES ('$uploads_dir/$pname', '$email', '$user_id', '$pname')";
    // date_uploaded is sorted out on the SQL server

    if(mysqli_query($conn, $sql)) {
        echo "File uploaded successfully";
    } else {
        echo "Error uploading file";
    }
}
?>

