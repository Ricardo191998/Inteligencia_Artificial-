'use strict'

//Dependiendo del boton que pulse se va a crear un nuevo arbol apartir de ese evento. Ademas se va a mostrar de froma visual su recorrido.
function defineEstadoInicial(elemento){
    var arbol = new  Arbol(); 
    let insertados = [];
    switch(elemento.id){
        case ("s1"):
                crearArbol(arbol , 0 ,"1" , insertados , 0);
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break; 
        case ("s2"):
                crearArbol(arbol ,0 ,"2" , insertados, 0);
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break;
        case ("s3"):
                crearArbol(arbol , 0 ,"3" , insertados , 0 );
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break;
        case ("s4"):
                crearArbol(arbol , 0 ,"4" , insertados, 0);
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break;
        case ("s5"):
                crearArbol(arbol ,0 ,"5" , insertados, 0);
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break;
        case ("s6"):
                crearArbol(arbol , 0,"6" , insertados, 0);
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break;
        case ("s7"):
                crearArbol(arbol , 0,"7" , insertados, 0);
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break;
        case ("s8"):
                crearArbol(arbol , 0 ,"8" , insertados, 0);
                arbol.preordenIzq(arbol.raiz);
                mostrarRecorrido(recorridos);
            break;
        }
        recorridos = [];
}

//Funcion que crea el arbol apartir del nodo raiz que elige el usuario

function crearArbol(arbol , padre , e , insertados , ban ){
    for(var n = 0 ; n < nodos.length ; n++){
        //Compara si el nodo elegido por el usuario se encuentra en la rama base
        if(e == nodos[n].valor){
            //Si el valor del nodo ya fue insertado con anterioridad 
            if(insertados.indexOf(e)== -1){
                verificaInsertados(e, insertados);
                //Si es el primer nodo que ingresa es decir nodo raiz
                if(ban == 0){
                    arbol.agregar(e);
                    crearArbol(arbol, e,nodos[n].hijoIzq , insertados, 1);
                    crearArbol(arbol, e,nodos[n].hijoDer , insertados , 2);
                }
                //SI el nodo que sigue es hijo izquierdo 
                else if(ban == 1){
                    
                    arbol.agregarNodoIzq(e , arbol.raiz);
                    crearArbol(arbol, nodos[n].valor ,nodos[n].hijoIzq , insertados, 3);
                    crearArbol(arbol, nodos[n].valor ,nodos[n].hijoDer , insertados, 4);
                
                //Si el nodo que sigue es hijo derecho
                }else if(ban == 2){
                    arbol.agregarNodoDer(e , arbol.raiz);
                    crearArbol(arbol,nodos[n].valor ,nodos[n].hijoIzq , insertados, 3);
                    crearArbol(arbol,nodos[n].valor ,nodos[n].hijoDer , insertados, 4);
                }else{
                    //Si el nodo que sigue es izquierdo 
                    if(ban == 3){ 
                        //Busca el nodo padre e insertalo como nodo hijo izquierdo
                        arbol.buscaNodo(padre , e , arbol.raiz,"izq");
                    }else{
                        //Busca el nodo padre e insertalo como nodo hijo derecho
                        arbol.buscaNodo(padre , e , arbol.raiz,"der");
                    }
                    //Repite el processo hasyq eu todos los nodos de la estructura base fueron insertados
                    crearArbol(arbol, nodos[n].valor ,nodos[n].hijoIzq , insertados, 4);
                    crearArbol(arbol, nodos[n].valor ,nodos[n].hijoDer , insertados ,3);
                }
            }   
            return; 
        }
    }
}

//Funcion que crea nuevas etiquetas y muestra el recorrido primero en profundidad del arbols

function mostrarRecorrido(recorridos){
    var contenedor = document.getElementById("recorrido");

    for(var n = 0 ; n <= recorridos.length ; n++){
        var x = document.createElement("img");
        x.style.padding = "10px";
        switch(recorridos[n]){
            case "1":
                    x.src = "./estados/s1.png";
                break;
            case "2":
                    x.src= "./estados/s2.png";
                break;
            case "3":
                    x.src= "./estados/s3.png";
                break;
            case "4":
                    x.src = "./estados/s4.png";
                break;
            case "5":
                    x.src = "./estados/s5.png";
                break;
            case "6":
                    x.src = "./estados/s6.png";
                break;
            case "7":
                    x.src = "./estados/s7.png";
                break;
            case "8":
                    x.src = "./estados/s8.png"; 
                break;
        }
        contenedor.appendChild(x);
    }

}