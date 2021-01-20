

let createForm = document.querySelector('.form');
let createBtn = document.getElementById('createBtn');
let inputs = document.querySelectorAll('.text');
let users = JSON.parse(localStorage.getItem('users'));
let side_btn = document.querySelectorAll('.side_btn');
let dashboard = document.querySelector('.dashboard');
let create = document.querySelector('.createAccount');
// let deposit = document.getElementById('deposit');
// let withdraw = document.getElementById('withdraw');
// let transfer = document.getElementById('transfer');
// let users = [];

for (const btn of side_btn) {

    console.log(btn);
    btn.addEventListener('click', (e) => {
        console.log(btn.id);
        switch (btn.id) {
            case 'dashboard':
                dashboard.classList.remove('hide');
                create.classList.add('hide');
                break;
            case 'create':
                create.classList.remove('hide');
                dashboard.classList.add('hide');
                break;
            case 'deposit':
                break;
            case 'withdraw':
                break;
            case 'transfer':
                break;
        }

    });
}

if (users === null) {
    users = [];
}
if (loadTable());


function toggleMenu() { //onclick listener on toggle button(.toggle)
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');
    navigation.classList.toggle('active');
    toggle.classList.toggle('active');
}
function create_user(user, balance) {
    let userObj = {
        name: user,
        amount: parseFloat(balance)
    }
    let userStatus = true;
    for (const fullname of users) {
        if (fullname.name === user) userStatus = false;
    }
    if (userStatus) {
        users.push(userObj);
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        alert('User ' + user + ' already exist.');
    }

}
function loadTable() {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    if (parseInt(users.length) === 0) tbody.innerHTML = "</tr><td class='noData'colspan='3'>No Data</td></tr>";

    for (let i = 0; i < users.length; i++) {
        let tr = "<tr>";
        let full_name = users[i].name;
        let amount = users[i].amount;
        let balance = 0;

        if (parseInt(amount) > 0) balance = amount.toFixed(2);
        tr += "<td class='col1'>" + (i + 1) + "</td>" + "<td class='col2'>" + full_name + "</td>" + "<td class='col3'>₱ " + balance + "</td></tr>";

        tbody.innerHTML += tr;
    }
}

createBtn.addEventListener('click', () => {

    if (createForm.checkValidity()) {
        var elements = createForm.elements;
        var user = {};
        for (let i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            user[item.name] = item.value;
        }
        console.log(user);
        user.fullname = function () {
            return this.firstname + ' ' + this.lastname;
        }
        create_user(user.fullname(), user.amount);
        for (const input of inputs) {
            input.value = '';
        }
        loadTable();
    } else {
        alert('please fill required field(s).');

    }
});




