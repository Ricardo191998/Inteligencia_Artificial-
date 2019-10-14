%Definiciones de operadores

:- op(1010,fx,n).
:- op(1030,xfx,and).
:- op(1000,xfx,or).
:- op(1040,xfx,implica).
:- op(1050,xfx,equiv).

%
% FORMA NORMAL DISYUNTIVA
%
fnd(nP,X) :- fnd(P,X).
fnd(n(nP),P).
fnd(nP,nP).
fnd( n(nP) or Q , X or Y ) :-
    fnd(P,X),
    fnd(Q,Y).
fnd(P or Q , X or Y ) :-
    fnd(P,X),
    fnd(Q,Y).
fnd(P and Q,F) :-
    fnd(P,X1),
    fnd(nX1,X),
    fnd(Q,Y1),
    fnd(nY1,Y),
    fnd(X or Y, Z),
    fnd(nZ,F).
fnd(P implica Q , X or Y) :-
    fnd(P,X1), fnd(nX1,X),
    fnd(Q,Y).
fnd(P equiv Q , F) :-
    fnd(P implica Q,X),
    fnd(Q implica P,Y),
    fnd(X and Y,F).
fnd(P,P) :- atom(P).
