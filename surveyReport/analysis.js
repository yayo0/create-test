const dataresults = {};

function evaluateScore(score) {
    if (score > 1.2) {
        return '높은 발달';
    } else if (score >= 0.7) {
        return '안정적 발달';
    } else if (score >= -0.7) {
        return '평균적 발달';
    } else if (score >= -1.2) {
        return '새싹 발달';
    } else {
        return '잠재적 발달';
    }
}

function chooseSector(key){
    if(['Z업무기술', 'Z메타인지', 'Z스트레스조절'].includes(key)) return '인지영역';
    else if(['Z가족관계', 'Z인정추구', 'Z대인관계'].includes(key)) return '관계영역';
    else if(['Z정리정돈', 'Z업무공간', 'Z업무도구', 'Z경제적 자원'].includes(key)) return '환경영역';
    else if(['Z조절능력', 'Z능동적 태도', 'Z업무수행력', 'Z방해지연행동조절', 'Z휴대전화사용조절'].includes(key)) return '행동영역';
    else if(['Z긍정적 적응성', 'Z회복탄력성', 'Z실행가능', 'Z자기조절능력'].includes(key)) return '기질영역';
    else if(['Z정서자각능력', 'Z정서처리방식', 'Z정서조절능력', 'Z자기평가'].includes(key)) return '정서영역';
    else return ;
    
}

// chooseSector에서 사용하는 키들 정의
const keys = [
    'Z업무기술', 'Z메타인지', 'Z스트레스조절', 
    'Z가족관계', 'Z인정추구', 'Z대인관계',
    'Z정리정돈', 'Z업무공간', 'Z업무도구', 'Z경제적 자원',
    'Z조절능력', 'Z능동적 태도', 'Z업무수행력', 'Z방해지연행동조절', 'Z휴대전화사용조절',
    'Z긍정적 적응성', 'Z회복탄력성', 'Z실행가능', 'Z자기조절능력',
    'Z정서자각능력', 'Z정서처리방식', 'Z정서조절능력', 'Z자기평가', 
    'Zc인지', 'ZR관계', 'ZE환경', 'ZA행동', 'Z기질2', 'Ze정서'
];

let reportData = sessionStorage.getItem('reportData');
reportData = reportData ? JSON.parse(reportData) : [];

if (reportData.length === 0) {
    console.error("reportData is empty or not found in sessionStorage");
}

//reportData를 키에 매핑하여 객체 생성
let datanum = {};
keys.forEach((key, index) => {
    datanum[key] = reportData[index];
});

for (let key in datanum) {
    console.log(key);
    dataresults[key] = evaluateScore(datanum[key]);
}

//최대키, 최소키를 찾기 위한 데이터.
let datanum2 = {};
keys.slice(0, -6).forEach(key => {
    datanum2[key] = datanum[key];
});

let maxKey = Object.keys(datanum2).reduce((a, b) => datanum2[a] > datanum2[b] ? a : b);
let minKey = Object.keys(datanum2).reduce((a, b) => datanum2[a] < datanum2[b] ? a : b);

document.getElementById('maxkey').textContent = maxKey.slice(1);
document.getElementById('maxkey2').textContent = maxKey.slice(1);
document.getElementById('maxkeys').textContent = chooseSector(maxKey);
document.getElementById('maxkeys2').textContent = chooseSector(maxKey);


document.getElementById('minkey').textContent = minKey.slice(1);
document.getElementById('minkey2').textContent = minKey.slice(1);
document.getElementById('minkeys').textContent = chooseSector(minKey);
document.getElementById('minkeys2').textContent = chooseSector(minKey);

