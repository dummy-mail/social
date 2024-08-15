import React from 'react'
import Header from '../shared/Header'

const Teacher = () => {
  return (
    <>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 my-5 offset-md-3" style={{minHeight : "600px"}}>
              <form>
              <div className="card">
                <div className="card-header text-center">
                  <h3>ADD TEACHER</h3>
                </div>
                <div className="card-body">
                    <div className="my-3">
                    <label>Name</label>
                    <input type='text' name='name' placeholder='Enter Name' className='form-control' />
                    </div>
                    <div className="my-3">
                    <label>Contact Number</label>
                    <input type='number' name='contact' placeholder='Enter Contact Number' className='form-control' />
                    </div>
                    <div className="my-3">
                    <label>Email ID</label>
                    <input type='email' name='email' placeholder='Enter Email ID' className='form-control' />
                    </div>
                    <div className="my-3">
                    <label>Age</label>
                    <input type='number' name='age' placeholder='Enter Age' className='form-control' />
                    </div>
                    <div className="my-3">
                    <label>Salary</label>
                    <input type='number' name='salary' placeholder='Enter Salary' className='form-control' />
                    </div>
                    <div className="my-3">
                    <label>State</label>
                    <select  name='state' className='form-control'>
                      <option value="">Select</option>
                    </select>
                    </div>
                    <div className="my-3">
                    <label>City</label>
                    <select  name='city' className='form-control'>
                      <option value="">Select</option>
                    </select>
                    </div>
                    <div className="my-3">
                    <label>Address</label>
                    <textarea name='address' placeholder='Enter Name' className='form-control'></textarea>
                    </div>
                </div>
                <div className="card-footer text-center">
                  <button type='submit' className='btn btn-primary form-control'>ADD</button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default Teacher