document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from reloading the page
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('user-type').value;  // Get selected user type (Hospital/Donor)

    // Create an object to send to the server
    const formData = {
        email: email,
        password: password,
        userType: userType
    };

    // Use fetch to send login request to the backend (login.php)
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())  // Parse the JSON response from the server
    .then(data => {
        if (data.success) {
            // If login is successful, redirect to the appropriate page
            window.location.href = `${userType}_dashboard.html`;  // Redirect to hospital or donor dashboard based on user type
        } else {
            // If login fails, show an error message
            alert(data.message || "Login failed. Please check your credentials.");
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('There was an error with the login request. Please try again.');
    });
});