function sectortext(sector){
    if(sector=='Z업무기술') return `업무를 위해 필요한 실제적인 기술, 집중하기 위해 필요한 조건을 알고, 집중하는 능력, 업무과정에서 정보를 받아들이고 이해하는 데 필요한 조절능력, 능률적인
    업무를 위해 적절한 필기방법과 조절능력의 수준`;
    else if(sector=='Z메타인지') return `업무과정에서 계획수립, 실천을 위한 조절능력적 사고능력, 자신의 수행과정을 관리감독하고 결과를 예측하며 오류나 실수를 점검하고 인지할 수 있는 상위인지능력`;
    else if(sector=='Z스트레스조절') return `업무에서 경험하는 업무 및 업무수행과정에 대한 심리적인 압박감과 스트레스를 조절할 수 있는 능력`;
    
    else if(sector=='Z가족관계') return `가족간의 관계에서 자녀가 느끼는 1) 가족의 정서적 지원, 2) 고민을 가족에게 알리고 도움을 요청하는 것에 대한 심리적 수월성, 3) 자신의 어려움에
    대한 가족들의 이해도, 4) 어려움이 있을때 가족들에게 의지할수 있다는 신뢰감, 5) 가족간의 친밀도`;
    else if(sector=='Z인정추구') return '가족, 주변사람들과의 관계에서 1) 기대에 미치지 못할 것에 대한 두려움 2) 기대에 부응하고자 하는 욕구 3) 타인에게 인정받고자 하는 인정동기';
    else if(sector=='Z대인관계') return '친구와의 관계에서 1) 고민들 개방할 수 있는 심리적으로 가깝고 편안한 대인관계 2) 대인관계에 대한 평가 3) 타인에 대한 신뢰감';

    else if(sector=='Z정리정돈') return '업무를 위해 주변공간이 효율적으로 정리되어 있는지 확인하는 항목';
    else if(sector=='Z업무공간') return '업무공간이 적절하게 구성되어 있는지 확인하는 항목';
    else if(sector=='Z업무도구') return '업무에 필요한 업무도구들이 준비되어 있는지 확인하는 항목';
    else if(sector=='Z경제적 자원') return '업무에 도움이 되는 교육자원의 가용성을 확인하는 항목';

    else if(sector=='Z조절능력') return '업무과정에서 계획수립, 수행과정에서의 조절과 대처능력과 같이 스스로 업무수행을 조절하는 능력';
    else if(sector=='Z능동적 태도') return '업무과정에서의 자기주도적이고 능동적인 업무능동적 태도';
    else if(sector=='Z업무수행력') return '업무에서 실제로 업무를 실천하는 역량';
    else if(sector=='Z방해지연행동조절') return '업무수행을 막는 방해 및 지연행동';
    else if(sector=='Z휴대전화사용조절') return '업무과정에서 인지효율을 높이는 방식으로 적절하게 휴대전화사용을 조절하는 능력';

    else if(sector=='Z긍정적 적응성') return '타고난 기질적인 특성 중에서 귀하가 가지고 있는 긍정적인 심리적 자본';
    else if(sector=='Z회복탄력성') return '좌절과 실패, 어려움에 직면하여 극복하는 회복탄력성';
    else if(sector=='Z실행가능') return '업무과정에서 주의 집중력과 실행과정에서의 방해요인을 통제하는 조절능력';
    else if(sector=='Z자기조절능력') return '업무과정에서 목표달성을 위한 인내력과 성찰능력, 조절능력적 대응능력';
    
    else if(sector=='Z정서자각능력') return '자신과 타인의 감정을 알아차리고 인식하며 이해하는 역량';
    else if(sector=='Z정서처리방식') return '업무과정에서 경험할 수 있는 정서적인 어려움을 성숙하고 긍정적이며 업무에 도움이 되는 방식으로 처리할 수 있는 능력';
    else if(sector=='Z정서조절능력') return '다양한 상황에서 자신의 감정을 관리하고 조절하며 스트레스 상황에서 적절하게 대처하는 능력';
    else if(sector=='Z자기평가') return '스스로에 대한 효능감, 존중 정도, 만족감';


}

document.getElementById('maxtrait').textContent = sectortext(maxKey);
document.getElementById('mintrait').textContent = sectortext(minKey);

/*let minKeyElement =document.getElementsByClassName('minkey')[0];
minKeyElement.textcontent = minKey;

let maxKeySElement = document.getElementsByClassName('maxsector')[0];
maxKeySElement.textContent = chooseSector(maxKey);

let minKeySElement = document.getElementsByClassName('minsector')[0];
minKeySElement.textContent = chooseSector(minKey);*/


