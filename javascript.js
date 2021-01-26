

let createForm = document.querySelector('.form');
let createBtn = document.getElementById('createBtn');
let inputs = document.querySelectorAll('.text');
let dashboard = document.querySelector('.dashboard');
let create = document.querySelector('.createAccount');
let users = JSON.parse(localStorage.getItem('users'));
let tbody = document.getElementById('tbody');

if (users === null) {
    users = [];
}
loadTable();
function toggleMenu() { //onclick listener on toggle button(.toggle)
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');
    navigation.classList.toggle('active');
    toggle.classList.toggle('active');
}
function get_balance(user) {
    let value = Number(parseFloat(user).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
    });
    return `₱${value}`;;
}
function list_users() {
    return users;
}
function loadTable() {
    if (tbody !== null) {
        tbody.innerHTML = "";
        if (parseInt(list_users()?.length) === 0) tbody.innerHTML = "</tr><td class='noData'colspan='3'>No Data</td></tr>";
        for (let i = 0; i < list_users()?.length; i++) {
            let tr = "<tr class='dashboardRow'>";
            let full_name = list_users()[i].name;
            let amount = list_users()[i].amount;
            tr += "<td class='col1'>" + (i + 1) + "</td>" + "<td class='col2'>" + full_name + "</td>" + "<td class='col3'>" + get_balance(amount) + "</td><td class='col4'><div class='deleteBtn'><i class='fa fa-trash-o' style='color:white;' aria-hidden='true'></i></div></td></tr>";
            tbody.innerHTML += tr;
        }
    }
}




function stringFilter(str) {
    let arrStr = str.split('');
    let state = true;
    let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    for (const [i, findspace] of arrStr.entries()) {
        if (findspace === " ") arrStr.splice(i, 1);
    }
    for (const letter of arrStr) {
        if (!isNaN(letter) || format.test(str)) { state = false; }

    }
    return state;

}
function create_user(user, balance) {
    let userObj = {
        name: user,
        amount: parseFloat(balance)
    }
    if (balance === null || balance === undefined || balance === '') { userObj.amount = 0; }
    let userStatus = true;
    for (const fullname of users) {
        if (fullname.name.toLowerCase() === user.toLowerCase()) userStatus = false;
    }
    if (userStatus) {
        users.push(userObj);
        localStorage.setItem('users', JSON.stringify(users));
        alert(`${user} successfully created an account.`);
    } else {
        alert(`User ${user} already exist.`);
    }

}
function deleteAccount(user) {
    for (const [i, fullname] of users.entries()) {
        if (fullname.name.toLowerCase() === user.toLowerCase()) {
            users.splice(i, 1);
        }
    }
    localStorage.setItem('users', JSON.stringify(users));

}
function createSubmit() {


    if (createForm.checkValidity()) {
        var elements = createForm.elements;
        var user = {};
        for (let i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            user[item.name] = item.value.trim();
        }
        user.fullname = function () {
            return this.firstname + ' ' + this.lastname;
        }
        if (stringFilter(user.fullname())) {
            if (parseFloat(user.amount) > 0) {
                create_user(user.fullname(), user.amount);
            }
            else {
                alert('Invalid amount.');
            }

        }
        else {
            alert('Invalid input\nInput in first name and last name must letters only.')
        }


        for (let i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            item.value = '';
        }
        loadTable();
    }
    return false;

}


if (tbody?.children) {// ------------------delete User function Button--------------------
    let deleteButtons = document.querySelectorAll('.deleteBtn');
    for (const deleteBtn of deleteButtons) {
        deleteBtn.addEventListener('click', () => {
            let user = deleteBtn.parentNode.parentNode.children[1].innerHTML;
            let confirmDelete = confirm(`Are you sure you want to delete the accout of ${user}`);
            if (confirmDelete) {
                deleteAccount(user);
                loadTable();
                location.reload();
            }

        });

    }
}









