let transicoes= {
  q0:{
    entradas: ["0","1"],
    transicoes:{
      "0":"q1",
      "1":"q0"
    },
  },
  q1:{
    entradas: ["0","1"],
    transicoes:{
      "0":"q2",
      "1":"q0"
    },
  },
  q2:{
    entradas: ["0","1"],
    transicoes:{
      "0":"q3",
      "1":"q0"
    },
  },
  q3:{
    entradas: ["0","1"],
    transicoes:{
      "0": "q3",
      "1": "q3"
    }
  }
}