const { getAllPlaceInCity } = require('../controller/city.controller')

const cityRouter = require('express').Router()

cityRouter.get('/:city',getAllPlaceInCity)


module.exports = cityRouter