document.getElementById('z1').textContent = datanum['Z업무기술'];
document.getElementById('z2').textContent = datanum['Z메타인지'];
document.getElementById('z3').textContent = datanum['Z스트레스조절'];
document.getElementById('z4').textContent = datanum['Z가족관계'];
document.getElementById('z5').textContent = datanum['Z인정추구'];
document.getElementById('z6').textContent = datanum['Z대인관계'];
document.getElementById('z7').textContent = datanum['Z정리정돈'];
document.getElementById('z8').textContent = datanum['Z업무공간'];
document.getElementById('z9').textContent = datanum['Z업무도구'];
document.getElementById('z10').textContent = datanum['Z경제적 자원'];
document.getElementById('z11').textContent = datanum['Z조절능력'];
document.getElementById('z12').textContent = datanum['Z능동적 태도'];
document.getElementById('z13').textContent = datanum['Z업무수행력'];
document.getElementById('z14').textContent = datanum['Z방해지연행동조절'];
document.getElementById('z15').textContent = datanum['Z휴대전화사용조절'];
document.getElementById('z16').textContent = datanum['Z긍정적 적응성'];
document.getElementById('z17').textContent = datanum['Z회복탄력성'];
document.getElementById('z18').textContent = datanum['Z실행가능'];
document.getElementById('z19').textContent = datanum['Z자기조절능력'];
document.getElementById('z20').textContent = datanum['Z정서자각능력'];
document.getElementById('z21').textContent = datanum['Z정서처리방식'];
document.getElementById('z22').textContent = datanum['Z정서조절능력'];
document.getElementById('z23').textContent = datanum['Z자기평가'];

document.getElementById('zs1').textContent = dataresults['Z업무기술'];
document.getElementById('zs2').textContent = dataresults['Z메타인지'];
document.getElementById('zs3').textContent = dataresults['Z스트레스조절'];
document.getElementById('zs4').textContent = dataresults['Z가족관계'];
document.getElementById('zs5').textContent = dataresults['Z인정추구'];
document.getElementById('zs6').textContent = dataresults['Z대인관계'];
document.getElementById('zs7').textContent = dataresults['Z정리정돈'];
document.getElementById('zs8').textContent = dataresults['Z업무공간'];
document.getElementById('zs9').textContent = dataresults['Z업무도구'];
document.getElementById('zs10').textContent = dataresults['Z경제적 자원'];
document.getElementById('zs11').textContent = dataresults['Z조절능력'];
document.getElementById('zs12').textContent = dataresults['Z능동적 태도'];
document.getElementById('zs13').textContent = dataresults['Z업무수행력'];
document.getElementById('zs14').textContent = dataresults['Z방해지연행동조절'];
document.getElementById('zs15').textContent = dataresults['Z휴대전화사용조절'];
document.getElementById('zs16').textContent = dataresults['Z긍정적 적응성'];
document.getElementById('zs17').textContent = dataresults['Z회복탄력성'];
document.getElementById('zs18').textContent = dataresults['Z실행가능'];
document.getElementById('zs19').textContent = dataresults['Z자기조절능력'];
document.getElementById('zs20').textContent = dataresults['Z정서자각능력'];
document.getElementById('zs21').textContent = dataresults['Z정서처리방식'];
document.getElementById('zs22').textContent = dataresults['Z정서조절능력'];
document.getElementById('zs23').textContent = dataresults['Z자기평가'];

document.getElementById('d1').textContent = datanum['Z업무기술'];
document.getElementById('d2').textContent = datanum['Z메타인지'];
document.getElementById('d3').textContent = datanum['Z스트레스조절'];
document.getElementById('d4').textContent = datanum['Z가족관계'];
document.getElementById('d5').textContent = datanum['Z인정추구'];
document.getElementById('d6').textContent = datanum['Z대인관계'];

document.getElementById('d7').textContent = datanum['Z정리정돈'];
document.getElementById('d8').textContent = datanum['Z업무공간'];
document.getElementById('d9').textContent = datanum['Z업무도구'];
document.getElementById('d10').textContent = datanum['Z경제적 자원'];

document.getElementById('d11').textContent = datanum['Z조절능력'];
document.getElementById('d12').textContent = datanum['Z능동적 태도'];
document.getElementById('d13').textContent = datanum['Z업무수행력'];
document.getElementById('d14').textContent = datanum['Z방해지연행동조절'];
document.getElementById('d15').textContent = datanum['Z휴대전화사용조절'];

document.getElementById('d16').textContent = datanum['Z긍정적 적응성'];
document.getElementById('d17').textContent = datanum['Z회복탄력성'];
document.getElementById('d18').textContent = datanum['Z실행가능'];
document.getElementById('d19').textContent = datanum['Z자기조절능력'];

