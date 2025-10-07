// --- Data loading ---
let data = { students: [], events: [] };

// Fetch data from data.json
fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    setupUI();
  });

// --- Card rendering ---
function renderCards(containerId, items, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    if (type === 'student') {
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Age:</strong> ${item.age}</p>
        <p><strong>Course:</strong> ${item.course}</p>
      `;
    } else if (type === 'event') {
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p><strong>Date:</strong> ${new Date(item.date).toLocaleDateString()}</p>
      `;
    }
    container.appendChild(card);
  });
}

// --- Pagination ---
function paginateData(arr, pageSize, page) {
  const start = (page - 1) * pageSize;
  return arr.slice(start, start + pageSize);
}

function setupPagination(total, pageSize, onPage, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const pageCount = Math.ceil(total / pageSize);
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => onPage(i);
    container.appendChild(btn);
  }
}

// --- CAPTCHA ---
let captchaCode = '';
function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  captchaCode = '';
  for (let i = 0; i < 6; i++) {
    captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  drawCaptcha();
}

function drawCaptcha() {
  const canvas = document.getElementById('captchaCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '28px Verdana';
  ctx.fillStyle = '#333';
  ctx.fillText(captchaCode, 20, 35);
  // Add some lines for complexity
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.beginPath();
    ctx.moveTo(Math.random()*150, Math.random()*50);
    ctx.lineTo(Math.random()*150, Math.random()*50);
    ctx.stroke();
  }
}

function verifyCaptcha() {
  const input = document.getElementById('captchaInput').value.trim().toUpperCase();
  const result = document.getElementById('captchaResult');
  if (input === captchaCode) {
    result.textContent = 'CAPTCHA correct!';
    result.style.color = 'green';
    generateCaptcha();
    document.getElementById('captchaInput').value = '';
  } else {
    result.textContent = 'Incorrect, try again.';
    result.style.color = 'red';
  }
}

// --- UI Setup ---
function setupUI() {
  const pageSize = 3;

  function loadStudents(page) {
    const paginated = paginateData(data.students, pageSize, page);
    renderCards("student-list", paginated, "student");
  }

  function loadEvents(page) {
    const paginated = paginateData(data.events, pageSize, page);
    renderCards("event-list", paginated, "event");
  }

  setupPagination(data.students.length, pageSize, loadStudents, "student-pagination");
  setupPagination(data.events.length, pageSize, loadEvents, "event-pagination");

  loadStudents(1);
  loadEvents(1);

  generateCaptcha();
}
