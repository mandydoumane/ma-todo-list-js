//Je viens sélectionner mes classes dans le html

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//ECOUTEURS

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo); //ajoute un élément dans la todolist
todoList.addEventListener("click", deleteCheck); //supprimer un élément de la todolist
filterOption.addEventListener("input", filterTodo);


//FONCTIONS

function addTodo(event) {
    event.preventDefault(); //stop l'action du boutton
    // générer une div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //créer le li
    const newTodo = document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item"); // ajouter une class au li
    todoDiv.appendChild(newTodo); // ajoute le nouvel li à la div todoDviv
    //On ajoute la todo au localstorage
    saveLocalTodos(todoInput.value);
    //bouton check
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //bouton supprimer
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //ajouter notre todo à todoList
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }

function deleteCheck(e) {
    //e=event
    const item=e.target;
    //effacer todo
    if (item.classList[0]=="trash-btn") {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    //Check todo
    if (item.classList[0]=="complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }    

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }

function saveLocalTodos(todo) {
    //On check si il y a des items existants sur la page
    let todos;
    // Si il n'y a d'item
    if (localStorage.getItem("todos") === null) {
        // on renvoie une liste vierge
        todos = [];
    } else {
        //On récupère les items existantes
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    //on affiche le contenu
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
      //Todo DIV
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Créer le Li
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //Bouton Check
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Bouton Supprimer
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //AJOUTER NOTRE TODO À TODO-LIST
      todoList.appendChild(todoDiv);
    });
  }

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}