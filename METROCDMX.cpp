#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
#include <string>
#include <iostream>
#include <windows.h>

using namespace std;

int a[15], z;

struct metro
{
metro *ref, *N, *S, *E, *O, *NO, *NE, *SO, *SE;
int l[12], dac;
bool fijo;
char estacion[30];
metro()
	{
	int i;
	dac=100;
	fijo=true;
	ref=NULL; N=NULL; S=NULL; E=NULL; O=NULL; NO=NULL; NE=NULL; SO=NULL; SE=NULL;
	for(i=0;i<12;i++)
		l[i]=NULL;
	}
};

struct lista
{
	lista *p, *q, *nuevo, *sig, *back, *auxnodo, *auxnodo1, *auxnodo2;
	metro *pobj;
	int vord;
	public:
	lista(){p=NULL; q=NULL;}
  	void inicial(metro *a, int w)
		{
			p=new(lista);
			p->pobj=a;
			p->vord=w;
			p->sig=NULL;
			p->back=NULL;
			q=p;
		}
	void inicial(metro *a)
		{
			p=new(lista);
			p->pobj=a;
			p->sig=NULL;
			p->back=NULL;
			q=p;
		}
	void datain(metro *b, int v)
		{
			if(p==NULL && q==NULL)
				inicial(b, v);
			else
   		{
			nuevo=new(lista);
			nuevo->pobj=b;
			nuevo->vord=v;
   			nuevo->sig=NULL;
			nuevo->back=q;
			q->sig=nuevo;
   			q=nuevo;
			ordenar();
		}
   }
	void datain(metro *b)
		{
			if(p==NULL && q==NULL)
				inicial(b);
			else
   		{
			nuevo=new(lista);
			nuevo->pobj=b;
   			nuevo->sig=NULL;
			nuevo->back=q;
			q->sig=nuevo;
   			q=nuevo;
		}
   }
	metro* elim(void)
		{
		metro *aux=p->pobj;
		delete(p);
		p=NULL;
		q=NULL;
		return aux;
		}
	metro* dataout(void)
		{
		metro *psal;
		if(p==NULL && q==NULL)
		{
     	getch();
		cout <<endl <<endl;
		psal=NULL;
		}
		else
		{
			if(p==q)
      			psal=elim();
			else
      		{
				psal=p->pobj;
				auxnodo=p;
   				p=p->sig;
				p->back=NULL;
   				delete(auxnodo);
			}
		}
		return psal;
		}
	void ordenar(void)
	{
		metro *aux;
		int axv;
		for(auxnodo=q;auxnodo!=p;auxnodo=auxnodo->back)
      	{
          	for(auxnodo1=p;auxnodo1!=auxnodo;auxnodo1=auxnodo1->sig)
        	{
			    auxnodo2=auxnodo1->sig;
				if(auxnodo1->vord>auxnodo2->vord)
				{
					aux=auxnodo1->pobj;
					axv=auxnodo1->vord;
                    auxnodo1->pobj=auxnodo2->pobj;
					auxnodo1->vord=auxnodo2->vord;
                    auxnodo2->pobj=aux;
					auxnodo2->vord=axv;
				}
			}
		}
	}
};

void asigna(metro *a, lista &b)
{
metro *aux;
int ai;
a->fijo=true;
for(ai=1;ai<10;ai++)
	{
	switch (ai)
		{
			case 1:	aux=a->SO;	break;
			case 2:	aux=a->S;	break;
			case 3:	aux=a->SE;	break;
			case 4:	aux=a->O;	break;
			case 6:	aux=a->E;	break;
			case 7:	aux=a->NO;	break;
			case 8:	aux=a->N;	break;
			case 9:	aux=a->NE;	break;
			default:	aux=NULL;	break;
		}
		if(aux!=NULL)
		{
			if (aux->fijo==false)
			{
				if (aux->dac>((a->dac)+1))
				{
					aux->dac=(a->dac+1);
					aux->ref=a;
					b.datain(aux,aux->dac);
				}
			}
		}
	}
}

