import Table from 'react-bootstrap/Table';

function TableRow ({row, index}) {

  

  let dollarUS = Intl.NumberFormat('en-US');


  console.log('ROW INFO: ', row)
  return(
    <tr className={`banner ${(row.type === 'Withdraw') ? "text-danger" : "text-dark"}`}>
      <td>{index}</td>
      <td >{row.date}</td>
      <td>{row.type}</td>
      <td >{row.description}</td>
      <td className='text-left'>$ {(row.type === 'Withdraw')?dollarUS.format(row.amount*-1):dollarUS.format(row.amount)}</td>      
      <td className='text-left'>$ {dollarUS.format(row.balance)}</td>
    </tr>
  )
}

function TableInformation ({ columnHeaders, rowInformation } ){
    console.log("INFORMATION: ", rowInformation)
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