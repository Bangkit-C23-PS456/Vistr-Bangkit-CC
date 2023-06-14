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

module.exports= {userPreference,userIternary}