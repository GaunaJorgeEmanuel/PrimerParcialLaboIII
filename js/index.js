var xml = new XMLHttpRequest;
var url = "http://localhost:3000/";
var api = "";
var metodo = "GET";
var trClickeado;

window.addEventListener("load", function(){
    getPersonas();

    var btnModificar= document.getElementById("btnGuardar");
      btnModificar.addEventListener("click", clickModificar);

      var btnCerrarM= document.getElementById("btnCerrar");
      btnCerrarM.addEventListener("click", clickCerrarModificar);

      var btnEliminar = document.getElementById("btnEliminar");
      btnEliminar.addEventListener("click", clickEliminar);

});

function filaDobleClick(event){
    trClickeado = event.target.parentNode;
    var arrayTxt = extraerArrayTxtTr(trClickeado);
    var objJson = paresearArrary(arrayTxt);
    MostrarModificar();
    cargarDatosEnFormulario(arrayTxt);
}

function buscarPadreTipo(elementoDom, tipo){
    var parent = elementoDom;
    
    while(parent.nodeName !== tipo){        
        parent = parent.parentNode;        
    }

    return parent;
}

function extraerArrayTxtTr(tr){
    var arrayTxt = new Array();

    for(var i = 0; i<tr.cells.length; i++){        
        arrayTxt[i]= extraerTxtTd(tr.cells[i]);
    }
    
    return arrayTxt;
}

function paresearArrary(arrayTxt){
    var objJson = {
        id : arrayTxt[0],
        nombre : arrayTxt[1],
        cuatrimestre : arrayTxt[2],
        fecha : arrayTxt[3],
        turno : arrayTxt[4]
    }

    return objJson;
}

function cargarDatosEnFormulario(jsonData){
    $("id").value = jsonData[0];
    $("nombreM").value = jsonData[1];
    $("cuatrimestre").value = jsonData[2];
    $("fechaM").value = aFechaConGuion(jsonData[3]);  
    if(jsonData[4] == "Mañana"){
        $("m").checked  = true;
    }else{
        $("n").checked  = true;
    }    
}
function aFechaConGuion(date){
    var fecha = date.split("/");
    var fechaFormateada = fecha[2]+"-"+fecha[1]+"-"+fecha[0];   
    return fechaFormateada;
}
function aFechaConBarra(date){
    var fecha = date.split("-");
    var fechaFormateada = fecha[2]+"/"+fecha[1]+"/"+fecha[0];  
    return fechaFormateada; 
}

function extraerTxtTd(td){
    console.log(td);
    return td.innerText; 
}
function datosToGrilla(arrayDatos){    
    
 for(var i = 0; i<arrayDatos.length; i++){
        agregarTr(arrayDatos[i]);
    }
}



function agregarTr(tr)
{
 var filaDOM = crearElementoTr(tr);
 filaDOM.addEventListener("dblclick",filaDobleClick);
 var tbody = document.getElementById("bodyTabla");
    tbody.appendChild(filaDOM);
}

function crearElementoTr(arrayDatosFila)
{
    var r = document.createElement("tr");
    r.setAttribute("indentificador", arrayDatosFila["id"]);  
    
    var indexName = Object.keys(arrayDatosFila);
    for(var i = 0;i<indexName.length; i++)
    {
        var dato = arrayDatosFila[indexName[i]];
        r.appendChild(crearElementoTd(dato));
    }
  
   
    return r;
}
function clickEliminar(){
    var objJson = tomarDatosFormulario();
    
    postDeleteElemento(objJson); 
    clickCerrarModificar();   
}
function clickModificar()
{
    var objJson = tomarDatosFormulario();
   
     
    
    postElemento(objJson);
    modificarFilabyId(objJson);
    clickCerrarModificar();
}
function modificarFilabyId(objJson)
{
        var tbody = $("bodyTabla");
        var trs = tbody.children;    
        for(var i = 0; i<trs.length;i++){
            if(trs[i].getAttribute("indentificador") == objJson.id){
                var hijos = trs[i].children;
                hijos[1].innerText = objJson.nombre; 
                hijos[2].innerText = objJson.cuatrimestre;
                hijos[3].innerText = objJson.fechaFinal;
                hijos[4].innerText = objJson.turno;
             
                break;
            }
        }
}
function borrarFilaById(id){
    var tbody = document.getElementById("bodyTabla");
    var trs = tbody.children;    
    for(var i = 0; i<trs.length;i++){
        if(trs[i].getAttribute("indentificador") == id){
            trs[i].parentNode.removeChild(trs[i]);
            break;
        }
    }
}
function tomarDatosFormulario(){
    var turno;
    if($("m").checked  == true){
        turno = $("m").value;
    }else{
        turno = $("n").value;
    }  

    var objJson ={
        "id":$("id").value[0],
        "nombre":$("nombreM").value,
        "cuatrimestre":$("cuatrimestre").value,
        "fechaFinal":aFechaConBarra($("fechaM").value),
        "turno":turno}

    return objJson;
}

function crearElementoTd(dato)
{
    var d = document.createElement("td");
    var txt = document.createTextNode(dato);
    d.appendChild(txt);
    return d;
}




function crearElementoToLinkBorrar(tdTxt)
{
    var td = document.createElement("td");
    var a = document.createElement("a");
    var txt = document.createTextNode(tdTxt);
    
    a.setAttribute("href", "#");
    a.addEventListener("click", borrarFila);
    
    a.appendChild(txt);
    td.appendChild(a);

    return td;
}



function crearElementoToLinkModificar(tdTxt)
{
    var td = document.createElement("td");
    var a = document.createElement("a");
    var txt = document.createTextNode(tdTxt);
    
    a.setAttribute("href", "#");
    a.addEventListener("click", modificarFila);
    
    a.appendChild(txt);
    td.appendChild(a);

    return td;
}

function borrarFila(event){    
    event.preventDefault();
    var a = event.srcElement;
    var parent = a;
    
    while(parent.nodeName !== "TR"){        
        parent = parent.parentNode;
        console.log(parent.nodeName);      
    }
    parent.parentNode.removeChild(parent);
}






function clickAgregarNuevo(){
   
     var nombre = $("nombre");
     var apellido= $("apellido");
     var fecha = $("fecha");
     var telefono = $("telefono");
     var personaAux = {nombre:nombre.value,apellido:apellido.value,fecha:fecha.value,telefono:telefono.value};
     console.log(nombre.value);
     console.log(personaAux.nombre);
     agregarTr(personaAux);

}

 function $(elemento) {
    return document.getElementById(elemento);
}

 function clickCerrar(){
    
    var contAgregar = document.getElementById("contenedor");
    var btnC= document.getElementById("btnCerrar");
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.hidden = false;
    btnC.hidden = false;
    contAgregar.hidden = true;

   
}
function MostrarModificar(){
    var contAgregar = document.getElementById("contenedorModificar");
    contAgregar.hidden=false;
    

   }

function clickAgregar(){
   
     var contAgregar = document.getElementById("contenedor");
    var btn = document.getElementById("btnAgregar");
    contAgregar.hidden=false;
    btn.hidden = true;

}
function clickCerrarModificar(){
    
    var contAgregar = document.getElementById("contenedorModificar");
    var btnC= document.getElementById("btnCerrar");
    btnCerrar.hidden = false;
    contAgregar.hidden = true;

    
}


