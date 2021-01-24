

let createForm = document.querySelector('.form');
let createBtn = document.getElementById('createBtn');
let inputs = document.querySelectorAll('.text');
let dashboard = document.querySelector('.dashboard');
let create = document.querySelector('.createAccount');
let users = JSON.parse(localStorage.getItem('users'));


window.addEventListener('load', (event) => {
    loadTable();
});
if (users === null) {
    users = [];
}

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
    if (balance === null || balance === undefined || balance === '') { userObj.amount = 0; }
    console.log(balance);
    let userStatus = true;
    for (const fullname of users) {
        if (fullname.name.toLowerCase() === user.toLowerCase()) userStatus = false;
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
    if (tbody !== null) {
        tbody.innerHTML = "";
        if (parseInt(users.length) === 0) tbody.innerHTML = "</tr><td class='noData'colspan='3'>No Data</td></tr>";

        for (let i = 0; i < users.length; i++) {
            let tr = "<tr>";
            let full_name = users[i].name;
            let amount = users[i].amount;
            // let balance = 0;

            // if (parseInt(amount) > 0) balance = parseFloat(amount).toFixed(2);
            tr += "<td class='col1'>" + (i + 1) + "</td>" + "<td class='col2'>" + full_name + "</td>" + "<td class='col3'>₱ " + amount.toFixed(2) + "</td></tr>";

            tbody.innerHTML += tr;
        }
    }
}

createBtn?.addEventListener('click', () => {

    if (createForm.checkValidity()) {
        var elements = createForm.elements;
        var user = {};
        for (let i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            user[item.name] = item.value;
        }
        user.fullname = function () {
            return this.firstname + ' ' + this.lastname;
        }
        create_user(user.fullname(), user.amount);
        for (const input of inputs) {
            input.value = '';
        }
        loadTable();
    }
});





