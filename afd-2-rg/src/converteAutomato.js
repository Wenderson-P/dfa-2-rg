function afdToGr(estadoInicial, estadosFinais, transicoes) {
  let variaveis = [];
  let terminais = [];
  let producoes = [];
  let variavelInicial = '';
  let letras = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R'];

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

  // console.log('variaveis:', variaveis, '\nterminais:', terminais, '\nproducoes:', producoes, '\nvariavelInicial:', variavelInicial);

  return {
    variaveis: variaveis,
    terminais: terminais,
    producoes: producoes,
    variavelInicial: variavelInicial
  }
}

module.exports = afdToGr;