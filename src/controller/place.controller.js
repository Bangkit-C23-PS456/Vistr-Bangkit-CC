const prisma = require('../database/prisma.database')
const filterData = require('../helper/filteredPlaces')
const places = require('../../src/public/dataPlaced/afterFiltered.json')
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

const inputDataJson = async(req,res) => {
    try {
        const transaction = await prisma.$transaction(
            places.map(placeData => {
              const {
                opening_hours,
                category,
                photo,
                city,
                ...place
              } = placeData;
        
              const weekRanges = opening_hours?.week_ranges || [];
              const formattedOpeningHours = weekRanges.flatMap((range, index) => {
                const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index];
                return range.map(time => ({
                  day,
                  openTime: time.open_time,
                  closeTime: time.close_time,
                }));
              });
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
                        data : formattedOpeningHours
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
                  city : {
                    connectOrCreate : {
                        where : {name : city},
                        create : {name : city}
                    } 
                  }
                },
              });
            })
          );
          return res.status(200).json({status : 'success',data :transaction})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'fail',message : error})
    }
}

const prepData = async(req,res) => {
    const data = await filterData()

    res.status(200).send(data)
}


module.exports = { getAllPlaces, getPlaceById,inputDataJson,prepData }