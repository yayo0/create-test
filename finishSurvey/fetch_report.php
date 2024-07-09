<?php
header('Content-Type: application/json');

// 데이터베이스 연결 설정
$servername = "servername";
$username = "username";
$password = "password";
$dbname = "dbname";

// MySQLi를 이용한 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// POST 데이터에서 emailPrefix 가져오기
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$emailPrefix = $data['emailPrefix'];

// SQL 쿼리 작성 및 실행
$emailPrefixEscaped = $conn->real_escape_string($emailPrefix);
$sql = "SELECT Report FROM Create_data WHERE ID LIKE '$emailPrefix%'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["success" => true, "reportData" => $row['Report']]);
} else {
    echo json_encode(["success" => false, "message" => "No record found"]);
}

// 연결 종료
$conn->close();