document.getElementById('d20').textContent = datanum['Z정서자각능력'];
document.getElementById('d21').textContent = datanum['Z정서처리방식'];
document.getElementById('d22').textContent = datanum['Z정서조절능력'];
document.getElementById('d23').textContent = datanum['Z자기평가'];


const data = {
    labels: ['Zc인지', 'ZR관계', 'ZE환경', 'ZA행동', 'Z기질2', 'Ze정서'],
    datasets: [{
        label: '종합수치',
        data: [
            datanum['Zc인지'],
            datanum['ZR관계'],
            datanum['ZE환경'],
            datanum['ZA행동'],
            datanum['Z기질2'],
            datanum['Ze정서'],
        ],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]

};


const data1 = {
    labels: ['Z업무기술', 'Z메타인지', 'Z스트레스조절', 'Zc인지', 'Z가족관계', 'Z인정추구', 'Z대인관계', 'ZR관계', 'Z정리정돈', 'Z업무공간',
        'Z업무도구', 'Z경제적 자원', 'ZE환경', 'Z조절능력', 'Z능동적 태도', 'Z업무수행력', 'Z방해지연행동조절', 'Z휴대전화사용조절', 'ZA행동', 'Z긍정적 적응성', 'Z회복탄력성', 'Z실행가능', 'Z자기조절능력',
        'Z기질2', 'Z정서자각능력', 'Z정서처리방식', 'Z정서조절능력', 'Z자기평가', 'Ze정서'],
    datasets: [{
        label: '하위요인(23개)',
        data: [
            datanum['Z업무기술'],
            datanum['Z메타인지'],
            datanum['Z스트레스조절'],
            datanum['Zc인지'],
            datanum['Z가족관계'],
            datanum['Z인정추구'],
            datanum['Z대인관계'],
            datanum['ZR관계'],
            datanum['Z정리정돈'],
            datanum['Z업무공간'],
            datanum['Z업무도구'],
            datanum['Z경제적 자원'],
            datanum['ZE환경'],
            datanum['Z조절능력'],
            datanum['Z능동적 태도'],
            datanum['Z업무수행력'],
            datanum['Z방해지연행동조절'],
            datanum['Z휴대전화사용조절'],
            datanum['ZA행동'],
            datanum['Z긍정적 적응성'],
            datanum['Z회복탄력성'],
            datanum['Z실행가능'],
            datanum['Z자기조절능력'],
            datanum['Z기질2'],
            datanum['Z정서자각능력'],
            datanum['Z정서처리방식'],
            datanum['Z정서조절능력'],
            datanum['Z자기평가'],
            datanum['Ze정서'],
        ],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        barPercentage: 0.5
    }]

};

let nameData = sessionStorage.getItem('emailPrefix');
const header_name = document.getElementById('name');
header_name.textContent = nameData+' 님';

const ctx0 = document.getElementById('radar-chart').getContext('2d');
const myChart0 = new Chart(ctx0, {
    type: 'radar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '요인(6개)',
                color: '#333',
                font: {
                    size: 20
                }
            },
            datalabels: {
                align: 'end',
                anchor: 'end',
                color: '#555',
                formatter: function (value, context) {
                    return value; // 소수점 두 자리까지
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});


const ctx1 = document.getElementById('bar-chart').getContext('2d');
const redIndex = [3, 7, 12, 18, 23, 28];
const backgroundColors = data1.datasets[0].data.map((value, index) =>
    redIndex.includes(index) ? 'red' : 'darkblue'
);
data1.datasets[0].backgroundColor = backgroundColors;
const myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: data1,
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    autoSkip: false, // 필요하면 자동으로 레이블 건너뛰기
                    maxRotation: 80, // 레이블 회전 없음
                    minRotation: 80
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '하위요인(23개)',
                color: '#333',
                font: {
                    size: 20
                }
            },
            datalabels: {
                align: 'end',
                anchor: 'end',
                color: '#555',
                formatter: function (value, context) {
                    return value; // 소수점 두 자리까지
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});


document.getElementById('logout').addEventListener('click', () => {
    if (confirm('로그아웃 하시겠습니까?')) {
        sessionStorage.clear();
        location.href = "../login/login.html";
    }
})
export { dataresults };