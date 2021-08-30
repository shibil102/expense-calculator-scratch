const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const selector = document.getElementById('selector');

const localStorageTransactions = JSON.parse(localStorage.getItem('transaction'));

let transactions = localStorage.getItem('transaction') !== null ? localStorageTransactions : [];

// Amount adding function


// Add transaction

const addTransaction = (e) => {
    e.preventDefault()

let value = '';

    if(selector.value === 'income'){
       value = `+${amount.value}`
    } else {
        value = `-${amount.value}`
    }
  

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount');
    } else {
        const transaction = {
id: generateID(),
text: text.value,
amount: +value,
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }

   
}

// Generate random ID

const generateID = () => {
    return Math.floor(Math.random() * 100000000)
}

// Add transaction to the DOM

const addTransactionDOM = (transaction) => {
// Get sign

let sign = selector.value === 'income' ? '+' : '-'


const item = document.createElement('li');

// Add class based on value
item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

item.innerHTML = `
${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="fas fa-times"></i></button>
`

list.appendChild(item)
}

// Init app

const init = () => {
    list.innerHTML = ''

    transactions.forEach(addTransactionDOM)
    updateValues()
}

// Update balance income and expense

const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount)

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)
    ;

    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2)
    ;

    balance.innerText = `₹${total}`;
    moneyPlus.innerText = `₹${income}`;
    moneyMinus.innerText = `₹${expense}`
}

// Remove transaction by ID

const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage()

    init()
}

// Update local storage transactions

const updateLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(transactions))
}

// Primary function call & event listeners

init()

form.addEventListener('submit', addTransaction)


