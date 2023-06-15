const prisma = require("../database/prisma.database")

const getAllCities = async (req, res) => {
    try {
        const cities = await prisma.city.findMany()
        return res.status(200).json({ status: "success", data: cities })
    } catch (error) {
        return res.status(500).json({ status: "fail", data: error })
    }
}

const getAllPlaceInCity = async (req, res) => {
    const { city } = req.params
    if (city !== null) {
        try {
            const places = await prisma.city.findFirstOrThrow({
                where: {
                    name: city
                },
                include: {
                    places: {
                        include: {
                            photos: true,
                            openingHours: true,
                            city: true,
                            categories: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    }
                }

            })
            return res.status(200).json({ status: "success", data: places })
        } catch (error) {
            if (error.name === "NotFoundError") {
                return res.status(404).json({ status: 'fail', message: "Kota tidak di temukan" })
            }
            return res.status(200).json({ status: "fail", data: error })
        }
    } else {
        return res.status(404).json({ status: 'fail', message: "Kota tidak di temukan" })
    }
}

module.exports = { getAllCities, getAllPlaceInCity }