void dijkstra(metro *cobj, lista &a)
{
	metro *nax;
	cobj->ref=NULL;
	cobj->dac=0;
	asigna(cobj, a);
	nax=a.dataout();
	while (nax!=NULL)
	{
		if(nax->fijo==false)
			asigna(nax, a);
		nax=a.dataout();
	}
}

metro* nnodo(int d,metro *a, char sta[30])
{
	metro *nuevo, *pret;
	nuevo=new(struct metro);
	strcpy(nuevo->estacion,sta);
	switch (d)
	{
	case 1:
	nuevo->NE=a; a->SO=nuevo; 
	break;
	
	case 2:
	nuevo->N=a; 
	a->S=nuevo; 
	break;

	case 3: 
	nuevo->NO=a; a->SE=nuevo; 
	break;

	case 4: 
	nuevo->E=a; a->O=nuevo; 
	break;

	case 6: 
	nuevo->O=a; a->E=nuevo; 
	break;

	case 7: 
	nuevo->SE=a; a->NO=nuevo; 
	break;

	case 8: 
	nuevo->S=a; a->N=nuevo; 
	break;

	case 9: 
	nuevo->SO=a; a->NE=nuevo; 
	break;
	}
	pret=nuevo;
	return pret;
}

metro* cnodo(char sta[30])
{
	metro *nuevo;
	nuevo=new(struct metro);
	strcpy(nuevo->estacion,sta);
	return nuevo;
}

metro* mover(metro *axm)
{
	int dir;
	dir=_getch();
	switch(dir)
	{
	default: cout << "Opcion No Valida\n\n"; getch(); break;

	case 49:
		if(axm->SO!=NULL)
			axm=axm->SO;
	break;

	case 50:
		if(axm->S!=NULL)
			axm=axm->S;
	break;

	case 51:
	if(axm->SE!=NULL)
		axm=axm->SE;
	break;

	case 52:
	if(axm->O!=NULL)
		axm=axm->O;
	break;

	case 54:
		if(axm->E!=NULL)
		axm=axm->E;
	break;

	case 55:
		if(axm->NO!=NULL)
		axm=axm->NO;
	break;

	case 56:
		if(axm->N!=NULL)
		axm=axm->N;
	break;

	case 57:
		if(axm->NE!=NULL)
		axm=axm->NE;
	break;
	}
	return axm;
}

metro* mover(metro *axm, int dir)
{
	switch(dir)
	{
	default: cout << "Opcion No Valida\n\n"; getch(); break;

	case 1:
		if(axm->SO!=NULL)
			axm=axm->SO;
	break;

	case 2:
		if(axm->S!=NULL)
			axm=axm->S;
	break;

	case 3:
	if(axm->SE!=NULL)
		axm=axm->SE;
	break;

	case 4:
	if(axm->O!=NULL)
		axm=axm->O;
	break;

	case 6:
		if(axm->E!=NULL)
		axm=axm->E;
	break;

	case 7:
		if(axm->NO!=NULL)
		axm=axm->NO;
	break;

	case 8:
		if(axm->N!=NULL)
		axm=axm->N;
	break;

	case 9:
		if(axm->NE!=NULL)
		axm=axm->NE;
	break;
	}
	return axm;
}

metro* ligar(metro *a, int d, metro *b)
{
	metro *pret;
	switch (d)
	{
	case 1:	b->NE=a; a->SO=b; break;
	case 2: b->N=a; a->S=b; break;
	case 3: b->NO=a; a->SE=b; break;
	case 4: b->E=a; a->O=b; break;
	case 6: b->O=a; a->E=b; break;
	case 7: b->SE=a; a->NO=b; break;
	case 8: b->S=a; a->N=b; break;
	case 9: b->SO=a; a->NE=b; break;
	}
	pret=b;
	return pret;
}

void rmcorta(metro *r)
{
	while (r->ref!=NULL)
	{
      cout<<" * "<< r->estacion<<endl;
		r=r->ref;
	}
   cout<<" * "<< r->estacion<<endl;

  cout<<"\n\n"<<endl;
  system("pause");

}

