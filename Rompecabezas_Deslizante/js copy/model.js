class Arbol{
    raiz ;

    constructor(){
        this.raiz = null;
    }

    regresaRaiz() {
        return this.raiz;
    }

    agregar(matrix){ 
        if(this.raiz == null){
             this.raiz = new Nodo(matrix);
        }
    }

    recorrido_profundidad(nodo , n , lista, resultado){
        
        if(nodo.hijos[0] == null && iguales(nodo.matriz, resultado)){
            return lista;
        }else{
            if(nodo.hijos[0] == null){
                lista.splice(n + 1, lista.length - n);
            }
            lista.push(nodo);
            

        }

    }

    //Regresa el recorrido en amplitud de los nodos del arbol 
    amplitud(nodo, respuesta){
        let aux;
        let cola = [];
        let colaAux = [];
        
        if(nodo != null){
            cola.push(nodo);
            while(cola.length > 0){
                aux = cola.shift()
                console.log("----")
                console.log(imprimeMatriz(aux.matriz));
                console.log("----")
                if(iguales(aux.matriz, respuesta)){
                    break;
                }
                colaAux.push(aux.valor);
                for(var n = 0 ; n < 4 ; n++){
                    if (aux.hijos[n] != null) //SI EL HIJO N DEL NODO ACTUAL EXISTE
                    {
                        cola.push(aux.hijos[n]); //SE INSERTA ESE HIJO COMO ELEMENTO SIGUIENTE EN LA COLA
                    }
                }
            }
         }
    }

    //Recorre el arbol para que no se repita un movimiento de la misma rama 
    recorreCompara(nodo , matriz){
        let aux;
        let cola = [];
        let colaAux = [];
        
        if(nodo != null){
            cola.push(nodo);
            while(cola.length > 0){
                aux = cola.shift()
                if(iguales(aux.matriz, matriz)){
                    return true;
                }
                colaAux.push(aux.valor);
                for(var n = 0 ; n < 4 ; n++){
                    if (aux.hijos[n] != null) //SI EL HIJO N DEL NODO ACTUAL EXISTE
                    {
                        cola.push(aux.hijos[n]); //SE INSERTA ESE HIJO COMO ELEMENTO SIGUIENTE EN LA COLA
                    }
                }
            }
            return false;
         }
    }

}


function imprimeMatriz(matriz){
    for(var n = 0 ; n < 3 ; n++){
        console.log(matriz[n]);
    }
}

class Nodo{

    matriz = [[],[],[]];
    hijos =[];
 

    constructor (matrix){
        
        for(var n = 0 ; n < 3 ; n++){
            for(var m = 0 ; m < 3 ; m++){
                this.matriz[n].push(matrix[n][m]);
                this.hijos[n] = null;
            }  
        } 
        this.hijos.push(null);
    }    

    agregarNodo(valor){
        let ban = 0
        for(var n = 0 ; n < 4 ; n++){
            if(this.hijos[n] == null && ban == 0){
                this.hijos[n] = new Nodo(valor);
                ban = 1;
            }
        }
    }

}