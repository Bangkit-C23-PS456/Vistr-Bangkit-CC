const { getAllPlaces, getPlaceById } = require('../controller/place.controller');
const placeRouter = require('express').Router();

placeRouter.get('/', getAllPlaces)
placeRouter.get('/:id', getPlaceById)

module.exports = placeRouter