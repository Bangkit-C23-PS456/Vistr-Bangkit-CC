const admin = require('firebase-admin')
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

admin.initializeApp({
    credential: admin.credential.cert({
        "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\n/gm, "\n"),
        "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID
    })
})

const verifyToken = async (req, res, next) => {
    const { token } = req.headers;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.decodedToken = decodedToken.uid;

        next();
    } catch (error) {
        res.status(401).json({ status: "fail", message: "Invalid Token" });
    }
};

module.exports = { verifyToken, admin };
