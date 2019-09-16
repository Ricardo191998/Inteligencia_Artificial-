'use strict'

let ban = 0;
let inicio;
let matrizAdyacencia = [[],[],[],[],[],[]];
let matrizRecorrida = [[],[],[],[],[],[]];
let recorrido  = [];
let arbol;

function obtenerDatos(){
	for(var n = 1 ; n < 7 ; n++){
		for(var m = 1 ; m< 7 ; m++){
			if(typeof document.getElementById(n.toString()+m.toString()) == undefined || document.getElementById(n.toString()+m.toString()) == null){
				matrizAdyacencia[n-1].push('0');
			}
			else if(document.getElementById(n.toString()+m.toString()).value == ""){	
				matrizAdyacencia[n-1].push('1');
			}else{
				matrizAdyacencia[n-1].push(document.getElementById(n.toString()+m.toString()).value);
				document.getElementById(n.toString()+m.toString()).disabled = true;
			}
		}
	}
	console.log(matrizAdyacencia);
	if(inicio != null){
		let raiz = new Nodo(inicio);
		arbol = new Arbol(raiz);
		buscarRecorrido(raiz , recorrido);
		console.log(arbol);
		arbol.recorridoPreOrden(arbol.raiz);
		console.log("Mayor Precio" + "  " + arbol.mayorPrecio);
		console.log("Menor Precio" + "  " + arbol.menorPrecio);
		limpiaMapa();
		arbol.buscarMenorPrecio(arbol.raiz);
	}else{
		alert("No has ingresado lo que quieres enecontrar");
	}
}

function selecciona(e, element){
	if(ban == 0 ){
		element.style.backgroundColor = "red";
		inicio = e;
		ban += 1; 
	}else {
		recorrido.push(e);
		element.style.backgroundColor = "red";
	}
}


function buscarRecorrido(inicio, fin){
	inicio.agregarVecinos(encontrarVecinos(inicio.valor));
	
	for(var n = 0 ; n < inicio.vecinos.length ; n++){
		if(comparaRecorrido(inicio.vecinos[n].visitados,fin)){
			console.log("Ya se encontro el fin");
		}else{
			buscarRecorrido(inicio.vecinos[n], fin);
		}
	}
	
}


function comparaRecorrido(array , array1){
	let aux = 0; 
	for(var n = 0 ; n < array.length ; n++){
		for(var m = 0 ; m < array1.length ; m++){
			if(array[n] == array1[m]){
				aux += 1;
			}
		}
	}

	if(array1.length == aux){
		return true; 
	}else{
		return false;
	}
}

function encontrarVecinos(inicio){
	let vecinos = [];
	for(var n = 0 ;  n < matrizAdyacencia.length ; n++){
		if( matrizAdyacencia[n][inicio-1] != '0'){
			vecinos.push({valor : n + 1  , precio : matrizAdyacencia[n][inicio-1]});
		}
			for(var m = 0 ; m < matrizAdyacencia[n].length ; m++){
				if(  n == (inicio-1).toString() && matrizAdyacencia[n][m] != '0'){
					vecinos.push({valor : m + 1 , precio : matrizAdyacencia[n][m]});
				}
				
			}
	}
	return vecinos;
}

function muestraRecorrido(array){
	for(var n = 0; n < array.length ; n++){
		document.getElementById(array[n].toString()).style.backgroundColor = "red";
	}
}

function limpiaMapa(){
	for(var n = 1; n < 7 ; n++){
		document.getElementById(n.toString()).style.backgroundColor = "green";
	}
}