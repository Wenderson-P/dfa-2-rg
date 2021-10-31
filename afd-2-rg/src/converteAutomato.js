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
  // Execução do algoritmo
  const pilhaEstados = [0]; // pilha para armazenar estados
  const pilhaSimbolos = []; // pilha para armazenar simbolos

  let verificar = true;

  while (verificar) {
    // Pegar o index correspondente ao primeiro elemento do input
    const inputIndex = simbolos.indexOf(entrada[0]);
    // Com esse index, pegar o estado correspondente
    const estadoAtual = action[pilhaEstados[pilhaEstados.length - 1]][inputIndex];
    // Ver qual o número do estado e a letra. s é shift e r é reduce. Pode ser também acc.
    let tipo;
    let proxEstado; // Próx. estado OU produção, no caso do reduce

    if (estadoAtual == undefined || estadoAtual == '') {
      console.log('Rejeitar');
      verificar = false;
      break;
    } else if (estadoAtual != 'acc') {
      tipo = estadoAtual[0]; // Pega a primeira letra, que indica a ação.
      proxEstado = estadoAtual.substring(1); // Pega o número do estado, que corresponde a todo o resto.
    } else {
      printIteracao('Iteração final', entrada, pilhaEstados, pilhaSimbolos);
      console.log('Aceitar\n');

      break;
    }

    console.log('Estado:', estadoAtual);

    // Divide os comportamentos a seguir se for shift ou reduce.
    if (tipo == 's') {
      pilhaEstados.push(Number(proxEstado)); // Adiciono o estado na pilha
      pilhaSimbolos.push(entrada[0]); // Adiciono o símbolo lido
      entrada.shift(); // Retiro o símbolo lido

      printIteracao('Shift', entrada, pilhaEstados, pilhaSimbolos);
    } else if (tipo == 'r') {
      // Aqui deveesempilhar cada um elemento correspondente aos elementos da produção e desempilhar
      // a mesma quantidade da pilha de estados.
      const producaoAux = producoes[proxEstado - 1][1].split(' ');
      while (producaoAux.length > 0) {
        if (producaoAux[producaoAux.length - 1] == pilhaSimbolos[pilhaSimbolos.length - 1]) {
          producaoAux.pop();
          pilhaSimbolos.pop();
          pilhaEstados.pop();
        } else {
          console.log('Rejeitar');
          verificar = false;
          break;
        }
      }
      if (verificar) {
        const cabecaSimbolo = producoes[proxEstado - 1][0]; // Pega a cabeça da produção que corresponde ao símbolo que estava no topo da pilha
        pilhaSimbolos.push(cabecaSimbolo); // Adiciona o símbolo (cabeça) que substitui o que foi removido anteriormente da pilha de símbolos
        // pilhaEstados.pop(); // Remove o estado do topo para ser substituído
        const indexCabecaGoto = cabecasProducoes.indexOf(cabecaSimbolo); // Procura pelo index da cabeça que agora tá na pilha de símbolos
        const proxEstadoPilha = goto[pilhaEstados[pilhaEstados.length - 1]][indexCabecaGoto]; // Pega o número do próximo estado que vai pro topo da pilha de estados
        pilhaEstados.push(Number(proxEstadoPilha));

        printIteracao('Reduce', entrada, pilhaEstados, pilhaSimbolos);
      }
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
