const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('id').value;
  const pwd = document.getElementById('pwd').value;
  const name = document.getElementById('name').value;

  if (localStorage.getItem(id)) {
    alert('이미 존재하는 아이디입니다.');
    return;
  }

  if (name === "" || id === "" || pwd === "") {
    alert('모두 입력해주세요');
    return;
  }

  const userData = {
    id: id,
    pwd: pwd,
    name: name
  };

  localStorage.setItem(id, JSON.stringify(userData)); // JSON으로 저장

  alert('회원가입이 완료되었습니다.');
  location.href = "login.html";
});
