

const DOMStuff = (function() {
    const body = document.querySelector('body');
    const div_content = document.querySelector('.content');
    const div_softBackground = document.querySelector('.soft-background');
    const div_confirmDelete = document.querySelector('.confirm-delete');
    const div_yesDelete = document.querySelector('#yes-delete');
    const div_listHeader = document.querySelector('.content header');
    
    let listCount = 1;
    let activeListID = 0;
    let selectedToDelete = '';

    const hideConfirmDelete = () => {
        div_softBackground.classList.add('hidden');
        div_confirmDelete.classList.add('hidden');
    }

    const showConfirmDelete = () => {
        div_softBackground.classList.remove('hidden');
        div_confirmDelete.classList.remove('hidden');
    }

    const deleteList = () => {
        selectedToDelete.remove();
        console.log(selectedToDelete.querySelector('input').checked)
        if (selectedToDelete.querySelector('input').checked) {
            document.querySelector('.sidebar > div > input').checked = true;
        }
    }

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
        label.addEventListener('click', (e) => {
            activeListID = e.target.htmlFor
            document.querySelector(`div[data-list="${activeListID}"]`).classList.remove('hidden');



        });

        const input_text = document.createElement('input');
        input_text.type = "text";
        input_text.placeholder = "Untitled";
        input_text.maxLength = 15;
        input_text.id = listCount;
        input_text.addEventListener('keyup', (e) => {
            console.log(e.target.value);
            div_listHeader.innerText = e.target.value;
        })

        const i_delete = document.createElement('i');
        i_delete.classList.add('material-icons');
        i_delete.innerText = 'delete';

        i_delete.setAttribute('id', `delete-${listCount}`);
        i_delete.addEventListener('click', function(e) {
            selectedToDelete = e.target.parentNode.parentNode;
            showConfirmDelete();
        });
        
        
        const div_listPage = document.createElement('div');
        div_listPage.classList.add('list');
        div_listPage.classList.add('hidden');
        div_listPage.setAttribute('data-list', listCount);

        const header_listTitle = document.createElement('header');
        header_listTitle.innerText = 'To-Do List';
        const i_addCircle = document.createElement('i');
        i_addCircle.classList.add('material-icons');
        i_addCircle.classList.add('add');
        i_addCircle.innerText = 'add_circle_outline';
        const div_listPageContent = document.createElement('div');
        div_listPageContent.classList.add('list-content');

        div_content.appendChild(div_listPage);
        div_listPage.appendChild(header_listTitle);
        div_listPage.appendChild(i_addCircle);
        div_listPage.appendChild(div_listPageContent);




        label.appendChild(input_text);
        label.appendChild(i_delete);
        div_list.appendChild(input_radio);
        div_list.appendChild(label);
        div_sidebar.appendChild(div_list);
        input_text.focus(); 
        input_text.select();

        listCount++;
    }

    const addItem = () => {
        const div_listItem = document.createElement('div');
        div_listItem.setAttribute('class', 'list-item');
        div_listItem.innerHTML = `
            <div class="list-left">
                <input type="checkbox" id="check-item">
                <label for="check-item"></label>
                <div class="item-desc">
                    <p class="item-name">Get groceries</p>
                    <p class="due-date">
                        <i class="material-icons">event</i>Sat, Mar 24
                    </p>
                </div>
            </div>
            <div class="delete-item">Delete</div>`;
        document.querySelector('.list-content').appendChild(div_listItem);
    }

    // const displayItemModal = () => {

    // }



    return {addList, addItem, deleteList, hideConfirmDelete, selectedToDelete, div_softBackground};
})();


const EventListeners = (function() {

    document.querySelector('.sidebar .add-button').addEventListener('click', DOMStuff.addList);
    document.querySelector('#yes-delete').addEventListener('click', () => {
        DOMStuff.deleteList();
        DOMStuff.hideConfirmDelete();
    })
    document.querySelector('#cancel-delete').addEventListener('click', DOMStuff.hideConfirmDelete);
    DOMStuff.div_softBackground.addEventListener('click', DOMStuff.hideConfirmDelete);
    document.querySelector('.add-item').addEventListener('click', () => {
        DOMStuff.addItem();
    });

})();

const StateData = (function() {

    const ToDoItem = (description, dueDate, importance, checked) => {
        return {description, dueDate, importance, checked}
    }
    
    const ToDoList = (name) => {
        const listItems = []
        addListItem = (listItem) => listItems.push(listItem);
        getListItems = () => {return listItems};
        return {name, addListItem, getListItems};
    }

    return {ToDoItem, ToDoList};
})();








