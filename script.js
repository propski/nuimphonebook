function searchNames() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let names = document.querySelectorAll("#phonebook li");

    names.forEach((li) => {
        let text = li.textContent.toLowerCase();
        if (text.includes(input)) {
            li.style.display = "block";
        } else {
            li.style.display = "none";
        }
    });
}
