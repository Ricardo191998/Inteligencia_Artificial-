/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package practic9;
import java.util.Scanner;
/**
 */
public class Practica9CRA_HVLF {

    public static Scanner sc= new Scanner(System.in);
    public static void main(String[] args) {
        int op;
        System.out.println("***     ARBOL B     ***");
        System.out.println("Ingresa el orden del arbol a construir");
        ArbolB arbol= new ArbolB(sc.nextInt());
        do{
            op= menu();
            procesarOpcion(op, arbol);
        }while(op!=0);
    }
    
    public static int menu(){
        System.out.println("\n****    ARBOL B     ****");
        System.out.println("1- Agregar elemento");
        System.out.println("2- Buscar elemento");
        System.out.println("3- Mostrar Arbol");
        System.out.println("0- Salir");
        System.out.println("Elegir opcion: ");
        return sc.nextInt();
    }
    
    public static void procesarOpcion(int op, ArbolB arbol){
        switch(op){
            case 1:
                System.out.println("\n--- Agrega elemento ---");
                System.out.println("Elemento a agregar: ");
                arbol.add(new Nodo(sc.nextInt()));
                break;
            case 2:
                System.out.println("\n--- Buscar elemento ---");
                System.out.println("Elemento a buscar: ");
                if(arbol.buscar(sc.nextInt()))
                    System.out.println("Elemento encontrado");
                else
                    System.out.println("Elemento NO encontrado");
                break;
            case 3:
                System.out.println("--- Mostrar Arbol ---");
                arbol.imprimirArbol();
                break;
            case 0:
                System.out.println("Salir");
                break;
            default:
                System.out.println(">> Opcion invalida <<");
        }
    }
}
