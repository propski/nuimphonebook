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

        // 📌 If already in phonebook view, update it without toggling
        if (inPhonebookView) {
            phonebookSection.style.display = isVA ? "none" : "block";
            vaPhonebookSection.style.display = isVA ? "block" : "none";
        } 

        console.log("🔄 Mode Loaded: " + (isVA ? "VA" : "NMH"));
    }

    // 📌 Handle mode toggle switch
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
            phonebookButton.textContent = isVA ? "Go to VA Dialer" : "Go to NMH Dialer"; // Update button text
        } else {
            dialerSection.style.display = "block";
            phonebookContainer.style.display = "none";
            phonebookButton.textContent = isVA ? "Go to VA Phonebook" : "Go to NMH Phonebook"; // Reset button text
        }
    });

    // 📌 Apply stored mode on page load
    applyMode();
});
