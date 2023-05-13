<?php 
header('Cache-Control: no-cache');
session_start();
$localhost = "localhost"; //localhost
$dbusername = "root"; //username of phpmyadmin
$dbpassword = "";  //password of phpmyadmin
$dbname = "ccse";  //database name
 
// Create connection
$conn = mysqli_connect($localhost, $dbusername, $dbpassword, $dbname);
 
$user_id = $_SESSION["user_id"]; // Get the user_id from the session


$page = isset($_GET['page']) ? $_GET['page'] : 1;
$recordsPerPage = 10;
$offset = ($page - 1) * $recordsPerPage;

// SQL query to retrieve the documents associated with the current users user_id
$sql = "SELECT * FROM documents WHERE user_id = '$user_id' ORDER BY date_uploaded DESC LIMIT $offset, $recordsPerPage";

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
