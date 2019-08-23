package practic9;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Guest
 */
public class Nodo {
    int valor;
    BNodo izq= null;
    BNodo der= null;
    
    public Nodo(){
        izq=der=null;
    }
    
    public Nodo(int data, BNodo lt, BNodo rt){
        valor= data;
        izq= lt;
        der= rt;
    }
    
    public Nodo(int data){
        this(data, null, null);
    } 
    
    public void setIzq(BNodo izq){
        this.izq= izq;
    }
    
    public void setDer(BNodo der){
        this.der= der;
    }
    
    public void setValor(int valor){
        this.valor= valor;
    }
    
}
