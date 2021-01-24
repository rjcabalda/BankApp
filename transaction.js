let depositForm = document.querySelector('.deposit_form');
let tbody = document.getElementById('tbody');
let users = JSON.parse(localStorage.getItem('users'));
let depositBtn = document.getElementById('save_deposit');
let tdata = document.querySelectorAll('table_data');
let inputs = document.querySelectorAll('.text');
let withdrawBtn = document.querySelector('.save_withdraw');
let withdrawForm = document.querySelector('.withdraw_form');
let transferForm = document.querySelector('.transfer_form');
let transferBtn = document.querySelector('.save_sender');
let side_btn = document.querySelectorAll('.side_btn');
let side_deposit = document.querySelector('.deposit');
let side_withdraw = document.querySelector('.withdraw');
let side_transfer = document.querySelector('.transfer');

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
function loadTable() {

    if (tbody !== null) {
        tbody.innerHTML = "";
        if (parseInt(users.length) === 0) tbody.innerHTML = "</tr><td class='noData'colspan='3'>No Data</td></tr>";

        for (let i = 0; i < users.length; i++) {
            let tr = "<tr class='table_data'>";
            let full_name = users[i].name;
            let amount = users[i].amount;
            tr += "<td class='col1'>" + (i + 1) + "</td>" + "<td class='col2'>" + full_name + "</td>" + "<td class='col3'>₱ " + amount.toFixed(2) + "</td></tr>";
            tbody.innerHTML += tr;
        }
    }
}
function deposit(user, amount) {
    let state = false;
    for (const account of users) {
        if (account.name.toLowerCase() === user.toLowerCase()) {
            account.amount = parseFloat(amount) + parseFloat(account.amount);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Acount deposited ' + amount);
            state = true;
        }
    }
    loadTable();
    if (!state) alert('This Account is not registered.\nPlease input a valid account.');

}
function withdraw(user, amount) {
    let state = false;
    let insufficient = false;
    for (const account of users) {

        if (account.name.toLowerCase() === user.toLowerCase()) {
            state = true;
            if (parseFloat(account.amount) < parseFloat(amount)) {
                insufficient = true;
            } else {
                account.amount = parseFloat(account.amount) - parseFloat(amount);
                localStorage.setItem('users', JSON.stringify(users));
                alert(user + ' withdrawn ₱' + amount);
            }
        }
    }
    loadTable();
    if (!state) alert('This Account is not registered.\nPlease input a valid account.');
    if (insufficient) alert(user + ' insufficient balance.');
}
function send(from_user, to_user, amount) {
    let insufficient = false;
    let from_state = false;
    let to_state = false;
    let message1 = '';
    let message2 = '';
    for (const check of users) {
        if (check.name.toLowerCase() === from_user.toLowerCase()) from_state = true;
        if (check.name.toLowerCase() === to_user.toLowerCase()) to_state = true;
    }
    if (from_state && to_state) {
        for (const account of users) {
            if (account.name.toLowerCase() === from_user.toLowerCase()) {
                state = true;
                if (parseFloat(account.amount) < parseFloat(amount)) {
                    insufficient = true;
                } else {
                    account.amount = parseFloat(account.amount) - parseFloat(amount);
                }
            }
            if (account.name.toLowerCase() === to_user.toLowerCase() && !insufficient) {
                account.amount = parseFloat(amount) + parseFloat(account.amount);
            }
        }
        alert(`Amount of ${amount} was transferred from ${from_user} to ${to_user}`);
    } else {
        if (!from_state) message1 = 'Invalid sender';
        if (!to_state) message2 = 'Invalid receiver';
        alert(message1 + '\n' + message2);
    }
    loadTable();
    localStorage.setItem('users', JSON.stringify(users));
}
depositBtn?.addEventListener('click', function () {

    if (depositForm.checkValidity()) {

        let elements = depositForm.elements;
        let user = {};
        for (let i = 0; i < elements.length; i++) {
            let item = elements.item(i);
            user[item.name] = item.value;
        }

        user.fullname = function () {
            return this.firstname + ' ' + this.lastname;
        }
        deposit(user.fullname(), user.amount);

        loadTable();

    }
    for (const input of inputs) {
        input.value = '';
    }

});

withdrawBtn?.addEventListener('click', function () {
    let elements = withdrawForm.elements;
    let user = {};
    if (withdrawForm.checkValidity()) {
        for (let i = 0; i < elements.length; i++) {
            let item = elements.item(i);
            user[item.name] = item.value;
        }
        user.fullname = function () {
            return this.firstname + ' ' + this.lastname;
        }
        withdraw(user.fullname(), user.amount);
        loadTable();
    }
    for (const input of inputs) {
        input.value = '';
    }
});

transferBtn?.addEventListener('click', function () {

    let elements = transferForm.elements;
    let user = {};
    if (transferForm.checkValidity()) {
        for (let i = 0; i < elements.length; i++) {
            let item = elements.item(i);
            user[item.name] = item.value;
        }

        user.sender_fullname = function () {
            return this.sender_firstname + ' ' + this.sender_lastname;
        }
        user.receiver_fullname = function () {
            return this.receiver_firstname + ' ' + this.receiver_lastname;
        }

        send(user.sender_fullname(), user.receiver_fullname(), user.sender_amount);

        loadTable();

    }
    for (const input of inputs) {
        input.value = '';
    }

});