<?php
header('Content-Type: application/json');

// 데이터베이스 연결 설정
$servername = "servername";
$username = "username";
$password = "password";
$dbname = "dbname";

// POST 데이터를 받아서 JSON 디코딩
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// 사용자가 입력한 username과 password
$usernameInput = $data['username'];
$passwordInput = $data['password'];

// MySQLi를 이용한 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// SQL 쿼리 작성 및 실행
$usernameEscaped = $conn->real_escape_string($usernameInput);
$passwordEscaped = $conn->real_escape_string($passwordInput);
$sql = "SELECT * FROM Create_data WHERE ID = '$usernameEscaped' AND PW = '$passwordEscaped'";

$result = $conn->query($sql);

$response = [];

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // 예시: report 값 확인
    $report = $row['Report'];
    if ($report != null && $report != "") {
        // report 값이 존재하면 마지막 화면으로 리디렉션
        $response = ['success' => true, 'redirect' => '../finishSurvey/finishSurvey.html'];
    } else {
        // report 값이 존재하지 않으면 사전조사로 리디렉션
        $response = ['success' => true, 'redirect' => '../preSurvey/preSurvey.html'];
    }
} else {
    // 로그인 실패
    $response = ["success" => false, "message" => "Invalid username or password"];
}

// JSON 응답 출력
echo json_encode($response);

// 연결 종료
$conn->close();
