# AFD Para GR

## Como funciona a entrada

Cada automato eh composto de estados,terminais e transicoes.

A gramatica eh composta de :
G = V,T,P,S
  V = {S,A,B}
  T = {a,b}
  P = regras de producao
  S = {S} //estado inicial


Um estado de AFD eh composto:
Numeracao do estado (q0,q1,q2)
Qual a entrada que ele aceita
Qual a transicao que ele leva

EX:
Q0, recebe a e leva para q0
Q0, recebe b e leva para q1

A entrada de um afd seria:


estadoInicial: [q0],
estadosFinais: [q1],
transicoes: {
  q0:{
    entradas: [a,b],
    transicoes:{
      a:q0,
      b:q1
    }
  },
  q1:{
    entradas: [a],
    transicoes:{
      a:q2,
    }
  },
  q2:{
    entradas: [b],
    transicoes:{
      b:q1
    }
  }
}

q0 = S
S -> aS
q1 vira A
S -> bA

aS
aab
aaabab
ab
abab
abababab


PSEUDO CODE
Inicia o automato
Estado inicial, se torna a letra S
Enquanto houver entradas nao percorridas
  Faz a transicao
  o proximo estado ja foi mapeado ?
    Se nao, atribua uma nova variavel