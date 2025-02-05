document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded Successfully");

    // 📌 Get elements
    let toggleModeSwitch = document.getElementById('toggleMode');
    let phonebookButton = document.getElementById('phonebookButton');
    let modeText = document.getElementById('modeText');
    let phonebookSection = document.getElementById('phonebookSection');
    let vaPhonebookSection = document.getElementById('vaPhonebookSection');
    let dialerSection = document.getElementById('dialer-section');
    let phonebookContainer = document.getElementById('phonebook-container');
    let toggleViewButton = document.getElementById("toggleView");
    let toggleDirectoryButton = document.getElementById("toggleDirectory");
    let searchInput = document.getElementById("searchInput");

    let isVA = false; // Default mode: NMH

    // 📌 Toggle between NMH and VA mode
    if (toggleModeSwitch) {
        toggleModeSwitch.addEventListener('click', function () {
            isVA = !isVA; // Toggle state

            if (isVA) {
                modeText.textContent = "Mode: VA";
                phonebookButton.dataset.target = "vaPhonebookSection"; // Store VA phonebook
            } else {
                modeText.textContent = "Mode: NMH";
                phonebookButton.dataset.target = "phonebookSection"; // Store NMH phonebook
            }

            console.log("🔄 Mode Switched: " + (isVA ? "VA" : "NMH"));
        });
    }

    // 📌 Function to add numbers to the input field
    function addNumber(num) {
        let inputField = document.getElementById("phoneNumber");

        let nmhPrefixMapping = { "6": "312-926", "5": "312-695", "4": "312-694", "2": "312-472" };
        let vaPrefixMapping = { "6": "312-822", "5": "312-825", "4": "312-827", "2": "312-828" };

        let prefixMapping = isVA ? vaPrefixMapping : nmhPrefixMapping;

        if (["2", "4", "5", "6"].includes(num) && inputField.value.length === 0) {
            inputField.value = num + "-"; // Auto-format input
        } else {
            inputField.value += num;
        }
    }

    // 📌 Function to clear last entered digit
    function clearNumber() {
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value = inputField.value.slice(0, -1);
        }
    }

    // 📌 Function to make a call
    function callNumber() {
        let inputField = document.getElementById("phoneNumber");
        let number = inputField.value.trim();

        let nmhPrefixMapping = { "6": "312-926", "5": "312-695", "4": "312-694", "2": "312-472" };
        let vaPrefixMapping = { "6": "312-822", "5": "312-825", "4": "312-827", "2": "312-828" };

        let prefixMapping = isVA ? vaPrefixMapping : nmhPrefixMapping;
        let pattern = /^([2564])-(\d{4})$/;

        if (pattern.test(number)) {
            let matchedPrefix = number.match(pattern)[1];
            let lastFourDigits = number.match(pattern)[2];
            number = `${prefixMapping[matchedPrefix]}-${lastFourDigits}`;
        }

        console.log("📞 Dialing: " + number);

        if (number) {
            let dialLink = document.createElement("a");
            dialLink.href = "tel:" + number;
            document.body.appendChild(dialLink);
            dialLink.click();
            document.body.removeChild(dialLink);
        } else {
            alert("❌ Please enter a valid number.");
        }
    }

    // 📌 Toggle Between Dialer & Phonebook
    if (toggleViewButton && dialerSection && phonebookContainer) {
        toggleViewButton.addEventListener("click", function () {
            if (dialerSection.style.display === "none") {
                dialerSection.style.display = "block";
                phonebookContainer.style.display = "none";
                toggleViewButton.textContent = "Go to Phonebook";
            } else {
                dialerSection.style.display = "none";
                phonebookContainer.style.display = "block";
                toggleViewButton.textContent = "Go to Dialer";
            }
        });
    }

    // 📌 Toggle Between NMH & VA Phonebooks
    if (toggleDirectoryButton && phonebookSection && vaPhonebookSection) {
        toggleDirectoryButton.addEventListener("click", function () {
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
    }

    // 📌 Search Function
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            let input = searchInput.value.toLowerCase();
            document.querySelectorAll("#phonebook li").forEach(li => {
                let text = li.textContent.toLowerCase();
                li.style.display = text.includes(input) ? "block" : "none";
            });
        });
    }
});
