let displayAddNewTask = document.getElementById("displayAddNewTask") as HTMLButtonElement;
let inputSection = document.getElementById("inputSection") as HTMLDivElement;
let taskInput = document.getElementById("taskInput") as HTMLInputElement;
let alarmInput = document.getElementById("alarmInput") as HTMLInputElement;
let closeInputSectionBtn = document.getElementById("closeInputSectionBtn") as HTMLButtonElement;
let displaysetAlarm = document.getElementById("displaysetAlarm") as HTMLButtonElement;
let setAlarmTime = document.getElementById("setAlarmTime") as HTMLInputElement;
let alarmTimeDisplay = document.getElementById("alarmTimeDisplay") as HTMLParagraphElement;
let closealarmSectionBtn = document.getElementById("closealarmSectionBtn") as HTMLButtonElement;
let alarmPlaceHolder = document.getElementById("alarmPlaceHolder") as HTMLParagraphElement;
let alarmPlaceHolderSection = document.getElementById("alarmPlaceHolderSection") as HTMLDivElement;
let addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
let removeSettedAlarmBtn = document.getElementById("removeSettedAlarmBtn") as HTMLButtonElement;
let incompleteTaskList = document.getElementById("incompleteTaskList") as HTMLUListElement;
let completedTaskList = document.getElementById("completedTaskList") as HTMLUListElement;
let noItems = document.getElementById("noItems") as HTMLDivElement;
let listDiplay = document.getElementById("taskContainer") as HTMLDivElement;
let searchInputSection = document.getElementById("searchSection") as HTMLDivElement;
let searchInput = document.getElementById("searchInput") as HTMLInputElement;
let listDiscription = document.getElementById("listDiscription") as HTMLSpanElement;
let closeEditSectionBtn = document.getElementById("closeEditSectionBtn") as HTMLButtonElement;
let editTaskInput = document.getElementById("editTaskInput") as HTMLInputElement;
let editAlarmInput = document.getElementById("editAlarmInput") as HTMLInputElement;
let saveEditedTaskBtn = document.getElementById("saveEditedTaskBtn") as HTMLButtonElement;

type Task = {
    id: number;
    description: string;
    alarmTime: string | null;
    completed: boolean;
};

let currentEditId: number | null = null;
let toDoLists: Task[] = JSON.parse(localStorage.getItem('myTasks') || '[]');

const syncLocalStorage = () =>
{
    localStorage.setItem('myTasks', JSON.stringify(toDoLists));
};



const DisplayAddNewTaskSection = () =>
{
    inputSection.style.display = "block";
};

const closeInputSectionFun = () =>
{
    taskInput.value = "";
    alarmInput.value = "";
    alarmPlaceHolder.textContent = "";
    alarmTimeDisplay.style.display = "none";
    inputSection.style.display = "none";
};


const DispalyAlarmSectionFun = () =>
{
    alarmTimeDisplay.style.display = "block";
};

const closeAlarmSection = () =>
{
    alarmTimeDisplay.style.display = "none";
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
}

const closeEditSecFun = () =>
{
    editTaskInput.value = '';   
    editAlarmInput.value = '';
    document.getElementById("editTasks")!.style.display = 'none';
}

const removeSettedAlarmFun = () =>
{
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
    alarmPlaceHolderSection.style.display = 'none';
}

const closeAddTaskModal = () =>
{
    taskInput.value = '';
    alarmInput.value = '';
    alarmPlaceHolder.textContent = '';
    alarmPlaceHolderSection.style.display = 'none';
    taskInput.style.display = 'block';
    addTaskBtn.style.display = 'block';
    alarmTimeDisplay.style.display = 'none';
};

