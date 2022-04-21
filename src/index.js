const DOMStuff = (function() {
    const body = document.querySelector('body');

    const addList = (listName) => {
        const div_sidebar = document.querySelector('.sidebar');

        const div_list = document.createElement('div');
        div_list.classList.add(listName)

        const input = document.createElement('input');
        input.name = "listName";
        input.type = "radio";
        input.id = listName;
        input.checked = "checked";

        const label = document.createElement('label');
        label.htmlFor = listName;
        label.innerText = listName;


        div_list.appendChild(input);
        div_list.appendChild(label);
        div_sidebar.appendChild(div_list);
    }

    


    return {addList};
})();


const EventListeners = (function() {
    document.querySelector('.sidebar .add-button').addEventListener('click', () => {
        alert('clicked');
    })
})();

DOMStuff.addList("list2");
DOMStuff.addList("list3");
DOMStuff.addList("list4");
DOMStuff.addList("list5");


