document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!");

    // Function to add numbers to the input field
    function addNumber(num) {
        console.log("Button clicked: " + num);
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value += num;
        } else {
            console.error("phoneNumber input field not found.");
        }
    }

    // Function to clear the last entered digit
    function clearNumber() {
        console.log("Clear button clicked");
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value = inputField.value.slice(0, -1);
        } else {
            console.error("phoneNumber input field not found.");
        }
    }

    // Function to simulate making a call
    function callNumber() {
        let number = document.getElementById("phoneNumber").value.trim();
        console.log("Dialing: " + number);

        if (number) {
            let dialLink = document.createElement("a");
            dialLink.href = "tel:" + number;
            document.body.appendChild(dialLink);
            dialLink.click();
            document.body.removeChild(dialLink);
        } else {
            alert("Please enter a number first.");
        }
    }

    // Attach event listeners for dial pad buttons
    document.querySelectorAll(".dial-pad button").forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText;
            if (value === "⌫") {
                clearNumber();
            } else if (value === "📞 Call") {
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

        console.log("Toggle button clicked");

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

    // Attach event listener to Toggle button
    let toggleButton = document.getElementById("toggleView");
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleView);
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

    // Attach event listener to search input
    let searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", searchNames);
    }

    // ✅ FIX: Prevent double-tap zoom without breaking button clicks
    document.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
});
