let route = require("express").Router();
let signup = require("../../model/userSignup");


route.post('/', async(req, res) =>{
    let {formdata, id} = req.body;
    let {referralcode} = formdata;
    let usedReferralCodeUser = await signup.findOne({referralcode : referralcode})
    if(usedReferralCodeUser) {

        // push referral code in user array
        let chckAccount = await signup.findOne({_id : id})
        if(chckAccount) {
            if(chckAccount?.referralcode != referralcode) {
                await signup.updateOne({_id : id}, {$set : { usereferral : referralcode }})
                // await signup.updateOne({_id : id}, {referralpoints : 20});

                // update usedReferralCodeUser Points
                let referralCodeUser = chckAccount?.referralcode;
                await signup.updateOne({referralcode : referralcode}, {$push : { referrals : referralCodeUser }});
                usedReferralCodeUser?.referrals?.push(referralCodeUser);
                let points = await updateRefPoints(usedReferralCodeUser);
                await signup.updateOne({referralcode : referralcode}, {$set : { referralpoints : points }});
                if(usedReferralCodeUser?.usereferral) {
                    let sendResponse = await checkParentNesting(usedReferralCodeUser);
                    if(sendResponse) {
                        res.send({status : 200})
                    }
                }
                // update usedReferralCodeUser Points
            }
        } else {
        res.send({status : 403})
        }
        // push referral code in user array
    }
});

const checkParentNesting = async(hasUsedReferral) =>{
    let parentReferral = await signup.findOne({referralcode : hasUsedReferral?.usereferral});
    let points = await updateRefPoints(parentReferral);
    await signup.updateOne({referralcode : hasUsedReferral?.usereferral}, {$set : { referralpoints : points }});
    if(parentReferral?.usereferral) {
        await checkParentNesting(parentReferral)
    }else{
        return true;
    }
}

const updateRefPoints = async (rootRef) => {
    let lvl1Refs = rootRef?.referrals;
    let Points = 0;

    // Level one: Direct referrals
    Points += lvl1Refs?.length * 20;

    // Level two: Referrals of level one referrals
    let lvl2Refs = [];
    for (const refCode of lvl1Refs || []) {
        const chckuser = await signup.findOne({ referralcode: refCode });
        if (chckuser) {
            lvl2Refs.push(...(chckuser.referrals || [])); // Add referrals of level one user to lvl2Refs
            Points += (chckuser.referrals?.length || 0) * 10;
        }
    }


    // Level three: Referrals of level two referrals
    for (const refCode of lvl2Refs) {
        const chckuser = await signup.findOne({ referralcode: refCode });
        if (chckuser) {
            Points += (chckuser.referrals?.length || 0) * 5;
        }
    }

    return Points;
};


module.exports = route;