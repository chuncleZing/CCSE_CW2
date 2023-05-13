<?php 
header('Cache-Control: no-cache');
session_start();
$localhost = "localhost"; //localhost
$dbusername = "root"; //username of phpmyadmin
$dbpassword = "";  //password of phpmyadmin
$dbname = "ccse";  //database name
 
// Create connection - this php script is used to return all the files from user uploaded docs and display them in a table
// this script returns all the uploaded files
$conn = mysqli_connect($localhost, $dbusername, $dbpassword, $dbname);
 
$user_id = $_SESSION["user_id"]; // Get the user_id from the session


$page = isset($_GET['page']) ? $_GET['page'] : 1;
$recordsPerPage = 10;
$offset = ($page - 1) * $recordsPerPage;

// SQL query to retrieve all items from documents 
$sql = "SELECT * FROM documents ORDER BY date_uploaded DESC LIMIT $offset, $recordsPerPage";

$result = mysqli_query($conn, $sql); //query is run
$documents = array(); // converts result of query into php array
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $documents[] = $row;
    }
}
echo json_encode($documents); // Return the documents as a JSON array
mysqli_close($conn);
?>
