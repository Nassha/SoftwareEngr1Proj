import React from "react";
import { useTable, useRowSelect, usePagination } from "react-table"; 
import Axios from 'axios'
import Swal from 'sweetalert2';

export default function UserTable({ columns, data }) { 



  const IndeterminateCheckbox = React.forwardRef(//SelectedRows
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" className="backendchkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
  )

  
  
  const deleteUser = arr =>{//Delete 1 User
    const selecteduser = arr['original'].useremail_reg
    console.log(selecteduser)
    Swal.fire({
      title: 'Are you sure you want to delete '+ arr['original'].useremail_reg + '?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'No',
      cancelButtonText:'Yes'
    }).then((result) => {
      if (!result.isConfirmed) {
        Axios.delete(`http://localhost:3001/api/username/delete/${selecteduser}`);
      }
    }
  )
  }
  const deleteUsers = arr =>{//Delete Selected Users
    for (var key in arr) {
      const userinfo = arr[key];
      console.log(userinfo.useremail_reg);
      }
    Swal.fire({
      title: 'Are you sure you want to delete selected records?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'No',
      cancelButtonText:'Yes'
    }).then((result) => {
      if (!result.isConfirmed) {
        for (var key in arr) {
        const userinfo = arr[key];
        console.log(userinfo.useremail_reg);
        Axios.delete(`http://localhost:3001/api/username/delete/${userinfo.useremail_reg}`);
        }
      }
    }
  )
  }
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    getToggleRowSelectedProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize},
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,{
          id: 'deleteuserbtn',
          Header: '',
          Cell: ({ row }) => (
              <button className="deletebtn" onClick={() => deleteUser(row)}>Delete</button>
          ),
        }
      ])
    }
  )

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
    <button className='deletebtn' onClick={()=>{deleteUsers(selectedFlatRows.map(d => d.original))}}>Delete</button>
    <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <span>
          Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
    <table {...getTableProps()} id="listtable">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return(
                  <>
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                </>
                )
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    <p style={{textAlign:"center",fontSize:"15px"}}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </p>
    </>
  )
}