// Mock data for blood inventory and donation history
let bloodInventory = [
    { type: "A+", quantity: 20, lastDonated: "2023-03-25" },
    { type: "B+", quantity: 15, lastDonated: "2023-03-20" },
    { type: "O+", quantity: 10, lastDonated: "2023-03-22" },
    { type: "AB+", quantity: 5, lastDonated: "2023-03-18" },
];

let bloodHistory = [
    { date: "2023-03-15", recipient: "John Doe", type: "A+", quantity: 2 },
    { date: "2023-03-20", recipient: "Jane Smith", type: "O+", quantity: 1 },
    { date: "2023-03-25", recipient: "Mike Lee", type: "B+", quantity: 3 },
];

// Mock data for nearby blood banks
const mockBloodBanks = [
    { name: "City Blood Bank", bloodType: "A+", quantity: 10, location: "" },
    { name: "Community Blood Center", bloodType: "B+", quantity: 5, location: "" },
    { name: "Central Hospital", bloodType: "O+", quantity: 20, location: "" },
    { name: "Regional Blood Bank", bloodType: "A+", quantity: 30, location: "" },
];

// Function to update Blood Inventory Table
function updateInventoryTable() {
    const tableBody = document.getElementById("inventory-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''; // Clear the table

    bloodInventory.forEach((blood) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${blood.type}</td>
            <td><input type="number" value="${blood.quantity}" min="0" class="edit-quantity" data-type="${blood.type}" /></td>
            <td>${blood.lastDonated}</td>
            <td><button class="save-btn" data-type="${blood.type}">Save</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update Blood History Table
function updateHistoryTable() {
    const tableBody = document.getElementById("history-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''; // Clear the table

    bloodHistory.forEach((history) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${history.date}</td>
            <td>${history.recipient}</td>
            <td>${history.type}</td>
            <td>${history.quantity}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle Inventory Editing
document.getElementById("inventory-table").addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("save-btn")) {
        const bloodType = event.target.getAttribute("data-type");
        const newQuantity = document.querySelector(`input[data-type="${bloodType}"]`).value;

        // Update the inventory array with the new quantity
        bloodInventory = bloodInventory.map(blood => {
            if (blood.type === bloodType) {
                blood.quantity = parseInt(newQuantity);
            }
            return blood;
        });

        // Also update the blood donation history (this is just a dummy update for the demo)
        bloodHistory.push({
            date: new Date().toISOString().split('T')[0], // current date
            recipient: "Hospital (self update)",
            type: bloodType,
            quantity: newQuantity
        });

        // Re-render the inventory and history tables
        updateInventoryTable();
        updateHistoryTable();
    }
});

// Search Blood Banks by Type
document.getElementById("search-blood").addEventListener("click", function() {
    const bloodType = document.getElementById("blood-type").value;

    // Get matching blood banks
    const matchingBanks = mockBloodBanks.filter(bank => bank.bloodType === bloodType);

    const tableBody = document.getElementById("blood-bank-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''; // Clear previous results

    matchingBanks.forEach((bank) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${bank.name}</td>
            <td>${bank.bloodType}</td>
            <td>${bank.quantity}</td>
            <td><a href="${bank.location}" target="_blank">View Location</a></td>
        `;
        tableBody.appendChild(row);
    });

    // Display the blood bank table
    document.getElementById("blood-bank-table").style.display = "block";
});

// Initialize both tables on page load
window.onload = () => {
    updateInventoryTable();
    updateHistoryTable();
};
