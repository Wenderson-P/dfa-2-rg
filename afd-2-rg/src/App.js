import './App.css';

import { useReducer } from 'react';
import React from 'react';
import afdToGr from './converteAutomato';
import { reducer } from './reducer/app';

function App() {
  const INITIAL_STATE = {
    states: 12,
    actions: 6,
    gotoQuantity: 3,
    columns: ['id', '+', '*', '(', ')', '$'],
    goto: ['E', 'T', 'F'],
    rows: [
      ['s5', '', '', 's4', '', ''],
      ['', 's6', '', '', '', 'acc'],
      ['', 'r2', 's7', '', 'r2', 'r2'],
      ['', 'r4', 'r4', '', 'r4', 'r4'],
      ['s5', '', '', 's4', '', ''],
      ['', 'r6', 'r6', '', 'r6', 'r6'],
      ['s5', '', '', 's4', '', ''],
      ['s5', '', '', 's4', '', ''],
      ['', 's6', '', '', 's11', ''],
      ['', 'r1', 's7', '', 'r1', 'r1'],
      ['', 'r3', 'r3', '', 'r3', 'r3'],
      ['', 'r5', 'r5', '', 'r5', 'r5'],
    ],
    goToRows: [
      ['1', '2', '3'],
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
      ['8', '2', '3'],
      ['', '', ''],
      ['', '9', '3'],
      ['', '', '10'],
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    statesValues: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
    ],
    initialState: 0,
    finalStates: [1],
    automato: {},
    grammar: null,
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleInputChange = (value, target) => {
    if (value >= 1) {
      if (target === 'states') {
        dispatch({ type: 'changeStateInput', payload: { value, target } });
      } else if (target === 'actions') {
        dispatch({ type: 'changeActionsInput', payload: { value, target } });
      } else {
        dispatch({ type: 'changeGoToInput', payload: { value, target } });
      }
    }
  };

  const handleStateQuantity = (value, rowIndex, columnIndex) => {
    dispatch({
      type: 'changeStateQuantity',
      payload: { value, rowIndex, columnIndex },
    });
  };

  const handleStateValue = (index, value) => {
    dispatch({
      type: 'changeStateValue',
      payload: { index, value: value.trim() },
    });
  };

  const getEntradas = (index) => {
    let auxArray = [...state.rows[index]];
    let transicoes = {};
    let entradas = auxArray
      .map((transicao, indexTransicao) => {
        if (transicao !== '') {
          let letter = state.columns[indexTransicao];
          transicoes[letter] = transicao;
          return letter;
        }
      })
      .filter((value) => value !== undefined);

    return { entradas, transicoes };
  };

  const handleButtonClick = () => {
    let automato = {};
    state.statesValues.forEach((estado, estadoIndex) => {
      let { entradas, transicoes } = getEntradas(estadoIndex);
      automato[estado] = {
        entradas,
        transicoes,
      };
    });

    // dispatch({ type: 'changeAutomato', payload: automato });

    let estadoInicial = state.statesValues[state.initialState];

    let estadosFinais = state.finalStates.map(
      (finalIndex) => state.statesValues[finalIndex]
    );

    //let grammar = afdToGr(estadoInicial, estadosFinais, automato);

    //dispatch({ type: 'changeGrammar', payload: grammar });
  };

  const changeGrammarTitles = (variable) => {
    switch (variable) {
      case 'variaveis':
        return 'Variáveis:';
      case 'terminais':
        return 'Terminais:';
      case 'producoes':
        return 'Produções:';
    }
  };

  const printItems = (variable, isArray = true) => {
    if (!isArray) {
      return (
        <div>
          <h4>Variável inicial:</h4>
          {state.grammar[variable]}
        </div>
      );
    }
    return (
      <div>
        <h4>{changeGrammarTitles(variable)}</h4>
        {state.grammar[variable].map((item) => (
          <span>{item}</span>
        ))}
      </div>
    );
  };

  const handleChangeSymbol = (index, value) => {
    dispatch({ type: 'changeSymbol', payload: { index, value } });
  };

  return (
    <div className="app">
      <h1>PARSER LR</h1>
      <div className="options">
        <div className="quantitySelector">
          <label>Quantidade de estados:</label>
          <input
            type="number"
            value={state.states}
            onChange={(e) => handleInputChange(e.target.value, 'states')}
          />
        </div>
        <div className="quantitySelector">
          <label>Quantidade de Simbolos:</label>
          <input
            type="number"
            value={state.actions}
            onChange={(e) => handleInputChange(e.target.value, 'actions')}
          />
        </div>
        <div className="quantitySelector">
          <label>Quantidade GO TO:</label>
          <input
            type="number"
            value={state.gotoQuantity}
            onChange={(e) => handleInputChange(e.target.value, 'gotoQuantity')}
          />
        </div>
      </div>
      <main>
        <table>
          <thead>
            <tr>
              <th className="no-bottom-border">Estados</th>
              <th colSpan={state.columns.length}>
                Ações
                <tr>
                  {state.columns.map((column, rowIndex) => (
                    <th>
                      <input
                        type="text"
                        value={column}
                        onChange={(e) =>
                          handleChangeSymbol(rowIndex, e.target.value)
                        }
                      />
                    </th>
                  ))}
                </tr>
              </th>
              <th colSpan={6}>
                GoTo
                {state.goto.map((column, rowIndex) => (
                  <th style={{ maxWidth: 90 }}>
                    <input
                      type="text"
                      value={column}
                      onChange={(e) =>
                        handleChangeSymbol(rowIndex, e.target.value)
                      }
                    />
                  </th>
                ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {state.rows.map((row, rowIndex) => {
              return (
                <tr>
                  <td className="stateColumn">
                    <input
                      type="text"
                      value={state.statesValues[rowIndex]}
                      onChange={(e) =>
                        handleStateValue(rowIndex, e.target.value)
                      }
                      disabled
                    />
                  </td>
                  {row.map((cell, columnIndex) => {
                    return (
                      <td>
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleStateQuantity(
                              e.target.value.trim(),
                              rowIndex,
                              columnIndex
                            )
                          }
                        />
                      </td>
                    );
                  })}

                  {state.goToRows[rowIndex].map((cell, columnIndex) => {
                    return (
                      <td>
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleStateQuantity(
                              e.target.value.trim(),
                              rowIndex,
                              columnIndex
                            )
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="resultContainer">
          <button className="convertButton" onClick={() => handleButtonClick()}>
            Parsear
          </button>

          {state.grammar && (
            <div className="resultContainer">
              <h3>Gramática:</h3>
              {printItems('variaveis')}
              {printItems('terminais')}
              {printItems('producoes')}
              {printItems('variavelInicial', false)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
