const DOMStuff = (function() {
    const body = document.querySelector('body');
    
    let listCount = 1;

    const addList = () => {
        const div_sidebar = document.querySelector('.sidebar');

        const div_list = document.createElement('div');

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

        const i_delete = document.createElement('i');
        i_delete.classList.add('material-icons');
        i_delete.innerText = 'delete';
        i_delete.setAttribute('id', `delete-${listCount}`);
        i_delete.addEventListener('click', function(e) {
            e.target.parentNode.parentNode.remove();
            // console.log(document.querySelector('.sidebar > * > input'));
            console.log(e.target.parentNode.parentNode.querySelector('input').checked)
            if (e.target.parentNode.parentNode.querySelector('input').checked) {
                document.querySelector('.sidebar > div > input').checked = true;
            }
            
        });


        label.appendChild(input_text);
        label.appendChild(i_delete);
        div_list.appendChild(input_radio);
        div_list.appendChild(label);
        div_sidebar.appendChild(div_list);
        input_text.focus(); 
        input_text.select();

        listCount++;

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

