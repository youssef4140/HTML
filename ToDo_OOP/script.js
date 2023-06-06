class Task {
    constructor(taskname, priority, isEditing = false, isDone = false) {
      this.taskname = taskname;
      this.priority = priority;
      this.isEditing = isEditing;
    }
  
    validate() {
      return (
        this.taskname !== "" &&
        this.priority >= 1 &&
        !isNaN(Number(this.priority))
      );
    }
  
    edit() {
      this.isEditing = true;
    }
  
    save(editedTaskName, editedPriority) {
      this.taskname = editedTaskName;
      this.priority = editedPriority;
      this.isEditing = false;
    }
  
    cancel() {
      this.isEditing = false;
    }
    status() {
        this.isDone = !this.isDone;
    }
    printstatus() {
        return (this.isDone)? "Done" : "Pending"
    }
  }
  class TaskManager {
    constructor() {
      this.tasks = [];
    }
  
    AddTask() {
      const taskname = document.getElementById("taskname").value;
      const priority = document.getElementById("priority").value;
      const task = new Task(taskname, priority);
      if (task.validate()) {
        this.tasks.push(task);
        this.renderTable();
        this.resetForm();
      } else {
        alert("Insert a valid input");
      }
    }
  
    delete(i) {
      this.tasks.splice(i, 1);
      this.renderTable();
    }
  
    SortTask() {
      this.tasks.sort((a, b) => a.priority - b.priority);
      this.renderTable();
    }

    changeStatus(i) {
      this.tasks[i].status();
      this.renderTable();

    }

    deleteChecked() {
        const checkboxes = document.getElementsByName("delete");
        for (let i = 0 ; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            this.tasks.splice(checkboxes[i], 1);
          }
        }
        this.renderTable();
      }
  
    getTableRow(i, task) {
      let tr;
      if (task.isEditing == true) {
        tr = `<tr><td>${i}</td>
              <td><input type="text" name="TaskName" id="editedtaskname" value="${task.taskname}"></td>
              <td><input type="number" name="priority" id="editedpriority" value="${task.priority}"></td>
              <td><button class="tableButton" onclick="taskManager.delete(${i})">delete</button>
              <button class="tableButton" onclick="taskManager.saveTask(${i})">Save</button>
              <button class="tableButton" onclick="taskManager.cancelEdit(${i})">Cancel</button></td>
              <td><button class="tableButton" onclick="taskManager.changeStatus(${i})">${task.printstatus()}</button></td>
              <td><input type="checkbox" name="delete"></td></tr>`;

      } else {
        tr = `<tr><td>${i}</td>
              <td>${task.taskname}</td>
              <td>${task.priority}</td>
              <td><button class="tableButton" onclick="taskManager.delete(${i})">delete</button>
              <button class="tableButton" onclick="taskManager.editTask(${i})">Edit</button></td>
              <td><button class="tableButton" onclick="taskManager.changeStatus(${i})">${task.printstatus()}</button></td>
              <td><input type="checkbox" name="delete"></td></tr>`;
              
      }
      return tr;
    }
  
    renderTable() {
      let tbody = "";
      for (let i = 0; i < this.tasks.length; i++) {
        tbody += this.getTableRow(i, this.tasks[i]);
      }
      document.getElementById("NewTask").innerHTML = tbody;
    }
  
    resetForm() {
      document.getElementById("taskname").value = "";
      document.getElementById("priority").value = "";
    }
  
    editTask(i) {
      this.tasks[i].edit();
      this.renderTable();
    }
  
    saveTask(i) {
      const editedTaskName = document.getElementById("editedtaskname").value;
      const editedPriority = document.getElementById("editedpriority").value;
      this.tasks[i].save(editedTaskName, editedPriority);
      this.renderTable();
    }
  
    cancelEdit(i) {
      this.tasks[i].cancel();
      this.renderTable();
    }
  }
  
  const taskManager = new TaskManager();

