
const API_URL = "https://task-manager-etat.onrender.com";


function showNotification(message, type = "success") {

    const notification = document.getElementById(
        "notification"
    );

    notification.innerText = message;

    if (type === "error") {
        notification.style.background = "#ef4444";
    }
    else {
        notification.style.background = "#22c55e";
    }

    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}


function showLogin() {

    document.getElementById(
        "login-form"
    ).classList.remove("hidden");

    document.getElementById(
        "register-form"
    ).classList.add("hidden");
}


function showRegister() {

    document.getElementById(
        "register-form"
    ).classList.remove("hidden");

    document.getElementById(
        "login-form"
    ).classList.add("hidden");
}


async function registerUser() {

    const identifier = document.getElementById(
        "register-identifier"
    ).value;

    const password = document.getElementById(
        "register-password"
    ).value;

    if (!identifier || !password) {

        showNotification(
            "Please enter username/email and password",
            "error"
        );

        return;
    }

    let username = identifier;
    let email = identifier;

    if (!identifier.includes("@")) {
        email = `${identifier}@gmail.com`;
    }

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const data = await response.json();

    showNotification(
        data.message || data.detail,
        response.ok ? "success" : "error"
    );

    if (response.ok) {

        showNotification(
            "Registration successful. Please login."
        );

        showLogin();
    }
}


async function loginUser() {

    const identifier = document.getElementById(
        "login-identifier"
    ).value;

    const password = document.getElementById(
        "login-password"
    ).value;

    if (!identifier || !password) {

        showNotification(
            "Please enter email/username and password",
            "error"
        );

        return;
    }

    let username = identifier;

    if (!identifier.includes("@")) {
        username = `${identifier}@gmail.com`;
    }

    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                "application/x-www-form-urlencoded"
            },
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {

        showNotification(
            "User does not exist or password is incorrect",
            "error"
        );

        return;
    }

    localStorage.setItem(
        "token",
        data.access_token
    );

    showNotification(
        "Login successful"
    );

    document.querySelector(
        ".auth-box"
    ).classList.add("hidden");

    document.getElementById(
        "task-section"
    ).classList.remove("hidden");

    getTasks();
}


function logoutUser() {

    localStorage.removeItem("token");

    location.reload();
}


async function createTask() {

    const title = document.getElementById(
        "task-title"
    ).value;

    const description = document.getElementById(
        "task-description"
    ).value;
    if (!title || !description) {

    showNotification(
        "Please enter task title and description",
        "error"
    );

    return;
}

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/tasks`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                description
            })
        }
    );

    if (response.ok) {
        showNotification("Task created");
        getTasks();
    }
}


async function getTasks() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/tasks`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const tasks = await response.json();

    const taskList = document.getElementById(
        "task-list"
    );

    taskList.innerHTML = "";
    if (tasks.length === 0) {

    taskList.innerHTML = `
        <div class="task-card">
            <p>
                No tasks currently.
                Add a new task 

            </p>
        </div>
    `;

    return;
}

    tasks.forEach(task => {

        const div = document.createElement("div");

        div.className = task.completed
            ? "task-card completed"
            : "task-card not-completed";

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>
                Status:
                ${task.completed ? "Completed ✅" : "Pending ❌"}
            </p>

            <div class="task-actions">

                <button onclick="completeTask(${task.id})">
                    Complete
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(div);
    });
}


async function completeTask(taskId) {

    const token = localStorage.getItem("token");

    const taskResponse = await fetch(
        `${API_URL}/tasks/${taskId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const task = await taskResponse.json();

    await fetch(
        `${API_URL}/tasks/${taskId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description
            })
        }
    );

    showNotification("Task completed");

    getTasks();
}


async function deleteTask(taskId) {

    const token = localStorage.getItem("token");

    await fetch(
        `${API_URL}/tasks/${taskId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    showNotification("Task deleted");

    getTasks();
}
function toggleLoginPassword() {

    const passwordInput = document.getElementById(
        "login-password"
    );

    passwordInput.type =
        passwordInput.type === "password"
        ? "text"
        : "password";
}


function toggleRegisterPassword() {

    const passwordInput = document.getElementById(
        "register-password"
    );

    passwordInput.type =
        passwordInput.type === "password"
        ? "text"
        : "password";
}



