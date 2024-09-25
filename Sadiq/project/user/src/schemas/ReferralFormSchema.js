import * as yup from 'yup'


// Validation part starts
let ReferralFormSchema = yup.object({
    referralcode : yup.string().required("Enter Referral Code"),
})
// Validation part ends

export default ReferralFormSchema;