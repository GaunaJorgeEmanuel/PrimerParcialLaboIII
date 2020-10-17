function postElemento(jsonData){
    xml.onreadystatechange = callBackPostElemento; 
    var api = "editar";       
    xml.open("POST", url+api, true);
    var gif = document.getElementById("load");
    gif.hidden=false;      
    xml.setRequestHeader("Content-Type", "application/json");   
    xml.send(JSON.stringify(jsonData));
}

function postDeleteElemento(jsonData){
    xml.onreadystatechange = callBackDeleteElemento; 
    var api = "eliminar";
   
    xml.open("POST", url+api, true);
    var gif = document.getElementById("load");
    gif.hidden=false;      
    xml.setRequestHeader("Content-Type", "application/json");   
    xml.send(JSON.stringify(jsonData));
}

function callBackDeleteElemento(){
    if (xml.readyState === 4){                       
        if(xml.status === 200){                 
            var strRespuesta = JSON.parse(xml.responseText);                     
            if(strRespuesta["type"] == "ok"){                                       
                console.log("entra");
                var obj = JSON.parse(localStorage.getItem("borrar"));
                console.log(obj);
                borrarFilaById(obj.id);
                        
            }
            else if(strRespuesta == "error"){
             
                console.log("No hay datos.");
            }
            else{
               
                console.log("error del servidor");
            }  
            var gif = document.getElementById("load");
            gif.hidden=true;           
        }        
    }
}

function callBackPostElemento(){
    if (xml.readyState === 4){
        if(xml.status === 200){             
            var strRespuesta = JSON.parse(xml.responseText);           
            if(strRespuesta["type"] == "ok"){                                       
            

            }
            else if(strRespuesta == "error"){
                console.log("No hay datos.");
            }
            else{
                console.log("error del servidor");
            } 
            var gif = document.getElementById("load");
            gif.hidden=true;            
        }        
    }
}
