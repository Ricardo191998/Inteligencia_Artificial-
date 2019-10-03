'use strict'

let ban = 0;
let inicio;
let matrizAdyacencia = [[],[],[],[],[],[],[],[]];
let matrizEuristica = [[],[],[],[],[],[],[],[]]
let matrizRecorrida = [[],[],[],[],[],[],[],[]]
let recorrido  = [];
let arbol;


function obtenerDatos(){
	for(var n = 1 ; n < 9 ; n++){
		for(var m = 1 ; m< 9 ; m++){
			if(typeof document.getElementById(n.toString()+m.toString()) == undefined || document.getElementById(n.toString()+m.toString()) == null){
				matrizAdyacencia[n-1].push('0');
			}
			else if(document.getElementById(n.toString()+m.toString()).value == ""){	
				matrizAdyacencia[n-1].push('1');
			}else{
				matrizAdyacencia[n-1].push(document.getElementById(n.toString()+m.toString()).value);
				document.getElementById(n.toString()+m.toString()).disabled = true;
			}
			if(typeof document.getElementById("d"+n.toString()+m.toString()) == undefined || document.getElementById("d"+n.toString()+m.toString()) == null){
				matrizEuristica[n-1].push('0');
			}
			else if(document.getElementById("d"+n.toString()+m.toString()).title == ""){	
				matrizEuristica[n-1].push('1');
			}else{
				matrizEuristica[n-1].push(document.getElementById("d"+n.toString()+m.toString()).title);
			}
		}
	}
	console.log(matrizAdyacencia);
	console.log(matrizEuristica);
	if(inicio != null){
		let raiz = new Nodo(inicio);
		arbol = new Arbol(raiz);
		limpiaMapa();
		buscarRecorrido(raiz , recorrido);
		console.log(arbol);
		//arbol.recorridoPreOrden(arbol.raiz);
		//console.log("Mayor Precio" + "  " + arbol.mayorPrecio);
		//console.log("Menor Precio" + "  " + arbol.menorPrecio);
		
		//arbol.buscarMenorPrecio(arbol.raiz);
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
	console.log(inicio);
	let vecinos = encontrarVecinos(inicio.valor)
	//inicio.agregarVecinos(encontrarVecinos(inicio.valor));
	vecinos = ordenaVecinos(vecinos);
	if(comparaRecorrido(inicio.visitados, fin)){
		muestraRecorrido(inicio.visitados);
		return true;
	}

	for(var n = 0 ; n < vecinos.length ; n++){
		if(inicio.agregarVecino(vecinos[n])){
			if(buscarRecorrido(inicio.vecinos[0], fin)){
				console.log("Ya se encontro el fin");
				return true;
			}else{
				inicio.vecinos.pop();
			}
		}
	}
}

function ordenaVecinos(array){
	if(array.length < 1){
		return [];
	}
	
	let izq = []
	let der = []
	let pivot = array[0]

	for(var n = 1 ; n < array.length; n++){
		if(array[n].euristica < pivot.euristica){
			izq.push(array[n])
		}else{
			der.push(array[n])
		}
	}
	return [].concat(ordenaVecinos(izq), pivot, ordenaVecinos(der));
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
			vecinos.push({valor : n + 1  , precio : matrizAdyacencia[n][inicio-1], euristica :matrizEuristica[n][inicio-1]  });
		}
		for(var m = 0 ; m < matrizAdyacencia[n].length ; m++){
			if(  n == (inicio-1).toString() && matrizAdyacencia[n][m] != '0'){
				vecinos.push({valor : m + 1 , precio : matrizAdyacencia[n][m], euristica :matrizEuristica[n][m]});
			}	
		}
	}
	return vecinos;
}

function muestraRecorrido(array){
	console.log(array);
	for(var n = 0; n < array.length ; n++){
		document.getElementById(array[n].toString()).style.backgroundColor = "red";
	}
}

function limpiaMapa(){
	for(var n = 1; n < 7 ; n++){
		document.getElementById(n.toString()).style.backgroundColor = "green";
	}
}