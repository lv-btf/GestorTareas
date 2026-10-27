const curso_tarea = document.getElementById("curso")
const categoria_tarea = document.getElementById("categoria")
const tema_tarea = document.getElementById("tema")
const formulario = document.getElementById("formulario")
const contenedor = document.getElementById("div_hacer")
const div_proceso = document.getElementById("div_proceso")
const div_terminado = document.getElementById("div_terminado")

const Arreglo_guardado = localStorage.getItem("Tareas_guardadas")
let Arreglo_Tareas = Arreglo_guardado? JSON.parse(Arreglo_guardado) : []

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

    const contenedor_info = document.createElement("div")
    contenedor_info.classList.add("tarjeta_tarea")
    contenedor_info.classList.add("estado_hacer")
    contenedor_info.setAttribute("draggable",true)
    contenedor_info.id = diccionario_curso.id

    contenedor_info.innerHTML=
        `<p><strong>Curso:</strong> ${curso}</p>
         <p><strong>Tema:</strong> ${tema}</p>
         <p><strong>Categoria:</strong> ${categoria}</p>
         <p><strong>Estado:</strong> ${estado}</p>`
    
    contenedor_info.addEventListener("dragstart", (evento) => {
        evento.dataTransfer.setData("text/plain",contenedor_info.id)
        contenedor_info.classList.add("arrastrando")       
    })

    contenedor_info.addEventListener("dragend", () => { 
        contenedor_info.classList.remove("arrastrando")
    })
    contenedor.appendChild(contenedor_info)
    formulario.reset()
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
        const parrafo = tarea_arrastrado.querySelectorAll("p")
        if(parrafo.length >= 4 ){
            parrafo[3].innerHTML = `<strong>Estado:</strong> ${new_estado}`
        }
        tarea_arrastrado.classList.remove("estado-hacer", "estado-proceso", "estado-terminado")
        tarea_arrastrado.classList.add("estado-proceso")
        div_proceso.appendChild(tarea_arrastrado)


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
        tarea_encontrada.classList.remove("estado-hacer", "estado-proceso", "estado-terminado")
        const new_estado = "Por Hacer"
        const parrafo = tarea_encontrada.querySelectorAll("p")
        if(parrafo.length >= 4){
            parrafo[3].innerHTML = `<strong>Estado:</strong> ${new_estado}`
        }
        contenedor.appendChild(tarea_encontrada)
    }
})



