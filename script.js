document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded Successfully");

    // 📌 Get elements
    let modeToggle = document.getElementById('modeToggle');
    let modeLabel = document.getElementById('modeLabel');
    let phonebookButton = document.getElementById('phonebookButton');
    let dialerSection = document.getElementById("dialer-section");
    let phonebookContainer = document.getElementById("phonebook-container");
    let phonebookSection = document.getElementById("phonebookSection");
    let vaPhonebookSection = document.getElementById("vaPhonebookSection");
    let inputField = document.getElementById("phoneNumber");
    let body = document.body;

    // 📌 Load mode from localStorage
    let isVA = localStorage.getItem("isVA") === "true";
    let inPhonebookView = false; // Tracks whether the user is viewing the phonebook

    function applyMode() {
        isVA = localStorage.getItem("isVA") === "true";
        modeToggle.checked = isVA;
        modeLabel.textContent = isVA ? "VA Mode" : "NMH Mode";
        phonebookButton.textContent = inPhonebookView 
            ? (isVA ? "Go to VA Dialer" : "Go to NMH Dialer") 
            : (isVA ? "Go to VA Phonebook" : "Go to NMH Phonebook");

        // 📌 Apply different styles for VA vs. NMH mode
        if (isVA) {
            body.classList.add("va-mode");
            body.classList.remove("nmh-mode");
        } else {
            body.classList.add("nmh-mode");
            body.classList.remove("va-mode");
        }

        // 📌 Ensure correct phonebook is displayed in directory mode
        if (inPhonebookView) {
            phonebookSection.style.display = isVA ? "none" : "block";
            vaPhonebookSection.style.display = isVA ? "block" : "none";
        }

        console.log("🔄 Mode Loaded: " + (isVA ? "VA" : "NMH"));
    }

    // 📌 Handle mode toggle switch (for switching in the phonebook)
    modeToggle.addEventListener("change", function () {
        isVA = modeToggle.checked;
        localStorage.setItem("isVA", isVA);
        applyMode();
        console.log("🔄 Mode Switched: " + (isVA ? "VA" : "NMH"));
    });

    // 📌 Toggle between Dialer & Phonebook
    phonebookButton.addEventListener("click", function () {
        inPhonebookView = !inPhonebookView; // Toggle the view state

        if (inPhonebookView) {
            dialerSection.style.display = "none";
            phonebookContainer.style.display = "block";
            phonebookSection.style.display = isVA ? "none" : "block";
            vaPhonebookSection.style.display = isVA ? "block" : "none";
            phonebookButton.textContent = isVA ? "Go to VA Dialer" : "Go to NMH Dialer";
        } else {
            dialerSection.style.display = "block";
            phonebookContainer.style.display = "none";
            phonebookButton.textContent = isVA ? "Go to VA Phonebook" : "Go to NMH Phonebook";
        }
    });

    // 📌 NMH and VA Prefix Mappings
    let nmhPrefixMapping = { "6": "312-926", "5": "312-695", "4": "312-694", "2": "312-472" };
    let vaPrefixMapping = { "5": "312-569", "4": "312-469" };

    // 📌 Function to add numbers to the input field
    function addNumber(num) {
        if (!inputField) return;

        let prefixMapping = isVA ? vaPrefixMapping : nmhPrefixMapping;

        // ✅ If first digit is a shortcut, format it
        if (inputField.value.length === 0 && prefixMapping[num]) {
            inputField.value = num + "-";
            return;
        }

        // ✅ Allow full manual number input
        inputField.value += num;
    }

    // 📌 Function to clear last entered digit
    function clearNumber() {
        if (inputField) {
            inputField.value = inputField.value.slice(0, -1);
        }
    }

    // 📌 Function to make a call
    function callNumber() {
        if (!inputField)


            function applyMode() {
    isVA = localStorage.getItem("isVA") === "true";
    modeToggle.checked = isVA;
    
    // Ensure correct mode label text
    modeLabel.textContent = isVA ? "VA Mode" : "NMH Mode";

    // Apply different styles for VA vs. NMH mode
    if (isVA) {
        body.classList.add("va-mode");
        body.classList.remove("nmh-mode");
    } else {
        body.classList.add("nmh-mode");
        body.classList.remove("va-mode");
    }
}

