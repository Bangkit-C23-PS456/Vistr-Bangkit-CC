const { getByMultipleCategories } = require('../controller/category.controller');
const { getAllPlaces, getPlaceById, inputDataJson, prepData } = require('../controller/place.controller');
const placeRouter = require('express').Router();

placeRouter.get('/get-all-place', getAllPlaces)
placeRouter.get('/get-by-id/:id', getPlaceById)
placeRouter.get('/get-by-category',getByMultipleCategories)
placeRouter.get('/input-data',inputDataJson)
placeRouter.get('/prep-data',prepData)

module.exports = placeRouter