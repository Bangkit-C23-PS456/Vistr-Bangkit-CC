const {
    getByMultipleCategories,
    getAllCategories,
} = require("../controller/category.controller");
const {
    getAllPlaces,
    getPlaceById,
    inputDataJson,
    prepData,
    getPopularPlaces,
    getByActivity,
    searchByField,
} = require("../controller/place.controller");
const placeRouter = require("express").Router();

placeRouter.get("/get-all-category", getAllCategories);
placeRouter.get("/get-all-place", getAllPlaces);
placeRouter.get("/get-by-id/:id", getPlaceById);
placeRouter.get("/get-by-category", getByMultipleCategories);
placeRouter.get("/input-data", inputDataJson);
placeRouter.get("/prep-data", prepData);
placeRouter.get("/get-popular-place", getPopularPlaces);
placeRouter.get("/get-by-activity", getByActivity);
placeRouter.get("/search-by-name", searchByField);

module.exports = placeRouter;
