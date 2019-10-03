
class Arbol{

    constructor(valor){
        this.raiz = valor; 
        this.mayorPrecio = 0;
        this.menorPrecio  = 0;
        this.ban = true;
    }

    recorridoPreOrden(nodo){
        if(nodo.vecinos.length == 0){
            if(nodo.precio > this.mayorPrecio){

                this.mayorPrecio = nodo.precio;
            }
            if(this.menorPrecio == 0){
                this.menorPrecio = nodo.precio;
            }
            if(this.menorPrecio > nodo.precio && comparaRecorrido(nodo.visitados , recorrido)){
                this.menorPrecio = nodo.precio;
            }
        }
        for(var n = 0 ; n < nodo.vecinos.length ; n++){
            this.recorridoPreOrden(nodo.vecinos[n]);
        }
    }

    buscarMenorPrecio(nodo){
        if(nodo.vecinos.length == 0){
            if(nodo.precio ==  this.menorPrecio){
                console.log(nodo);
                if(this.ban && comparaRecorrido(nodo.visitados , recorrido)){
                    this.ban = false;
                    muestraRecorrido(nodo.visitados);
                }
            }
        }
        for(var n = 0 ; n < nodo.vecinos.length ; n++){
            this.buscarMenorPrecio(nodo.vecinos[n]);
        }
    }

}

class  Nodo{

    constructor(valor){
        this.valor = valor;
        this.precio = 0; 
        this.visitados = [valor];
        this.vecinos = [];
    }

    agregarVecino(valor){
        if(this.noRepetir(valor.valor)){
            let nodo = new Nodo(valor.valor);
            nodo.precio += parseInt(valor.precio, 10) + parseInt(this.precio);
            this.visitados.forEach(function (element){
                nodo.visitados.push(element);
            });
            this.vecinos.push(nodo);
            return true;
        }else{
            return false;
        }
    }

    agregarVecinos(valor){
        for(var n = 0 ; n < valor.length; n++) {
            if(this.noRepetir(valor[n].valor)){
                let nodo = new Nodo(valor[n].valor);
                nodo.precio += parseInt(valor[n].precio, 10) + parseInt(this.precio);
                this.visitados.forEach(function (element){
                    nodo.visitados.push(element);
                });
                this.vecinos.push(nodo);
            }
        };
        
    }

    noRepetir(valor){
        if(this.visitados.length == 0 ){
            return true;
        }else{
            for(var n = 0 ; n < this.visitados.length ; n++ ){
                if(this.visitados[n] == valor){
                    return false;
                }
            }
            return true;
        }
    }

}
