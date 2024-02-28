import React from 'react'

const CompB = () => {
  return (
    <>
         <div className="row">
            <div className="col-md-6 offset-md-3">
            <div className="card" style={{minHeight : "300px"}}>
            <div className="card-header"></div>
            <div className="card-body">
                
            </div>
            <div className="card-footer">
                <div className="input-group">
                    <input type="text" name="message"  placeholder="MESSAGE" aria-describedby="basic" className="form-control" />
                        <span className="bg-light input-group-text" id="basic">
                            <button className='btn btn-success btn-sm'>SEND</button>
                        </span>
                </div>
            </div>
        </div>
            </div>
        </div>
    </>
  )
}

export default CompB