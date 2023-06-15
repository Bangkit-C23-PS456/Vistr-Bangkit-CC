const axios = require('axios')
const { auth } = require('../utils/firebaseAuth.util')
const { admin } = require('../middleware/verifyToken')

const userPreference = async (req, res) => {
    const { activity, category, latitude, longitude } = req.query
    try {
        const data = await axios.get(`https://vistr-ml-ouf6j3ewba-et.a.run.app/user?activity=${activity}&category=${category}&latitude=${latitude}&longtitude=${longitude}`)
        if (data.data.preferences.length === 0) {
            return res.status(204).json({ status: 'fail', message: "Tidak ada yang cocok" })
        }
        return res.status(200).json({ status: 'success', data: data.data.preferences })
    } catch (error) {
        return res.status(500)
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        return res.status(200).json({ status: 'success', data: users })
    } catch (error) {
        return res.status(500)

    }
}

const userPrefInput = async (req, res) => {
    const { latitude, longitude, city, place_activity, place_category } = req.body
    const firebaseId = req.decodedToken
    console.log(firebaseId)
    if (!latitude || !longitude || !firebaseId || !city || !place_activity || !place_category) {
        return res.status(422).json({ status: 'fail', message: "Data yang diminta tidak sesuai" })
    }
    else {
        const user = await prisma.user.findFirst({
            where: {
                firebaseId: firebaseId
            }
        })
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'user tidak ada' })
        } else {
            try {
                const prefUser = await prisma.UserPreference.create({
                    data: {
                        user_id: user.id,
                        place_activity: place_activity.toUpperCase(),
                        city: city,
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        place_category: {
                            connectOrCreate: {
                                where: { name: place_category },
                                create: { name: place_category }
                            }
                        }
                    },
                    include: {
                        place_category: true
                    }
                })
                return res.status(200).json({ status: 'success', data: prefUser })
            } catch (error) {
                if (error.code === "P2002") {
                    return res.status(500).json({ status: 'fail', message: "Gagal Untuk Membuat User Pref" })
                }
                console.log(error)
                return res.status(500).json({ status: 'fail', message: error })
            }
        }
    }
}

const userIternary = async (req, res) => {
    const { latitude, longtitude } = req.query
    try {
        const iternary = await axios.get(`https://vistr-ml-ouf6j3ewba-et.a.run.app/user/itinerary?latitude=${latitude}&longtitude=${longtitude}`)
        const data = [
            iternary.data.prefrences.todo_recommendation,
            iternary.data.prefrences.hotel_recommendation,
            iternary.data.prefrences.restaurant_recommendation
        ]
        if (data[0] === 0) {
            return res.status(204).json({ status: 'fail', message: "Tidak ada yang cocok" })
        }
        return res.status(200).json({ status: 'success', data: data })
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

const editUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const firebaseId = req.decodedToken;

    try {
        const user = await prisma.user.findFirst({
            where: {
                firebaseId: firebaseId,
            },
        });

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'user tidak ada' });
        }
        //update db data
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: name,
                email: email,
            },
        });

        await admin.auth().updateUser(firebaseId, { email: email });

        res.status(200).json({ status: 'success', data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error });
    }
}

const editUserPreference = async (req, res) => {
    const { latitude, longitude, city, place_activity, place_category } = req.body;
    const firebaseId = req.decodedToken;

    if (!latitude || !longitude || !firebaseId || !city || !place_activity || !place_category) {
        return res.status(422).json({ status: 'fail', message: "Data yang diminta tidak sesuai" });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                firebaseId: firebaseId,
            },
        });

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'user tidak ada' });
        }

        const updatedUserPreference = await prisma.userPreference.update({
            where: {
                user_id: user.id,
            },
            data: {
                place_activity: place_activity.toUpperCase(),
                city: city,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                place_category: {
                    connectOrCreate: {
                        where: { name: place_category },
                        create: { name: place_category },
                    },
                },
            },
            include: {
                place_category: true,
            },
        });

        res.status(200).json({ status: 'success', data: updatedUserPreference });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error });
    }
};


module.exports = { userPreference, userIternary, getAllUser, userPrefInput, editUserProfile, editUserPreference }