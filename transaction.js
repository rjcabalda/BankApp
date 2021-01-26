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
let depositRow = document.querySelector('.depositeData')?.children;
let withdrawRow = document.querySelector('.withdrawData')?.children;
let transferRow = document.querySelector('.transferData')?.children;
let transferFocus = document.querySelectorAll('.transfer_title');
let state = true;

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
    return `₱${value}`;
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
function list_users() {
    return users;
}
function loadTable() {

    if (tbody !== null) {
        tbody.innerHTML = "";
        if (parseInt(list_users().length) === 0) tbody.innerHTML = "</tr><td class='noData'colspan='3'>No Data</td></tr>";

        for (let i = 0; i < list_users().length; i++) {
            let tr = "<tr class='dashboardRow'>";
            let full_name = list_users()[i].name;
            let amount = list_users()[i].amount;
            tr += "<td class='col1'>" + (i + 1) + "</td>" + "<td class='col2'>" + full_name + "</td>" + "<td class='col3'>" + get_balance(amount) + "</td></tr>";
            tbody.innerHTML += tr;
        }
    }
}
function deposit(user, amount) {
    let state = false;
    if (parseFloat(amount) > 0) {
        for (const account of users) {
            if (account.name.toLowerCase() === user.toLowerCase()) {
                account.amount = parseFloat(amount) + parseFloat(account.amount);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Acount deposited ' + get_balance(amount));
                state = true;
            }
        }
        loadTable();
        if (!state) alert('This Account is not registered.\nPlease input a valid account.');
    } else {
        alert('Invalid amount.');
    }


}
function withdraw(user, amount) {
    let state = false;
    let insufficient = false;
    if (parseFloat(amount) > 0) {
        for (const account of users) {

            if (account.name.toLowerCase() === user.toLowerCase()) {
                state = true;
                if (parseFloat(account.amount) < parseFloat(amount)) {
                    insufficient = true;
                } else {
                    account.amount = parseFloat(account.amount) - parseFloat(amount);
                    localStorage.setItem('users', JSON.stringify(users));
                    alert(user + ' withdrawn ' + get_balance(amount));
                }
            }
        }
        loadTable();
        if (!state) alert('This Account is not registered.\nPlease input a valid account.');
        if (insufficient) alert(user + ' has insufficient balance.');
    } else {
        alert('Invalid amount.');
    }
}
function send(from_user, to_user, amount) {
    let insufficient = false;
    let from_state = false;
    let to_state = false;
    let amount_error = false;
    let message1 = '';
    let message2 = '';
    for (const check of users) {
        if (check.name.toLowerCase() === from_user.toLowerCase()) from_state = true;
        if (check.name.toLowerCase() === to_user.toLowerCase()) to_state = true;
    }
    if (from_state && to_state) {
        for (const account of users) {
            if (parseFloat(amount) > 0) {
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
            else {
                amount_error = true;
            }
        }

        if (insufficient) {
            alert(from_user + ' has insufficient balance.');
        } else {
            if (amount_error) { alert('Invalid amount'); }
            else { alert(`${from_user} transferred ${get_balance(amount)} to ${to_user}`); }

        }

    } else {
        if (!from_state) message1 = 'Invalid sender';
        if (!to_state) message2 = 'Invalid receiver';
        alert(message1 + '\n' + message2);
    }

    loadTable();
    localStorage.setItem('users', JSON.stringify(users));
}
function getFirstname(fullname) {
    let n = fullname?.split(" ");
    let firstname = '';
    for (let i = 0; i < (n?.length - 1); i++) {
        firstname += ' ' + n[i];
    }
    return firstname.trim();
}
function clickFillDeposit(firstname, lastname) {
    let elements = depositForm.elements;
    elements.firstname.value = firstname;
    elements.lastname.value = lastname;
}
function clickFillWithdraw(firstname, lastname) {
    let elements = withdrawForm.elements;
    elements.firstname.value = firstname;
    elements.lastname.value = lastname;
}
function clickFillSender(firstname, lastname) {
    let elements = transferForm.elements;
    elements.sender_firstname.value = firstname;
    elements.sender_lastname.value = lastname;
}
function clickFillReceiver(firstname, lastname) {
    let elements = transferForm.elements;
    elements.receiver_firstname.value = firstname;
    elements.receiver_lastname.value = lastname;
}
depositBtn?.addEventListener('click', function () {

    if (depositForm.checkValidity()) {

        let elements = depositForm.elements;
        let user = {};
        for (let i = 0; i < elements.length; i++) {
            let item = elements.item(i);
            user[item.name] = item.value.trim();
        }

        user.fullname = function () {
            return this.firstname + ' ' + this.lastname;
        }
        if (stringFilter(user.fullname())) {
            deposit(user.fullname(), user.amount);
        }
        else {
            alert('Invalid input\nInput in first name and last name must letters only.')
        }
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
            user[item.name] = item.value.trim();
        }
        user.fullname = function () {
            return this.firstname + ' ' + this.lastname;
        }
        if (stringFilter(user.fullname())) {
            withdraw(user.fullname(), user.amount);
        }
        else {
            alert('Invalid input\nInput in first name and last name must letters only.')
        }

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
            user[item.name] = item.value.trim();
        }

        user.sender_fullname = function () {
            return this.sender_firstname + ' ' + this.sender_lastname;
        }
        user.receiver_fullname = function () {
            return this.receiver_firstname + ' ' + this.receiver_lastname;
        }
        if (stringFilter(user.sender_fullname()) && stringFilter(user.receiver_fullname())) {
            if (user.sender_fullname().toLowerCase() === user.receiver_fullname().toLowerCase()) {
                alert('The Same account. \nPlease input different Account.');
            }
            else {
                send(user.sender_fullname(), user.receiver_fullname(), user.sender_amount);
                loadTable();
            }
        }
        else {
            alert('Invalid input\nInput in first name and last name must letters only.')
        }

        transferFocus[0]?.classList.remove('transferFocus');
        transferFocus[1]?.classList.remove('transferFocus');

    }
    for (const input of inputs) {
        input.value = '';
    }

});

