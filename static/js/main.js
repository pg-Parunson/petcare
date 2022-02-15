<!-- 로딩 즉시 호출 -->
$(document).ready(function () {
    show_myPetInfo()
    show_medicalInfo()
});

//유저 등록
function save_userInfo() {
    let userId = $('#inputId').val() //유저 ID
    let userNickname = $('#inputNickname').val() //유저 닉네임
    let userPassword = $('#inputPassword').val() //유저 비밀번호
    let passwordCheck = $('#passwordCheck').val() //유저 비밀번호

    //아이디 공백 체크
    if(userId == ""){
        alert('아이디를 입력해주세요.')
        return
    }
    //닉네임 공백 체크
    if(userNickname == ""){
        alert('닉네임을 입력해주세요.')
        return
    }
    //비밀번호 공백 체크
    if(userPassword == "" || passwordCheck ==""){
        alert('비밀번호를 입력해주세요.')
        return
    }
    //비밀번호 일치 체크
    if(userPassword != passwordCheck){
        alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.')
        return
    } else {
        $.ajax({
            type: 'POST',
            url: '/addMember',
            data: {
                userId_give: userId,
                userNickname_give: userNickname,
                userPassword_give: userPassword,
            },
            success: function (response) {
                alert(response['msg'])
                window.location.reload()
            }
        });
    }
}

//마이펫 정보 획득
function show_myPetInfo() {
    $('#myPetInfo').empty()

    $.ajax({
        type: 'GET',
        url: '/petInfo',
        data: {},
        success: function (response) {
            let petInfo = response['petInfo']
            for (let i = 0; i < petInfo.length; i++) {
                let index = i + 1;
                let petName = petInfo[i]['petName']
                let petBirth = petInfo[i]['petBirth']
                let breed = petInfo[i]['breed']
                switch (breed) {
                    case "mix":
                        breed = "믹스견";
                        break;
                    case "poodle":
                        breed = "푸들";
                        break;
                    case "maltese":
                        breed = "말티즈";
                        break;
                    case "shiba":
                        breed = "시바";
                        break;
                    case "jindo":
                        breed = "진돗개";
                        break;
                    case "pomeranian":
                        breed = "포메라니안";
                        break;
                }
                let petSex
                if (petInfo[i]['petSex'] == "male") {
                    petSex = "남아"
                } else {
                    petSex = "여아"
                }

                let neutering
                if (petInfo[i]['neutering'] == "y") {
                    neutering = "실시"
                } else {
                    neutering = "미실시"
                }
                let etc = petInfo[i]['etc']

                let temp_html = `<tr>
                                            <td>${index}</td>
                                            <td>${petName}</td>
                                            <td>${petBirth}</td>
                                            <td>${breed}</td>
                                            <td>${petSex}</td>
                                            <td>${neutering}</td>
                                            <td>${etc}</td>
                                        </tr>`

                $('#myPetInfo').append(temp_html)
            }
        }
    });
}

//마이펫 정보 등록
function save_petInfo() {
    let petName = $('#petName').val() //반려견 이름
    let petBirth = $('#petBirth').val() //생년월일
    let breed = $('#breed').val() //견종
    let petSex = $("[name=petSex]:checked").val() //성별
    let neuteringCheck = $('input:checkbox[id="neuteringCheck"]').is(":checked") == true ? "y" : "n" //중성화여부
    let etc = $('#etc').val() //특이사항

    //반려견 이름 공백 체크
    if(petName == ""){
        alert('반려견 이름을 입력해주세요.')
        return
    }
    //생년월일 공백 체크
    if(petBirth == ""){
        alert('생년월일을 입력해주세요.')
        return
    }
    $.ajax({
        type: 'POST',
        url: '/petInfo',
        data: {
            petName_give: petName,
            petBirth_give: petBirth,
            breed_give: breed,
            petSex_give: petSex,
            neuteringCheck_give: neuteringCheck,
            etc_give: etc
        },
        success: function (response) {
            alert(response['msg'])
            location.reload();
        }
    });
}

