// Function to add numbers to input field
function addNumber(num) {
    document.getElementById("phoneNumber").value += num;
}

// Function to clear number
function clearNumber() {
    let inputField = document.getElementById("phoneNumber");
    inputField.value = inputField.value.slice(0, -1);
}

// Function to simulate calling a number
function callNumber() {
    let number = document.getElementById("phoneNumber").value;
    if (number) {
        alert("Calling " + number + "...");
    } else {
        alert("Please enter a number first.");
    }
}

// Function to toggle between Dialer and Phonebook
function toggleView() {
    let dialer = document.getElementById("dialer-section");
    let database = document.getElementById("database-section");
    let button = document.getElementById("toggleView");

    if (dialer.style.display === "none") {
        dialer.style.display = "block";
        database.style.display = "none";
        button.innerText = "Go to Phonebook";
    } else {
        dialer.style.display = "none";
        database.style.display = "block";
        button.innerText = "Go to Dialer";
    }
}

// Function to filter search results
function searchNames() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let items = document.querySelectorAll("#phonebook li");

    items.forEach((li) => {
        let text = li.textContent.toLowerCase();
        li.style.display = text.includes(input) ? "block" : "none";
    });
}
