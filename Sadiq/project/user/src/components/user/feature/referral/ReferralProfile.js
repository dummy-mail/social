import React from 'react'
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import ReferralModal from './ReferralModal';


const ReferralProfile = () => {

    let userData = useSelector(state => state.UserDataSlice)

  return (

        <>
  <header className="header-lay">
    <div className="container fluid">
      <div className="row align-items-center">
        <div className="col-md-8">
          <h1>MY REFERRAL SYSTEM</h1>
        </div>
        <div className="col-md-4 d-flex jutify-end">
          <NavLink to='/user/setting' className="btn">
            <img src="/assets/img/referral/power-button_5993832 1.png" />
          </NavLink>
        </div>
      </div>
    </div>
  </header>


    <section className="main-sec">
        <div className="container">
        <div className="row">
            <div className="col-md-1" />
            <div className="col-md-11 banner-sec">
            <img
                className="img-1"
                src="/assets/img/referral/freepik-export-20240901070450pnzL 1.png"
                alt=""
            />
            <div className="pt-1">
                <div className="box-1">
                <h4>{userData?.referralcode}</h4>
                <button className="btn">
                    <img src="/assets/img/referral/paste_8367511 1.png" alt="" />{" "}
                </button>
                </div>
            </div>
            <div>
                <h1>{userData?.referralpoints}</h1>
                <h6>TOTL POINTS</h6>
            </div>
            <div className="box-2">
                <div>
                <h5>1st referral:</h5>
                <p>20pts</p>
                </div>
                <div>
                <h5>2nd referral:</h5>
                <p>10pts</p>
                </div>
                <div>
                <h5>3rd referral:</h5>
                <p>5pts</p>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="list-sec">
        <div className="container">
            <div className="row gap-40">
            <h1>MY REFERRALS</h1>
            <div className="list-box">
                <div className="list-box-1">
                <h4>User Name</h4>
                <span>+20pts</span>
                </div>
                <div className="list-box-2">
                <h4>User Name</h4>
                <span>+10pts</span>
                </div>
                <div className="list-box-3">
                <h4>User Name</h4>
                <span>+5pts</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

    <ReferralModal />
</>

    
  )
}

export default ReferralProfile