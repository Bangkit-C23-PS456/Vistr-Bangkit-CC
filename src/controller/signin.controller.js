const { signInWithEmailAndPassword } = require('firebase/auth');
const auth = require('../utils/firebaseAuth.util');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const signInresponse = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.status(200).json({ status: 'success', data: signInresponse });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error });
  }
};

module.exports = { signIn };
