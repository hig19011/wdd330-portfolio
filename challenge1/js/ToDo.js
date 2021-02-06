import util from './utilities.js'
import ls from './ls.js'


class Todos {
  constructor() {
    this.storage = new ls();
    let addTask = document.getElementById('addTask');
    addTask.addEventListener('click', () => { this.newTodo() });
  }

  loadTodos = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b)=> { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 })
    todos.forEach(todo => {
      this.addTodo(todo);
    });
  }

  addTodo = (todo) => {
    let todoElement = this.createTodoElement(todo);
    let taskList = document.getElementById('taskList');
    taskList.appendChild(todoElement);
    setTimeout(function() {
      todoElement.classList.toggle("show");
    }, 10);
  }

  newTodo = () => {
    let taskDetail = document.getElementById("newTask");
    let todo = this.createTodo(Date.now(), taskDetail.value, false);
    this.storage.saveTodo(todo);
    this.addTodo(todo)
    taskDetail.value = '';
  }

  createTodo = (id, content, completed) => {
    let todo = { id: id, content: content, completed: completed };
    return todo;
  }

  createTodoElement = (todo) => {
    let todoDiv = document.createElement('div');
    todoDiv.classList.toggle('todo');
    todoDiv.attributes['data-id'] = todo.id;

    let completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = todo.completed;
    completedCheckbox.addEventListener('click', (e) => {this.completeTodo(e,todo.id)})
    todoDiv.appendChild(completedCheckbox);

    let contentSpan = document.createElement('span');
    contentSpan.classList.toggle("task-detail");
    contentSpan.innerText = todo.content;
    todoDiv.appendChild(contentSpan);

    let removeButton = document.createElement('span');
    removeButton.innerText = "X";
    removeButton.addEventListener('click', (e) => { this.removeTodo(e, todo.id) });
    removeButton.classList.toggle("btn");
    removeButton.classList.toggle("remove-task");
    todoDiv.appendChild(removeButton);

    if(todo.completed){
      todoDiv.classList.toggle('completed');
    }

    return todoDiv
  }

  removeTodo = (e, id) => {
    let taskList = document.getElementById('taskList');
    for (let i = 0; i < taskList.children.length; i++) {
      var child = taskList.children[i];
      if (child.attributes['data-id'] == id) {
        this.storage.deleteTodo(id);
        taskList.removeChild(child);
        break;
      }
    }
  }

  completeTodo = (e,id) => {
    let taskList = document.getElementById('taskList');    
    this.storage.updateTodoStatus(id, e.currentTarget.checked);  
    for (let i = 0; i < taskList.children.length; i++) {
      var child = taskList.children[i];
      if (child.attributes['data-id'] == id) {
        child.classList.toggle("completed");
        break;
      }
    }
  }
}

const todo = new Todos();
todo.loadTodos();

