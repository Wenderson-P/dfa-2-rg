import './App.css';

import { useReducer } from 'react';
import React from 'react';
import parser from './converteAutomato';
import { reducer } from './reducer/app';

function App() {
  const INITIAL_STATE = {
    states: 12,
    actions: 6,
    gotoQuantity: 3,
    productionQuantity: 6,
    productions: ['E->E + T', 'E->T', 'T->T * F', 'T->F', 'F->E', 'F->id'],
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
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleInputChange = (value, target) => {
    if (value >= 1) {
      if (target === 'states') {
        dispatch({ type: 'changeStateInput', payload: { value, target } });
      } else if (target === 'actions') {
        dispatch({ type: 'changeActionsInput', payload: { value, target } });
      } else if (target === 'productionQuantity') {
        dispatch({ type: 'changeProductionInput', payload: { value, target } });
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

  const handleGotoValue = (value, rowIndex, columnIndex) => {
    dispatch({
      type: 'changeGoToValue',
      payload: { value, rowIndex, columnIndex },
    });
  };

  const handleStateValue = (index, value) => {
    dispatch({
      type: 'changeStateValue',
      payload: { index, value: value.trim() },
    });
  };

  const handleButtonClick = () => {
    parser({
      quantidadeEstados: state.states,
      quantidadeProducoes: state.productionQuantity,
      simbolos: state.columns,
      cabecasProducoes: state.goto,
      producoes: state.productions.map((prod) => prod.split('->')),
      action: state.rows,
      goto: state.goToRows,
    });
    // dispatch({ type: 'changeAutomato', payload: automato });

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
      default:
        break;
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
                      onChange={(e) => {
                        dispatch({
                          type: 'changeGoToSymbol',
                          payload: { index: rowIndex, value: e.target.value },
                        });
                      }}
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
                            handleGotoValue(
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
        <div className="quantitySelector">
          <label>Quantidade de Regras de Produção</label>
          <input
            type="number"
            value={state.productionQuantity}
            onChange={(e) =>
              handleInputChange(e.target.value, 'productionQuantity')
            }
          />
          <p style={{ color: '#333', marginBottom: 16 }}>
            A -> é obrigatoria para gerar a regra, e utilize espaço para separar
            os simbolos
          </p>
          {state.productions.map((column, rowIndex) => (
            <input
              style={{ margin: 4, borderBottom: '1px solid black' }}
              type="text"
              value={column}
              onChange={(e) => {
                dispatch({
                  type: 'changeProductionValue',
                  payload: { index: rowIndex, value: e.target.value },
                });
              }}
            />
          ))}
        </div>
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
