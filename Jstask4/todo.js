

const tasks=[]

const AddTask = function() {
    const taskName = document.getElementById("taskname").value;
    const priority = document.getElementById("priority").value;

    const task = {taskName: taskName, priority: priority, isEditing: false};

    const isValid = validate(task);

    if (!isValid) {
        alert("Please enter a valid data");
        return;
    }

    tasks.push(task);
    RenderTable();


}


const validate = function(task) {
    if (!task.taskName.trim()) return false;
    if (isNaN(Number(task.priority)) || Number(task.priority) < 1) return false;
    return true;
}


const TableRow = function(i, task) {
    let taskcell, prioritycell, button;

    if (task.isEditing) {
        taskcell = `<input type="text" id="editedTaskName" value="${task.taskName}">`;
        prioritycell = `<input type="number" id="editedPriority" value="${task.priority}">`;
        button = `<button onclick="SaveTask(${i})">save</button>`
    } else {
        taskcell = task.taskName;
        prioritycell = task.priority;
        button = `<button onclick="EditTask(${i})">edit</button>`
    }
    let tr = `<tr><td>${i+1}</td><td>${taskcell}</td><td>${prioritycell}</td>
    <td><button onclick="DeleteTask(${i})">delete</button>
    ${button}</td></tr>`;
    return tr;
}


const RenderTable = function() {
    let tbody = "";
    for (let i = 0; i < tasks.length; i++) {
        tbody += TableRow(i, tasks[i]);
    }
    document.getElementById("NewTask").innerHTML = tbody;
};

const SortTask = function () {
    tasks.sort((a, b) => a.priority - b.priority);
    RenderTable();
};


const DeleteTask = function (i) {
    tasks.splice(i, 1);
    RenderTable();
};

const EditTask = function (i) {
    console.log("Editing task at index:", i, tasks[i].isEditing);
    tasks[i].isEditing = true;
    RenderTable();
};

const SaveTask = function (i) {
    const editedTaskName = document.getElementById("editedTaskName").value;
    const editedPriority = document.getElementById("editedPriority").value;

    const editedTask = {taskName: editedTaskName, priority: editedPriority, isEditing: false};

    const isValid = validate(editedTask);

    if (!isValid) {
        alert("Please enter a valid data");
        return;
    }

    tasks[i] = editedTask;
    RenderTable();
};
