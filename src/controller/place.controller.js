const prisma = require("../database/prisma.database");
const filterData = require("../helper/filteredPlaces");
const places = require("../../src/public/dataPlaced/afterFiltered.json");
const sortFieldType = require("../helper/sortFieldType");

const getAllPlaces = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const totalCount = await prisma.place.count();
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;
    try {
        const places = await prisma.place.findMany({
            include: {
                photos : true,
                openingHours: true,
                city: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
            skip: parseInt(offset),
            take: parseInt(limit),
        });
        if (places.length === 0)
            return res.status(404).json({
                status: "fail",
                message: "Tidak ada data tempat yang ditemukan",
            });

        if (places.length === 0)
            return res.status(404).json({
                status: "fail",
                message: "Tidak ada data tempat yang ditemukan",
            });

        const processedPlaces = places.map((place) => {
            const categories = place.categories.map(
                (category) => category.category.name
            );
            return {
                ...place,
                categories: categories,
            };
        });

        res.status(200).json({
            status: "success",
            places: processedPlaces,
            status: "success",
            places: processedPlaces,
            totalPages: totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error });
        console.log(error);
        res.status(500).json({ status: "fail", message: error });
    }
};

const  getPlaceById = async (req, res) => {
    const { id } = req.params;
    try {
        const place = await prisma.place.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                photos: true,
                openingHours: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
                city: true,
            },
        });

        if (!place) {
            return res.status(204).json({
                status: "fail",
                message: "Place not found",
            });
        }

        res.status(200).json({
            status: "success",
            place,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error,
        });
    }
};

const searchByField = async (req, res) => {
    const { search, sortField, rating, page = 1, limit = 10, city } = req.query;
    const data = await sortFieldType(sortField, search, rating, city);
    const totalCount = await prisma.place.count({
        where: data.countData,
    });

    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;

    try {
        const places = await prisma.place.findMany({
            where: data.data,
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
            skip: parseInt(offset),
            take: parseInt(limit),
        });
        const processedPlaces = places.map((place) => {
            const categories = place.categories.map(
                (category) => category.category.name
            );
            return {
                ...place,
                categories: categories,
            };
        });

        console.log(processedPlaces.length === 0);
        if (processedPlaces.length === 0) {
            return res
                .status(400)
                .json({ status: "fail", message: "Data tidak ada" });
        } else {
            return res.status(200).json({
                status: "success",
                places: processedPlaces,
                totalPages: totalPages,
                currentPage: page,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error,
        });
    }
};

const inputDataJson = async (req, res) => {
    try {
        const transaction = await prisma.$transaction(
            places.map((placeData) => {
                const { opening_hours, category, photo, city, ...place } =
                    placeData;

                const weekRanges = opening_hours?.week_ranges || [];
                const formattedOpeningHours = weekRanges.flatMap(
                    (range, index) => {
                        const day = [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                        ][index];
                        return range.map((time) => ({
                            day,
                            openTime: time.open_time,
                            closeTime: time.close_time,
                        }));
                    }
                );
                return prisma.place.create({
                    data: {
                        place_name: place.place_name,
                        description: place.description,
                        activity: place.activity,
                        min_price: parseInt(place.min_price),
                        max_price: parseInt(place.max_price),
                        rating: parseInt(place.rating),
                        latitude: parseFloat(place.latitude),
                        longitude: parseFloat(place.longitude),
                        openingHours: {
                            createMany: {
                                data: formattedOpeningHours,
                            },
                        },
                        categories: {
                            create: {
                                category: {
                                    connectOrCreate: {
                                        where: { name: category },
                                        create: { name: category },
                                    },
                                },
                            },
                        },
                        photos: {
                            create: photo
                                ? [
                                      {
                                          width: photo.images.small.width,
                                          height: photo.images.small.height,
                                          url: photo.images.small.url,
                                      },
                                  ]
                                : [],
                        },
                        city: {
                            connectOrCreate: {
                                where: { name: city },
                                create: { name: city },
                            },
                        },
                    },
                });
            })
        );
        return res.status(200).json({ status: "success", data: transaction });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "fail", message: error });
    }
};

const prepData = async(req,res) => {
    const data = await filterData()
    res.status(200).send(data)
}

const getPopularPlaces = async (req, res) => {
    try {
        const places = await prisma.place.findMany({
            where: {
                rating: {
                    gte: 4.0,
                },
            },
            include: {
                photos: true,
                openingHours:true,
                city: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });

        if (places.length === 0)
            return res.status(404).json({
                status: "fail",
                message: "Tidak ada data tempat populer yang ditemukan",
            });

        const processedPlaces = places.map((place) => {
            const categories = place.categories.map(
                (category) => category.category.name
            );
            return {
                ...place,
                rating: parseFloat(place.rating),
                categories: categories,
            };
        });

        res.status(200).json({
            status: "success",
            places: processedPlaces,
        });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error });
    }
};

const getByActivity = async (req, res) => {
    const { activity } = req.query;

    if (!activity) {
        return res.status(400).json({ error: "Parameter Aktivitas Wajib" });
    }

    try {
        const data = await prisma.place.findMany({
            where: {
                activity: activity,
            },
        });

        if (data.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Tidak menemukan tempat sesuai aktivitas",
            });
        }

        return res.status(200).json({ status: "success", data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "fail", data: error });
    }
};

module.exports = {
    getAllPlaces,
    getPlaceById,
    inputDataJson,
    prepData,
    getPopularPlaces,
    getByActivity,
    searchByField,
};
