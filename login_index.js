let loggedInUser = null;
let todoKey = null;
let todos = [];

window.addEventListener('load', function() {

    loggedInUser = localStorage.getItem('loggedInUser');
    loggedpwd = localStorage.getItem('loggedpwd');
    loggedname = localStorage.getItem('loggedname');
    
    if (!loggedInUser) {
        alert('로그인 후 접근하세요.');
        location.href = 'login.html';
        return;
    }
    const idElem = document.getElementById('id'); // id 표시 
    const pwdElem = document.getElementById('pwd'); // pwd 표시
    const nameElem = document.getElementById('name'); // name 표시
    
        
    idElem.textContent = '아이디 : ' + loggedInUser;
    nameElem.textContent = loggedname + '님의 todolist';
    

    todoKey = `todos_${loggedInUser}_${loggedpwd}_${loggedname}`;
    todos = JSON.parse(localStorage.getItem(todoKey)) || [];
    renderTodos();
    }
);
function renderTodos() {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="del" data-index="${index}">삭제</span>
            <label>${todo.task}</label>     
        `;
        //<input type="checkbox" data-index="${index}" ${todo.done ? 'checked' : ''}> 
        ul.appendChild(li);
    });
}

function logout() {
    if(confirm("로그아웃을 하시겠습니까?") ==true){
    localStorage.removeItem('loggedInUser');
    location.href = 'login.html';
    alert("로그아웃이 왼료되었어요.");
    }else{
        alert("로그아웃이 취소되었어요");
        return false;
    
    }

  }
init();
function init(){
    document.querySelector('form').addEventListener('submit', addToDo);
    document.querySelector('ul').addEventListener('click', deleteToDo);
    document.getElementById('clear').addEventListener('click', clearTodoList);
    document.deleteOrCheck('del').addEventListener('click', deleteOrCheck);
    document.querySelector('ul').addEventListener('click',deleteOrCheck);
}

function deleteOrCheck(e){
    if(e.target.className == 'del'){
        deleteToDo(e); 
    } else if (e.target.type === 'checkbox') {
        checkToDo(e);
    }
}
function deleteToDo(e){
    
    if(confirm("해당 글을 삭제하시겠습니까?") == true){
    const index = e.target.dataset.index;
    todos.splice(index, 1);
    localStorage.setItem(todoKey, JSON.stringify(todos));
    renderTodos();
    console.log(loggedInUser,"글 제거됨:");

    }else{
        alert('글 삭제를 취소했습니다.')
    }
    
}

function clearTodoList() {
    if (todos.length > 0) {
        if (confirm('정말 전체 글을 삭제하시겠습니까?')) {
            todos = [];
            localStorage.setItem(todoKey, JSON.stringify(todos));
            renderTodos();
            alert('전체 글을 삭제했습니다.');
        }
    } else {
        alert('삭제할 글이 없습니다.');
    }
}



function addToDo(e){ //새로운 리스트 추가
    e.preventDefault();
    let toDoValue = document.querySelector('input');
    if(toDoValue.value !== ''){ 
        //입력창이 비워있으면 추가가 안되게끔
        addTask(toDoValue.value);
        toDoValue.value = ''; //입력창 비워주기
    }else{
        alert("아무것도 입력하지 않았어요.");
    }
}
function addTask(value) {
    
    todos.push({
        task: value,
        done: false
    });
    console.log(loggedInUser,"글 추가됨:", value);
 
    localStorage.setItem(todoKey, JSON.stringify(todos));
    renderTodos();
}

