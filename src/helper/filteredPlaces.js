const placedData = require('../../src/public/dataPlaced/beforeFiltered.json')

const filterData = async() => {
  try {
    const filteredPlaces = placedData.map(placeData => {
      const { location_id, photo, ...rest } = placeData;
      if (photo && photo !== null) {
        const { is_blessed, uploaded_date, caption, id, helpful_votes, published_date, user, ...photoRest } = photo;
        return { ...rest, photo: { ...photoRest } };
      } else {
        return { ...rest };
      }
    });
    return filteredPlaces
  } catch (error) {
    return error
  }
}

module.exports = filterData