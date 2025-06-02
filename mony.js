<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment API Integration Demo</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 30px;
            color: #856404;
        }
        .api-section {
            margin-bottom: 40px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 25px;
        }
        .api-section h2 {
            color: #444;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #555;
        }
        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            box-sizing: border-box;
            font-size: 14px;
        }
        input:focus, select:focus, textarea:focus {
            border-color: #007bff;
            outline: none;
        }
        button {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background 0.3s;
        }
        button:hover {
            background: #0056b3;
        }
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        .demo-button {
            background: #28a745;
        }
        .demo-button:hover {
            background: #1e7e34;
        }
        .result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
        }
        .success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        .info {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
        }
        .code-block {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 15px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .tab-container {
            margin-bottom: 20px;
        }
        .tabs {
            display: flex;
            border-bottom: 2px solid #e0e0e0;
        }
        .tab {
            padding: 12px 24px;
            cursor: pointer;
            border: none;
            background: #f8f9fa;
            margin-right: 5px;
            border-radius: 6px 6px 0 0;
        }
        .tab.active {
            background: #007bff;
            color: white;
        }
        .tab-content {
            display: none;
            padding: 20px 0;
        }
        .tab-content.active {
            display: block;
        }
        .requirements {
            background: #e7f3ff;
            border-left: 4px solid #007bff;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>💳 Payment API Integration Tutorial</h1>
        
        <div class="warning">
            <strong>⚠️ Educational Purpose Only:</strong> This demo shows how payment APIs work in TEST mode. Real money transfers require business registration, compliance verification, and proper authentication.
        </div>

        <div class="tab-container">
            <div class="tabs">
                <button class="tab active" onclick="showTab('stripe')">Stripe API</button>
                <button class="tab" onclick="showTab('paypal')">PayPal API</button>
                <button class="tab" onclick="showTab('bank')">Bank Transfer</button>
                <button class="tab" onclick="showTab('requirements')">Legal Requirements</button>
            </div>

            <div id="stripe" class="tab-content active">
                <div class="api-section">
                    <h2>🟦 Stripe Payment Processing</h2>
                    <p>Stripe allows businesses to accept payments and send money (with proper setup).</p>
                    
                    <div class="form-group">
                        <label>Test API Key:</label>
                        <input type="text" id="stripeKey" placeholder="pk_test_..." value="pk_test_demo_key_for_education">
                    </div>
                    
                    <div class="form-group">
                        <label>Amount ($):</label>
                        <input type="number" id="stripeAmount" placeholder="10.00" step="0.01">
                    </div>
                    
                    <div class="form-group">
                        <label>Currency:</label>
                        <select id="stripeCurrency">
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="gbp">GBP</option>
                        </select>
                    </div>
                    
                    <button class="demo-button" onclick="simulateStripePayment()">Simulate Payment</button>
                    
                    <div class="code-block">
// Real Stripe Integration (Backend Required)
const stripe = require('stripe')('sk_test_...');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // $20.00
  currency: 'usd',
  payment_method_types: ['card'],
});

// For transfers (requires Connected Accounts)
const transfer = await stripe.transfers.create({
  amount: 1000, // $10.00
  currency: 'usd',
  destination: 'acct_connected_account_id',
});
                    </div>
                    
                    <div id="stripeResult"></div>
                </div>
            </div>

            <div id="paypal" class="tab-content">
                <div class="api-section">
                    <h2>🟨 PayPal API Integration</h2>
                    <p>PayPal offers APIs for payments and payouts to bank accounts.</p>
                    
                    <div class="form-group">
                        <label>Client ID (Sandbox):</label>
                        <input type="text" id="paypalClient" placeholder="Client ID from PayPal Developer">
                    </div>
                    
                    <div class="form-group">
                        <label>Recipient Email:</label>
                        <input type="email" id="paypalEmail" placeholder="recipient@example.com">
                    </div>
                    
                    <div class="form-group">
                        <label>Amount ($):</label>
                        <input type="number" id="paypalAmount" placeholder="25.00" step="0.01">
                    </div>
                    
                    <button class="demo-button" onclick="simulatePayPalPayout()">Simulate Payout</button>
                    
                    <div class="code-block">
