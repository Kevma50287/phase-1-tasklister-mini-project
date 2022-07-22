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
    

    //create dropdown
    htmlform.appendChild(divtag)
    htmlform.appendChild(labeltag)
    htmlform.appendChild(selecttag)
    
    //dynamic creation of options
    for (const key in Priority){
        let optiontag = document.createElement('option')
        optiontag.innerText = key;
        optiontag.value = Priority[key];
        selecttag.appendChild(optiontag)
    }

    //add sortbutton
    htmlform.appendChild(sortbutton)
    sortbutton.addEventListener('click', SortColors)

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


    const AddtoList = (e, newTask) => {

        let ultask = document.getElementById('tasks');

        //assign select priority 
        let prio = e.target.dropdown.value;

        //create li with task description
        let li = document.createElement('li');
        li.innerText = newTask;
        li.style.backgroundColor = prio;
        li.classList.add(position(prio))


        //create del button w/ eventlistener
        let btn = document.createElement('button')
        btn.textContent = ' X ';
        // 

        //attach button to child
        li.appendChild(btn)
        btn.addEventListener('click', Deletion)
        ultask.appendChild(li)
    
        htmlform.reset()
    }

})


const Deletion = (e) => {
    e.target.parentNode.remove();
}


const position = (prio) => {
    const priovalarr = Object.values(Priority)
    return priovalarr.indexOf(prio)
}

const SortColors = () => {
    //grab the elements we'll be modifying
    const ul_task = document.getElementById('tasks')

    //getelementbyID and QuerySelector => return return the node element
    //getelemetnsbytagname, class, or queryslectorall
    const nodearr = document.querySelectorAll('li')

    //turn the array
    let workingArr = Array.from(nodearr)
    workingArr = workingArr.sort((a,b) => {
        //parseInt Classname from string into number
        let c = parseInt(a.className) 
        let d = parseInt(b.className)
        console.log(a, b)
        if (c < d){
            return -1
          } else if (c > d){
            return 1
          } else {
            return 0
          }
        }
        )
    while (ul_task.firstChild){
        ul_task.removeChild(ul_task.firstChild);
        }
    workingArr.forEach((element) => {ul_task.appendChild(element)})

}   

//global object container for assignment of color and sorting value
const Priority = {
    High: 'red',
    Medium:'yellow',
    Low: 'green',
}



