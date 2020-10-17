function getPersonas(){
    var api = "materias"
    xml.onreadystatechange = callBack;
    strParametros = "";
    xml.open(metodo, url+api+strParametros, true);
    var gif = document.getElementById("load");
    gif.hidden=false;
    xml.send();
}

function callBack(){
    if (xml.readyState === 4){
        if(xml.status === 200){
            var strRespuesta = xml.responseText;
            if(strRespuesta !=""){
                var objRespuesta = parsearDatos(strRespuesta);                        
               datosToGrilla(objRespuesta);
               var gif = document.getElementById("load");
               gif.hidden=true;
            }
            else if(strRespuesta == ""){
                alert("No hay datos.");
            }
            else{
                alert("error del servidor");
            }            
        }        
    }
}

function parsearDatos(respuesta){
    var arraryPersonas = JSON.parse(respuesta);
    console.log(arraryPersonas);
    return arraryPersonas;
}