const SetAlarm = () =>
{
    const alarmTime: string = alarmInput.value;
    if (!alarmTime)
    {
        alert("Please select a date and time");
        return;
    }

    alarmPlaceHolder.textContent = alarmInput.value.replace('T', ' ');

    // Switch to Flex for a more stable layout
    alarmPlaceHolderSection.style.display = 'flex';
    alarmPlaceHolderSection.style.width = '250px'; // Set a fixed width to prevent layout shifts
    alarmPlaceHolderSection.style.justifyContent = 'center'; // Center the content

    // Hide the setup UI
    alarmTimeDisplay.style.display = "none";

    // Keep the main container as flex
    inputSection.style.display = 'flex';

    displaysetAlarm.style.display = "inline-block";
    displaysetAlarm.style.marginTop = "10px";

    addTaskBtn.style.display = "inline-block";
    addTaskBtn.style.marginTop = "10px";
    // Ensure the main inputs are visible
    taskInput.style.display = 'block';

};

const SaveTaskFun = () =>
{
    const taskDescription = taskInput.value.trim();
    const alarmTime = alarmInput.value ? alarmInput.value.replace('T', ' ') : null;

    if (!taskDescription)
    {
        alert("Please enter a task name!");
        return;
    }

    let countId: number = toDoLists.length > 0 ? (toDoLists[toDoLists.length - 1]?.id ?? 0) + 1 : 1;


    const newTask: Task = {
        id: countId,
        description: taskDescription,
        alarmTime: alarmInput.value ? alarmInput.value.replace('T', ' ') : null,
        completed: false
    };


    toDoLists.push(newTask);
    console.log("myTasks:", toDoLists);
    syncLocalStorage(); // Save to permanent storage
    renderTasks();
    closeAddTaskModal();
};


const toggleTask = (id:number) => {
    const task = toDoLists.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        syncLocalStorage(); // Save completion state
        const currentSearch = searchInput.value;
        renderTasks(currentSearch);
    }
};

(window as any).toggleTask = toggleTask;

const renderTasks = (searchTerm: string = "") => {
    // 1. Clear the lists first
    incompleteTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    // 2. Fix the filtering (Type must be Task[], not string/boolean)
    const filteredList: Task[] = toDoLists.filter(task =>
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pendingTasks = filteredList.filter(t => !t.completed);
    const doneTasks = filteredList.filter(t => t.completed);

    // 3. Update visibility (Check if listDiplay exists to avoid the 'null' error)
    if (listDiplay) {
        if (toDoLists.length > 0) {
            listDiplay.style.display = 'flex'; // Changed from 'listDiplay.style.cssText' for simplicity
            listDiplay.style.justifyContent = 'space-around';
            noItems.style.display = 'none';
            searchInputSection.style.display = 'flex';
        } else {
            listDiplay.style.display = 'none';
            noItems.style.display = 'block';
            searchInputSection.style.display = 'none';
        }
    }

    // 4. Create Task Element Helper
    const createLi = (task: Task) => {
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
    // 5. Render tasks to their respective lists
    pendingTasks.forEach(task => incompleteTaskList.appendChild(createLi(task)));
    doneTasks.forEach(task => completedTaskList.appendChild(createLi(task)));
};

const searchTasks = () => {

    searchInput.addEventListener("input", () => {
    renderTasks(searchInput.value);
   });
};

// --- 6. Alarm Logic ---
const createAlert = () => {
    setInterval(() => {
        const now = new Date();
        
        // Format: YYYY-MM-DDTHH:mm (Matching the datetime-local input format)
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;

        toDoLists.forEach(task => {
            // Match the string exactly as stored in Task.alarmTime
            if (!task.completed && task.alarmTime === currentTimeString) {
                alert(`ALARM: ${task.description.toUpperCase()}!`);
                task.alarmTime = "Alarm played"; 
                syncLocalStorage();
                renderTasks(); 
            }
        });
    }, 1000);
};

const deleteTask = (id: number) => {
    toDoLists = toDoLists.filter(t => t.id !== id);
    syncLocalStorage();
    renderTasks(searchInput.value);
};

const openEditModal = (id: number) => {
    const task = toDoLists.find(t => t.id === id);
    if (task) {
        currentEditId = id;
        editTaskInput.value = task.description;
        editAlarmInput.value = task.alarmTime || "";
        document.getElementById("editTasks")!.style.display = 'block';
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

// Make them accessible to the HTML onclick attributes
(window as any).deleteTask = deleteTask;
(window as any).openEditModal = openEditModal;

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
