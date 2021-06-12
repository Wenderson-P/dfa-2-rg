//AFD Para GR

let estadoInicial= "q0"
let estadosFinais= ["q1"];
let transicoes= {
  q0:{
    entradas: ["a","b"],
    transicoes:{
      "a":"q0",
      "b":"q1"
    },
  },
  q1:{
    entradas: ["a"],
    transicoes:{
      "a":"q2",
    },
  },
  q2:{
    entradas: ["b"],
    transicoes:{
      "b":"q1"
    },
  },
}