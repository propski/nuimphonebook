document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded Successfully");

    // 📌 Force hiding the address bar on mobile
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 100); // Small delay ensures better behavior

    // 📌 Prevent touch gestures from triggering browser UI
document.addEventListener("touchmove", function (event) {
    let scrollableList = document.querySelector("#phonebook");
    if (!scrollableList.contains(event.target)) {
        event.preventDefault(); // ✅ Blocks page scrolling, but allows list scrolling
    }
}, { passive: false });

    document.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 1); // Pushes the address bar out of view on load
    window.addEventListener("load", function() {
        setTimeout(function() { window.scrollTo(0, 1); }, 0);
    });
});

    // Function to add numbers to the input field
function addNumber(num) {
    let inputField = document.getElementById("phoneNumber");

    // Auto-insert "-" if the first number is 2, 4, 5, or 6
    if (["2", "4", "5", "6"].includes(num) && inputField.value.length === 0) {
        inputField.value = num + "-"; // Ensures correct format
    } else {
        inputField.value += num;
    }
}

    // Function to clear the last entered digit
    function clearNumber() {
        console.log("Clear button clicked");
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value = inputField.value.slice(0, -1);
        } else {
            console.error("❌ phoneNumber input field not found.");
        }
    }

    // Function to simulate making a call
function callNumber() {
    let inputField = document.getElementById("phoneNumber");
    let number = inputField.value.trim();

    console.log("Original Input: " + number); // Debugging log

    // Define prefix mapping
    let prefixMapping = {
        "6": "312-926",
        "5": "312-695",
        "4": "312-694",
        "2": "312-472"
    };

    // Check if the entered number follows "X-XXXX" format
    let pattern = /^([2564])-(\d{4})$/; // Matches "2-XXXX", "4-XXXX", "5-XXXX", or "6-XXXX"

    if (pattern.test(number)) {
        let matchedPrefix = number.match(pattern)[1]; // Extract first digit (2, 4, 5, or 6)
        let lastFourDigits = number.match(pattern)[2]; // Extract XXXX
        number = `${prefixMapping[matchedPrefix]}-${lastFourDigits}`; // Converts to full number

        console.log("Formatted Number: " + number); // Debugging log
    } else {
        console.log("No formatting applied. Using raw input.");
    }

    // Ensure the number is not empty
    if (!number) {
        alert("❌ Please enter a valid number.");
        return;
    }

    // Create a temporary <a> tag to trigger the phone dialer
    let dialLink = document.createElement("a");
    dialLink.href = "tel:" + number;
    document.body.appendChild(dialLink);
    dialLink.click();
    document.body.removeChild(dialLink);

    console.log("📞 Dialing: " + number); // Debugging log
}



    // Fix: Attach event listeners for dial pad buttons correctly
    document.querySelectorAll(".dial-pad button").forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText.trim(); // ✅ Uses innerText instead of dataset
            console.log("Button Pressed:", value);

            if (value === "📞 Call") {
                callNumber();
            } else if (value === "⌫") {
                clearNumber();
            } else {
                addNumber(value);
            }
        });

        button.addEventListener("touchstart", function (event) {
            event.preventDefault(); // ✅ Prevents double-tap zoom issues
            let value = this.innerText.trim();
            if (value === "📞 Call") {
                callNumber();
            } else if (value === "⌫") {
                clearNumber();
            } else {
                addNumber(value);
            }
        }, { passive: false });
    });

    // ✅ Fix: Toggle between Dialer and Phonebook
    function toggleView() {
        let dialer = document.getElementById("dialer-section");
        let database = document.getElementById("database-section");
        let button = document.getElementById("toggleView");

        console.log("🔄 Toggle button clicked");

        if (!dialer || !database || !button) {
            console.error("❌ One of the sections or button is missing.");
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

    // ✅ Attach event listener to Toggle button
    let toggleButton = document.getElementById("toggleView");
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleView);
        toggleButton.addEventListener("touchstart", toggleView, { passive: false });
    } else {
        console.error("❌ toggleView button not found.");
    }

    // ✅ Function to filter search results
    function searchNames() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        let items = document.querySelectorAll("#phonebook li");

        items.forEach((li) => {
            let text = li.textContent.toLowerCase();
            li.style.display = text.includes(input) ? "block" : "none";
        });
    }

    // ✅ Attach event listener to search input
    let searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", searchNames);
    }

    // ✅ Fix: Prevent double-tap zoom without breaking button clicks
    document.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
});
