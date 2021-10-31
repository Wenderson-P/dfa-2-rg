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
    gotoRows: [
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
    entry: 'id * id $',
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
      } else if (target === 'entry') {
        dispatch({ type: 'changeEntryInput', payload: { value, target } });
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
    const parsedProduction = state.productions.map((prod) => prod.split('->'));
    const parsedEntry = state.entry.split(` `);
    console.log(parsedProduction);
    parser({
      quantidadeEstados: state.states,
      quantidadeProducoes: state.productionQuantity,
      simbolos: state.columns,
      cabecasProducoes: state.goto,
      producoes: parsedProduction,
      action: state.rows,
      goto: state.gotoRows,
      entrada: parsedEntry,
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
            className="quantity-button"
          >
            -
          </button>

          <span>{state[property]}</span>
          <button
            className="quantity-button"
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
                      <th key={`columns-${rowIndex}-${column}`}>
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
                <th
                  colSpan={state.goto.length}
                  style={{ border: '1px solid black' }}
                >
                  GoTo
                  {state.goto.map((column, rowIndex) => (
                    <th
                      style={{ maxWidth: 90 }}
                      key={`goto-${rowIndex}-${column}`}
                    >
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
                  <tr key={`render-rows-${rowIndex}`}>
                    <td
                      className="stateColumn"
                      key={`${rowIndex}-row-${rowIndex}`}
                    >
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
                        <td
                          key={`$column-${columnIndex}`}
                          style={
                            columnIndex === row.length - 1
                              ? { borderRight: '1px solid black' }
                              : {}
                          }
                        >
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

                    {state.gotoRows[rowIndex] &&
                      state.gotoRows[rowIndex]?.map((cell, columnIndex) => {
                        return (
                          <td
                            key={`${rowIndex}-goto-${columnIndex}`}
                            style={
                              columnIndex === state.gotoQuantity - 1
                                ? { borderRight: '1px solid black' }
                                : {}
                            }
                          >
                            <input
                              style={{ width: `10vh` }}
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
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: `50vw` }}>
          <div
            style={{
              display: 'flex',
              flexDirection: `row`,
              alignItems: 'center',
            }}
          >
            <label>Quantidade de Regras de Produção</label>
            <button
              className="quantity-button"
              onClick={(e) =>
                handleInputChange(
                  state[`productionQuantity`] - 1,
                  `productionQuantity`
                )
              }
            >
              -
            </button>

            <span>{state[`productionQuantity`]}</span>
            <button
              className="quantity-button "
              onClick={(e) =>
                handleInputChange(
                  state[`productionQuantity`] + 1,
                  `productionQuantity`
                )
              }
            >
              +
            </button>
          </div>
          <p style={{ color: '#333', marginBottom: 16 }}>
            A -> é obrigatoria para gerar a regra, e utilize espaço para separar
            os simbolos
          </p>
          {state.productions.map((column, rowIndex) => (
            <input
              placeholder="Regra"
              key={`productions-${rowIndex}`}
              style={{
                margin: 4,
                borderBottom: '1px solid black',
                minWidth: 110,
              }}
              type="text"
              value={column}
              onChange={(e) => {
                handleChangeProperty(rowIndex, e.target.value, 'productions');
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <label>Entrada para testar</label>
          <p style={{ color: '#333', marginBottom: 16 }}>
            Utilize espaço para separar os simbolos
          </p>
          <input
            placeholder="Entrada"
            value={state.entry}
            onChange={(e) =>
              dispatch({
                type: 'changeEntryInput',
                payload: { value: e.target.value },
              })
            }
            style={{
              margin: 4,
              borderBottom: '1px solid black',
              width: state.entry.length * 16,
              minWidth: 110,
            }}
          />
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
