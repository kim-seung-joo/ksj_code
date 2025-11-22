const loginForm = document.forms.loginForm;

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const id = document.getElementById('id').value;
  const pwd = document.getElementById('pwd').value;
  


  if(id === "" || pwd === "") {
    alert('아이디와 비밀번호 입력한지 확인해주세요.');
    return;
  }

  const userDataStr = localStorage.getItem(id);
  if (!userDataStr) {
    alert('존재하지 않는 아이디입니다.');
    return;
  }

  const userData = JSON.parse(userDataStr);

  if (pwd !== userData.pwd) {
    alert('비밀번호가 틀렸습니다.');
    return;
  }

  alert(userData.name + '님 로그인 성공 하셨어요~!');
  localStorage.setItem('loggedInUser', id);
  localStorage.setItem('loggedname', userData.name)
  location.href = "login_index.html";
});
