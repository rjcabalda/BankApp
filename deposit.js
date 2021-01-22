let depositForm = document.querySelector('.deposit_form');
let tbody = document.getElementById('tbody');
let users = JSON.parse(localStorage.getItem('users'));
let depositBtn = document.getElementById('save_deposit');
let tdata = document.querySelectorAll('table_data');
let inputs = document.querySelectorAll('.text');

if (users === null) {
    users = [];
}
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
            let balance = 0;
            console.log(amount);
            if (parseFloat(amount) > 0) balance = parseFloat(amount).toFixed(2);
            tr += "<td class='col1'>" + (i + 1) + "</td>" + "<td class='col2'>" + full_name + "</td>" + "<td class='col3'>₱ " + balance + "</td></tr>";

            tbody.innerHTML += tr;
        }
    }
}
loadTable();



function deposit(user, amount) {
    let state = false;
    for (const account of users) {

        if (account.name.toLowerCase() === user.toLowerCase()) {
            account.amount = parseFloat(amount) + parseFloat(account.amount);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Acount deposited ' + amount);
            state = true;
        }
        else {

        }

    }
    loadTable();
    if (!state) alert('This Account is not registered.\nPlease input a valid account.');

}

depositBtn.addEventListener('click', function () {

    if (depositForm.checkValidity()) {

        var elements = depositForm.elements;
        var user = {};
        for (let i = 0; i < elements.length; i++) {
            var item = elements.item(i);
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

