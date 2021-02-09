import util from './utilities.js'
import ls from './ls.js'


class Todos {
  constructor() {
    this.storage = new ls();
    let addTask = document.getElementById('addTask');
    addTask.addEventListener('click', () => { this.newTodo() });
    let filterAll = document.getElementById('filterAll');
    filterAll.addEventListener('click', () => { this.showAll() });
    let filterActive = document.getElementById('filterActive');
    filterActive.addEventListener('click', () => { this.showActive() });
    let filterCompleted = document.getElementById('filterCompleted');
    filterCompleted.addEventListener('click', () => { this.showCompleted() });
  }

  animatedAddToList = (todo, j=-1) => {
    let newElement = this.createTodoElement(todo);
    if(j == -1){
      taskList.appendChild(newElement);
    }
    else{
      taskList.insertBefore(newElement, taskList.children[j]);
    }
    newElement.classList.toggle("hidden");
    setTimeout(() => {
      newElement.classList.toggle("hidden");
    }, 1);
  }

  showAll = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b)=> { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    
    let taskList = document.getElementById('taskList');    
    for (let j = 0; j < todos.length; j++){          
      let todo = todos[j];
      var child = taskList.children[j];
      if(child === undefined){
        this.animatedAddToList(todo);
        continue;
      }
      if (child.attributes['data-id'] == todo.id) {
        continue;
      }
      this.animatedAddToList(todo,j);
    }      
  }  

  showActive = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b)=> { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    
    let taskList = document.getElementById('taskList');
    for (let j = 0; j < todos.length; j++){          
      let todo = todos[j];
      let child = taskList.children[j];

      if(child === undefined && todo.completed == false){
        this.animatedAddToList(todo);
        continue;
      }
      else if (child.attributes['data-id'] == todo.id && todo.completed == true) {
        child.classList.toggle("hidden");                   
        setTimeout(() => {
          taskList.removeChild(child);
        }, 333)
        continue;
      }
      else if (child.attributes['data-id'] == todo.id && todo.completed == false) {
        continue;
      }
      this.animatedAddToList(todo,j);
    }      
  }

  showCompleted = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b)=> { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    
    let taskList = document.getElementById('taskList');
    for (let j = 0; j < todos.length; j++){          
      let todo = todos[j];
      let child = taskList.children[j];

      if(child === undefined && todo.completed == true){
        this.animatedAddToList(todo);
        continue;
      }
      else if (child.attributes['data-id'] == todo.id && todo.completed == false) {
        child.classList.toggle("hidden");                   
        setTimeout(() => {
          taskList.removeChild(child);
        }, 333)
        continue;
      }
      else if (child.attributes['data-id'] == todo.id && todo.completed == true) {
        continue;
      }
      this.animatedAddToList(todo,j);
    }         
  }

  loadTodos = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b)=> { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    todos.forEach(todo => {
      this.addTodo(todo);
    });
  }

  addTodo = (todo) => {
    let todoElement = this.createTodoElement(todo);
    let taskList = document.getElementById('taskList');
    todoElement.classList.toggle("hidden");
    taskList.appendChild(todoElement);    
    setTimeout(() => {
      todoElement.classList.toggle("hidden");
    }, 1)
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
        child.classList.toggle("hidden");        
        this.storage.deleteTodo(id);        
        setTimeout(() => {
          taskList.removeChild(child);
        }, 333)
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

