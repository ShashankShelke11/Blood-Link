// Handle Form Submission
document.getElementById('donor-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const bloodGroup = document.getElementById('blood-group').value;
    const medicalHistory = document.getElementById('medical-history').value;

    const aadhar = document.getElementById('aadhar').files[0];

    // Validate form data
    if (!name || !age || !bloodGroup || !medicalHistory) {
        alert('Please fill in all the details.');
        return;
    }

    // Simulate sending data to the server (could be an API call here)
    const donorData = {
        name,
        age,
        bloodGroup,
        medicalHistory,
        aadhar,
    };

    console.log('Donor Registration Data:', donorData);

    // Clear the form after submission
    document.getElementById('donor-form').reset();
    alert('Registration submitted successfully!');
});
