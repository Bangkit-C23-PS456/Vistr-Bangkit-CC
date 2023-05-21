// const admin = require("firebase-admin")
// const credentials = require('../../service-account.json')

// admin.initializeApp({
//     credential : admin.credential.cert(credentials)
// })

// const signUp = async(req,res) => {
//     const {email,password} = req.body
//     try {
//         const response = await admin.auth().createUser({
//             email : email,
//             password : password,
//             emailVerified : false,
//             disabled : false
//         });
//         res.status(200).json({'status' : 'success' , data : response})
//     } catch (error) {
//         res.status(500).json({'status' : 'fail' , message : error})
//     }

// }

// module.exports = {signUp}

const {createUserWithEmailAndPassword,getAuth} = require('firebase/auth')
const {app} = require('../utils/firebase.utils')

const auth = getAuth(app)
const signUp = async (req, res) => {
    const { email, password } = req.body
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        return res.status(200).json({ status: 'success', data: response })
    } catch (error) {
        res.status(500).json({ 'status': 'fail', message: error })
    }
}

module.exports = {signUp}
