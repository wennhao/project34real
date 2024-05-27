// Assuming the IBAN and UID are constant or predefined
let iban = sessionStorage.getItem('iban');  // Replace with actual IBAN if needed
let uid = sessionStorage.getItem('uid');                    // Replace with actual UID if needed
let pinCode = sessionStorage.getItem('pincode'); // Assuming the PIN code is also stored in sessionStorage

function withdrawStatic(amount, callback) {
    const apiUrl = `http://145.24.223.51:8001/api/withdraw?target=${iban}`;
    const data = {
        uid: uid,
        pincode: pinCode,
        amount: amount,
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.success) {
            sessionStorage.setItem('newBalance', data.newBalance);
            sessionStorage.setItem('amount', data.amount);
            callback(true, data);
        } else {
            callback(false, data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        callback(false, { message: 'Failed to withdraw: ' + error.message });
    });
}

var socket = io();

socket.on('connect', function() {
    console.log('Connected to WebSocket server!');
});

socket.on('button1', function() {
    console.log('Received button1 event');
    if (window.location.pathname.includes('/keuze')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to choice screen...');
        window.location.replace('/opnemen');
    } else if (window.location.pathname.includes('/saldo')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/saldo');
    }  else if (window.location.pathname.includes('/opnemenbedrag')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/opnemenbedrag');
    } else if (window.location.pathname.includes('/opnemen')) { // 20 euro button
        // €50 button pressed, call withdrawStatic function
        console.log('Attempting to withdraw €20...');
        withdrawStatic(20, (success, data) => {
            if (success) {
                console.log('Withdrawal successful:', data);
                localStorage.setItem('saldo', data.newBalance); // Update the new balance in localStorage
                localStorage.setItem('amount', data.amount);
                window.location.replace('/bon'); // Redirect to bon page
            } else {
                console.error('Withdrawal failed:', data.message);
            }
        });
    } else if (window.location.pathname.includes('/bon')) { // wilt u een bon invis button
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to bon screen...');
        window.location.replace('/bon');
    } else if (window.location.pathname.includes('/pin')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/pin');
    } else {
        // Default actie als geen van bovenstaande van toepassing is
        console.log('Redirecting to home...');
        window.location.replace('/pin');
    }
});

socket.on('button2', function() {
    console.log('Accepted event received, redirecting...');
    if (window.location.pathname.includes('/keuze')) {
        // €70 button pressed, call withdrawStatic function snel opnemen
        console.log('Attempting to fast withdraw €70...');
        withdrawStatic(70, (success, data) => {
            if (success) {
                console.log('Withdrawal successful:', data);
                window.location.replace('/success'); // Redirect to bon page
            } else {
                console.error('Withdrawal failed:', data.message);
            }
        });
    }  else if (window.location.pathname.includes('/opnemenbedrag')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/opnemenbedrag');
    } else if (window.location.pathname.includes('/opnemen')) { // 50 euro button
        // €50 button pressed, call withdrawStatic function
        console.log('Attempting to withdraw €50...');
        withdrawStatic(50, (success, data) => {
            if (success) {
                console.log('Withdrawal successful:', data);
                window.location.replace('/bon'); // Redirect to bon page
            } else {
                console.error('Withdrawal failed:', data.message);
            }
        });
    } else if (window.location.pathname.includes('/saldo')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/saldo');
    } else if (window.location.pathname.includes('/bon')) { // wilt u een bon invis button
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to bon screen...');
        window.location.replace('/bon');
    } else if (window.location.pathname.includes('/pin')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/pin');
    } else {
        // Default actie als geen van bovenstaande van toepassing is
        console.log('Redirecting to home...');
        window.location.replace('/pin');
    };
});

