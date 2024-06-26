import determineWithdraw from './withdraw.js';
import determineAccountInfo from './getaccountinfo.js';

let pinCode = sessionStorage.getItem("pincode");

var socket = io();

socket.on('connect', function() {
    console.log('Connected to WebSocket server!');
});

socket.on('button3', function() {
    const amount = parseFloat(sessionStorage.getItem('current')); // Retrieve the amount from sessionStorage
    console.log('Retrieved amount from sessionStorage:', amount);
    if (amount) {
        // Send amount to Arduino
        const amountString = `amount:${amount}`;
        socket.emit('sendData', amountString);  // Send the amount string
    }
    console.log('Redirecting to success page...');
    window.location.replace('/success');
});

socket.on('button6', function() {
    if (window.location.pathname.includes('/bon')) {
        const amount = parseFloat(sessionStorage.getItem('current')); // Retrieve the amount from sessionStorage
        console.log('Retrieved amount from sessionStorage:', amount);
        if (amount) {
            // First, withdraw the amount
            determineWithdraw(amount, function(withdrawSuccess, withdrawData) {
                if (withdrawSuccess) {
                    // Next, get account info
                    determineAccountInfo(pinCode, function(success, data) {
                        if (success) {
                            console.log('Account info retrieved successfully:', data);
                            // Combine amount and account info into a single string and send it in one event
                            const combinedDataString = `button6Data:${data.firstname},${data.balance},${amount}`;
                            socket.emit('sendData', combinedDataString);
                            
                            // Redirect to success page
                            console.log('Redirecting to success page...');
                            window.location.replace('/success');
                        } else {
                            console.error('Failed to retrieve account info:', data.message);
                        }
                    });
                } else {
                    console.error('Failed to withdraw:', withdrawData.message);
                }
            });
        } else {
            console.log('Amount not found in sessionStorage');
        }
    }
});
