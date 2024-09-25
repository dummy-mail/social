import { useFormik } from 'formik'
import React, { useRef } from 'react'
import ReferralFormSchema from '../../../../schemas/ReferralFormSchema'
import {userRefSubmit} from '../../../../redux/UserDataSlice'
import { useDispatch, useSelector } from 'react-redux'

const ReferralModal = () => {

    let clsModal = useRef();
    let userData = useSelector(state => state.UserDataSlice);
    let dispatch = useDispatch();

    let refForm = useFormik({
        validationSchema : ReferralFormSchema,
        initialValues : {
            referralcode : ""
        },
        onSubmit : (formdata) =>{
            let obj = {
                formdata : formdata,
                id : userData?._id
            }
            let response = dispatch(userRefSubmit(obj));
            console.log(response)
            setTimeout(()=>{
                clsModal.current.click();
            }, 900)
        }
    })

  return (
    <>
        <div className="ref-modal-lay">
            <div className="modal fade" id="Open" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className='modal-dialog modal-dialog-centered '>
                    <div className='ref-modal'>
                        <form onSubmit={refForm.handleSubmit} >
                            <div className='my-3 '>
                                <label>Use Referral Code to get Bonus Points</label>
                                <div className='ref-input'>
                                    <input type='text' onChange={refForm.handleChange} name='referralcode' placeholder='Enter Referral Code' className='input' />
                                    <button type='submit'  className='btn ref-btn'>Continue <i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                                {
                                    refForm.errors.referralcode && refForm.touched.referralcode ? <small className='text-danger text-sm'>{refForm.errors.referralcode}</small> : null
                                }
                            </div>
                        </form>
                        <div className='ref-footer'>
                            <label>Continue Wihtout Referral Code</label>
                            <button type='button'ref={clsModal} className='btn ref-btn'  data-dismiss="modal">Continue <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ReferralModal