<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Virtual Banking Simulation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .accounts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        .account {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
        }
        .account h3 {
            margin: 0 0 10px 0;
            color: #495057;
        }
        .balance {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
        }
        .transaction-form {
            background: #e3f2fd;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #0056b3;
        }
        .transaction-history {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            max-height: 300px;
            overflow-y: auto;
        }
        .transaction {
            padding: 10px;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            justify-content: space-between;
        }
        .transaction:last-child {
            border-bottom: none;
        }
        .amount-positive {
            color: #28a745;
        }
        .amount-negative {
            color: #dc3545;
        }
        .error {
            color: #dc3545;
            margin-top: 10px;
            padding: 10px;
            background: #f8d7da;
            border-radius: 4px;
        }
        .success {
            color: #155724;
            margin-top: 10px;
            padding: 10px;
            background: #d4edda;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏦 Virtual Banking System</h1>
        
        <div class="accounts">
            <div class="account">
                <h3>Account A (Alice)</h3>
                <div class="balance" id="balanceA">$1000.00</div>
            </div>
            <div class="account">
                <h3>Account B (Bob)</h3>
                <div class="balance" id="balanceB">$500.00</div>
            </div>
        </div>

        <div class="transaction-form">
            <h3>💸 Make a Transaction</h3>
            <div class="form-group">
                <label for="fromAccount">From Account:</label>
                <select id="fromAccount">
                    <option value="A">Account A (Alice)</option>
                    <option value="B">Account B (Bob)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="toAccount">To Account:</label>
                <select id="toAccount">
                    <option value="B">Account B (Bob)</option>
                    <option value="A">Account A (Alice)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="amount">Amount ($):</label>
                <input type="number" id="amount" placeholder="0.00" step="0.01" min="0">
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" id="description" placeholder="Payment for...">
            </div>
            <button onclick="processTransaction()">Send Money</button>
            <div id="message"></div>
        </div>

        <div class="transaction-history">
            <h3>📊 Transaction History</h3>
            <div id="history"></div>
        </div>
    </div>

    <script>
        // Virtual bank accounts
        let accounts = {
            A: { name: "Alice", balance: 1000.00 },
            B: { name: "Bob", balance: 500.00 }
        };

        let transactionHistory = [];
        let transactionId = 1;

        function updateDisplay() {
            document.getElementById('balanceA').textContent = `$${accounts.A.balance.toFixed(2)}`;
            document.getElementById('balanceB').textContent = `$${accounts.B.balance.toFixed(2)}`;
            
            // Update dropdown options
            const fromSelect = document.getElementById('fromAccount');
            const toSelect = document.getElementById('toAccount');
            
            fromSelect.onchange = function() {
                const fromValue = this.value;
                toSelect.innerHTML = '';
                for (let acc in accounts) {
                    if (acc !== fromValue) {
                        toSelect.innerHTML += `<option value="${acc}">Account ${acc} (${accounts[acc].name})</option>`;
                    }
                }
            };
        }

        function processTransaction() {
            const from = document.getElementById('fromAccount').value;
            const to = document.getElementById('toAccount').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const description = document.getElementById('description').value || 'Transfer';
            const messageDiv = document.getElementById('message');

            // Validation
            if (!amount || amount <= 0) {
                showMessage('Please enter a valid amount', 'error');
                return;
            }

            if (from === to) {
                showMessage('Cannot transfer to the same account', 'error');
                return;
            }

            if (accounts[from].balance < amount) {
                showMessage('Insufficient funds', 'error');
                return;
            }

            // Process transaction
            accounts[from].balance -= amount;
            accounts[to].balance += amount;

            // Record transaction
            const transaction = {
                id: transactionId++,
                from: from,
                to: to,
                amount: amount,
                description: description,
                timestamp: new Date().toLocaleString(),
                hash: generateTransactionHash(from, to, amount, Date.now())
            };

            transactionHistory.unshift(transaction);
            updateDisplay();
            updateHistory();
            clearForm();
            showMessage(`Transaction successful! Sent $${amount.toFixed(2)} from ${accounts[from].name} to ${accounts[to].name}`, 'success');
        }

        function generateTransactionHash(from, to, amount, timestamp) {
            // Simple hash simulation (in real systems, this would be cryptographically secure)
            const data = `${from}${to}${amount}${timestamp}`;
            let hash = 0;
            for (let i = 0; i < data.length; i++) {
                const char = data.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return Math.abs(hash).toString(16).padStart(8, '0');
        }

        function updateHistory() {
            const historyDiv = document.getElementById('history');
            historyDiv.innerHTML = '';

            if (transactionHistory.length === 0) {
                historyDiv.innerHTML = '<p>No transactions yet</p>';
                return;
            }

            transactionHistory.forEach(transaction => {
                const transactionDiv = document.createElement('div');
                transactionDiv.className = 'transaction';
                transactionDiv.innerHTML = `
                    <div>
                        <strong>${accounts[transaction.from].name} → ${accounts[transaction.to].name}</strong><br>
                        <small>${transaction.description} | ${transaction.timestamp}</small><br>
                        <small>Hash: ${transaction.hash}</small>
                    </div>
                    <div class="amount-negative">-$${transaction.amount.toFixed(2)}</div>
                `;
                historyDiv.appendChild(transactionDiv);
            });
        }

        function showMessage(text, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = text;
            messageDiv.className = type;
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = '';
            }, 3000);
        }

        function clearForm() {
            document.getElementById('amount').value = '';
            document.getElementById('description').value = '';
        }

        // Initialize
        updateDisplay();
        updateHistory();

        // Set up initial dropdown state
        document.getElementById('fromAccount').dispatchEvent(new Event('change'));
    </script>
</body>
</html>
