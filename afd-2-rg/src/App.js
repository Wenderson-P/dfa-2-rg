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

  const handleChangeProperty = (index, value, property) => {
    dispatch({
      type: 'changePropertyValue',
      payload: { index, value, property },
    });
  };

  const RenderHeaderInput = ({ title, value, property }) => {
    return (
      <div className="quantitySelector">
        <label>{title}</label>
        <div className="headerInputContainer">
          <button
            onClick={(e) => handleInputChange(state[property] - 1, property)}
          >
            -
          </button>

          <span>{state[property]}</span>
          <button
            onClick={(e) => handleInputChange(state[property] + 1, property)}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <h1>PARSER LR</h1>
      <div className="options">
        <RenderHeaderInput title="Quantidade de Estados:" property="states" />
        <RenderHeaderInput title="Quantidade de Simbolos:" property="actions" />
        <RenderHeaderInput title="Quantidade GO TO:" property="gotoQuantity" />
      </div>
      <main>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="no-bottom-border" style={{ color: '#545454' }}>
                  Estados
                </th>
                <th colSpan={state.columns.length}>
                  Ações
                  <tr>
                    {state.columns.map((column, rowIndex) => (
                      <th>
                        <input
                          type="text"
                          value={column}
                          onChange={(e) =>
                            handleChangeProperty(
                              rowIndex,
                              e.target.value,
                              'columns'
                            )
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
                          handleChangeProperty(
                            rowIndex,
                            e.target.value,
                            'goto'
                          );
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

                    {state.goToRows[rowIndex] &&
                      state.goToRows[rowIndex]?.map((cell, columnIndex) => {
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
        </div>
        <div>
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
                handleChangeProperty(rowIndex, e.target.value, 'productions');
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
