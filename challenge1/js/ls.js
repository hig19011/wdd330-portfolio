export default class ls {

  saveTodo = (todo) => {
    const todoList = this.getTodoList();
    todoList.push(todo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  deleteTodo = (id) => {
    const todoList = this.getTodoList();
    const updatedList = todoList.filter(todo => todo.id != id) ;
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  }

  getTodoList = () => {
    const todoListString = localStorage.getItem('todoList');
    let todoList = [];
    if(todoListString)
      todoList = JSON.parse(todoListString);

    return todoList;
  }

  updateTodoStatus = (id, completed) => {
    const todos = this.getTodoList();
    todos.forEach(todo => {
      if(todo.id == id){
        todo.completed = completed;
        this.deleteTodo(id);
        this.saveTodo(todo);
      }
    });
  }

}