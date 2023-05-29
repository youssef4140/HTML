const table = document.getElementById('tbody');


function addTask() {
  const task = document.getElementById('task').value;
  const priority = document.getElementById('priority').value;
  let numRows = table.rows.length + 1
  
  if (task === '') {
    alert('Please enter a task name.');
    return;
  }

  if (priority <= 0) {
    alert('Please enter a number higher than zero.');
    return;
  }

  const newRow = `<tr><td>${numRows}</td><td>${task}</td><td>${priority}</td><td><button onclick="deleteTask(this.parentNode.parentNode)" class="btn btn-danger">Delete</button></td></tr>`;
  table.innerHTML += newRow;
  let form = document.getElementById('todo-form');
  form.reset();
}

function deleteTask(row) {
  row.parentNode.removeChild(row);
}