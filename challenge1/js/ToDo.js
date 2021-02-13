import util from './utilities.js'
import ls from './ls.js'


class Todos {

  
  // setup event listeners and class properties
  constructor() {
    this.storage = new ls();
    let taskList = document.getElementById('taskList');
    let newTask = document.getElementById('newTask');
    newTask.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        this.newTodo();
      }
    })
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

  // update the visual active todo count, used when todo is added, removed or completed/uncompleted
  updateTasksLeft = () => {
    let tasksLeft = document.getElementById("tasksLeft");
    tasksLeft.innerText = this.storage.getTodoList().filter(x => x.completed == false).length + " Tasks Left";
  }

  // set j to -1 when added to the end of the list 
  // otherwise set j to the index position for insertion
  animatedAddToList = (todo, j = -1) => {
    let newElement = this.createTodoElement(todo);
    newElement.classList.toggle("hidden");
    if (j == -1) {
      taskList.appendChild(newElement);
    }
    else {
      taskList.insertBefore(newElement, taskList.children[j]);
    }
    // start the animation after the browser has had time to update the DOM  
    setTimeout(() => {
      newElement.classList.toggle("hidden");
    }, 25);
  }

  // update the class and remove the element when the animation is complete.
  animatedRemoveFromList = (element) => {
    element.classList.toggle("hidden");
    setTimeout(() => {
      taskList.removeChild(element);
    }, 333);
  }

  // apply a filter to the system
  setFilter = (filter) => {
    this.currentFilter = filter;
    this.updateFilterButtons();
    this.updateFilter();
  }

  // update styles on filter buttons depending on which is selected
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

  // filter actual html list  
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

  // add any items that aren't in the list inserted in creation order
  // if the html element in the current index doesn't have the same id
  // then it belongs later in the list and can be safely pushed down
  // this could be simpler by clear all item and just inserting actives
  // it was done in this manner to get the visual folding effect when changing filters
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

  // get the html element hold the todo with a given id
  findTodoInTaskList = (id) => {
    for (let j = 0; j < taskList.children.length; j++) {
      if (taskList.children[j].attributes['data-id'] == id) {
        return taskList.children[j];
      }
    }
    return null;
  }

  // insert active todos in order, if they aren't already in the list
  // remove any completed tasks
  // this could be simpler by clear all item and just inserting actives
  // it was done in this manner to get the visual folding effect when changing filters
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

  // insert completed todos in order, if they aren't already in the list
  // remove any active tasks
  // this could be simpler by clear all item and just inserting actives
  // it was done in this manner to get the visual folding effect when changing filters
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

  // load initial todo list
  loadTodos = () => {
    let todos = this.storage.getTodoList();
    todos.sort((a, b) => { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0 });
    todos.forEach(todo => {
      this.addTodo(todo);
    });

    this.updateTasksLeft();
  }

  // remove a specific todo by id
  removeTodo = (e, id) => {
    let todoElement = this.findTodoInTaskList(id);
    if (todoElement != null) {
      this.storage.deleteTodo(id);
      this.animatedRemoveFromList(todoElement);
      this.updateTasksLeft();
    }    
  }

  // mark a todo as completed, update storage and update filtered list
  completeTodo = (e, id) => {
    this.storage.updateTodoStatus(id, e.currentTarget.checked);
    let todoElement = this.findTodoInTaskList(id);
    if (todoElement != null) {
      todoElement.classList.toggle("completed");
      this.updateTasksLeft();
      this.updateFilter();
    } 
  }

  // a todo to the list
  addTodo = (todo) => {
    this.animatedAddToList(todo);
    this.updateTasksLeft();
    this.updateFilter();
  }

  // mange creation of new todo and add it to the list
  newTodo = () => {
    let taskDetail = document.getElementById("newTask");
    let todo = this.createTodo(Date.now(), taskDetail.value, false);
    this.storage.saveTodo(todo);
    this.addTodo(todo)
    taskDetail.value = '';
  }

  // create the actual todo
  createTodo = (id, content, completed) => {
    let todo = { id: id, content: content, completed: completed };
    return todo;
  }

  // create html to display todo information
  createTodoElement = (todo) => {
    let todoDiv = document.createElement('div');
    todoDiv.classList.toggle('todo');
    todoDiv.attributes['data-id'] = todo.id;

    let completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = todo.completed;
    completedCheckbox.id = todo.id;
    completedCheckbox.addEventListener('click', (e) => { this.completeTodo(e, todo.id) })
    todoDiv.appendChild(completedCheckbox);

    let contentSpan = document.createElement('label');
    contentSpan.classList.toggle("task-detail");
    contentSpan.setAttribute('for', todo.id )
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

// do it!
const todo = new Todos();
todo.loadTodos();

