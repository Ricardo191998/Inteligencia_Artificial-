'use strict';

let matriz = [[],[],[]];
let matrizFinal = [[],[],[]];
let coordenadas = [];
let arbol = new Arbol();

function ingresaDatos(){
    let cont = []; 
    for(var n = 0 ; n < 3 ; n++){
        for(var m = 0 ; m < 3 ; m++){
           matriz[n].push(document.getElementById(n.toString(10)+m.toString(10)).value);
           document.getElementById(n.toString(10)+m.toString(10)).disabled = true;
        }  
    }  
    document.getElementById("ingresa").disabled = true;
    arbol.agregar(matriz);
    console.log(arbol);
}


function ingresaDatosResultado(){
    let cont = [];
    for(var n = 0 ; n < 3 ; n++){
        for(var m = 0 ; m < 3 ; m++){
           matrizFinal[n].push(document.getElementById((n+1).toString(10)+(m+1).toString(10)+"-").value);
           document.getElementById((n+1).toString(10)+(m+1).toString(10)+"-").disabled = true;
        }  
    }  
    
    if(document.getElementById("ingresa").disabled == true){
        document.getElementById("solucion").disabled = true;
        resolver(arbol.raiz);
    }else{
        matrizFinal = [[],[],[]];
        alert("Ingresar cuadrado de inicio");
    }
    
}


function resolver(nodo){
    let coordenadas;
    let aux;
    let cola = [];
    if(iguales(nodo.matriz, matrizFinal)){
        console.log("Son iguales");
    }else{
        cola.push(nodo);
        while(!iguales(cola[0].matriz, matrizFinal)){
            aux = cola.shift();
            coordenadas = buscaVacio(aux.matriz);
            
            if(aux.matriz[coordenadas[0]][parseInt(coordenadas[1],10)-1] != undefined){
              mover(1,aux, coordenadas);
            }
            if(aux.matriz[coordenadas[0]][parseInt(coordenadas[1],10)+1] != undefined){
                mover(2,aux, coordenadas);
            }
            if(nodo.matriz[parseInt(coordenadas[0],10)+1]!= undefined){
                mover(3,aux, coordenadas);
            }
            if(aux.matriz[parseInt(coordenadas[0],10)-1]!= undefined)
            {
                mover(4,aux, coordenadas);            
            }
            for(var n = 0 ; n < aux.hijos.length; n++ ){
                if(aux.hijos[n]!= null){
                    cola.push(aux.hijos[n]);
                }
            }
        }
       console.log(arbol);
    }
    arbol.amplitud(arbol.raiz, matrizFinal);
}

function mover(tipo ,  nodo, coordenadas){
    let nuevaMatriz = [[],[],[]];
    
    for(var n = 0 ; n < 3 ; n++){
        for(var m = 0 ; m < 3 ; m++){
            nuevaMatriz[n].push(nodo.matriz[n][m]);
        }
    }
    switch(tipo){
        case 1: //IZQUIERDA
            nuevaMatriz[coordenadas[0]][coordenadas[1]] = nuevaMatriz[coordenadas[0]][coordenadas[1]-1];
            nuevaMatriz[coordenadas[0]][coordenadas[1]-1] = "";
            break;
        case 2: //DERECHA
            nuevaMatriz[coordenadas[0]][coordenadas[1]] = nuevaMatriz[coordenadas[0]][coordenadas[1]+1];
            nuevaMatriz[coordenadas[0]][coordenadas[1]+1] = "";
            break;
        case 3: //ABAJO
            nuevaMatriz[coordenadas[0]][coordenadas[1]] = nuevaMatriz[coordenadas[0]+1][coordenadas[1]];
            nuevaMatriz[coordenadas[0]+1][coordenadas[1]] = "";
            break;
        case 4:  //ARRIBA
            nuevaMatriz[coordenadas[0]][coordenadas[1]] = nuevaMatriz[coordenadas[0]-1][coordenadas[1]];
            nuevaMatriz[coordenadas[0]-1][coordenadas[1]] = "";
            break;
    }

    if(!arbol.recorreCompara(arbol.raiz , nuevaMatriz)){
        nodo.agregarNodo(nuevaMatriz);
    }

}


function iguales(matriz1 , matriz2){
    for(var n = 0 ; n < matriz1.length ; n++){
        for(var m = 0 ; m < matriz2.length; m++){
            if(matriz1[n][m] != matriz2[n][m]){
                return false;
            }
        }
    }              
    return true;
}

function buscaVacio(m){
    for(var n = 0 ; n < m.length; n++){
        if(m[n].indexOf("") != -1){
            return [n,m[n].indexOf("")];
        }
    }
}