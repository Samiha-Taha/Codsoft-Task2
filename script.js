let inputbox = document.querySelector('#input-box');
let list = document.querySelector('#list');

// Load items from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const storedItems = JSON.parse(localStorage.getItem('todos')) || [];
    storedItems.forEach(function(itemText) {
        addItem(itemText);
    });
});

inputbox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addItem(inputbox.value);
        inputbox.value = "";

        // Save the updated list to local storage
        saveToLocalStorage();
    }
});

function addItem(input) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${input}<i></i>`;

    listItem.addEventListener("click", function () {
        this.classList.toggle('done');
        saveToLocalStorage(); // Save the updated list to local storage
    });

    listItem.querySelector('i').addEventListener("click", function () {
        listItem.remove();
        saveToLocalStorage(); // Save the updated list to local storage
    });

    list.appendChild(listItem);

    // Save the updated list to local storage
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const items = Array.from(list.querySelectorAll('li')).map(item => item.innerText.replace('i', '').trim());
    localStorage.setItem('todos', JSON.stringify(items));
}

