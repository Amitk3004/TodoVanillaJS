let textbox = document.querySelector('#searchbar');
let addButton = document.querySelector('.addTaskBtn');
let list = document.querySelector('.result_list');

let localStorageKey = "todoList";

addButton.addEventListener('click', addTaskOnclickhandler);

textbox.addEventListener('keypress', keyPressHandler)

initalizeList();


function initalizeList() {
    let list = localStorage.getItem(localStorageKey);
    let parsedList = []
    if(list) {
        parsedList = JSON.parse(list);
        parsedList.forEach(element => {
            addToList(element, true);
        });
    }
}

function keyPressHandler(e) {
    if(e.keyCode === 13) {
        addTaskOnclickhandler();
    }
}

function removeItemHandler(e) {
    e.target.parentNode.remove();
    removeFromLocalStorage(e.target.parentNode.id);
}

function addTaskOnclickhandler(e) {
    addToList(textbox.value)
    textbox.value = null;
    textbox.focus();
}

function removeFromLocalStorage(itemName) {
    let list = localStorage.getItem(localStorageKey);
    let parsedList = [];
    if (list) {
        parsedList = JSON.parse(list);
        let udatedList = parsedList.filter((e) => e !== itemName.trim());
        localStorage.setItem(localStorageKey, JSON.stringify(udatedList));
    }
}

function saveToLocalStorage(itemName) {
    let savedList = localStorage.getItem('todoList');
    if (savedList){
        let parseList = JSON.parse(savedList);
        parseList.push(itemName);
        localStorage.setItem('todoList', JSON.stringify(parseList));
    } else {
        localStorage.setItem('todoList', JSON.stringify([itemName]));
    }
}

function addToList(itemName, isinitialCall = false) {
    itemName = itemName.trim();
    if(itemName !== '') {
        if (!isinitialCall) {
            saveToLocalStorage(itemName);
        }
        let item = document.createElement('li');
        item.textContent = itemName;
        item.id = itemName;
        item.className = 'result_list_item';
        let deleteButton = document.createElement("a");
        deleteButton.href = "Javascript:void(0)"
        deleteButton.textContent = "delete";
        deleteButton.addEventListener('click', removeItemHandler )
        item.appendChild(deleteButton);
        list.appendChild(item);
    }
}