//meestal de terug button
socket.on('button3', function() {
    console.log('Received button3 event');
    if (window.location.pathname.includes('/keuze')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to saldo screen...');
        window.location.replace('/saldo');
    } else if (window.location.pathname.includes('/opnemenbedrag')) {
        // Als de gebruiker zich op de keuze pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/opnemen');
    } else if (window.location.pathname.includes('/saldo')) {
        // Als de gebruiker zich op de keuze pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/keuze');
    } else if (window.location.pathname.includes('/opnemen')) {
        // Als de gebruiker zich op de keuze pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/keuze');
    } else if (window.location.pathname.includes('/snelopnemen')) {
        // Als de gebruiker zich op de keuze pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/keuze');
    } else if (window.location.pathname.includes('/bon')) {
        // Als de gebruiker zich op de bon pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/success');
    } else if (window.location.pathname.includes('/opnemenbedrag')) {
        // Als de gebruiker zich op de keuze pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/opnemen');
    } else if (window.location.pathname.includes('/pin')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/pin');
    } else {
        // Default actie als geen van bovenstaande van toepassing is
        console.log('Redirecting to home...');
        window.location.replace('/pin');
    }
});

socket.on('button4', function() {
    console.log('Received button4 event');
    if (window.location.pathname.includes('/saldo')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to keuze screen...');
        window.location.replace('/saldo');
    } else if (window.location.pathname.includes('/opnemenbedrag')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/opnemenbedrag');
    } else if (window.location.pathname.includes('/opnemen')) { // 100 euro button
        // €100 button pressed, call withdrawStatic function
        console.log('Attempting to withdraw €100...');
        withdrawStatic(100, (success, data) => {
            if (success) {
                console.log('Withdrawal successful:', data);
                window.location.replace('/bon'); // Redirect to bon page
            } else {
                console.error('Withdrawal failed:', data.message);
            }
        });
    } else if (window.location.pathname.includes('/bon')) { // wilt u een bon invis button
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to bon screen...');
        window.location.replace('/bon');
    } else if (window.location.pathname.includes('/pin')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/pin');
    } else {
        // Default actie als geen van bovenstaande van toepassing is
        console.log('Redirecting to home...');
        window.location.replace('/keuze');
    }
});

socket.on('button5', function() {
    console.log('Received button4 event');
    if (window.location.pathname.includes('/opnemen')) { //aangepaste bedrag button
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to opnemenbedrag screen...');
        window.location.replace('/opnemenbedrag');
    } else if (window.location.pathname.includes('/opnemenbedrag')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/opnemenbedrag');
    } else if (window.location.pathname.includes('/pin')) {
        // Als de gebruiker zich op de opnemenbedrag pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/pin');
    } else if (window.location.pathname.includes('/saldo')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/saldo');
    } else if (window.location.pathname.includes('/keuze')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/keuze');
    } else if (window.location.pathname.includes('/bon')) { // wilt u een bon invis button
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Deze button heeft geen functie!');
        window.location.replace('/bon');
    } else {
        // Default actie als geen van bovenstaande van toepassing is
        console.log('Default button pressed! to keuze...');
        window.location.replace('/keuze');
    }
});

//afbreken button op button 6
socket.on('button6', function() {
    console.log('Received button4 event');
    if (window.location.pathname.includes('/opnemen')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to success page...');
        window.location.replace('/success');
    } else if (window.location.pathname.includes('/saldo')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to success page...');
        window.location.replace('/success');
    } else if (window.location.pathname.includes('/pin')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Sessie afgebroken! Redirecting to main page...');
        window.location.replace('/success');
    } else if (window.location.pathname.includes('/opnemenbedrag')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to success page...');
        window.location.replace('/success');
    } else if (window.location.pathname.includes('/keuze')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to success page...');
        window.location.replace('/success');
    } else if (window.location.pathname.includes('/bon')) {
        // Als de gebruiker zich op de saldo pagina bevindt
        console.log('Redirecting to success page...');
        
    } else {
        // Default actie als geen van bovenstaande van toepassing is
        console.log('Default pointer to keuze...');
        //window.location.replace('/keuze');
    }
});