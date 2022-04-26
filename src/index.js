

const DOMStuff = (function() {
    const body = document.querySelector('body');
    const div_content = document.querySelector('.content');
    const div_softBackground = document.querySelector('.soft-background');
    const div_confirmDelete = document.querySelector('.confirm-delete');
    const div_yesDelete = document.querySelector('#yes-delete');
    const div_listHeader = document.querySelector('.content header');
    
    let selectedToDelete = '';


    const ToggleConfirmDelete = () => {
        document.querySelector('#delete-background').classList.toggle('hidden');
        div_confirmDelete.classList.toggle('hidden');
    }

    const ToggleAddNewItem = () => {
        document.querySelector('#new-item-background').classList.toggle('hidden');
        document.querySelector('.new-item').classList.toggle('hidden');
    }

    const deleteList = () => {
        selectedToDelete.remove();
        if (selectedToDelete.querySelector('input').checked) {
            document.querySelector('.sidebar > div > input').checked = true;
        }
    }

    const addList = (list) => {

        const div_sidebar = document.querySelector('.sidebar');


        const div_list = document.createElement('div');
        div_list.setAttribute('class', 'to-do-list');
        const test = `
            <input name="listName" type="radio" id="${list.listID}">
            <label for="${list.listID}">
                <input type="text" value="${list.name}" placeholder="Untitled" maxlength="15" id="${list.listID}">
                <i class="material-icons" id="delete-${list.listID}">delete</i>
            </label>`;
        div_list.innerHTML = test;


        
        const div_listPage = document.createElement('div');
        div_listPage.classList.add('list');
        div_listPage.classList.add('hidden');
        div_listPage.setAttribute('data-list', `${list.listID}`);

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



        div_sidebar.appendChild(div_list);
        
        const label = document.querySelectorAll('.sidebar label')[document.querySelectorAll('.sidebar label').length-1];
        label.addEventListener('click', () => {
            StateData.activeToDoListID = label.htmlFor;
            for (i = 0; i < StateData.ToDoLists.length; i++) {
                if (StateData.ToDoLists[i].listID == StateData.activeToDoListID) {
                    StateData.activeToDoList = StateData.ToDoLists[i];
                    StateData.activeToDoListIndex = i;
                };
            }


            label.parentNode.querySelector('input[type="radio"]').checked = true;
            displayActiveList();
        }, {capture:true})


        
        if (StateData.ToDoLists.length == 1) {
            label.querySelector('i').remove();
        } else {
            label.querySelector('i').addEventListener('click', () => {
                StateData.ToDoLists.splice(StateData.activeToDoListIndex, 1);
                displayLists();
                displayActiveList();
                document.querySelector('.sidebar input').checked = true;
            })
        }

        
        

        const input_text = document.querySelectorAll('.sidebar input[type="text"]')[document.querySelectorAll('.sidebar input[type="text"]').length-1];
        input_text.addEventListener('keyup', () => {
            StateData.activeToDoList.name = input_text.value
        })

        document.querySelector('.sidebar input').checked = true;


    }

    const displayItem = (item) => {
        const div_listItem = document.createElement('div');
        div_listItem.setAttribute('class', 'list-item');
        div_listItem.setAttribute('id', `${item.itemID}`);

        div_listItem.innerHTML = `
            <div class="list-left">
                <input type="checkbox" id="check-item">
                <label for="check-item"></label>
                <div class="item-desc">
                    <p class="item-name">${item.task}</p>
                    <p class="due-date"><i class="material-icons">event</i>${item["due-date"]}</p>
                </div>
            </div>
            <div class="delete-item">Delete</div>`;


        switch (item.importance) {
            case 1:
                div_listItem.style.backgroundColor = 'yellow';
            case 2:
                div_listItem.style.backgroundColor = 'orange';
            case 3:
                div_listItem.style.backgroundColor = 'red';
        }

        document.querySelector('.list-content').appendChild(div_listItem);
        div_listItem.addEventListener('click', (e) => {
            let result = StateData.activeToDoList.listItems.find(obj => obj.itemID == e.target.id);
            DOMStuff.ToggleAddNewItem();
            const div_newItem = document.querySelector('.new-item');
            div_newItem.querySelector(`input[value="${result.importance}"]`).checked = true;
            div_newItem.querySelector('#task').value = result.task;
            div_newItem.querySelector('#due-date').value = result["due-date"];

        }, {capture:false})

        document.querySelectorAll('.list-content .delete-item')[document.querySelectorAll('.list-content .delete-item').length-1].addEventListener('click', (e) => {
            let resultIndex = StateData.activeToDoList.listItems.findIndex(obj => obj.itemID == e.target.parentNode.id);
            StateData.activeToDoList.listItems.splice(resultIndex, 1);
            displayActiveList();
            e.stopPropagation();
        })   


    
    }

    const displayLists = () => {
        document.querySelectorAll('.to-do-list').forEach((div) => {div.remove()}); 
        for (list of StateData.ToDoLists) {
            DOMStuff.addList(list);
        }
    }

    const displayActiveList = () => {
        document.querySelector('.list-content').innerHTML = '';
        for (item of StateData.activeToDoList.listItems) {
            DOMStuff.displayItem(item);
        }
    }




    return {addList, displayItem, deleteList, ToggleConfirmDelete, ToggleAddNewItem, displayActiveList, displayLists};
})();


const EventListeners = (function() {

    document.querySelector('.sidebar .add-button').addEventListener('click', ()  => {
        StateData.addToDoList();
        DOMStuff.displayLists();
    });

    document.querySelector('#yes-delete').addEventListener('click', () => {
        DOMStuff.deleteList();
        DOMStuff.ToggleConfirmDelete();
    })


    document.querySelector('#cancel-delete').addEventListener('click', DOMStuff.ToggleConfirmDelete);
    document.querySelector('#delete-background').addEventListener('click', DOMStuff.ToggleConfirmDelete);


    document.querySelector('#new-item-background').addEventListener('click', () => {
        DOMStuff.ToggleAddNewItem();
    })
    document.querySelector('.add-item').addEventListener('click', () => {
        DOMStuff.ToggleAddNewItem();
 
    });

    document.querySelector('.new-item').addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(document.querySelector('form.new-item')).entries());
        formData['checked'] = false;
        formData['itemID'] = StateData.activeToDoList.ItemCount;
        StateData.activeToDoList.ItemCount++;
        StateData.activeToDoList.addListItem(formData);
        console.log(StateData.activeToDoList);

        DOMStuff.ToggleAddNewItem();
        DOMStuff.displayActiveList();
        document.querySelector('.new-item').reset();


    })



})();



const StateData = (function() {


    let listCount = 0;

    const addToDoList = () => ToDoLists.push(ToDoList());

    const ToDoList = () => {
        let ItemCount = 0;
        const listID = listCount;
        const listItems = [];
        let name = "Untitled";
        addListItem = (listItem) => {
            listItems.push(listItem);
            ItemCount++;
            return ItemCount;
        };
        getListItems = () => {return listItems};
        listCount++;
        return {name, listID, listItems, addListItem, getListItems, ItemCount};
    }

    const defaultList = ToDoList();
    let activeToDoList = defaultList;
    let activeToDoListID = 0;
    let activeToDoListIndex = 0;
    let ToDoLists = [defaultList];
    let activeItemID = 0;
    let activeItem = 0;
    let activeItemIndex = 0;


    return {ToDoList, addToDoList, ToDoLists, activeToDoList, activeToDoListID, activeToDoListIndex, listCount};
})();



// Add default to do list
DOMStuff.displayLists();





