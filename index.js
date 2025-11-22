var btn = document.getElementById(".btn");
function login(){
    alert("로그인을 하지않으면 사용불가합니다.");
    alert("로그인페이지로 이동합니다.")
    setTimeout(function() {
        window.location.href = "login.html";
      });
}