
function toggleMenu() { //onclick listener on toggle button(.toggle)
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');
    navigation.classList.toggle('active');
    toggle.classList.toggle('active');
}

let users = JSON.parse(localStorage.getItem('users'));
if (users === null) {
    users = [];
}
loadTable();


function create_user(user, balance) {
    let userObj = {
        name: user,
        amount: parseInt(balance)
    }
    users.push(userObj);
    localStorage.setItem('users', JSON.stringify(users));
}

let createForm = document.querySelector('.form');
let createBtn = document.getElementById('createBtn');
let inputs = document.querySelectorAll('.text');


createBtn.addEventListener('click', () => {
    
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
    } else {
        alert('please fill required field(s).');

    }
});
function loadTable() {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        let tr = "<tr>";
        let full_name = users[i].name;
        let amount = users[i].amount;
        tr += "<td>" + (i + 1) + "</td>" + "<td>" + full_name + "</td>" + "<td>₱ " + parseFloat(amount) + "</td></tr>";
        tbody.innerHTML += tr;
    }
}



