const total_pages = 7;

function saveData(event, currentPage) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    //설문조사 데이터를 불러옴
    const form = document.getElementById('survey-form');
    const formData = new FormData(form);
    const data = JSON.parse(sessionStorage.getItem('surveyData')) || [];
    const totalQuestions = form.querySelectorAll('.form-group').length;
    let answeredQuestions = 0;
    
    //역으로 값을 계산해야 하는 질문들
    const reverse_value = [
        'question14', 'question17', 'question19', 'question20', 'question21', 
        'question22', 'question23', 'question24', 'question25', 'question26', 
        'question27', 'question28', 'question29', 'question31', 'question33', 
        'question60', 'question65', 'question69', 'question78', 'question79', 
        'question80', 'question81', 'question82', 'question83', 'question84', 
        'question85', 'question86', 'question87', 'question96', 'question97', 
        'question98', 'question99', 'question100', 'question103', 'question105', 
        'question106', 'question107', 'question129']
    // 새 데이터를 배열에 추가
    const newData = [];
    for (const [key, value] of formData.entries()) {
        let revalue  = value;
        if(reverse_value.includes(key)){
            revalue = (6-value).toString();
        }
        if (key){
            newData.push({ question: key, answer: revalue });
            answeredQuestions++;
        }
    }

    // 모든 질문에 응답했는지 확인
    if (answeredQuestions !== totalQuestions) {
        alert('모든 질문에 답해주세요.');
        return; // 다음 페이지로 넘어가지 않도록 함
    }

    // 새 데이터를 기존 데이터에 추가
    data.push(...newData);
    sessionStorage.setItem('surveyData', JSON.stringify(data));

    // 다음 페이지로 이동
    if (currentPage < total_pages) {
        window.location.href = `survey_page_${currentPage + 1}.html`; // 다음 페이지로 리디렉션
    } else {
        // startData의 value값만 추출
        const startDataJson = sessionStorage.getItem('startData');
        const startData = JSON.parse(startDataJson);
        const startValues = Object.values(startData);
        // surveyData의 answer값만 추출
        const surveyDataJson = sessionStorage.getItem('surveyData');
        const surveyData = JSON.parse(surveyDataJson);
        const surveyAnswers = surveyData.map(item => item.answer);

        // completeData 생성
        const completeData = [...startValues, ...surveyAnswers];

        sessionStorage.setItem('completeSurveyData', JSON.stringify(completeData));
        // 세션 스토리지에서 데이터를 가져옴
        const completeSurveyData = sessionStorage.getItem('completeSurveyData');
        const emailPrefix = sessionStorage.getItem('emailPrefix');

        // 6번째 데이터부터 설문조사 응답 데이터 추출
        const surveyResponses = completeData.slice(5);

        // 각 구간의 길이 설정
        const sections = [9, 9, 15, 6, 4, 3, 3, 3, 3, 3, 7, 4, 8, 6, 3, 9, 9, 3, 3, 4, 6, 3, 6];
        const sections2 = [33, 13, 12, 28, 24, 19];

        // 각 구간의 합을 저장할 배열
        const sectionSums = [];

        // 구간별 합 계산
        let index = 0;
        sections.forEach(length => {
            const section = surveyResponses.slice(index, index + length);
            const sum = section.reduce((acc, val) => acc + Number(val), 0); // 각 구간의 합을 계산
            const avg = sum / length; // 각 구간의 평균을 계산
            const result = avg - 3; // 평균에서 3을 뺀 값
            sectionSums.push(result.toFixed(2));
            index += length;
        });
        
        let index1 = 0;
        sections2.forEach(length => {
            const section2 = surveyResponses.slice(index1, index1 + length);
            const sum = section2.reduce((acc, val) => acc + Number(val), 0); // 각 구간의 합을 계산
            const avg = sum / length; // 각 구간의 평균을 계산
            const result = avg - 3; // 평균에서 3을 뺀 값
            sectionSums.push(result.toFixed(2));
            index1 += length;
        });

        // 결과 저장
        sessionStorage.setItem('sectionSums', JSON.stringify(sectionSums));
        
        const sectionSum = sessionStorage.getItem('sectionSums');
        console.log(sectionSum);
// 서버로 데이터를 전송하는 함수
        function sendDataToServer(data, emailPrefix, sectionSums) {
            fetch('save_data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completeSurveyData: data, emailPrefix: emailPrefix, sectionSum: sectionSums  }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        // 데이터 전송
        sendDataToServer(completeSurveyData, emailPrefix, sectionSum);

        window.location.href = '../finishSurvey/finishSurvey.html'
    }
}
