import './App.css';

import {useReducer} from 'react';

function App() {
  const INITIAL_STATE = {
    states:3,
    symbols:3,
  }

  const reducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
      case "changeInput":
        return {[payload.target] : payload.value}  
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


  return (
    <div>
      <div>
        <label>Quantidade de estados</label>
        <input type="number" value={state.states} onChange={(e) => handleInputChange(e.target.value,'states')}/>
        <br/> 
        <label>Quantidade de simbolos</label>
        <input 
          type="number"
          value={state.symbols}
          onChange={(e) => handleInputChange( e.target.value,'symbols')}
        />
      </div>
    </div>
  );
}

export default App;
