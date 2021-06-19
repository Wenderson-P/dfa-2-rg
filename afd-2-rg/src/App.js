import './App.css';

import { useEffect, useReducer } from 'react';
import React from 'react';
import afdToGr from './converteAutomato'

function App() {
  const INITIAL_STATE = {
    states: 3,
    symbols: 3,
    columns: ["a", "b", "c"],
    rows: [["q0", "q1", ""], ["q2", "", ""], ["", "q1", ""]],
    statesValues: ["q0", "q1", "q2"],
    initialState: 0,
    finalStates: [],
    automato : {},
    grammar: null
  }

  const reducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
      case "changeStateInput":
        const stateValue = payload.value

        let rowsLength = state.rows.length
        let auxRows = [...state.rows]
        let auxStatesValues = [...state.statesValues]

        if (stateValue > rowsLength) {
          for (stateValue; rowsLength < stateValue; rowsLength++) {
            let insideArray = Array(state.columns.length).fill("")
            auxRows.push(insideArray);
            auxStatesValues.push("q"+stateValue)
          }
        } else {
          auxRows = state.rows.filter(
            (_, index) => index <= stateValue - 1)

          auxStatesValues = auxStatesValues.filter(
            (_, index) => index <= stateValue - 1)
        }

        return {
          ...state,
          states: stateValue,
          rows: auxRows,
          statesValues : auxStatesValues
        }
      case "changeSymbolsInput":
        const inputValue = payload.value

        let arraySize = state.columns.length
        let columsArray = [...state.columns]
        let auxRowArray = [...state.rows];

        if (inputValue > state[payload.target]) {
          for (inputValue; arraySize < inputValue; arraySize++) {
            columsArray.push("")
          }

          for (let i = 0; i < state.states; i++) {

            for (let j = 0; j < inputValue; j++) {
              if (!auxRowArray[i][j]) {
                auxRowArray[i][j] = ""
              }
            }
          }
        } else {


          for (let i = 0; i < state.states; i++) {

            for (let j = state.columns.length; j >= inputValue; j--) {
              if (auxRowArray[i][j]) {
                auxRowArray[i].pop()
              }
            }
          }

          columsArray = state.columns.filter(
            (_, index) => index <= inputValue - 1);
        }


        return {
          ...state,
          [payload.target]: payload.value,
          columns: columsArray,
          rows: auxRowArray
        }

      case "changeStateQuantity":
        const { value, rowIndex, columnIndex } = payload;
        return {
          ...state,
          rows: state.rows.map((row, i) => row.map((cell, j) => {
            if (i === rowIndex && columnIndex === j) {
              return value
            } else {
              return cell
            }
          }))
        }
      case "changeInitialState":
        return {
          ...state,
          initialState: payload
        }
      case "changeFinalState":
        let auxFinalStates = [...state.finalStates]

        let valueIndex = auxFinalStates.findIndex((item) => item ===payload);

        if(valueIndex >=0){
          auxFinalStates.splice(valueIndex,1)
        }else{
          auxFinalStates.push(payload)
        }
        return {
          ...state,
          finalStates: auxFinalStates
        }
      case "changeStateValue":
        return {
          ...state,
          statesValues: state.statesValues.map((value, i) =>{
            if (i === payload.index) {
              return payload.value
            } else {
              return value
            }
          })
        }
      case "changeAutomato":
        return {
          ...state,
          automato : payload
        }
      case "changeGrammar":
        return {
          ...state,
          grammar : payload
        }
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleInputChange = (value, target) => {

    if (value >= 1) {
      if (target === 'states') {
        dispatch({ type: 'changeStateInput', payload: { value, target } })
      } else {
        dispatch({ type: 'changeSymbolsInput', payload: { value, target } })
      }
    }
  }

  const handleStateQuantity = (value, rowIndex, columnIndex) => {
    //todo
    dispatch({ type: 'changeStateQuantity', payload: { value, rowIndex, columnIndex } })
  }

  const handleStateValue = (index,value) => {
    dispatch({ type: 'changeStateValue', payload: { index,value:value.trim() } })

  }


const getEntradas = (index) =>{
  
  let auxArray = [...state.rows[index]]
  let transicoes = {}
  let entradas =  auxArray.map((transicao,indexTransicao) => {
    if(transicao!== ''){
      let letter = state.columns[indexTransicao]
      transicoes[letter] = transicao;
      return letter;
    }
  }).filter(value => value !== undefined);

  return {entradas,transicoes}
}

  const handleButtonClick = () => {
    let automato = {}
    state.statesValues.forEach((estado,estadoIndex) => {
      let {entradas,transicoes} = getEntradas(estadoIndex);
      automato[estado] = {
        entradas,
        transicoes
      }
    });

    dispatch({type : 'changeAutomato',payload : automato});

    let estadoInicial = state.statesValues[state.initialState];

    let estadosFinais = state.finalStates.map(finalIndex => state.statesValues[finalIndex])

    console.log('A',automato)
    let grammar = afdToGr(estadoInicial,estadosFinais,automato);

    dispatch({ type: 'changeGrammar', payload: grammar })

  }

  const finalStateIsSelected = (index) => {
    let isSelected = state.finalStates.find(item => index ===item);

    return isSelected >= 0 ? true : false
  }

  return (
    <div className="app">
      <header >
        <label>Quantidade de estados</label>
        <input
          type="number"
          value={state.states}
          onChange={(e) => handleInputChange(e.target.value, 'states')}
        />
        <br />
        <label>Quantidade de simbolos</label>
        <input
          type="number"
          value={state.symbols}
          onChange={(e) => handleInputChange(e.target.value, 'symbols')}
        />
        <label>Qual o estado inicial ?</label>
        <div>
          {state.statesValues.map((value,index) =>
           <button type="button" 
            className={`states ${state.initialState === index ? 'initialState' : ''}`}
            onClick={() => dispatch({ type: 'changeInitialState', payload: index })}
            >
              {value}
            </button>)}
        </div>
        <label>Quais os estados finais ?</label>
        <div>
          {state.statesValues.map((value,index) =>
           <button type="button" 
              className={`states ${finalStateIsSelected(index) ? 'finalState' : ''}`}
              onClick={() => dispatch({ type: 'changeFinalState', payload:index })}
            >
              {value}
            </button>)}
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>	&delta;</th>
              {state.columns.map(column => (
                <th>
                  <input type="text" value={column} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.rows.map((row, rowIndex) => {
              return (
                <tr >
                  <td  className="stateColumn">
                    <input type="text" value={state.statesValues[rowIndex]} onChange={(e) => handleStateValue(rowIndex,e.target.value)} />
                  </td>
                  {row.map((cell, columnIndex) => {
                    return (
                      <td>
                        <input type="text" value={cell} onChange={(e) => handleStateQuantity(e.target.value.trim(), rowIndex, columnIndex)} />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={() => handleButtonClick()}>Converter para GR</button>
        
        {state.grammar && 
        <div>
          <h3>Resultado:</h3>
          <div>
            variaveis {state.grammar.variaveis}
          </div>
          <div>
          terminais = {
              state.grammar.terminais
            }
          </div>
          <div>
          producoes = {
              state.grammar.producoes
            }
          </div>
          <div>
          variavelInicial = {
              state.grammar.variavelInicial
            }
          </div>
        </div>
        }
      </main>
    </div>
  );
}

export default App;
