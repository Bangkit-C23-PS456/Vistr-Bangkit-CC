const { createUserWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../utils/firebaseAuth.util');
const prisma = require('../database/prisma.database')


const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await prisma.user.create({
      data: {
        firebaseId: response.user.uid,
        name,
        email,
      },
    });

    res.status(200).json({ status: 'success', token: response.user.accessToken });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return res
        .status(409)
        .json({ status: 'fail', message: 'Email already exist' });
    }

    res.status(500).json({ status: 'fail', message: error });
  }
};

module.exports = { signUp };
