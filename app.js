const STORAGE_KEY = "tareas";

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const empty = document.getElementById("empty");

let tareas = load();

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

function render() {
  list.innerHTML = "";
  empty.classList.toggle("hidden", tareas.length > 0);

  tareas.forEach((t) => {
    const li = document.createElement("li");
    li.className = "item" + (t.done ? " done" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = t.done;
    check.addEventListener("change", () => {
      t.done = check.checked;
      save();
      render();
    });

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = t.text;

    const del = document.createElement("button");
    del.className = "del";
    del.type = "button";
    del.textContent = "✕";
    del.setAttribute("aria-label", "Eliminar tarea");
    del.addEventListener("click", () => {
      tareas = tareas.filter((x) => x.id !== t.id);
      save();
      render();
    });

    li.append(check, span, del);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tareas.push({ id: Date.now(), text, done: false });
  input.value = "";
  save();
  render();
});

render();
