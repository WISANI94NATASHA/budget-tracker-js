// storing our transactions in an array

let transactions = [];
let nextId = 1;

function addTransaction() {
    // Get values from our form
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    // Validation Checks
    if (!description) {
        alert("please enter a description!");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("please enter a valid amount!");
        return;
    }

    // Transaction Object
    const transaction = {
        id: nextId++,
        description: description,
        amount: amount,
        type: type
    };


    // Adding to list at the top (transactions =[];)
    transactions.push(transaction);

    // Clear the form
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    // Update display summary screen


    // Update the summary
    updateSummary();
    // Update transactions on recent transaction list
    showTransactions();

}

function updateSummary() {
    let income = 0;
    let expense = 0;

    // Loop through our list transactions
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === "Income") {
            income += transactions[i].amount;
        } else {
            expense += transactions[i].amount;
        }
    }

    // Balance
    const balance = income - expense;

    // Update the display
    document.getElementById("totalIncome").textContent = "R" + income;
    document.getElementById("totalExpense").textContent = "R" + expense;

    const balanceElement = document.getElementById("balance");
    balanceElement.textContent = "R" + balance;

    if (balance < 0) {
        balanceElement.className = "amount balance negative";
    } else {
        balanceElement.className = "amount balance";
    }
}

function showTransactions() {
    const container = document.getElementById("transactionsList");

    // If we have no transactions
    if (transactions.length === 0) {
        container.innerHTML = `<div class="empty-message"><p>No transactions yet. Add one above!</p></div>`;
        return;
    }

    // Build html for our transactions
    let html = "";
    for (let i = transactions.length - 1; i >= 0; i--) {
        const t = transactions[i];

        html += `
            <div class="transaction ${t.type}-item">
                <div class="transaction-info">
                    <strong>${t.description}</strong>
                    <small>${t.type}</small>
                </div>
                <div class="transaction-amount ${t.type}">
                    ${t.type === "Income" ? "+" : "-"}R${t.amount}
                </div>
                <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
            </div>
        `;
    }

    container.innerHTML = html;
}

function deleteTransaction(id)  {
    // Find the specifici transaction using ID and  remove it
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === id) {
            transactions.splice(i, 1); 
            break;
        }
    }
    // Update the display
    updateSummary();
    showTransactions();
}

updateSummary();
showTransactions();
    