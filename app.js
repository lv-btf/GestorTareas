const curso_tarea = document.getElementById("curso")
const categoria_tarea = document.getElementById("categoria")
const tema_tarea = document.getElementById("tema")
const formulario = document.getElementById("formulario")
const contenedor = document.getElementById("div_hacer")
const div_proceso = document.getElementById("div_proceso")
const div_terminado = document.getElementById("div_terminado")
const contenedor_edit = document.getElementById("contenedor_edit")
const edit_tema = document.getElementById("edit_tema")
const edit_curso = document.getElementById("edit_curso")
const edit_categoria = document.getElementById("edit_categoria")
const btn_guardar = document.getElementById("btn_guardar")
const btn_cancelar = document.getElementById("btn_cancelar")


const Arreglo_guardado = localStorage.getItem("Tareas_guardadas")
let Arreglo_Tareas = Arreglo_guardado? JSON.parse(Arreglo_guardado) : []
LocalStorage()

function ActualizarEstado(id,nuevo_estado){
    const tarea = Arreglo_Tareas.find(t => t.id === id)
    if(tarea){
        tarea.estado = nuevo_estado
        localStorage.setItem("Tareas_guardadas",JSON.stringify(Arreglo_Tareas))
    }
}


formulario.addEventListener("submit",(evento) => {
    evento.preventDefault()
    const curso = curso_tarea.value.trim()
    const categoria = categoria_tarea.value.trim()
    const tema = tema_tarea.value.trim()

    const estado = "Por hacer"

    
    const diccionario_curso = {
        id: "tarea-" + Date.now() ,
        curso,
        categoria,
        tema,
        estado
    }

    Arreglo_Tareas.push(diccionario_curso)
    localStorage.setItem("Tareas_guardadas", JSON.stringify(Arreglo_Tareas))
    
    formulario.reset()
    LocalStorage()
 }
)

div_proceso.addEventListener("dragover", (evento) => {
    evento.preventDefault()
})





div_proceso.addEventListener("drop",(evento) => {
    evento.preventDefault()
    const id_tarea = evento.dataTransfer.getData("text/plain")
    const tarea_arrastrado = document.getElementById(id_tarea)
    if(tarea_arrastrado){     
        const new_estado = "En Proceso"

        tarea_arrastrado.classList.add("estado-hacer", "estado-proceso", "estado-terminado")
        tarea_arrastrado.classList.remove("estado-proceso")

        const parrafo = tarea_arrastrado.querySelectorAll("p")

        if(parrafo.length >= 4 ){
            parrafo[3].innerHTML = `<strong>Estado:</strong> ${new_estado}`
        }
        /*el metodo classList.remov borra hay una de esas clases pegadas */
        tarea_arrastrado.classList.remove("estado-hacer", "estado-proceso", "estado-terminado")
        tarea_arrastrado.classList.add("estado-proceso")
        div_proceso.appendChild(tarea_arrastrado)

        ActualizarEstado(id_tarea,new_estado)        
    }
})





div_terminado.addEventListener("dragover",(evento) => {
    evento.preventDefault()
})





div_terminado.addEventListener("drop",(evento) => {
    evento.preventDefault()
    const id_tarea = evento.dataTransfer.getData("text/plain")
    const tarea_arrastrado = document.getElementById(id_tarea)
    if(tarea_arrastrado){
        const new_estado = "Terminado"
        const parrafo = tarea_arrastrado.querySelectorAll("p")
        if(parrafo.length >= 4){
            parrafo[3].innerHTML = `<strong>Estado:</strong> ${new_estado}`
        }
        tarea_arrastrado.classList.remove("estado-hacer", "estado-proceso", "estado-terminado")
        tarea_arrastrado.classList.add("estado-terminado")
        div_terminado.appendChild(tarea_arrastrado)

        ActualizarEstado(id_tarea,new_estado)
        
    }
})




contenedor.addEventListener("dragover",(evento) => {
    evento.preventDefault()
})