void pushp(metro *a, lista &b)
{
metro *aux;
int ai;
a->fijo=false;
for(ai=1;ai<10;ai++)
	{
	switch (ai)
		{
			case 1:	aux=a->SO;	break;
			case 2:	aux=a->S;	break;
			case 3:	aux=a->SE;	break;
			case 4:	aux=a->O;	break;
			case 6:	aux=a->E;	break;
			case 7:	aux=a->NO;	break;
			case 8:	aux=a->N;	break;
			case 9:	aux=a->NE;	break;
			default:	aux=NULL;	break;
		}
		if(aux!=NULL)
		{
			if (aux->fijo==true)
			{
				aux->fijo=false;
				b.datain(aux);
			}
		}
	}
}

lista busq(metro *obj, lista &a, char ini[30], char fin[30])
{
metro *nax;
lista lif;
char esti[30], estf[30];

strcpy(esti,ini);
strcpy(estf,fin);
if (stricmp(esti,obj->estacion)==0)
{
	lif.datain(obj, 0);
}
if (stricmp(estf,obj->estacion)==0)
{
	lif.datain(obj, 1);
}
obj->ref=NULL;
obj->dac=100;
pushp(obj, a);

nax=a.dataout();
if (stricmp(esti,nax->estacion)==0)
{
	lif.datain(nax, 0);
}
if (stricmp(estf,nax->estacion)==0)
{
	lif.datain(nax, 1);
}
while (nax!=NULL)
	{
		nax->dac=100;
		nax->ref=NULL;
		pushp(nax, a);

		nax=a.dataout();
		if (nax!=NULL)
		{
			if (stricmp(esti,nax->estacion)==0)
			{
				lif.datain(nax, 0);
			}
			if (stricmp(estf,nax->estacion)==0)
			{
				lif.datain(nax, 1);
			}
		}
	}
return lif;
}

