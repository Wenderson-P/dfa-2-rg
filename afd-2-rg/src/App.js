import './App.css';

import { useReducer } from 'react';
import React from 'react';

function App() {
  const INITIAL_STATE = {
    states:3,
    symbols:3,
    columns: ["","",""],
    rows:["","",""]
  }

  const reducer = (state,action) => {
    const {type,payload} = action

    switch (type) {
      case "changeInput":
        const inputValue =  payload.value
        let fieldToChange = payload.target === 'states' ? 'rows' : 'columns'

        let arraySize = state[fieldToChange].length
        let auxArray = state[fieldToChange]

        if(inputValue > state[payload.target]){
          for (inputValue; arraySize <inputValue; arraySize++) {
            auxArray.push("")
          }
        }else{
          auxArray = state[fieldToChange].filter(
            (_,index) => index <= inputValue-1)
        }
        

        return {
          ...state,
          [payload.target] : payload.value,
          [fieldToChange]: auxArray
        }
      default:
        break;
    }
  }

  const [state,dispatch] = useReducer(reducer,INITIAL_STATE);

  const handleInputChange = (value,target) => {
    
    if(value >=1){
      dispatch({type:'changeInput', payload:{value,target}})
    }
  }

  const handleTableValuechange = () => {
    //todo
  }

  return (
    <div className="app">
      <header >
        <label>Quantidade de estados</label>
        <input type="number" value={state.states} onChange={(e) => handleInputChange(e.target.value,'states')}/>
        <br/> 
        <label>Quantidade de simbolos</label>
        <input 
          type="number"
          value={state.symbols}
          onChange={(e) => handleInputChange( e.target.value,'symbols')}
        />
      </header>
      <main>
      <table style={{ border: 'solid 1px blue' }}>
       <thead>
           <tr>
             {state.columns.map(column => (
               <th
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 <input type="text"/>
               </th>
             ))}
           </tr>
       </thead>
       <tbody>
         {state.rows.map(row => {
           return (
             <tr >
               {state.columns.map(cell => {
                 return (
                   <td>
                    <input type="text"/>
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
    </main>
  </div>
  );
}

export default App;