// PayPal Payout API Example
const paypal = require('paypal-rest-sdk');

const payout = {
  "sender_batch_header": {
    "sender_batch_id": Math.random().toString(36).substring(9),
    "email_subject": "You have a payout!"
  },
  "items": [{
    "recipient_type": "EMAIL",
    "amount": {
      "value": "25.00",
      "currency": "USD"
    },
    "receiver": "recipient@example.com",
    "note": "Payment for services"
  }]
};

paypal.payout.create(payout, function(error, payout) {
  if (error) {
    console.log(error.response);
  } else {
    console.log("Payout created successfully");
  }
});
                    </div>
                    
                    <div id="paypalResult"></div>
                </div>
            </div>

            <div id="bank" class="tab-content">
                <div class="api-section">
                    <h2>🏦 Bank Transfer APIs</h2>
                    <p>Direct bank transfers require specialized services and banking partnerships.</p>
                    
                    <div class="form-group">
                        <label>Service Provider:</label>
                        <select id="bankProvider">
                            <option value="plaid">Plaid (US)</option>
                            <option value="yodlee">Yodlee (Global)</option>
                            <option value="open-banking">Open Banking (UK/EU)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Account Number:</label>
                        <input type="text" id="accountNumber" placeholder="****1234 (Test)">
                    </div>
                    
                    <div class="form-group">
                        <label>Routing Number:</label>
                        <input type="text" id="routingNumber" placeholder="011401533 (Test)">
                    </div>
                    
                    <div class="form-group">
                        <label>Amount ($):</label>
                        <input type="number" id="bankAmount" placeholder="100.00" step="0.01">
                    </div>
                    
                    <button class="demo-button" onclick="simulateBankTransfer()">Simulate Bank Transfer</button>
                    
                    <div class="code-block">
// Plaid API for Bank Transfers
const plaid = require('plaid');

const client = new plaid.PlaidApi(configuration);

// Create ACH transfer
const request = {
  access_token: 'access_token',
  account_id: 'account_id',
  type: 'debit',
  network: 'ach',
  amount: {
    value: 100.00,
    currency: 'USD'
  },
  description: 'Transfer funds'
};

