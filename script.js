document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded Successfully");

    // 📌 Get elements
    let modeToggle = document.getElementById("modeToggle");
    let modeLabel = document.getElementById("modeLabel");
    let phonebookButton = document.getElementById("phonebookButton");
    let phonebookSection = document.getElementById("phonebookSection");
    let vaPhonebookSection = document.getElementById("vaPhonebookSection");
    let dialerSection = document.getElementById("dialer-section");
    let phonebookContainer = document.getElementById("phonebook-container");
    let toggleViewButton = document.getElementById("toggleView");
    let toggleDirectoryButton = document.getElementById("toggleDirectory");
    let searchInput = document.getElementById("searchInput");

    // 📌 Check stored mode preference
    let isVA = localStorage.getItem("isVA") === "true"; 

    // 📌 Apply the stored mode when the page loads
    function applyMode() {
        if (isVA) {
            modeToggle.checked = true;
            modeLabel.textContent = "VA Mode";
            phonebookButton.textContent = "VA Phonebook";
            phonebookButton.href = "#vaPhonebookSection";
        } else {
            modeToggle.checked = false;
            modeLabel.textContent = "NMH Mode";
            phonebookButton.textContent = "NMH Phonebook";
            phonebookButton.href = "#phonebookSection";
        }
        console.log("🔄 Mode Loaded: " + (isVA ? "VA" : "NMH"));
    }

    // 📌 Toggle between NMH and VA mode
    if (modeToggle) {
        modeToggle.addEventListener("change", function () {
            isVA = modeToggle.checked;
            localStorage.setItem("isVA", isVA); // Save mode to localStorage
            applyMode();
            console.log("🔄 Mode Switched: " + (isVA ? "VA" : "NMH"));
        });
    }

    // 📌 Apply the correct mode on page load
    applyMode();
    
// 📌 Function to add numbers to the input field
function addNumber(num) {
    let inputField = document.getElementById("phoneNumber");

    let nmhPrefixMapping = { "6": "312-926", "5": "312-695", "4": "312-694", "2": "312-472" };
    let vaPrefixMapping = { "5": "312-569", "4": "312-469" }; // ✅ Updated VA mode to only use 5 and 4

    let prefixMapping = isVA ? vaPrefixMapping : nmhPrefixMapping; // ✅ Choose NMH or VA prefix set

    if (isVA) {
        // ✅ In VA mode, allow only "5-XXXX" and "4-XXXX"
        if (["5", "4"].includes(num) && inputField.value.length === 0) {
            inputField.value = num + "-";
        } else if (inputField.value.length > 0) {
            inputField.value += num;
        }
    } else {
        // ✅ In NMH mode, allow "2-XXXX", "4-XXXX", "5-XXXX", and "6-XXXX"
        if (["2", "4", "5", "6"].includes(num) && inputField.value.length === 0) {
            inputField.value = num + "-";
        } else {
            inputField.value += num;
        }
    }
}

// 📌 Function to make a call
function callNumber() {
    let inputField = document.getElementById("phoneNumber");
    let number = inputField.value.trim();

    let nmhPrefixMapping = { "6": "312-926", "5": "312-695", "4": "312-694", "2": "312-472" };
    let vaPrefixMapping = { "5": "312-569", "4": "312-469" }; // ✅ Updated VA mode prefixes

    let prefixMapping = isVA ? vaPrefixMapping : nmhPrefixMapping; // ✅ Choose correct mapping

    let pattern = isVA ? /^([54])-(\d{4})$/ : /^([2564])-(\d{4})$/; 
    // ✅ In VA mode, allow only 5-XXXX or 4-XXXX
    // ✅ In NMH mode, allow 2-XXXX, 4-XXXX, 5-XXXX, 6-XXXX

    if (pattern.test(number)) {
        let matchedPrefix = number.match(pattern)[1]; // Extract first digit
        let lastFourDigits = number.match(pattern)[2]; // Extract last four digits
        number = `${prefixMapping[matchedPrefix]}-${lastFourDigits}`; // Apply correct prefix
    } else {
        alert("❌ Invalid number format. Use 5-XXXX or 4-XXXX in VA mode.");
        return;
    }

    console.log("📞 Dialing: " + number);

    if (number) {
        let dialLink = document.createElement("a");
        dialLink.href = "tel:" + number;
        document.body.appendChild(dialLink);
        dialLink.click();
        document.body.removeChild(dialLink);
    }
}
   

    // 📌 Function to clear last entered digit
    function clearNumber() {
        let inputField = document.getElementById("phoneNumber");
        if (inputField) {
            inputField.value = inputField.value.slice(0, -1);
        }
    }

    // 📌 Attach event listeners for dial pad buttons
    document.querySelectorAll(".dial-pad button").forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText.trim();

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
