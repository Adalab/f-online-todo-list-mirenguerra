"use strict";

const taskListEl = document.querySelector(".Card__main-list");

let tasksList = ["Tarea 1", "Tarea 2", "Tarea 3"];

function printList() {
  for (let i = 0; i < tasksList.length; i++) {

    const newTask = document.createElement("li");
    newTask.id = i;
    newTask.classList.add(".Card__main-element");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.name = "task";
    taskCheckbox.id = i;
    taskCheckbox.checked = false;
    taskCheckbox.classList.add(".Card__main-element-checkbox");

    const taskName = document.createElement("p");
    taskName.classList.add(".Card__main-element-name");
    const newTaskName = document.createTextNode(tasksList[i]);
    taskName.appendChild(newTaskName);

    newTask.appendChild(taskCheckbox);
    newTask.appendChild(taskName);
    taskListEl.appendChild(newTask);
  }
}
printList();