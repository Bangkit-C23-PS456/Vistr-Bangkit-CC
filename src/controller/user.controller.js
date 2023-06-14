const axios = require('axios')

const userPreference = async(req,res) => {
    const {activity,category,latitude,longitude} = req.query
    try {
        const data = await axios.get(`https://vistr-ml-ouf6j3ewba-et.a.run.app/user?activity=${activity}&category=${category}&latitude=${latitude}&longtitude=${longitude}`)
        if(data.data.preferences.length === 0) {
            return res.status(204).json({status:'fail',message : "Tidak ada yang cocok"})
        }
        return res.status(200).json({status:'success',data : data.data.preferences})
    } catch (error) {
        return res.status(500)    
    }
}

const getAllUser = async(req,res) => {
    try {
        const users = await prisma.user.findMany({})
        return res.status(200).json({status: 'success', data: users})
    } catch (error) {
        return res.status(500)    
        
    }
}

const userPrefInput = async(req,res) => {
    const {latitude,longitude,userId,city,place_activity,place_category} = req.body
    if (!latitude || !longitude || !userId || !city || !place_activity  || !place_category) {
        return res.status(422).json({status : 'fail', message : "Data yang diminta tidak sesuai"})
    }
    else {
        try {
            const prefUser = await prisma.UserPreference.create({
                data : {
                    user_id : parseInt(userId),
                    place_activity : place_activity.toUpperCase(),
                    city : city,
                    latitude: parseFloat(latitude),
                    longitude : parseFloat(longitude),
                    place_category : {
                        connectOrCreate : {
                            where : {name : place_category},
                            create: {name : place_category}
                        }
                    }
                },
                include : {
                    place_category: true
                }
            })
            return res.status(200).json({status : 'success', data : prefUser})
        } catch (error) {
            if(error.code === "P2002"){
                return res.status(500) .json({status: 'fail',message : "Gagal Untuk Membuat User Pref"})   
            }
            console.log(error)
            return res.status(500) .json({status: 'fail',message : error})   
        }
    }
}

const userIternary = async(req,res) => {
    const {latitude, longtitude} = req.query
    try {
        const iternary = await axios.get(`https://vistr-ml-ouf6j3ewba-et.a.run.app/user/itinerary?latitude=${latitude}&longtitude=${longtitude}`)
        const data = [
            iternary.data.prefrences.todo_recommendation,
            iternary.data.prefrences.hotel_recommendation,
            iternary.data.prefrences.restaurant_recommendation 
        ]
        if(data[0] === 0) {
            return res.status(204).json({status:'fail',message : "Tidak ada yang cocok"})
        }
        return res.status(200).json({status:'success',data : data})
    } catch (error) {
        console.log(error)
        return res.status(500)    
    }
}

module.exports= {userPreference,userIternary,getAllUser,userPrefInput}