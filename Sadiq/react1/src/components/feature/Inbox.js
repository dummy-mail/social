import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dlt } from '../../redux/InboxSlice'


const Inbox = () => {

    let allData = useSelector(state=>state.InboxSlice)
    let disp = useDispatch();

    let del = (obj) =>{
        disp(dlt(obj.id))
    }

  return (
    <>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <table className="table table-info table-hover table-striped">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Salary</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((value, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.age}</td>
                                        <td>{value.city}</td>
                                        <td>{value.salary}</td>
                                        <td><button onClick={()=>del(value)} className='btn btn-danger btn-sm'>Dlt</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Inbox