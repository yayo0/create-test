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

// JSON 데이터를 처리하여 필요한 값 추출
$completeSurveyData = $data['completeSurveyData'];
$emailPrefix = $data['emailPrefix'];
$sectionSums = $data['sectionSum'];


// 쌍따옴표 제거
$completeSurveyData = str_replace('"', '', $completeSurveyData);
$sectionSums = str_replace('"', '', $sectionSums);

// MySQLi를 이용한 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// SQL 쿼리 작성 및 실행
$completeSurveyDataEscaped = $conn->real_escape_string($completeSurveyData);
$sectionSumsEscaped = $conn->real_escape_string($sectionSums);
$sql = "UPDATE Create_data SET Raw = '$completeSurveyDataEscaped', Report = '$sectionSumsEscaped' WHERE ID LIKE '$emailPrefix%'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Record updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating record: " . $conn->error]);
}

// 연결 종료
$conn->close();

