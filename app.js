document.addEventListener('DOMContentLoaded', function(){

    const totalTareas= document.querySelector('#total');
    const tareasCompletadas= document.querySelector('#completadas');
    const formulario= document.querySelector('#formulario');
    const tarea= document.querySelector('#tarea');
    const listaTareas= document.querySelector('#tareas');

    let tareas= JSON.parse(localStorage.getItem('tarea')) || [];
    let total= tareas.length;
    let completadas= tareas.filter(tarea=> tarea.completada).length;

    agregarHtlm();

    formulario.addEventListener('submit', validarFormulario);
    listaTareas.addEventListener('click', eliminarTarea);
    listaTareas.addEventListener('click', completarTarea);


    totalTareas.textContent= total;
    tareasCompletadas.textContent= completadas;

    function validarFormulario(e){
        e.preventDefault();
        if(tarea.value.trim() === ''){
            alert('Debes ingresar una tarea');
            return;
        }

        const nuevaTarea={id: Date.now(), tarea: tarea.value, completada: false};
        tareas=[...tareas, nuevaTarea];
        formulario.reset();
        total= tareas.length;
        totalTareas.textContent= total;

        agregarHtlm();
        
    }


    function agregarHtlm() {
        listaTareas.innerHTML = ''; // Limpia el contenedor primero
    
        if (tareas.length > 0) {
            tareas.forEach(tarea => {
                const divTarea = document.createElement('div');
                divTarea.classList.add('item-tarea');
                divTarea.innerHTML = `
                        <p>${tarea.completada ? (
                        `<span class='completa'>${tarea.tarea}</span>`
                    ) : (
                        `<span>${tarea.tarea}</span>`
                    )}  </p>
                        <div class="botones">
                            <button class="eliminar" data-id="${tarea.id}">x</button>
                            <button class="completada" data-id="${tarea.id}">?</button>
                        </div>
                `;
                listaTareas.appendChild(divTarea);
            });
        } else if(tareas.length === 0){ 
            const mensaje = document.createElement('h5');
            mensaje.textContent = 'No hay tareas'; // Usa textContent para texto simple
            listaTareas.appendChild(mensaje);
        }

        localStorage.setItem('tarea', JSON.stringify(tareas));
    }
        

    function eliminarTarea(e){
        if(e.target.classList.contains('eliminar')){
            const tareaID=Number(e.target.getAttribute('data-id'));
            console.log(tareaID);
            tareas= tareas.filter(tarea=> tarea.id !== tareaID);
            total= tareas.length;
            totalTareas.textContent= total;
            agregarHtlm();
        }
    }

        function completarTarea(e){
            if(e.target.classList.contains('completada')){
            const tareaID= Number(e.target.getAttribute('data-id'));
            tareas= tareas.map(tarea=> tarea.id === tareaID ? {...tarea, completada: !tarea.completada} : tarea);

            completadas= tareas.filter(tarea=> tarea.completada).length;
            tareasCompletadas.textContent= completadas;



            agregarHtlm();
        }
    }



    

    


    

})