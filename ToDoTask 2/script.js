const tasks = []

function Task(taskname, priority, isEditing) {
    this.taskname = taskname;
    this.priority = priority;
    this.isEditing = false; 
  };


function AddTask() {
    const taskname = document.getElementById("taskname").value;
    const priority = document.getElementById("priority").value;
  
    const task = new Task(taskname, priority);
    Validate(task);
    console.log(tasks);
    RenderTable();
    ResetForm();  
  };
  
function Validate(task){
    return ((task.taskname === "" || task.priority < 1 || isNaN(Number(task.priority))) ? false : true)? tasks.push(task) : alert("insert a valid input");
  };

  function ResetForm (){
    document.getElementById("taskname").value = "";
    document.getElementById("priority").value = "";

  } 
  
  function TableRow(i,task){
    let tr;
    if (task.isEditing == true) {
        tr = `<tr><td>${tasks.indexOf(task)}</td>
        <td><input type="text" name="TaskName" id="editedtaskname" value="${task.taskname}"></td>
        <td><input type="number" name="priority" id="editedpriority" value="${task.priority}"></td>
        <td><button class="tableButton" onclick="DeleteTask(${i})">delete</button>
        <button class="tableButton" onclick="SaveTask(${i})">Save</button>
        <button class="tableButton" onclick="CancelEdit(${i})">Cancel</button></td></tr>`
    } else {
        tr = `<tr><td>${tasks.indexOf(task)}</td>
        <td>${task.taskname}</td>
        <td>${task.priority}</td>
        <td><button class="tableButton" onclick="DeleteTask(${i})">delete</button>
        <button class="tableButton" onclick="EditTask(${i})">Edit</button></td></tr>`

    };
    return tr;

  }

  function RenderTable(){
    let tbody = "";
    for (let i = 0; i < tasks.length; i++){
        tbody+= TableRow(i,tasks[i])
    }
    document.getElementById("NewTask").innerHTML = tbody;
    
  }


  function DeleteTask(i){
    tasks.splice(i, 1);
    RenderTable();
  }
  
  const SortTask = function () {
    tasks.sort((a, b) => a.priority - b.priority);
    RenderTable();
  }

  const EditTask = function(i) {
    tasks[i].isEditing = true;
    console.log(tasks);
    RenderTable();

  }

  const SaveTask = function(i) {
    tasks[i].taskname = document.getElementById("editedtaskname").value;
    tasks[i].priority = document.getElementById("editedpriority").value;
    tasks[i].isEditing = false; 
    RenderTable();
  }

  const CancelEdit = function(i) {
    tasks[i].isEditing = false; 
    RenderTable();

  }