int main()
{
	int  dato, t=-1, t_aux = 0, x = 0;
 	for(z=0; z<=14; z++)
	{
	a[z] = NULL;
    }
   
    system("cls");
	int resp;
	cout<<endl<<"\t\t=================M E T R O================="<<endl<<endl;
	char llegada[30], salida[30];
	lista l1, l2, l3;
	//metro a;
	metro *axn, *axm, *p[13]={NULL};
	metro *tacubaya=cnodo("TACUBAYA"), *pino_suarez=cnodo("PINO SUAREZ"), *balderas=cnodo("BALDERAS"), *tacuba=cnodo("TACUBA"), *hidalgo=cnodo("HIDALGO");
	metro *salto_del_agua=cnodo("SALTO DEL AGUA"), *bellas_artes=cnodo("BELLAS ARTES"), *mixcoac=cnodo("MIXCOAC"), *ermita=cnodo("ERMITA");
	metro *centro_medico=cnodo("CENTRO MEDICO"), *guerrero=cnodo("GUERRERO"), *la_raza=cnodo("LA RAZA"), *candelaria=cnodo("CANDELARIA");
	metro *san_lazaro=cnodo("SAN LAZARO"), *chabacano=cnodo("CHABACANO"), *deportivo_18_de_marzo=cnodo("DEPORTIVO 18 DE MARZO"), *zapata=cnodo("ZAPATA");
	metro *instituto_del_petroleo=cnodo("INSTITUTO DEL PETROLEO"), *consulado=cnodo("CONSULADO");
	metro *morelos=cnodo("MORELOS"), *jamaica=cnodo("JAMAICA"), *santa_anita=cnodo("SANTA ANITA"), *oceania=cnodo("OCEANIA");
	metro *atlalilco=cnodo("ATLALILCO"), *garibaldi=cnodo("GARIBALDI");
	p[0]=cnodo("PANTITLAN");
	p[1]=p[0];
	p[2]=cnodo("TASQUE\244A");
	p[3]=cnodo("UNIVERSIDAD");
	p[4]=cnodo("MARTIN CARRERA");
	p[5]=cnodo("POLITECNICO");
	p[6]=cnodo("EL ROSARIO");
	p[7]=p[6];
	p[8]=cnodo("CONSTITUCION DE 1917");
	p[9]=p[0];
	p[10]=cnodo("LA PAZ");
	p[11]=cnodo("CIUDAD AZTECA");
	p[12]=cnodo("TLAHUAC");

	//Linea 1
	axm=p[1];
	axm=nnodo(4,axm,"ZARAGOZA");
	axm=nnodo(7,axm,"GOMEZ FARIAS");
	axm=nnodo(7,axm,"PUERTO AEREO");
	axm=nnodo(7,axm,"BALBUENA");
	axm=nnodo(7,axm,"MOCTEZUMA");
	axm=ligar(axm,7,san_lazaro);
	axm=ligar(axm,1,candelaria);
	axm=nnodo(4,axm,"MERCED");
	axm=ligar(axm,4,pino_suarez);
	axm=nnodo(4,axm,"ISABEL LA CATOLICA");
	axm=ligar(axm,4,salto_del_agua);
	axm=ligar(axm,4,balderas);
	axm=nnodo(4,axm,"CUAUHTEMOC");
	axm=nnodo(4,axm,"INSURGENTES");
	axm=nnodo(4,axm,"SEVILLA");
	axm=nnodo(4,axm,"CHAPULTEPEC");
	axm=nnodo(1,axm,"JUANACATLAN");
	axm=ligar(axm,1,tacubaya);
	axm=nnodo(1,axm,"OBSERVATORIO");

	//Linea 2
	axm=p[2];
	axm=nnodo(7,axm,"GENERAL ANAYA");
	axm=ligar(axm,8,ermita);
	axm=nnodo(8,axm,"PORTALES");
	axm=nnodo(8,axm,"NATIVITAS");
	axm=nnodo(8,axm,"VILLA DE CORTES");
	axm=nnodo(8,axm,"XOLA");
	axm=nnodo(8,axm,"VIADUCTO");
	axm=ligar(axm,8,chabacano);
	axm=nnodo(8,axm,"SAN ANTONIO ABAD");
	axm=ligar(axm,8,pino_suarez);
	axm=nnodo(8,axm,"ZOCALO");
	axm=nnodo(4,axm,"ALLENDE");
	axm=ligar(axm,4,bellas_artes);
	axm=ligar(axm,4,hidalgo);
	axm=nnodo(4,axm,"REVOLUCION");
	axm=nnodo(4,axm,"SAN COZME");
	axm=nnodo(4,axm,"NORMAL");
	axm=nnodo(7,axm,"COLEGIO MILITAR");
	axm=nnodo(7,axm,"POPOTLA");
	axm=nnodo(7,axm,"CUITLAHUAC");
	axm=ligar(axm,4,tacuba);
	axm=nnodo(4,axm,"PANTEONES");
	axm=nnodo(4,axm,"CUATRO CAMINOS");

	//Linea 3
	axm=p[3];
	axm=nnodo(8,axm,"COPILCO");
	axm=nnodo(8,axm,"MIGUEL ANGEL DE QUEVEDO");
	axm=nnodo(8,axm,"VIVEROS");
	axm=nnodo(8,axm,"COYOACAN");
	axm=ligar(axm,8,zapata);
	axm=nnodo(8,axm,"DIVISION DEL NORTE");
	axm=nnodo(8,axm,"EUGENIA");
	axm=nnodo(8,axm,"ETIOPIA");
	axm=ligar(axm,8,centro_medico);
	axm=nnodo(8,axm,"HOSPITAL GENERAL");
	axm=nnodo(8,axm,"NI\244OS HEROES");
	axm=ligar(axm,8,balderas);
	axm=nnodo(8,axm,"JUAREZ");
	axm=ligar(axm,8,hidalgo);
	axm=ligar(axm,8,guerrero);
	axm=nnodo(8,axm,"TLATELOLCO");
	axm=ligar(axm,8,la_raza);
	axm=nnodo(9,axm,"POTRERO");
	axm=ligar(axm,9,deportivo_18_de_marzo);
	axm=nnodo(9,axm,"INDIOS VERDES");

	//linea 4
	axm=p[4];
	axm=nnodo(2,axm,"TALISMAN");
	axm=nnodo(2,axm,"BONDOJITO");
	axm=ligar(axm,2,consulado);
	axm=nnodo(2,axm,"CANAL DEL NORTE");
	axm=ligar(axm,2,morelos);
	axm=ligar(axm,2,candelaria);
	axm=nnodo(2,axm,"FRAY SERVANDO");
	axm=ligar(axm,2,jamaica);
	axm=ligar(axm,2,santa_anita);

	//Linea 5
	axm=p[5];
	axm=ligar(axm,3,instituto_del_petroleo);
	axm=nnodo(3,axm,"AUTOBUSES DEL NORTE");
	axm=ligar(axm,3,la_raza);
	axm=nnodo(3,axm,"MISTERIOS");
	axm=nnodo(6,axm,"VALLE GOMEZ");
	axm=ligar(axm,2,consulado);
	axm=nnodo(6,axm,"EDUARDO MOLINA");
	axm=nnodo(6,axm,"ARAGON");
	axm=ligar(axm,3,oceania);
	axm=nnodo(2,axm,"TERMINAL AEREA");
	axm=nnodo(2,axm,"HANGARES");
	axm=ligar(axm,3,p[0]);

	//Linea 6
	axm=p[6];
	axm=nnodo(3,axm,"TEZOZOMOC");
	axm=nnodo(3,axm,"AZCAPOTZALCO");
	axm=nnodo(6,axm,"FERRERIA");
	axm=nnodo(6,axm,"NORTE 45");
	axm=nnodo(6,axm,"VALLEJO");
	axm=ligar(axm,6,instituto_del_petroleo);
	axm=nnodo(6,axm,"LINDAVISTA");
	axm=ligar(axm,6,deportivo_18_de_marzo);
	axm=nnodo(6,axm,"LA VILLA BASILICA");
	axm=ligar(axm,6,p[4]);


	//Linea 7
	axm=p[7];
	axm=nnodo(2,axm,"AQUILES SERDAN");
	axm=nnodo(2,axm,"CAMARONES");
	axm=nnodo(2,axm,"REFINERIA");
	axm=ligar(axm,2,tacuba);
	axm=nnodo(2,axm,"SAN JOAQUIN");
	axm=nnodo(2,axm,"POLANCO");
	axm=nnodo(2,axm,"AUDITORIO");
	axm=nnodo(2,axm,"CONSTITUYENTES");
	axm=ligar(axm,2,tacubaya);
	axm=nnodo(2,axm,"SAN PEDRO DE LOS PINOS");
	axm=nnodo(2,axm,"SAN ANTONIO");
	axm=ligar(axm,2,mixcoac);
	axm=nnodo(2,axm,"BARRANCA DEL MUERTO");

	//Linea 8
	axm=p[8];
	axm=nnodo(7,axm,"UAM1");
	axm=nnodo(7,axm,"CERRO DE LA ESTRELLA");
	axm=nnodo(7,axm,"IZTAPALAPA");
	axm=ligar(axm,2,atlalilco);
	axm=nnodo(7,axm,"ESCUADRON 201");
	axm=nnodo(8,axm,"ACULCO");
	axm=nnodo(8,axm,"APATLACO");
	axm=nnodo(8,axm,"IZTACALCO");
	axm=nnodo(8,axm,"COYUYA");
	axm=ligar(axm,7,santa_anita);
	axm=nnodo(7,axm,"LA VIGA");
	axm=ligar(axm,7,chabacano);
	axm=nnodo(7,axm,"OBRERA");
	axm=nnodo(8,axm,"DOCTORES");
	axm=ligar(axm,8,salto_del_agua);
	axm=nnodo(8,axm,"SAN JUAN DE LETRAN");
	axm=ligar(axm,8,bellas_artes);
	axm=ligar(axm,8,garibaldi);

	//Linea 9
	axm=p[9];
	axm=nnodo(1,axm,"PUEBLA");
	axm=nnodo(4,axm,"CIUDAD DEPORTIVA");
	axm=nnodo(4,axm,"VELODROMO");
	axm=nnodo(4,axm,"MIXIUHCA");
	axm=ligar(axm,4,jamaica);
	axm=ligar(axm,4,chabacano);
	axm=nnodo(4,axm,"LAZARO CARDENAS");
	axm=ligar(axm,4,centro_medico);
	axm=nnodo(4,axm,"CHILPANCINGO");
	axm=nnodo(4,axm,"PATRIOTISMO");
	axm=ligar(axm,4,tacubaya);

	//Linea A
	axm=p[10];
	axm=nnodo(7,axm,"LOS REYES");
	axm=nnodo(7,axm,"SANTA MARTA");
	axm=nnodo(7,axm,"ACATITLA");
	axm=nnodo(7,axm,"PE\244ON VIEJO");
	axm=nnodo(7,axm,"GUELATAO");
	axm=nnodo(7,axm,"TECALCATES");
	axm=nnodo(7,axm,"CANAL DE SAN JUAN");
	axm=nnodo(7,axm,"AGRICOLA ORIENTAL");
	axm=ligar(axm,7,p[0]);

	//Linea B
	axm=p[11];
	axm=nnodo(1,axm,"PLAZA ARAGON");
	axm=nnodo(1,axm,"OLIMPICA");
	axm=nnodo(1,axm,"ECATEPEC");
	axm=nnodo(1,axm,"MUZQUIZ");
	axm=nnodo(1,axm,"RIO DE LOS REMEDIOS");
	axm=nnodo(1,axm,"IMPULSORA");
	axm=nnodo(1,axm,"NEZAHUALCOYOTL");
	axm=nnodo(1,axm,"VILLA DE ARAGON");
	axm=nnodo(1,axm,"BOSQUE DE ARAGON");
	axm=nnodo(1,axm,"DEPORTIVO OCEANIA");
	axm=ligar(axm,1,oceania);
	axm=nnodo(1,axm,"ROMERO RUBIO");
	axm=nnodo(1,axm,"FLORES MAGON");
	axm=ligar(axm,1,san_lazaro);
	axm=ligar(axm,7,morelos);
	axm=nnodo(4,axm,"TEPITO");
	axm=nnodo(4,axm,"LAGUNILLA");
	axm=ligar(axm,4,garibaldi);
	axm=ligar(axm,4,guerrero);
	axm=nnodo(4,axm,"BUENAVISTA");

	//Linea 12
	axm=p[12];
	axm=nnodo(7,axm,"TLALTENCO");
	axm=nnodo(7,axm,"ZAPOTITLAN");
	axm=nnodo(7,axm,"NOPALERA");
	axm=nnodo(7,axm,"OLIVOS");
	axm=nnodo(7,axm,"TEZONCO");
	axm=nnodo(7,axm,"PERIFERICO ORIENTE");
	axm=nnodo(7,axm,"CALLE 11");
	axm=nnodo(7,axm,"LOMAS ESTRELLA");
	axm=nnodo(7,axm,"SAN ANDRES TOMATLAN");
	axm=nnodo(7,axm,"CULHUACAN");
	axm=ligar(axm,8,atlalilco);
	axm=nnodo(4,axm,"MEXICALTZINGO");
	axm=ligar(axm,4,ermita);
	axm=nnodo(4,axm,"EJE CENTRAL");
	axm=nnodo(4,axm,"PARQUE DE LOS VENADOS");
	axm=ligar(axm,4,zapata);
	axm=nnodo(4,axm,"HOSPITAL 20 DE NOVIEMBRE");
	axm=nnodo(4,axm,"INSURGENTES SUR");
	axm=ligar(axm,4,mixcoac);

	cout << "INGRESE ESTACION DE PARTIDA: ";
	gets(salida);
	cout << "INGRESE ESTACION DESTINO: ";
	gets(llegada);
	l3=busq(p[0],l2,salida,llegada);
	axn=l3.dataout();
	if (axn!=NULL)
	{
		do
		{
			axm=l3.dataout();
		} while (axm==axn);
		if (axm!=NULL)
			{
			dijkstra(axm, l1);
			rmcorta(axn);
			}
		else
		{
			cout << "Error!! No hay punto de Llegada o partida" << endl;
			getch();
		}
	}
	else
	{
		cout << "Error!! No hay punto de Partida" << endl;
		getch();
	}

   cout<<"Presione cualquier tecla para salir: ";
   getch();
}
