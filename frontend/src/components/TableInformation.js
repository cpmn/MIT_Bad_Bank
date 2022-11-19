import Table from 'react-bootstrap/Table';

function TableRow ({row, index}) {

  let dollarUS = Intl.NumberFormat('en-US');
  
  return(
    <tr className={`banner ${(row.type === 'Withdraw' || row.type === 'Transfer To') ? "text-danger" : "text-dark"}`}>
      <td>{index}</td>
      <td >{new Date(row.date).toLocaleString()}</td>
      <td>{row.type}</td>
      <td >{row.description}</td>
      <td className='text-left'>$ {(row.type === 'Withdraw' || row.type === 'Transfer To')?dollarUS.format(row.amount*-1):dollarUS.format(row.amount)}</td>      
      <td className='text-left'>$ {dollarUS.format(row.balance)}</td>
    </tr>
  )
}

function TableInformation ({ columnHeaders, rowInformation } ){    
    return (
      <div className="table-responsive-sm">
      <Table className="table-hover">
        <thead>
          <tr> 
            {
              columnHeaders.map((header, index) => <th key={index}>{header}</th>)
            }
          </tr>
        </thead>
        <tbody>
          { 
          rowInformation.map((row, index) => <TableRow key={index} row={row} index={index+1}/> )
          }
        </tbody> 
               
      </Table>
      </div>
    )
  }
  export default TableInformation;