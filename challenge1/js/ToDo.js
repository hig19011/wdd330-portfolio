import util from './utilities.js'
import ls from './ls.js'


class Todos {

  filterActive;

  constructor() {
    this.storage = new ls();
    let taskList = document.getElementById('taskList');
    let addTask = document.getElementById('addTask');
    addTask.addEventListener('click', () => { this.newTodo() });
    let filterAll = document.getElementById('filterAll');
    filterAll.addEventListener('click', () => { this.setFilter('all') });
    let filterActive = document.getElementById('filterActive');
    filterActive.addEventListener('click', () => { this.setFilter('active') });
    let filterCompleted = document.getElementById('filterCompleted');
    filterCompleted.addEventListener('click', () => { this.setFilter('completed') });
    let currentFilter = 'all';
  }

  updateTasksLeft = () => {
    let tasksLeft = document.getElementById("tasksLeft");
    tasksLeft.innerText = this.storage.getTodoList().filter(x => x.completed == false).length + " Tasks Left";
  }

  animatedAddToList = (todo, j = -1) => {
    let newElement = this.createTodoElement(todo);
    newElement.classList.toggle("hidden");
    if (j == -1) {
      taskList.appendChild(newElement);
    }
    else {
      taskList.insertBefore(newElement, taskList.children[j]);
    }
   //newElement.classList.toggle("hidden");
    setTimeout(() => {
      newElement.classList.toggle("hidden");
    }, 25);
  }

  animatedRemoveFromList = (element) => {
    element.classList.toggle("hidden");
    setTimeout(() => {
      taskList.removeChild(element);
    }, 333);
  }

  setFilter = (filter) => {
    this.currentFilter = filter;
    this.updateFilterButtons();
    this.updateFilter();
  }

  updateFilterButtons() {
    switch (this.currentFilter) {
      case "active":
        filterAll.classList.remove("filter-active");
        filterActive.classList.add("filter-active");
        filterCompleted.classList.remove("filter-active");
        break;
      case "completed":
        filterAll.classList.remove("filter-active");
        filterActive.classList.remove("filter-active");
        filterCompleted.classList.add("filter-active");
        break;
      case "all":
        filterAll.classList.add("filter-active");
        filterActive.classList.remove("filter-active");
        filterCompleted.classList.remove("filter-active");
        break;
    }
  }

  updateFilter() {
    switch (this.currentFilter) {
      case "active":
        this.showActive();
        break;
      case "completed":
        this.showCompleted();
        break;
      case "all":
        this.showAll();
        break;
    }
  }

  showAll = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b) => { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    for (let j = 0; j < todos.length; j++) {
      let todo = todos[j];
      var child = taskList.children[j];
      if (child === undefined) {
        this.animatedAddToList(todo);
        continue;
      }
      if (child.attributes['data-id'] == todo.id) {
        continue;
      }
      this.animatedAddToList(todo, j);
    }
  }

  findTodoInTaskList = (id) => {
    for (let j = 0; j < taskList.children.length; j++) {
      if (taskList.children[j].attributes['data-id'] == id) {
        return taskList.children[j];
      }
    }
    return null;
  }

  showActive = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b) => { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    let activeTodos = todos.filter(x => x.completed == false);
    let completedTodos = todos.filter(x => x.completed == true);

    for (let i = 0; i < activeTodos.length; i++) {
      if (this.findTodoInTaskList(activeTodos[i].id) == null)
        this.animatedAddToList(activeTodos[i]);
    }

    for (let i = 0; i < completedTodos.length; i++) {
      let todoElement = this.findTodoInTaskList(completedTodos[i].id);
      if (todoElement != null) {
        this.animatedRemoveFromList(todoElement);
      }
    }

  }

  showCompleted = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b) => { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    let activeTodos = todos.filter(x => x.completed == false);
    let completedTodos = todos.filter(x => x.completed == true);

    for (let i = 0; i < completedTodos.length; i++) {
      if (this.findTodoInTaskList(completedTodos[i].id) == null)
        this.animatedAddToList(completedTodos[i]);      
    }

    for (let i = 0; i < activeTodos.length; i++) {
      let todoElement = this.findTodoInTaskList(activeTodos[i].id);
      if (todoElement != null) {
        this.animatedRemoveFromList(todoElement);
      }      
    }
  }

  loadTodos = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b) => { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    todos.forEach(todo => {
      this.addTodo(todo);
    });

    this.updateTasksLeft();
  }

  removeTodo = (e, id) => {
    let todoElement = this.findTodoInTaskList(id);
    if (todoElement != null) {
      this.storage.deleteTodo(id);
      this.animatedRemoveFromList(todoElement);
      this.updateTasksLeft();
    }    
  }

  completeTodo = (e, id) => {
    this.storage.updateTodoStatus(id, e.currentTarget.checked);
    let todoElement = this.findTodoInTaskList(id);
    if (todoElement != null) {
      todoElement.classList.toggle("completed");
      this.updateTasksLeft();
      this.updateFilter();
    } 
  }

  addTodo = (todo) => {
    this.animatedAddToList(todo);
    this.updateTasksLeft();
    this.updateFilter();
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
    completedCheckbox.addEventListener('click', (e) => { this.completeTodo(e, todo.id) })
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

    if (todo.completed) {
      todoDiv.classList.toggle('completed');
    }

    return todoDiv
  }

}

const todo = new Todos();
todo.loadTodos();

