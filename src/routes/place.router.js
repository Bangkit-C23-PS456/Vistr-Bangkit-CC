const { getByMultipleCategories } = require('../controller/category.controller');
const { getAllPlaces, getPlaceById } = require('../controller/place.controller');
const placeRouter = require('express').Router();

placeRouter.get('/get-all-place', getAllPlaces)
placeRouter.get('/get-by-id/:id', getPlaceById)
placeRouter.get('/get-by-category',getByMultipleCategories)

module.exports = placeRouter