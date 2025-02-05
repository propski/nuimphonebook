document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!");

    // Function to add numbers to the input field
    function addNumber(num) {
        console.log("Button clicked: " + num); // Debugging line
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value += num;
        } else {
            console.error("phoneNumber input field not found.");
        }
    }

    // Function to clear the last entered digit
    function clearNumber() {
        console.log("Clear button clicked"); // Debugging line
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value = inputField.value.slice(0, -1);
        } else {
            console.error("phoneNumber input field not found.");
        }
    }

    // Function to simulate making a call
    function callNumber() {
        let number = document.getElementById("phoneNumber").value;
        console.log("Calling: " + number); // Debugging line
        if (number) {
            alert("Calling " + number + "...");
        } else {
            alert("Please enter a number first.");
        }
    }

    // Attach event listeners to dial pad buttons dynamically
    let buttons = document.querySelectorAll(".dial-pad button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = this.textContent.trim();
            if (value === "⌫") {
                clearNumber();
            } else if (value === "📞") {
                callNumber();
            } else {
                addNumber(value);
            }
        });
    });

    // Function to toggle between Dialer and Phonebook sections
    function toggleView() {
        let dialer = document.getElementById("dialer-section");
        let database = document.getElementById("database-section");
        let button = document.getElementById("toggleView");

        console.log("Toggle button clicked"); // Debugging line

        if (!dialer || !database || !button) {
            console.error("One of the sections or button is missing.");
            return;
        }

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

    // Attach event listener to toggle button
    document.getElementById("toggleView").addEventListener("click", toggleView);

    // Function to filter search results
    function searchNames() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        let items = document.querySelectorAll("#phonebook li");

        items.forEach((li) => {
            let text = li.textContent.toLowerCase();
            li.style.display = text.includes(input) ? "block" : "none";
        });
    }

    // Attach event listener to search input
    document.getElementById("searchInput").addEventListener("keyup", searchNames);
});
