document.addEventListener('DOMContentLoaded', (e) => {
    //let variables for html elements
    
    let divtag = document.createElement('div')
    
    let labeltag = document.createElement('label')
    labeltag.for = 'dropdown';
    labeltag.innerText = 'Priority: ';
    
    let selecttag = document.createElement('select')
    selecttag.id = 'dropdown';
    selecttag.name = 'dropdown';
    
    let sortbutton = document.createElement('button')
    sortbutton.innerText = 'Sort by Priority'
    sortbutton.id = 'sortbtn'
    
    //get html elements
    const htmlform = document.querySelector('form');
    const ultask = document.getElementById('tasks');

    //create dropdown
    htmlform.appendChild(divtag)
    htmlform.appendChild(labeltag)
    htmlform.appendChild(selecttag)
    
    //dynamic creation of options
    for (const key in Priority){
        let optiontag = document.createElement('option')
        optiontag.innerText = key;
        optiontag.value = Priority[key]['color'];
        selecttag.appendChild(optiontag)
    }

    //add sortbutton
    htmlform.appendChild(sortbutton)
    sortbutton.addEventListener('click', SortColors(e))

    //form eventlistener
    htmlform.addEventListener('submit', (e) => {
        
        //prevent refresh
        e.preventDefault();
        
        //takes description to be added to list
        const newTask = document.getElementById('new-task-description').value;
    
        //prevent empty entries
        if (newTask !== ''){
            AddtoList(e, newTask)
        }
    })

})

const AddtoList = (e, newTask) => {
    //assign select priority 
    let prio = e.target.dropdown.value

    //create li with task description
    let li = document.createElement('li')
    li.innerText = newTask
    li.style.backgroundColor = prio

    //create del button w/ eventlistener
    let btn = document.createElement('button')
    btn.textContent = ' X '
    btn.addEventListener ('click', Deletion(e))

    //attach button to child
    li.appendChild(btn)

    ultask.appendChild(li)

    form.reset()
}

const Deletion = (e) => {
    e.target.parentNode.remove();
}

//global object container for assignment of color and sorting value
const Priority = {
    High:{
        color: 'red',
        value: 1,
    },
    Medium:{
        color: 'yellow',
        value: 2,
    },
    Low:{
        color: 'green',
        value: 3
    }
}

//array for sorting
const sortArray = []