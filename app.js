const curso_tarea = document.getElementById("curso")
const categoria_tarea = document.getElementById("categoria")
const tema_tarea = document.getElementById("tema")
const formulario = document.getElementById("formulario")
const contenedor = document.getElementById("div_hacer")

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
    contenedor_info.setAttribute("draggable",true)
    contenedor_info.id = diccionario_curso.id

    contenedor_info.innerHTML=
        `<p><strong>Curso:</strong> ${curso}</p>
         <p><strong>Tema:</strong> ${tema}</p>
         <p><strong>Categoria:<strong> ${categoria}</p>
         <p><strong>Estado:<strong> ${estado}</p>`
    
    contenedor.appendChild(contenedor_info)
    formulario.reset()

})
