const { createUserWithEmailAndPassword } = require('firebase/auth');
const {auth} = require('../utils/firebaseAuth.util');

const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await createUserWithEmailAndPassword(auth,email,password)
    res.status(200).json({ status: 'success', data: response });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error });
  }
};

module.exports = { signUp };
