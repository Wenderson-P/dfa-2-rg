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

//Gramatica
let variaveis = [];
let terminais = [];
let producoes = [];
let variavelInicial = '';


let letras = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R'];

function main() {


  let chavesDosEstados = Object.keys(transicoes);

  //Identifica variaveis
  Object.keys(transicoes).forEach((estado,index) => {
    if (!variaveis.includes(estado)) {
      let letraAtribuida = letras[index];
      
      transicoes[chavesDosEstados[index]].variavel = letraAtribuida;

      variaveis.push(letraAtribuida);
    }
  })

  //Identifica terminais
  Object.values(transicoes).forEach(estado => {
    estado.entradas.forEach(entrada => {
      if (!terminais.includes(entrada)) terminais.push(entrada);
    }); 
  });
  


  //Define producoes
  Object.values(transicoes).forEach((estado, index) => {
    let estadoAtual =chavesDosEstados[index];

    if(estadosFinais.includes(estadoAtual)){
      producoes.push(transicoes[estadoAtual].variavel+`-> vazio`)
    }
    let variavelAtual = transicoes[estadoAtual].variavel

    estado.entradas.forEach(entrada => {
      let destino = estado.transicoes[entrada] //q0

      let destinoAtual = transicoes[destino].variavel
      
      producoes.push(`${variavelAtual} -> ${entrada+destinoAtual}`)
    }); 
  });

  variavelInicial = transicoes[estadoInicial].variavel;

  console.log('variaveis:', variaveis, '\nterminais:', terminais, '\nproducoes:', producoes, '\nvariavelInicial:', variavelInicial);

}
main();