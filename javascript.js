
function toggleMenu() { //onclick listener on toggle button(.toggle)
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');
    navigation.classList.toggle('active');
    toggle.classList.toggle('active');
}
let users = [];

function create_user(user, balance) {
    let userObj = {
        name: user,
        amount: balance
    }
    users.push(userObj);
    console.log(users);
}

let createForm = document.querySelector('.form');
let createBtn = document.getElementById('createBtn');
let inputs = document.querySelectorAll('.text');


createBtn.addEventListener('click', () => {
    var elements = document.getElementById("form").elements;
    var user = {};
    for (let i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        user[item.name] = item.value;

    }
    for (const input of inputs) {
        // input.innerHTML = '';
        console.log(input);
    }
    user.fullname = function () {
        return this.firstname + ' ' + this.lastname;
    }
    create_user(user.fullname(), user.amount);
});