const response = await client.transferCreate(request);
                    </div>
                    
                    <div id="bankResult"></div>
                </div>
            </div>

            <div id="requirements" class="tab-content">
                <div class="api-section">
                    <h2>📋 Legal Requirements for Real Implementation</h2>
                    
                    <div class="requirements">
                        <h3>🏢 Business Requirements:</h3>
                        <ul>
                            <li>Registered business entity</li>
                            <li>Tax ID/EIN number</li>
                            <li>Business bank account</li>
                            <li>Proof of business operations</li>
                        </ul>
                    </div>

                    <div class="requirements">
                        <h3>⚖️ Compliance Requirements:</h3>
                        <ul>
                            <li><strong>KYC (Know Your Customer):</strong> Identity verification</li>
                            <li><strong>AML (Anti-Money Laundering):</strong> Transaction monitoring</li>
                            <li><strong>PCI DSS:</strong> Credit card data security</li>
                            <li><strong>GDPR/CCPA:</strong> Data privacy compliance</li>
                        </ul>
                    </div>

                    <div class="requirements">
                        <h3>🔐 Security Requirements:</h3>
                        <ul>
                            <li>SSL/TLS encryption</li>
                            <li>Secure API key management</li>
                            <li>Webhook signature verification</li>
                            <li>Rate limiting and fraud detection</li>
                        </ul>
                    </div>

                    <div class="requirements">
                        <h3>💰 Financial Requirements:</h3>
                        <ul>
                            <li>Processing fees (2.9% + $0.30 typical)</li>
                            <li>Reserve funds for chargebacks</li>
                            <li>Insurance and bonding</li>
                            <li>Regular financial audits</li>
                        </ul>
                    </div>

                    <div class="requirements">
                        <h3>🛠️ Technical Implementation Steps:</h3>
                        <ol>
                            <li><strong>Sandbox Testing:</strong> Use test APIs first</li>
                            <li><strong>Backend Security:</strong> Never expose API keys in frontend</li>
                            <li><strong>Webhook Handling:</strong> Process payment confirmations</li>
                            <li><strong>Error Handling:</strong> Graceful failure management</li>
                            <li><strong>Monitoring:</strong> Transaction logging and alerts</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Hide all tab contents
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => content.classList.remove('active'));
            
            // Remove active class from all tabs
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Show selected tab content
            document.getElementById(tabName).classList.add('active');
            
            // Add active class to clicked tab
            event.target.classList.add('active');
        }

        function simulateStripePayment() {
            const amount = document.getElementById('stripeAmount').value;
            const currency = document.getElementById('stripeCurrency').value;
            const resultDiv = document.getElementById('stripeResult');
            
            if (!amount || amount <= 0) {
                showResult('stripeResult', 'Please enter a valid amount', 'error');
                return;
            }
            
            // Simulate API call
            setTimeout(() => {
                const mockResponse = {
                    id: 'pi_' + Math.random().toString(36).substring(7),
                    amount: Math.round(amount * 100), // Convert to cents
                    currency: currency,
                    status: 'requires_payment_method',
                    created: Math.floor(Date.now() / 1000),
                    client_secret: 'pi_test_client_secret_' + Math.random().toString(36)
                };
                
                showResult('stripeResult', 
                    `✅ Stripe Payment Intent Created:\n${JSON.stringify(mockResponse, null, 2)}\n\n⚠️ This is a simulation. Real implementation requires:\n- Backend server with secret keys\n- PCI compliance\n- Webhook handling`, 
                    'success'
                );
            }, 1000);
        }

        function simulatePayPalPayout() {
            const email = document.getElementById('paypalEmail').value;
            const amount = document.getElementById('paypalAmount').value;
            
            if (!email || !amount || amount <= 0) {
                showResult('paypalResult', 'Please enter valid email and amount', 'error');
                return;
            }
            
            setTimeout(() => {
                const mockResponse = {
                    batch_header: {
                        payout_batch_id: 'batch_' + Math.random().toString(36).substring(7),
                        batch_status: 'PENDING',
                        sender_batch_header: {
                            sender_batch_id: 'sender_' + Date.now()
                        }
                    },
                    items: [{
                        payout_item_id: 'item_' + Math.random().toString(36).substring(7),
                        transaction_status: 'PENDING',
                        payout_batch_id: 'batch_' + Math.random().toString(36).substring(7)
                    }]
                };
                
                showResult('paypalResult', 
                    `✅ PayPal Payout Initiated:\n${JSON.stringify(mockResponse, null, 2)}\n\n⚠️ This is a simulation. Real implementation requires:\n- PayPal Business Account\n- API credentials\n- Sufficient balance`, 
                    'success'
                );
            }, 1000);
        }

        function simulateBankTransfer() {
            const provider = document.getElementById('bankProvider').value;
            const amount = document.getElementById('bankAmount').value;
            const account = document.getElementById('accountNumber').value;
            
            if (!amount || amount <= 0 || !account) {
                showResult('bankResult', 'Please enter valid account details and amount', 'error');
                return;
            }
            
            setTimeout(() => {
                const mockResponse = {
                    transfer_id: 'transfer_' + Math.random().toString(36).substring(7),
                    status: 'pending',
                    amount: {
                        value: parseFloat(amount),
                        currency: 'USD'
                    },
                    provider: provider,
                    estimated_completion: new Date(Date.now() + 86400000).toISOString(), // +1 day
                    fees: {
                        processing_fee: 0.25
                    }
                };
                
                showResult('bankResult', 
                    `✅ Bank Transfer Initiated:\n${JSON.stringify(mockResponse, null, 2)}\n\n⚠️ This is a simulation. Real implementation requires:\n- Banking partnership\n- Regulatory approval\n- Enhanced due diligence`, 
                    'success'
                );
            }, 1500);
        }

        function showResult(elementId, message, type) {
            const resultDiv = document.getElementById(elementId);
            resultDiv.textContent = message;
            resultDiv.className = `result ${type}`;
        }
    </script>
</body>
</html>
