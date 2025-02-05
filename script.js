document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded Successfully");

    // 📌 Handle Toggle Between NMH & VA Phonebooks
    let toggleDirectoryButton = document.getElementById("toggleDirectory");
    let phonebookSection = document.getElementById("phonebookSection");
    let vaPhonebookSection = document.getElementById("vaPhonebookSection");

    if (toggleDirectoryButton && phonebookSection && vaPhonebookSection) {
        toggleDirectoryButton.addEventListener("click", function () {
            console.log("🔄 Toggle Directory Button Clicked");

            if (phonebookSection.style.display === "none") {
                phonebookSection.style.display = "block";
                vaPhonebookSection.style.display = "none";
                toggleDirectoryButton.textContent = "Go to VA Phonebook";
            } else {
                phonebookSection.style.display = "none";
                vaPhonebookSection.style.display = "block";
                toggleDirectoryButton.textContent = "Go to NMH Phonebook";
            }
        });
    } else {
        console.error("❌ Toggle Directory: One or more elements missing.");
    }

    // 📌 Handle Toggle Between Dialer & Phonebook
    let toggleButton = document.getElementById("toggleView");
    let dialerSection = document.getElementById("dialer-section");
    let phonebookContainer = document.getElementById("phonebook-container");

    if (toggleButton && dialerSection && phonebookContainer) {
        toggleButton.addEventListener("click", function () {
            console.log("🔄 Toggle Button Clicked");

            if (dialerSection.style.display === "none") {
                dialerSection.style.display = "block";
                phonebookContainer.style.display = "none";
                toggleButton.textContent = "Go to NMH Phonebook";
            } else {
                dialerSection.style.display = "none";
                phonebookContainer.style.display = "block";
                toggleButton.textContent = "Go to Dialer";
            }
        });
    } else {
        console.error("❌ Toggle View: One or more elements missing.");
    }

    // 📌 Function to Search in Phonebook
    function searchNames() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        let items = document.querySelectorAll("#phonebook li");

        items.forEach((li) => {
            let text = li.textContent.toLowerCase();
            li.style.display = text.includes(input) ? "block" : "none";
        });
    }

    let searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", searchNames);
    }

    // 📌 Handle Dialer Input
    function addNumber(num) {
        let inputField = document.getElementById("phoneNumber");

        // Auto-insert "-" if first number is 2, 4, 5, or 6
        if (["2", "4", "5", "6"].includes(num) && inputField.value.length === 0) {
            inputField.value = num + "-";
        } else {
            inputField.value += num;
        }
    }

    function clearNumber() {
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value = inputField.value.slice(0, -1);
        }
    }

    function callNumber() {
        let inputField = document.getElementById("phoneNumber");
        let number = inputField.value.trim();

        console.log("Original Input: " + number);

        // Prefix Mapping
        let prefixMapping = {
            "6": "312-926",
            "5": "312-695",
            "4": "312-694",
            "2": "312-472"
        };

        // Check if the entered number follows "X-XXXX" format
        let pattern = /^([2564])-(\d{4})$/;

        if (pattern.test(number)) {
            let matchedPrefix = number.match(pattern)[1]; // Extract first digit
            let lastFourDigits = number.match(pattern)[2]; // Extract XXXX
            number = `${prefixMapping[matchedPrefix]}-${lastFourDigits}`;

            console.log("Formatted Number: " + number);
        } else {
            console.log("No formatting applied. Using raw input.");
        }

        if (!number) {
            alert("❌ Please enter a valid number.");
            return;
        }

        let dialLink = document.createElement("a");
        dialLink.href = "tel:" + number;
        document.body.appendChild(dialLink);
        dialLink.click();
        document.body.removeChild(dialLink);

        console.log("📞 Dialing: " + number);
    }

    // 📌 Add Event Listeners to Dial Pad Buttons
    document.querySelectorAll(".dial-pad button").forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText.trim();
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
            event.preventDefault();
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

    // 📌 Prevent Double-Tap Zoom Without Breaking Button Clicks
    document.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // 📌 Hide Browser Address Bar on Mobile
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 100);
});