//진료 기록 획득
function show_medicalInfo() {
    $('#medicalInfo').empty()

    $.ajax({
        type: 'GET',
        url: '/medicalInfo',
        data: {},
        success: function (response) {
            let medicalInfo = response['medicalInfo']
            for (let i = 0; i < medicalInfo.length; i++) {
                let index = i + 1;
                let inoculationDate = medicalInfo[i]['inoculationDate']
                let treatmentType = medicalInfo[i]['treatmentType']
                switch (treatmentType) {
                    case "corona":
                        treatmentType = "코로나 장염";
                        break;
                    case "dhppl":
                        treatmentType = "종합백신";
                        break;
                    case "kc":
                        treatmentType = "켄넬코프";
                        break;
                    case "rv":
                        treatmentType = "광견병";
                        break;
                    case "ear":
                        treatmentType = "귓병";
                        break;
                    case "patella":
                        treatmentType = "슬개골";
                        break;
                    case "patella":
                        treatmentType = "슬개골";
                        break;
                    case "heartworm":
                        treatmentType = "심장사상충 예방";
                        break;
                    case "parasite":
                        treatmentType = "외부기생충 예방";
                        break;
                    case "de-sexing":
                        treatmentType = "중성화";
                        break;
                }
                let treatmentPeriodStart = medicalInfo[i]['treatmentPeriodStart']
                let treatmentPeriodEnd = medicalInfo[i]['treatmentPeriodEnd']
                let cost = medicalInfo[i]['cost']
                let treatmentHospital = medicalInfo[i]['treatmentHospital']
                let nextInoculationDate = new Date(inoculationDate)
                nextInoculationDate.setFullYear(nextInoculationDate.getFullYear() + 1)
                nextInoculationDate = getFormatDate(nextInoculationDate);

                let temp_html = `<tr>
                                            <td>${index}</td>
                                            <td>${inoculationDate}</td>
                                            <td>${treatmentType}</td>
                                            <td>${treatmentPeriodStart} ~ ${treatmentPeriodEnd}</td>
                                            <td>${cost}원</td>
                                            <td>${treatmentHospital}</td>
                                            <td>${nextInoculationDate}</td>
                                        </tr>`

                $('#medicalInfo').append(temp_html)
            }
        }
    });
}

//진료 기록 등록
function save_inoculation() {
    let inoculationDate = $('#inoculationDate').val() //접종일
    let treatmentType = $('#treatmentType').val() //진료내역
    let treatmentPeriodStart = $('#treatmentPeriodStart').val() //치료시작일
    let treatmentPeriodEnd = $('#treatmentPeriodEnd').val() //치료종료일
    let cost = $('#cost').val() //비용
    let treatmentHospital = $('#treatmentHospital').val() //진료병원

    if(inoculationDate == ""){
        alert('접종일을 입력해주세요.')
        return
    }
    if(treatmentPeriodStart, treatmentPeriodEnd == ""){
        alert('치료기간을 입력해주세요.')
        return
    }
    if(cost == ""){
        alert('진료비용을 입력해주세요.')
        return
    }
    if(treatmentHospital == ""){
        alert('진료병원을 입력해주세요.')
        return
    }
    $.ajax({
        type: 'POST',
        url: '/medicalInfo',
        data: {
            inoculationDate_give: inoculationDate,
            treatmentType_give: treatmentType,
            treatmentPeriodStart_give: treatmentPeriodStart,
            treatmentPeriodEnd_give: treatmentPeriodEnd,
            cost_give: cost,
            treatmentHospital_give: treatmentHospital
        },
        success: function (response) {
            alert(response['msg'])
            location.reload();
        }
    });
}

// yyyy-MM-dd 포멧으로 반환
function getFormatDate(date) {
    let year = date.getFullYear(); //yyyy
    let month = (1 + date.getMonth()); //M
    month = month >= 10 ? month : '0' + month; //month 두 자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두 자리로 저장

    return year + '-' + month + '-' + day;
}

// 로그인
function loginCheck() {
    const userId = $('#userId').val() //아이디
    const userPassword = $('#userPassword').val() //패스워드
}