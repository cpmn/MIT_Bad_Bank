import Table from 'react-bootstrap/Table';

function TableRow ({row, index}) {

  console.log('ROW INFO: ', row)
  return(
    <tr>
      <td>{index}</td>
      <td>{row.date}</td>
      <td>{row.type}</td>
      <td>{row.description}</td>
      <td>{row.amount}</td>      
      <td>{100}</td>
    </tr>
  )
}

function TableInformation ({ columnHeaders, rowInformation } ){
    console.log("INFORMATION: ", rowInformation)
    return (
      <Table>
        <thead>
          <tr> 
            {
              columnHeaders.map((header, index) => <th key={index}>{header}</th>)
            }
          </tr>
        </thead>
        <tbody>
          { 
          rowInformation.map((row, index) => <TableRow row={row} index={index+1}/> )
          }
        </tbody> 
               
      </Table>
    )
  }
  export default TableInformation;