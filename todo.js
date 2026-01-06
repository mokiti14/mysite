// DOM要素の取得
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// タスクデータを保存する配列
let tasks = [];
let currentFilter = 'all';

// ページ読み込み時にlocalStorageからタスクを読み込む
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    updateTaskCount();
});

// タスクをlocalStorageから読み込む
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// タスクをlocalStorageに保存
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// タスクを追加
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('タスクを入力してください！');
        return;
    }
    
    const task = {
        id: Date.now() + Math.random(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString('ja-JP')
    };
    
    tasks.unshift(task);
    saveTasks();
    renderTasks();
    updateTaskCount();
    
    taskInput.value = '';
    taskInput.focus();
}

// タスクを削除
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateTaskCount();
}

// タスクの完了状態を切り替え
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
}

// 完了済みタスクをすべて削除
function clearCompletedTasks() {
    const completedCount = tasks.filter(task => task.completed).length;
    
    if (completedCount === 0) {
        alert('完了済みのタスクがありません。');
        return;
    }
    
    if (confirm(`${completedCount}個の完了済みタスクを削除しますか？`)) {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
}

// タスクをフィルタリング
function getFilteredTasks() {
    switch(currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// タスクリストを描画
function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '40px';
        emptyMessage.style.color = '#999';
        emptyMessage.style.fontSize = '18px';
        
        if (currentFilter === 'active') {
            emptyMessage.textContent = '未完了のタスクはありません 🎉';
        } else if (currentFilter === 'completed') {
            emptyMessage.textContent = '完了済みのタスクはありません';
        } else {
            emptyMessage.textContent = 'タスクを追加してください';
        }
        
        taskList.appendChild(emptyMessage);
        return;
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
            <span class="task-text">${escapeHtml(task.text)}</span>
            <span class="task-date">${task.createdAt}</span>
            <button class="delete-btn" data-id="${task.id}">削除</button>
        `;
        
        taskList.appendChild(li);
    });
    
    // イベントリスナーを追加
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            toggleTask(parseInt(e.target.dataset.id));
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteTask(parseInt(e.target.dataset.id));
        });
    });
}

// タスク数を更新
function updateTaskCount() {
    const activeCount = tasks.filter(task => !task.completed).length;
    const completedCount = tasks.filter(task => task.completed).length;
    
    if (tasks.length === 0) {
        taskCount.textContent = '0個のタスク';
    } else {
        taskCount.textContent = `${activeCount}個の未完了タスク / 全${tasks.length}個`;
    }
}

// HTMLエスケープ関数（XSS対策）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// イベントリスナー
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompleted.addEventListener('click', clearCompletedTasks);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});
