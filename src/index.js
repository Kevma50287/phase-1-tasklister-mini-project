document.addEventListener("DOMContentLoaded", (event) => {
  // your code here
  const htmlform = document.querySelector('form');
  htmlform.addEventListener("submit", (e) =>{
    e.preventDefault();
    newTask = document.getElementById('new-task-description').value;
    AddtoList(newTask);
  })
  //for practice JS implementation lines 9 - 27
  /* //creates label and select tag
  let selecttag = document.createElement('select');
  let labeltag = document.createElement('label');
  labeltag.textContent = 'Priority';

  //appends the labeltag and selecttag after form elements
  htmlform.after(labeltag, selecttag);

  //array of options
  const optionlist = ['High', 'Medium', 'Low'];

  //for each option, we create an option tag, give it the text and value of the item in array
  optionlist.forEach((item) => {
    let optiontag = document.createElement('option');
    optiontag.value = item;
    optiontag.textContent = item;
    let select = document.querySelector('select')
    select.appendChild(optiontag);
  }) */
  //
});


const AddtoList = (newTask) => {
  let p = document.createElement('p');
  let delbtn = document.createElement('button');
  delbtn.textContent = 'X';
  delbtn.addEventListener("click", DeleteItem);
  p.textContent = `${newTask}`;
  p.appendChild(delbtn);
  p.style.backgroundColor = colorvalue[colorkey];
  document.getElementById('tasks').appendChild(p);
}

const DeleteItem = (e) => {
  e.target.parentNode.remove();
} 

const colorvalue={
  '':'white',
  'High':'red',
  'Medium':'yellow',
  'Low':'green',
};


let colorkey;

//event listening for selection change
document.getElementById('task-color').addEventListener('change', () => colorkey = document.getElementById('task-color').value);






