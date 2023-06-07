const { signInWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../utils/firebaseAuth.util');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json({
      status: 'success',
      token: response.user.accessToken,
    });
    
  } catch (error) {
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password'
    ) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'Email or password wrong' });
    }

    res.status(500).json({ status: 'fail', message: error });
  }
};

module.exports = { signIn };