contenedor.addEventListener("drop",(evento) => {
    evento.preventDefault()
    const id_tarea = evento.dataTransfer.getData("text/plain")
    const tarea_encontrada = document.getElementById(id_tarea)
    if(tarea_encontrada){
        const new_estado = "Por hacer"
        const parrafo = tarea_encontrada.querySelectorAll("p")
        if(parrafo.length >= 4){
            parrafo[3].innerHTML = `<strong>Estado:</strong> ${new_estado}`
        }
        tarea_encontrada.classList.remove("estado-hacer", "estado-proceso", "estado-terminado")

        contenedor.appendChild(tarea_encontrada)
        ActualizarEstado(id_tarea,new_estado)
    }
})







function LocalStorage(){
    contenedor.innerHTML = ""
    div_proceso.innerHTML = ""
    div_terminado.innerHTML = ""
    for(let i = 0; i < Arreglo_Tareas.length; i++){

        const div = document.createElement("div")
        div.classList.add("tarjeta_tarea")
        div.setAttribute("draggable",true)
        div.id = Arreglo_Tareas[i].id || `tarea-${i}`

        
       

        

        const btn_eliminar = document.createElement("button")
        btn_eliminar.textContent = "Eliminar"
        btn_eliminar.classList.add("btn_eliminar")
        
        const btn_editar = document.createElement("button")
        btn_editar.textContent = "Editar"
        btn_editar.classList.add("btn_editar")
        



        btn_eliminar.addEventListener("click",() => {
            Arreglo_Tareas = Arreglo_Tareas.filter(t => t.id !== div.id)
            localStorage.setItem("Tareas_guardadas",JSON.stringify(Arreglo_Tareas))
            LocalStorage()
        })

        
        btn_editar.addEventListener("click",(evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            contenedor_edit.dataset.idEditar = div.id
            edit_curso.value = Arreglo_Tareas[i].curso
            edit_tema.value = Arreglo_Tareas[i].tema
            edit_categoria.value = Arreglo_Tareas[i].categoria
            contenedor_edit.style.display = "flex"
        })

        div.addEventListener("dragstart",(evento) => { 
            evento.dataTransfer.setData("text/plain",div.id)
            div.classList.add("arrastrando")  

        })

        div.addEventListener("dragend",(evento) => {
            evento.preventDefault()
            div.classList.remove("arrastrando")
        })
        
        div.innerHTML = `<p><strong>Curso:</strong> ${Arreglo_Tareas[i].curso}</p>
        <p><strong>Tema:</strong> ${Arreglo_Tareas[i].tema}</p>
        <p><strong>Categoria:</strong> ${Arreglo_Tareas[i].categoria}</p>
        <p><strong>Estado:</strong> ${Arreglo_Tareas[i].estado}</p>`

        div.appendChild(btn_eliminar)
        div.appendChild(btn_editar)

        if(Arreglo_Tareas[i].estado === "Por hacer"){
            contenedor.appendChild(div)
            
        }else if(Arreglo_Tareas[i].estado === "En Proceso"){
            div.classList.add("estado-proceso")
            div_proceso.appendChild(div)
            
        }else if(Arreglo_Tareas[i].estado === "Terminado"){
            div.classList.add("estado-terminado")
            div_terminado.appendChild(div)
        }
    }
    localStorage.setItem("Tareas_guardadas",JSON.stringify(Arreglo_Tareas))
}

btn_cancelar.addEventListener("click", (evento) => {
    evento.preventDefault()
    contenedor_edit.style.display = "none"
})

btn_guardar.addEventListener("click", (evento) => {
    evento.preventDefault()

    const idTarea = contenedor_edit.dataset.idEditar
    const curso = edit_curso.value.trim()
    const tema = edit_tema.value.trim()
    const categoria = edit_categoria.value.trim()

    // Actualizar el objeto dentro del arreglo
    const tarea = Arreglo_Tareas.find(t => t.id === idTarea)
    if (tarea) {
        tarea.curso = curso
        tarea.tema = tema
        tarea.categoria = categoria

        // Sincronizar memoria y redibujar interfaz
        localStorage.setItem("Tareas_guardadas", JSON.stringify(Arreglo_Tareas))
        contenedor_edit.style.display = "none"
        LocalStorage()
    }
})

