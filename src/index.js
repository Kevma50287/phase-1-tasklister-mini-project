document.addEventListener("DOMContentLoaded", (event) => {
  // your code here

  //create a constant that points to the form node element
  const htmlform = document.querySelector('form');

  // for each item in priority, we will append a ul to the task ul with a the corresponding class color
  // for (const key in colorvalue) {
  //   let ul = document.createElement('ul');
  //   ul.className = `${colorvalue[key]}`;
  //   document.getElementById('tasks').appendChild(ul)
  // };

  //Creating select tag with ID and Name
  let selecttag = document.createElement('select')
  selecttag.id = 'task-color';
  selecttag.name = 'task-color';

  //div tag
  let divtag = document.createElement('div')

  //create label tag
  let labeltag = document.createElement('label')
  labeltag.for = 'task-color';
  labeltag.innerText = 'Priority: ';

  //append select tag to the form
  htmlform.appendChild(divtag)
  htmlform.appendChild(labeltag)
  htmlform.appendChild(selecttag)

  //for each key in options, create an option tag
  for (const key in colorvalue) {
    let optiontag = document.createElement('option')
    optiontag.innerText = key;
    optiontag.id = key;
    optiontag.value = key;
    htmlform['task-color'].appendChild(optiontag);
  }

  //sort button
  let sortbutton = document.createElement('button')
  sortbutton.innerText = 'Sort by Priority'
  sortbutton.id = 'sortbtn'
  htmlform.appendChild(sortbutton)

  //addeventlistenr to sortbutton click
  document.getElementById('sortbtn').addEventListener('click', (e) => SortColors(e))

  //event listening for selection change
  selecttag.addEventListener('change', () => colorkey = selecttag.value);


  //addeventlistener to whenever a submit event occurs within the form element. 
  htmlform.addEventListener("submit", (e) =>{

    //we negate the default action, and replace it with a new function
    e.preventDefault();

    //take value of description input and assign it to newTask, then pass it to a function that will add that value to a list
    newTask = document.getElementById('new-task-description').value;

    //only allow submission if text is not empty
    if (newTask !== ''){
    AddtoList(newTask, e)
    };
  });


  //allow editting

});

//Add newTask to List
const AddtoList = (newTask, e) => {

  // const declarations for creation of li and btn
  let li = document.createElement('li');
  let delbtn = document.createElement('button');

  //whenever delbtn is clicked, we delete the item
  delbtn.textContent = 'X';
  delbtn.addEventListener("click", DeleteItem);

  //created a P element with newtask as the content
  li.textContent = `${newTask}`;

  //add a button to the p element
  li.appendChild(delbtn);

  //change the background color of the generated p elment based on priority
  li.style.backgroundColor = colorvalue[colorkey]['col'];

  //appends P to tasks, or the ul element for div color sort version
  // document.getElementsByClassName(colorvalue[colorkey])[0].appendChild(li);

  document.getElementById('tasks').appendChild(li);

  //creates an object for each appended item, and saves it to a global array for sorting
  const objectholder = {};
  objectholder.description = `${newTask}`;
  objectholder.value = colorvalue[colorkey]['value'];
  objectholder.priority = colorvalue[colorkey];
  unsortArray.push(objectholder)

  //resets value
  e.target.reset()

  colorkey= 'High'
}

//e.target references the object from which the event was performed. this object (the delbtn) is nested within p 
//see above for p.append(delbtn)
// to remove we reference the parent of delbtn (p) and then remove. this will remove the p element and everything inside
const DeleteItem = (e) => {
  console.log(e, e.target, e.target.parentNode)
  e.target.parentNode.remove();
} 

// create function to sort the list after adding a new element
const SortColors = (e) => {
  // for (let j = 0; j < array.length; index++) {
  //   for (let index = 0; index > (unsortArray.length - 1 - j); index++) {
  //     if (unsortArray[index].value > unsortArray[i+1].value){
  //       swap(unsortArray[index], unsortArray[index+1])
  //     }
  // })

  //the callback funtion to the sort array method
  let sortfunction = (a, b) => {
    if (a.value < b.value){
      return -1
    } else if (a.value > b.value){
      return 1
    } else {
      return 0
    }
  }

  //sorts the unsorted array
  const sortedArray = unsortArray.sort(sortfunction)
  
  //get the #tasks ul element
  const ul_task = document.getElementById('tasks')

  //removes all the child elements
  while (ul_task.firstChild){
    ul_task.removeChild(ul_task.firstChild);
  }

  //creates a new li element to add to the DOM based on sorted array
  for (const key in sortedArray){
    let newli = document.createElement('li');
    newli.textContent = sortedArray[key]['description'];
    console.log(sortedArray[key]['priority'] )
    newli.style.backgroundColor = sortedArray[key]['priority']['col']
    let delbtn = document.createElement('button');
    delbtn.textContent = 'X';
    delbtn.addEventListener("click", DeleteItem);
    newli.append(delbtn)
    ul_task.appendChild(newli);
  }

  unsortArray = sortedArray
  return sortedArray
}
  

// created an object color value to hold keys for priority level, and corresponding color
const colorvalue = {
  'High':{
    col:'red',
    value:1
  },
  'Medium':{
    col:'yellow',
    value:2
  },
  'Low':{
    col:'green',
    value:3,
  }
};

//global variable whose values change depending on selection of the priority
let colorkey = 'High';

let unsortArray = []
















