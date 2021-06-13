import './App.css';

import { useReducer } from 'react';
import React from 'react';
import { useTable } from 'react-table'

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


  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
        col3: '!!!'
      },
      {
        col1: 'react-table',
        col2: 'rocks',
        col3: '!!!'
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: '!!!'
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
      {
        Header: 'Column 3',
        accessor: 'col3'
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  
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
        <label>Quantidade de simbolos</label>
        <input 
          type="number"
          value={state.symbols}
          onChange={(e) => handleInputChange( e.target.value,'symbols')}
        />
      </div>


      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>


    </div>
  );
}

export default App;
