const tareaInput = document.getElementById('tarea');
const botonPublicar = document.getElementById('boton');
const toDoContainer = document.getElementById('toDoContainer');
const doingContainer = document.getElementById('doingContainer');
const completeContainer = document.getElementById('completeContainer');

const agregarTarea = () => {
  const tarea = tareaInput.value;

  const nuevaTarea = document.createElement('li');
  nuevaTarea.textContent = tarea;

  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'x';
  botonEliminar.classList.add('botonEliminar');
  botonEliminar.addEventListener('click', () => {
    borrarTarea(nuevaTarea);
  });
  
  nuevaTarea.appendChild(botonEliminar);

  const botonAMover = document.createElement('button');
  botonAMover.classList.add('botonA');
  botonAMover.addEventListener('click', () => {
    moverTarea(nuevaTarea, doingContainer);
  });

  const botonBMover = document.createElement('button');
  botonBMover.classList.add('botonB');
  botonBMover.addEventListener('click', () => {
    moverTarea(nuevaTarea, completeContainer);
  });

  nuevaTarea.appendChild(botonAMover);
  nuevaTarea.appendChild(botonBMover);

  toDoContainer.appendChild(nuevaTarea);

  guardarTareaEnLocalStorage(tarea);

  tareaInput.value = '';
};

const moverTarea = (tarea, destino) => {
  destino.appendChild(tarea);
};

const borrarTarea = (tarea) => {
  tarea.remove();
  eliminarTareaDeLocalStorage(tarea.textContent);
};

const guardarTareaEnLocalStorage = (tarea) => {
  let tareas = obtenerTareasDeLocalStorage();

  tareas.push(tarea);

  localStorage.setItem('tareas', JSON.stringify(tareas));
};

const eliminarTareaDeLocalStorage = (tarea) => {
  let tareas = obtenerTareasDeLocalStorage();

  tareas = tareas.filter((t) => t !== tarea);

  localStorage.setItem('tareas', JSON.stringify(tareas));
};

const obtenerTareasDeLocalStorage = () => {
  let tareas;

  if (localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  return tareas;
};

const cargarTareasDesdeLocalStorage = () => {
  const tareas = obtenerTareasDeLocalStorage();

  tareas.forEach((tarea) => {
    const nuevaTarea = document.createElement('li');
    nuevaTarea.textContent = tarea;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'x';
    botonEliminar.classList.add('botonEliminar');
    botonEliminar.addEventListener('click', () => {
      borrarTarea(nuevaTarea);
    });
    
    nuevaTarea.appendChild(botonEliminar);

    const botonAMover = document.createElement('button');
    botonAMover.classList.add('botonA');
    botonAMover.addEventListener('click', () => {
      moverTarea(nuevaTarea, doingContainer);
    });

    const botonBMover = document.createElement('button');
    botonBMover.classList.add('botonB');
    botonBMover.addEventListener('click', () => {
      moverTarea(nuevaTarea, completeContainer);
    });

    nuevaTarea.appendChild(botonAMover);
    nuevaTarea.appendChild(botonBMover);
    
    toDoContainer.appendChild(nuevaTarea);
  });
};

botonPublicar.addEventListener('click', agregarTarea);

document.addEventListener('DOMContentLoaded', cargarTareasDesdeLocalStorage);
