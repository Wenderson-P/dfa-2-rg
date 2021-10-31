const parser = ({
  quantidadeEstados,
  quantidadeProducoes,
  simbolos,
  cabecasProducoes,
  producoes,
  action,
  goto,
  entrada,
}) => {
  // ENTRADAS ATRAVÉS DO TECLADO - MANTER COMENTADO DURANTE O DESENVOLVIMENTO
  // PARA UTILIZAR OS DADOS DEFINIDOS DIRETAMENTE.
  // Entradas iniciais essenciais para iterar a obtenção das outras entradas
  // const quantidadeEstados = readline.question('Quantos estados?\n> ');
  // const simbolosRaw = readline.question('Quais os simbolos (Action)? (Digitar separado por espaco)\n> ');
  // const cabecasProducoesRaw = readline.question('Quais as cabecas das producoes (Goto)? (Digitar separado por espaco)\n> ');
  // const quantidadeProducoes = readline.question('Quantas producoes?\n> ');

  // // Colocando os elementos que entraram separados por espaço em um array
  // const simbolos = simbolosRaw.split(' ');
  // const cabecasProducoes = cabecasProducoesRaw.split(' ');

  // // Entrada das produções
  // console.log('Digite as producoes separando os elementos por espaco:');
  // const producoes = [];
  // for (i=1; i<=quantidadeProducoes; i++) {
  // 	producao = [];
  // 	producao.push(readline.question('Digite a cabeca da producao ' + i + '> '));
  // 	producao.push(readline.question('Digite a producao ' + i + '> '));
  // 	producoes.push(producao);
  // }

  // // Entrada dos elementos da tabela Action
  // console.log('Digite os elementos da tabela Action, usando um espaco em branco em caso vazio:');
  // const action = [];
  // for (i=0; i<quantidadeEstados; i++) {
  // 	const actionEstado = [];
  // 	for (j=0; j<simbolos.length; j++) {
  // 		actionEstado.push(readline.question('Digite o elemento correspondente ao estado ' + i + ', simbolo ' + simbolos[j] + '> '));
  // 	}
  // 	action.push(actionEstado);
  // }

  // // Entrada dos elementos da tabela Goto
  // console.log('Digite os elementos da tabela Goto, usando um espaco em branco em caso vazio:');
  // const goto = [];
  // for (i=0; i<quantidadeEstados; i++) {
  // 	const actionGoto = [];
  // 	for (j=0; j<cabecasProducoes.length; j++) {
  // 		actionGoto.push(readline.question('Digite o elemento correspondente ao estado ' + i + ', cabeca ' + cabecasProducoes[j] + '> '));
  // 	}
  // 	goto.push(actionGoto);
  // }

  // TODO: Adicionar a entrada da sequência para teste

  // DADOS PARA TESTES DURANTE DESENVOLVIMENTO (PARA NÃO PRECISAR DIGITAR TODA VEZ)

  // Execução do algoritmo
  const pilhaEstados = [0]; // pilha para armazenar estados
  const pilhaSimbolos = []; // pilha para armazenar simbolos

  while (true) {
    // Pegar o index correspondente ao primeiro elemento do input
    const inputIndex = simbolos.indexOf(entrada[0]);
    // Com esse index, pegar o estado correspondente
    const estadoAtual =
      action[pilhaEstados[pilhaEstados.length - 1]][inputIndex];
    console.log('Estado:', estadoAtual);
    // Ver qual o número do estado e a letra. s é shift e r é reduce. Pode ser também acc.
    let tipo;
    let proxEstado; // Próx. estado OU produção, no caso do reduce
    // TODO: Verificar se a célula da tabela de análise tem algo, pois caso contrário, indica erro.
    if (estadoAtual !== 'acc') {
      tipo = estadoAtual[0]; // Pega a primeira letra, que indica a ação.
      proxEstado = estadoAtual.substring(1); // Pega o número do estado, que corresponde a todo o resto.
    } else {
      printIteracao('Iteração final', entrada, pilhaEstados, pilhaSimbolos);
      console.log('Aceitar\n');
      break;
    }

    // Divide os comportamentos a seguir se for shift ou reduce.
    if (tipo === 's') {
      pilhaEstados.push(Number(proxEstado)); // Adiciono o estado na pilha
      pilhaSimbolos.push(entrada[0]); // Adiciono o símbolo lido
      entrada.shift(); // Retiro o símbolo lido

      printIteracao('Shift', entrada, pilhaEstados, pilhaSimbolos);
    } else if (tipo === 'r') {
      // Aqui deveesempilhar cada um elemento correspondente aos elementos da produção e desempilhar
      // a mesma quantidade da pilha de estados.
      const producaoAux = producoes[proxEstado - 1][1].split(' ');
      while (producaoAux.length > 0) {
        producaoAux.pop();
        pilhaSimbolos.pop();
        pilhaEstados.pop();
        // TODO: verificar se o elemento realmente existe e bate com o elemento que tem na pilha, pois
        // caso contrário, isso indica um erro.
      }
      const cabecaSimbolo = producoes[proxEstado - 1][0]; // Pega a cabeça da produção que corresponde ao símbolo que estava no topo da pilha
      pilhaSimbolos.push(cabecaSimbolo); // Adiciona o símbolo (cabeça) que substitui o que foi removido anteriormente da pilha de símbolos
      // pilhaEstados.pop(); // Remove o estado do topo para ser substituído
      const indexCabecaGoto = cabecasProducoes.indexOf(cabecaSimbolo); // Procura pelo index da cabeça que agora tá na pilha de símbolos
      const proxEstadoPilha =
        goto[pilhaEstados[pilhaEstados.length - 1]][indexCabecaGoto]; // Pega o número do próximo estado que vai pro topo da pilha de estados
      pilhaEstados.push(Number(proxEstadoPilha));

      printIteracao('Reduce', entrada, pilhaEstados, pilhaSimbolos);
    }
  }

  function printIteracao(tipo, entrada, estados, simbolos) {
    console.log('*', tipo, '*');
    console.log('Entrada:', entrada);
    console.log('Pilha de estados:', estados);
    console.log('Pilha de símbolos:', simbolos, '\n');
  }
};

export default parser;
