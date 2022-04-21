const DOMStuff = (function() {
    const body = document.querySelector('body');
    
    let listCount = 0;

    const addList = () => {
        const div_sidebar = document.querySelector('.sidebar');

        const div_list = document.createElement('div');
        // div_list.classList.add(listName)

        const input_radio = document.createElement('input');
        input_radio.name = "listName";
        input_radio.type = "radio";
        input_radio.id = listCount;
        input_radio.checked = "checked";

        const label = document.createElement('label');
        label.htmlFor = listCount;

        const input_text = document.createElement('input');
        input_text.type = "text";
        input_text.placeholder = "Untitled";
        input_text.maxLength = 15;
        input_text.id = listCount;


        label.appendChild(input_text);
        div_list.appendChild(input_radio);
        div_list.appendChild(label);
        div_sidebar.appendChild(div_list);
        input_text.focus(); 
        input_text.select();

        listCount++;

    }

    const updateListName = (e, listName) => {
        e.classList
    }

    return {addList};
})();


const EventListeners = (function() {
    document.querySelector('.sidebar .add-button').addEventListener('click', () => {
        DOMStuff.addList();
    })
})();


// document.querySelector('input#test').addEventListener('keyup', (e) => {
//     console.log(e.target.value);
// })