if (depositRow) {
    for (const row of depositRow) {
        row.addEventListener('click', function () {

            let fullname = row?.children[1]?.innerHTML;
            if (fullname) {
                let n = fullname?.split(" ");
                let firstname = getFirstname(fullname);
                let lastname = n[n?.length - 1];
                clickFillDeposit(firstname, lastname);
            }
        });
    }
}
if (withdrawRow) {
    for (const row of withdrawRow) {
        row.addEventListener('click', function () {
            let fullname = row?.children[1]?.innerHTML;
            if (fullname) {
                let n = fullname.split(" ");
                let firstname = getFirstname(fullname);
                let lastname = n[n.length - 1];
                clickFillWithdraw(firstname, lastname);
            }
        });
    }
}
if (transferRow) {
    let elements = transferForm.elements;
    for (const row of transferRow) {
        row.addEventListener('click', function () {
            let fullname = row?.children[1]?.innerHTML;
            if (fullname) {
                let n = fullname.split(" ");
                let firstname = getFirstname(fullname);
                let lastname = n[n.length - 1];
                if (state) {
                    clickFillSender(firstname, lastname);
                    transferFocus[1]?.classList.remove('transferFocus');
                    transferFocus[0]?.classList.add('transferFocus');

                }
                else {
                    clickFillReceiver(firstname, lastname);
                    transferFocus[1]?.classList.add('transferFocus');
                    transferFocus[0]?.classList.remove('transferFocus');
                }
            }
        });
    }

    for (const input of elements) {
        input.addEventListener('input', () => {
            transferFocus[0]?.classList.remove('transferFocus');
            transferFocus[1]?.classList.remove('transferFocus');
        });
    }
}

for (tranferBtn of transferFocus) {
    tranferBtn.addEventListener('click', function () {
        if (this.innerHTML == 'Sender') {
            transferFocus[0].classList.add('transferFocus');
            transferFocus[1].classList.remove('transferFocus');
            state = true
        }
        else if (this.innerHTML == 'Receiver') {
            state = false;
            transferFocus[1].classList.add('transferFocus');
            transferFocus[0].classList.remove('transferFocus');
        }

    });
}

