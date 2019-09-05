"use strict";

//Se pudo haber utilizado una matriz de abyacencia como estructura base, preferimos ocupar un objeto json más facil de interpretar. 

let nodos = [
    {
        valor : "1",
        hijoIzq : "3",
        hijoDer : "2",
    },
    {
        valor : "3",
        hijoIzq : "4",
        hijoDer : ""
    },
    {
        valor : "4",
        hijoIzq : "3",
        hijoDer : "8"
    },
    {
        valor : "2",
        hijoIzq : "1",
        hijoDer : "6"
    },
    {
        valor : "5",
        hijoIzq : "6",
        hijoDer : ""
    },
    {
        valor : "6",
        hijoIzq : "5",
        hijoDer : "7"
    },
    {
        valor : "7",
        hijoIzq : "8",
        hijoDer : "",
    },
    {
        valor : "8",
        hijoIzq : "",
        hijoDer : "7",
    },
]

//se declara variable global que contiene los recorridos del arbol en primero en profundidad;

let recorridos = [];

class Arbol{
    raiz;

    constructor(){
        this.raiz = null;
    }

    regresaRaiz() {
        return this.raiz;
    }

    agregar(valor){ 
        if(this.raiz == null){
            
            this.raiz = new Nodo(valor);    
        }
    }

    agregarNodoIzq(valor,nodo){

            nodo.hijoIzq = new Nodo(valor);
        
    }

    agregarNodoDer(valor,nodo){
            
            nodo.hijoDer= new Nodo(valor);
        
    }

    //Funcion que identifica el nodo en donde te encuentras e inserta un nuevo nodo hijo , dependiendo del tip izquierdo o derecho

    buscaNodo(padre , valor , nodo , tipo){
        
        if(padre == null){
            
            if(tipo == "izq"){
                nodo.agregarNodoIzq(valor);
            }else{
                nodo.agregarNodoDer(valor);
            }
        }else if(nodo.valor == padre){
            
            if(tipo == "izq"){
                nodo.agregarNodoIzq(valor, nodo);
            }else{
                nodo.agregarNodoDer(valor, nodo);
            }
        }else{
            
            if(nodo.hijoIzq != null){
                
                this.buscaNodo(padre, valor, nodo.hijoIzq , tipo);
            }
            if(nodo.hijoDer != null){
                
                this.buscaNodo(padre , valor, nodo.hijoDer , tipo );
            }
            
        }
    }

    preordenIzq(nodo){
        if(nodo.valor == "4" || nodo.valor == "6"){
            this.preordenDer(nodo);
        }else{
            if(nodo.hijoIzq!= null ){
                recorridos.push(nodo.valor);
                this.preordenIzq(nodo.hijoIzq);
            }else if(nodo.hijoDer!= null){
                recorridos.push(nodo.valor);
                this.preordenIzq(nodo.hijoDer);
            }else{
                recorridos.push(nodo.valor);
                return;
                
            }
        }
        }
    preordenDer(nodo){
            if(nodo.hijoDer!= null ){
                recorridos.push(nodo.valor);
                this.preordenDer(nodo.hijoDer);
            }else if(nodo.hijoIzq!= null){
                recorridos.push(nodo.valor);
                this.preordenDer(nodo.hijoIzq);
            }else{
                recorridos.push(nodo.valor);
                return;
                
            }
        }
}

//Objeto tipo nodo , contiene el valor del nodo , us hijo izquierdo y derecho. Además tiene la opcion de agregar nuevos hijos.

class Nodo{

    constructor (valor){
        this.valor = valor;
        this.hijoIzq = null;
        this.hijoDer = null;
    }    

    agregarNodoIzq(valor,nodo){

        nodo.hijoIzq = new Nodo(valor);
    
    }

    agregarNodoDer(valor,nodo){
    
        nodo.hijoDer= new Nodo(valor);
    
    }

}

var exc = [0,0,0,0];

function verificaInsertados(elem, array){    
    if(array.indexOf(elem) == -1){
        switch(elem){
            /*case ("3"): 
                if(exc[0] == 0){
                    exc[0]++;
                    return true; 
                }else{
                    array.push(elem); 
                    return false;
                }
            case ("6"): 
                if(exc[1] == 0){
                    exc[1]++;
                    return true;
                }else
                    array.push(elem);   
                    return false; 
            break;*/
            case ("7"): 
                if(exc[2] == 0){
                    exc[2]++;
                    return true;
                }else
                    array.push(elem);
                    return false; 
            break;
            case ("8"): 
                if(exc[3] == 0){
                    exc[3]++;
                    return true;
                }else
                    array.push(elem);
                    return false; 
            break;
            default:
                array.push(elem);
                return true;
        }
    }else{
        return false;
    }
}