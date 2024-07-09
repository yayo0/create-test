document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출을 방지하여 페이지 새로 고침을 막음

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // 서버에서 반환된 데이터 확인
        if (data.success) {
            // username 값을 emailPrefix로 세션 스토리지에 저장
            sessionStorage.setItem('emailPrefix', username);
            window.location.href = data.redirect;
        } else {
            alert('로그인에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});