const prisma = require('../database/prisma.database')

const getAllPlaces = async (req, res) => {
    try {
        const places = await prisma.place.findMany({
            include: {
                city: true,
                categories: {
                    include: {
                        category: true
                    }
                },
            }
        })

        if (places.length === 0) return res.status(404).json({
            status: 'fail',
            message: 'Tidak ada data tempat yang ditemukan'
        });


        const processedPlaces = places.map(place => {
            const categories = place.categories.map(category => category.category.name);
            return {
                ...place,
                categories: categories
            };
        });

        res.status(200).json({
            status: 'success',
            places: processedPlaces
        });

    } catch (error) {
        res.status(500).json({ status: 'fail', message: error });
    }
}

const getPlaceById = async (req, res) => {
    const { id } = req.params;
    try {
        const place = await prisma.place.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                city: true,
            },
        });

        if (!place) {
            return res.status(404).json({
                status: 'fail',
                message: 'Place not found',
            });
        }

        res.status(200).json({
            status: 'success',
            place,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error,
        });
    }
};


module.exports = { getAllPlaces, getPlaceById }