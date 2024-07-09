function saveStartData(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const form = document.getElementById('survey-form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // 기존의 startData 가져오기
    const existingStartDataString = sessionStorage.getItem('startData');
    let startData = existingStartDataString ? JSON.parse(existingStartDataString) : {};

    // 새로운 데이터 추가
    startData = { ...startData, ...data };

    // 세션 스토리지에 저장
    sessionStorage.setItem('startData', JSON.stringify(startData));
    console.log('Data saved to sessionStorage:', startData);
    alert('확인을 누르면 설문이 시작됩니다.');
    window.location.href = '../mainSurvey/survey_page_1.html'; // 첫 설문 페이지로 이동
}

