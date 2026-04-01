let displayAddNewTask = document.getElementById("displayAddNewTask");
let inputSection = document.getElementById("inputSection");
let taskInput = document.getElementById("taskInput");
let alarmInput = document.getElementById("alarmInput");
let closeInputSectionBtn = document.getElementById("closeInputSectionBtn");
let displaysetAlarm = document.getElementById("displaysetAlarm");
let setAlarmTime = document.getElementById("setAlarmTime");
let alarmTimeDisplay = document.getElementById("alarmTimeDisplay");
let closealarmSectionBtn = document.getElementById("closealarmSectionBtn");
let alarmPlaceHolder = document.getElementById("alarmPlaceHolder");
let alarmPlaceHolderSection = document.getElementById("alarmPlaceHolderSection");
let addTaskBtn = document.getElementById("addTaskBtn");
let removeSettedAlarmBtn = document.getElementById("removeSettedAlarmBtn");
let incompleteTaskList = document.getElementById("incompleteTaskList");
let completedTaskList = document.getElementById("completedTaskList");
let noItems = document.getElementById("noItems");
let listDiplay = document.getElementById("taskContainer");
let searchInputSection = document.getElementById("searchSection");
let searchInput = document.getElementById("searchInput");
let listDiscription = document.getElementById("listDiscription");
let closeEditSectionBtn = document.getElementById("closeEditSectionBtn");
let editTaskInput = document.getElementById("editTaskInput");
let editAlarmInput = document.getElementById("editAlarmInput");
let saveEditedTaskBtn = document.getElementById("saveEditedTaskBtn");
let currentEditId = null;
let toDoLists = JSON.parse(localStorage.getItem('myTasks') || '[]');
const syncLocalStorage = () => {
    localStorage.setItem('myTasks', JSON.stringify(toDoLists));
};
const DisplayAddNewTaskSection = () => {
    inputSection.style.display = "block";
};
const closeInputSectionFun = () => {
    taskInput.value = "";
    alarmInput.value = "";
    alarmPlaceHolder.textContent = "";
    alarmTimeDisplay.style.display = "none";
    inputSection.style.display = "none";
};
const DispalyAlarmSectionFun = () => {
    alarmTimeDisplay.style.display = "block";
};
const closeAlarmSection = () => {
    alarmTimeDisplay.style.display = "none";
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
};
const closeEditSecFun = () => {
    editTaskInput.value = '';
    editAlarmInput.value = '';
    document.getElementById("editTasks").style.display = 'none';
};
const removeSettedAlarmFun = () => {
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
    alarmPlaceHolderSection.style.display = 'none';
};
const closeAddTaskModal = () => {
    taskInput.value = '';
    alarmInput.value = '';
    alarmPlaceHolder.textContent = '';
    alarmPlaceHolderSection.style.display = 'none';
    taskInput.style.display = 'block';
    addTaskBtn.style.display = 'block';
    alarmTimeDisplay.style.display = 'none';
};
const SetAlarm = () => {
    const alarmTime = alarmInput.value;
    if (!alarmTime) {
        alert("Please select a date and time");
        return;
    }
    alarmPlaceHolder.textContent = alarmInput.value.replace('T', ' ');
    alarmPlaceHolderSection.style.display = 'flex';
    alarmPlaceHolderSection.style.width = '250px';
    alarmPlaceHolderSection.style.justifyContent = 'center';
    alarmTimeDisplay.style.display = "none";
    inputSection.style.display = 'flex';
    displaysetAlarm.style.display = "inline-block";
    displaysetAlarm.style.marginTop = "10px";
    addTaskBtn.style.display = "inline-block";
    addTaskBtn.style.marginTop = "10px";
    taskInput.style.display = 'block';
};
const SaveTaskFun = () => {
    const taskDescription = taskInput.value.trim();
    const alarmTime = alarmInput.value ? alarmInput.value.replace('T', ' ') : null;
    if (!taskDescription) {
        alert("Please enter a task name!");
        return;
    }
    let countId = toDoLists.length > 0 ? (toDoLists[toDoLists.length - 1]?.id ?? 0) + 1 : 1;
    const newTask = {
        id: countId,
        description: taskDescription,
        alarmTime: alarmInput.value ? alarmInput.value.replace('T', ' ') : null,
        completed: false
    };
    toDoLists.push(newTask);
    console.log("myTasks:", toDoLists);
    syncLocalStorage();
    renderTasks();
    closeAddTaskModal();
};
const toggleTask = (id) => {
    const task = toDoLists.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        syncLocalStorage();
        const currentSearch = searchInput.value;
        renderTasks(currentSearch);
    }
};
window.toggleTask = toggleTask;
const renderTasks = (searchTerm = "") => {
    incompleteTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';
    const filteredList = toDoLists.filter(task => task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const pendingTasks = filteredList.filter(t => !t.completed);
    const doneTasks = filteredList.filter(t => t.completed);
    if (listDiplay) {
        if (toDoLists.length > 0) {
            listDiplay.style.display = 'flex';
            listDiplay.style.justifyContent = 'space-around';
            noItems.style.display = 'none';
            searchInputSection.style.display = 'flex';
        }
        else {
            listDiplay.style.display = 'none';
            noItems.style.display = 'block';
            searchInputSection.style.display = 'none';
        }
    }
    const createLi = (task) => {
        const li = document.createElement("li");
        li.className = "lists";
        const textStyle = task.completed ? 'text-decoration: line-through; opacity: 0.6;' : '';
        const displayTime = task.alarmTime ? task.alarmTime.replace('T', ' ') : "No alarm";
        li.innerHTML = `
            <div style="display: flex; align-items: center; width: 100%;">
                <input type="checkbox" class="checkbox-round" 
                    ${task.completed ? 'checked' : ''} 
                    onclick="toggleTask(${task.id})">
                
                <div onclick="openEditModal(${task.id})" style="margin-left: 12px; cursor: pointer; flex-grow: 1;">
                    <span style="${textStyle}">${task.description}</span><br>
                    <small style="font-size: 0.8em; color: #aaa;">${displayTime}</small>
                </div>

                <i class="fa-solid fa-trash" style="color: red; cursor: pointer;" 
                onclick="deleteTask(${task.id})"></i>
            </div>
        `;
        return li;
    };
    pendingTasks.forEach(task => incompleteTaskList.appendChild(createLi(task)));
    doneTasks.forEach(task => completedTaskList.appendChild(createLi(task)));
};
const searchTasks = () => {
    searchInput.addEventListener("input", () => {
        renderTasks(searchInput.value);
    });
};
const createAlert = () => {
    setInterval(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
        toDoLists.forEach(task => {
            if (!task.completed && task.alarmTime === currentTimeString) {
                alert(`ALARM: ${task.description.toUpperCase()}!`);
                task.alarmTime = "Alarm played";
                syncLocalStorage();
                renderTasks();
            }
        });
    }, 1000);
};
const deleteTask = (id) => {
    toDoLists = toDoLists.filter(t => t.id !== id);
    syncLocalStorage();
    renderTasks(searchInput.value);
};
const openEditModal = (id) => {
    const task = toDoLists.find(t => t.id === id);
    if (task) {
        currentEditId = id;
        editTaskInput.value = task.description;
        editAlarmInput.value = task.alarmTime || "";
        document.getElementById("editTasks").style.display = 'block';
    }
};
const saveEdit = () => {
    if (currentEditId !== null) {
        const task = toDoLists.find(t => t.id === currentEditId);
        if (task) {
            task.description = editTaskInput.value;
            task.alarmTime = editAlarmInput.value;
            syncLocalStorage();
            renderTasks();
            closeEditSecFun();
        }
    }
};
window.deleteTask = deleteTask;
window.openEditModal = openEditModal;
displayAddNewTask.addEventListener("click", DisplayAddNewTaskSection);
closeInputSectionBtn.addEventListener("click", closeInputSectionFun);
displaysetAlarm.addEventListener("click", DispalyAlarmSectionFun);
setAlarmTime.addEventListener("click", SetAlarm);
closealarmSectionBtn.addEventListener("click", closeAlarmSection);
removeSettedAlarmBtn.addEventListener("click", removeSettedAlarmFun);
addTaskBtn.addEventListener("click", SaveTaskFun);
closeEditSectionBtn.addEventListener("click", closeEditSecFun);
saveEditedTaskBtn.addEventListener("click", saveEdit);
searchTasks();
renderTasks();
createAlert();
export {};
//# sourceMappingURL=index.js.map