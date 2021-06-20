import './App.css';

import { useReducer } from 'react';
import React from 'react';
import afdToGr from './converteAutomato'
import { reducer } from './reducer/app';

function App() {
  const INITIAL_STATE = {
    states: 3,
    symbols: 3,
    columns: ["a", "b", "c"],
    rows: [["q0", "q1", ""], ["q2", "", ""], ["", "q1", ""]],
    statesValues: ["q0", "q1", "q2"],
    initialState: 0,
    finalStates: [1],
    automato : {},
    grammar: null
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

    let grammar = afdToGr(estadoInicial,estadosFinais,automato);

    dispatch({ type: 'changeGrammar', payload: grammar })

  }

  const finalStateIsSelected = (index) => {
    let isSelected = state.finalStates.find(item => index ===item);

    return isSelected >= 0 ? true : false
  }

  const initialStateIsSelected = (index) => {
    return state.initialState === index ? true : false
  }

  const StateSelector = ({title,estaSelecionado,highlightClass,dispatchType}) => {
    return (
      <div key={title} className="stateContainer">
        <label className="">{title}</label>
        <div>
        {state.statesValues.map((value,index) =>
          <button type="button" 
          className={`states ${estaSelecionado(index) ? highlightClass : ''}`}
          onClick={() => dispatch({ type: dispatchType, payload: index })}
          >
            {value}
          </button>)}
        </div>
      </div>
    )
  }

  const printItems = (variable,isArray = true) => {
    if(!isArray){
      return <div>
      <h4>variavel Inicial:</h4>
      {state.grammar[variable]}
      </div>
    }
    return <div>
      <h4>{variable}:</h4>
      {state.grammar[variable].map(item => <span>{item}</span>)}
    </div>
  }

  return (
    <div className="app">
      <header >
        <h1>Conversor AFD Para Gramatica regular</h1>
        <label>Quantidade de estados</label>
        <input
          type="number"
          value={state.states}
          onChange={(e) => handleInputChange(e.target.value, 'states')}
        />
        <label>Quantidade de simbolos</label>
        <input
          type="number"
          value={state.symbols}
          onChange={(e) => handleInputChange(e.target.value, 'symbols')}
        />
        <StateSelector
          title="Qual o estado inicial ?"
          estaSelecionado={initialStateIsSelected}
          dispatchType="changeInitialState"
          highlightClass="initialState"
        />
        <StateSelector
          title="Quais os estados finais ?"
          estaSelecionado={finalStateIsSelected}
          dispatchType="changeFinalState"
          highlightClass="finalState"

        />
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
        <div className="resultContainer">
          <button className="convertButton" onClick={() => handleButtonClick()}>Converter para GR</button>
        
          {state.grammar && 
          <div className="resultContainer">
            <h3>GR</h3>
            {printItems('variaveis')}
            {printItems('terminais')}
            {printItems('producoes')}
            {printItems('variavelInicial',false)}
          </div>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
