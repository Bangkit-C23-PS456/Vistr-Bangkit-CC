# Vistr-Bangkit-CC


## GET /get-all-place?page={number}&limit={number}

Retrieves a paginated list of places.

**Parameters:**

- `page` (optional): The page number to retrieve (default: 1).
- `limit` (optional): The number of places per page (default: 10).

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `places` (array): An array of places containing the following information:
  - `id` (number): The ID of the place.
  - `place_name` (string): The name of the place.
  - `description` (string): The description of the place.
  - `activity` (string): The activity of the place.
  - `min_price` (number): The minimum price of the place.
  - `max_price` (number): The maximum price of the place.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `city` (object): The city information containing the following:
    - `id` (number): The ID of the city.
    - `name` (string): The name of the city.
  - `photos` (array): An array of place photos containing the following information:
    - `id` (number): The ID of the photo.
    - `placeId` (number): The ID of the associated place.
    - `width` (string): The width of the photo.
    - `height` (string): The height of the photo.
    - `url` (string): The URL of the photo.
  - `openingHours` (array): An array of opening hours for the place containing the following information:
    - `id` (number): The ID of the opening hours entry.
    - `day` (string): The day of the week.
    - `openTime` (number): The opening time in minutes.
    - `closeTime` (number): The closing time in minutes.
    - `placeId` (number): The ID of the associated place.
  - `categories` (array): An array of category names associated with the place.
- `totalPages` (number): The total number of pages available.
- `currentPage` (number): The current page number.

**Example Request:**

```
GET /get-all-place?page=2&limit=10
```

**Example Response:**

```json
{
  "status": "success",
  "places": [
    {
      "id": 1,
      "place_name": "Place 1",
      "description": "Description of Place 1",
      "activity": "Activity of Place 1",
      "min_price": 100,
      "max_price": 200,
      "rating": 4,
      "latitude": 123.456,
      "longitude": 789.012,
      "city": {
        "id": 1,
        "name": "City 1"
      },
      "photos": [
      {
        "id": 21,
        "placeId": 22,
        "width": "150",
        "height": "150",
        "url": "https://media-cdn.tripadvisor.com/media/photo-l/12/22/a2/2b/getlstd-property-photo.jpg"
      }
    ],
    "openingHours": [
      {
        "id": 127,
        "day": "Monday",
        "openTime": 540,
        "closeTime": 1140,
        "placeId": 22
      },
      // ... more opening hours
      "categories": [
        "Category 1",
        "Category 2"
      ]
    },
    // ... more places
  ],
  "totalPages": 5,
  "currentPage": 2
}
```

## GET /get-by-id/{id}

Retrieves a specific place by its ID.

**Parameters:**

- `id` (path parameter): The ID of the place.

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `place` (object): The place information with the specified ID, including the following details:
  - `id` (number): The ID of the place.
  - `place_name` (string): The name of the place.
  - `description` (string): The description of the place.
  - `activity` (string): The activity of the place.
  - `min_price` (number): The minimum price of the place.
  - `max_price` (number): The maximum price of the place.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `city` (object): The city information containing the following:
    - `id` (number): The ID of the city.
    - `name` (string): The name of the city.
  - `categories` (array): An array of category names associated with the place.

**Example Request:**

```
GET /get-by-id/:id
```

**Example Response:**

```json
{
  "status": "success",
  "place": {
    "id": 1,
    "place_name": "Place 1",
    "description": "Description of Place 1",
    "activity": "Activity of Place 1",
    "min_price": 100,
    "max_price": 200,
    "rating": 4,
    "latitude": 123.456,
    "longitude": 789.012,
    "city": {
      "id": 1,
      "name": "City 1"
    },
    "categories": [
      "Category 1",
      "Category 2"
    ]
  }
}
```

Sure! Here's the documentation for the `GET /places/multiple-categories` endpoint:

## GET /places/get-by-category

Retrieves places based on multiple categories.

**Parameters:**

- `categories` (query parameter): A comma-separated list of category names.

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `data` (array): An array of places that belong to at least one of the specified categories. Each place object contains the following details:
  - `id` (number): The ID of the place.
  - `place_name` (string): The name of the place.
  - `description` (string): The description of the place.
  - `activity` (string): The activity of the place.
  - `min_price` (number): The minimum price of the place.
  - `max_price` (number): The maximum price of the place.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `city` (object): The city information containing the following:
    - `id` (number): The ID of the city.
    - `name` (string): The name of the city.
  - `categories` (array): An array of category names associated with the place.

**Example Request:**

```
GET /places/get-by-category?categories=Category1,Category2,Category3
```

**Example Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "place_name": "Place 1",
      "description": "Description of Place 1",
      "activity": "Activity of Place 1",
      "min_price": 100,
      "max_price": 200,
      "rating": 4,
      "latitude": 123.456,
      "longitude": 789.012,
      "city": {
        "id": 1,
        "name": "City 1"
      },
      "categories": [
        "Category 1",
        "Category 2"
      ]
    },
    {
      "id": 2,
      "place_name": "Place 2",
      "description": "Description of Place 2",
      "activity": "Activity of Place 2",
      "min_price": 150,
      "max_price": 250,
      "rating": 4,
      "latitude": 123.789,
      "longitude": 789.345,
      "city": {
        "id": 2,
        "name": "City 2"
      },
      "categories": [
        "Category 1",
        "Category 3"
      ]
    }
  ]
}
```

## GET /places/search-by-field

Retrieves a paginated list of places based on the specified search criteria.

**URL:** `/places/search-by-field`

**Method:** `GET`

**Query Parameters:**
- `search` (optional): The search keyword to match against the place name or category(it can search category in city ) or city name .
- `sortField` (optional): The field to sort the places by. Possible values: `name`, `category`, `rating`. Default: `rating`.
- `rating` (optional): Filters the places by rating. Only places with the specified rating or higher will be included.
- `page` (optional): The page number to retrieve (default: 1).
- `limit` (optional): The number of places per page (default: 10).
- `city` (optional): Filters the places by city. Only places in the specified city will be included.

**Example URL:** `/places/search-by-field?search=Beach&sortField=category&page=1&rating=4&city=Balikpapan`

**Response:**
- `status` (string): The status of the response ("success" or "fail").
- `places` (array): An array of places containing the following information:
  - `id` (number): The ID of the place.
  - `place_name` (string): The name of the place.
  - `description` (string): The description of the place.
  - `activity` (string): The activity of the place.
  - `min_price` (number): The minimum price of the place.
  - `max_price` (number): The maximum price of the place.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `city` (object): The city information containing the following:
    - `id` (number): The ID of the city.
    - `name` (string): The name of the city.
  - `categories` (array): An array of category names associated with the place.
- `totalPages` (number): The total number of pages available.
- `currentPage` (number): The current page number.

## GET /user/prefrence

Retrieves user preferences based on activity, category, latitude, and longitude.

**Parameters:**

- `activity` (string, required): The activity type for preferred places.
- `category` (string, required): The category of preferred places.
- `latitude` (number, required): The latitude coordinate of the user's location.
- `longitude` (number, required): The longitude coordinate of the user's location.

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `data` (array): An array of preferred places containing the following information:
  - `place_name` (string): The name of the place.
  - `city` (string): The city where the place is located.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `opening_hours` (object): The opening hours of the place (null if not available).
  - `contact_number` (string): The contact number of the place.
  - `address` (string): The address of the place.
  - `min_price` (number): The minimum price at the place.
  - `max_price` (number): The maximum price at the place.
  - `activity` (string): The activity type at the place.
  - `category` (string): The category of the place.
  - `description` (string): The description of the place.
  - `photo` (object): The photo URLs of the place in different sizes.
  - `distance` (number): The distance from the user's location to the place.

**Example Request:**

```
GET /user/prefrence?category=Beach&latitude=-1.212555&longitude=116.98106&activity=Outdoor
```

**Example Response:**

```json
{
  "status": "success",
  "data": [
    {
      "place_name": "Sarrie Day Spa",
      "city": "Balikpapan",
      "rating": 5,
      "latitude": -1.2635,
      "longitude": 116.85812,
      "opening_hours": null,
      "contact_number": "+62 813-5182-8158",
      "address": "Jln. MT. Haryono no. 6 Ruko Bukit Damai Indah, Balikpapan 76126 Indonesia",
      "min_price": 50000,
      "max_price": 300000,
      "activity": "Indoor",
      "category": "Spa",
      "description": "Tradisional Spa",
      "photo": {
        "images": {
          "small": {
            "width": "550",
            "url": "",
            "height": "550"
          },
          "thumbnail": {
            "width": "550",
            "url": "",
            "height": "550"
          },
          "original": {
            "width": "550",
            "url": "",
            "height": "550"
          },
          "large": {
            "width": "550",
            "url": "",
            "height": "550"
          },
          "medium": {
            "width": "550",
            "url": "",
            "height": "550"
          }


        }
      },
      "distance": 4.5
    },
    // ... more preferred places
  ]
}
```

## GET /itinerary?latitude={latitude}&longitude={longitude}

Generates an itinerary based on the provided latitude and longitude coordinates.

**Parameters:**

- `latitude` (required): The latitude coordinate of the location.
- `longitude` (required): The longitude coordinate of the location.

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `data` (array): An array containing recommendation objects for places, hotels, and restaurants.
  - `place_recommendation` (array): An array of place recommendations containing the following information:
    - `place_name` (string): The name of the place.
    - `city` (string): The city where the place is located.
    - `rating` (number): The rating of the place.
    - `latitude` (number): The latitude coordinate of the place.
    - `longitude` (number): The longitude coordinate of the place.
    - `opening_hours` (object): Opening hours information for the place consisting of week ranges and timezone.
    - `contact_number` (string): The contact number of the place.
    - `address` (string): The address of the place.
    - `min_price` (number): The minimum price at the place.
    - `max_price` (number): The maximum price at the place.
    - `activity` (string): The activity type of the place.
    - `category` (string): The category of the place.
    - `description` (string): The description of the place.
    - `photo` (object): The photo information for the place consisting of different image sizes.
    - `distance` (number): The distance from the provided location to the place.
  - `hotel_recommendation` (array): An array of hotel recommendations containing the following information:
    - `original_id` (number): The original ID of the hotel.
    - `hotel_name` (string): The name of the hotel.
    - `rating` (number): The rating of the hotel.
    - `hotel_class` (number): The hotel class or rating.
    - `address` (string): The address of the hotel.
    - `latitude` (number): The latitude coordinate of the hotel.
    - `longitude` (number): The longitude coordinate of the hotel.
    - `contact_number` (string): The contact number of the hotel.
    - `number_of_rooms` (number): The number of rooms in the hotel.
    - `website` (string): The website URL of the hotel.
    - `image` (string): The image URL of the hotel.
    - `city` (string): The city where the hotel is located.
    - `min_price` (number): The minimum price per night at the hotel.
    - `max_price` (number): The maximum price per night at the hotel.
    - `distance` (number): The distance from the provided location to the hotel.
  - `restaurant_recommendation` (array): An array of restaurant recommendations containing the following information:
    - `restaurant_name` (string): The name of the restaurant.
    - `cuisine` (string): The cuisine type of the restaurant.
    - `rating` (number): The rating of the restaurant.
    - `latitude` (number): The latitude coordinate of the restaurant.
    - `longitude` (number): The longitude coordinate of the restaurant.
    - `contact_number` (string): The contact number of the restaurant.
    - `address` (string): The address of the restaurant.
    - `opening_hours` (object): Opening hours information for the restaurant consisting of week ranges and timezone.
    - `price_level` (number): The price level of the restaurant.
    - `photo` (object): The photo information for the restaurant consisting of different image sizes.
    - `distance` (number): The distance from the provided location to the restaurant.

**Example Request:**

```
GET /user/prefrence?category=Beach&latitude=-1.212555&longitude=116.98106&activity=Outdoor
```

**Example Response:**

```json
{
  "status": "success",
  "data": [
    {
      "place_recommendation": [
        {
          "place_name": "Biru Kersik Beach",
          "city": "Kutai Kartanegara",
          "rating": 5,
          "latitude": -0.0610753,
          "longitude": 117.4227587,
          // More of place
          "distance": 0.5433267714370267
        }
      ]
    },
    {
      "hotel_recommendation": [
        {
          "original_id": 19891163,
          "hotel_name": "Mercure Samarinda",
          "rating": 5,
          "hotel_class": 4,
          "address": "Jalan Mulawarman No 171, Samarinda 75112 Indonesia",
          "latitude": -0.503059,
          "longitude": 117.15194,
          // More of hotel
          "distance": 0.5183554372584352
        }
      ]
    },
    {
      "restaurant_recommendation": [
        {
          "original_id": 19508241,
          "restaurant_name": "Terang Bulan Bangka Kedai Jati Hop",
          "cuisine": [
            "Asian",
            "Indonesian"
          ],
          // More of restaurant
          "distance": 0.1977181229209403
        }
      ]
    }
  ]
}
```

## GET /place/get-popular-place

Retrieves popular places.

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `places` (array): An array of places containing the following information:
  - `id` (number): The ID of the place.
  - `place_name` (string): The name of the place.
  - `description` (string): The description of the place.
  - `activity` (string): The activity of the place.
  - `min_price` (number): The minimum price of the place.
  - `max_price` (number): The maximum price of the place.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `city` (object): The city information containing the following:
    - `id` (number): The ID of the city.
    - `name` (string): The name of the city.
  - `photos` (array): An array of place photos containing the following information:
    - `id` (number): The ID of the photo.
    - `placeId` (number): The ID of the associated place.
    - `width` (string): The width of the photo.
    - `height` (string): The height of the photo.
    - `url` (string): The URL of the photo.
  - `openingHours` (array): An array of opening hours for the place containing the following information:
    - `id` (number): The ID of the opening hours entry.
    - `day` (string): The day of the week.
    - `openTime` (number): The opening time in minutes.
    - `closeTime` (number): The closing time in minutes.
    - `placeId` (number): The ID of the associated place.
  - `categories` (array): An array of category names associated with the place.
- `totalPages` (number): The total number of pages available.
- `currentPage` (number): The current page number.

**Example Request:**

```
GET /get-popular-place
```

**Example Response:**

```json
{
  "status": "success",
  "places": [
    {
      "id": 2,
      "place_name": "Transmart Carrefour",
      "description": "Transmart Desc",
      "activity": "Indoor",
      "min_price": 0,
      "max_price": 10000000,
      "rating": 4,
      "latitude": -1.25746,
      "longitude": 116.86833,
      "cityId": 1,
      // More of place
      "openingHours": [
        {
          "id": 8,
          "day": "Monday",
          "openTime": 1000,
          "closeTime": 2000,
          "placeId": 2
        },
        // More of opening hours
      ],
      "city": {
        "id": 1,
        "name": "Balikpapan"
      },
      "categories": [
        "Shopping Center"
      ]
    }
  ]
}

```

## GET /place/get-by-activity?activity={string}

Retrieves places by activity.

**Parameters:**

- `activity` (required): The activity of the place. (Indoor/Outdoor)

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `places` (array): An array of places containing the following information:
  - `id` (number): The ID of the place.
  - `place_name` (string): The name of the place.
  - `description` (string): The description of the place.
  - `activity` (string): The activity of the place.
  - `min_price` (number): The minimum price of the place.
  - `max_price` (number): The maximum price of the place.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `city` (object): The city information containing the following:
    - `id` (number): The ID of the city.
    - `name` (string): The name of the city.
  - `photos` (array): An array of place photos containing the following information:
    - `id` (number): The ID of the photo.
    - `placeId` (number): The ID of the associated place.
    - `width` (string): The width of the photo.
    - `height` (string): The height of the photo.
    - `url` (string): The URL of the photo.
  - `openingHours` (array): An array of opening hours for the place containing the following information:
    - `id` (number): The ID of the opening hours entry.
    - `day` (string): The day of the week.
    - `openTime` (number): The opening time in minutes.
    - `closeTime` (number): The closing time in minutes.
    - `placeId` (number): The ID of the associated place.
  - `categories` (array): An array of category names associated with the place.
- `totalPages` (number): The total number of pages available.
- `currentPage` (number): The current page number.

**Example Request:**

```
GET /place/get-by-activity?activity=Indoor
```

**Example Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 2,
      "place_name": "Transmart Carrefour",
      "description": "Transmart Desc",
      "activity": "Indoor",
      "min_price": 0,
      "max_price": 10000000,
      "rating": 4,
      "latitude": -1.25746,
      "longitude": 116.86833,
      "cityId": 1,
      // More of place
      "openingHours": [
        {
          "id": 8,
          "day": "Monday",
          "openTime": 1000,
          "closeTime": 2000,
          "placeId": 2
        },
        // More of opening hours
      ],
      "city": {
        "id": 1,
        "name": "Balikpapan"
      },
      "categories": [
        {
          "placeId": 2,
          "categoryId": 2,
          "category": {
            "id": 2,
            "name": "Shopping Center"
          }
        }
      ]
    }
  ]
}
```

## GET /city/:cityname

Retrieves information about a specific city.

**Parameters:**

- `city` (required): The name of the city.

**Response:**

The response will contain the following fields:

- `status` (string): The status of the response ("success" or "fail").
- `places` (array): An array of places containing the following information:
  - `id` (number): The ID of the place.
  - `place_name` (string): The name of the place.
  - `description` (string): The description of the place.
  - `activity` (string): The activity of the place.
  - `min_price` (number): The minimum price of the place.
  - `max_price` (number): The maximum price of the place.
  - `rating` (number): The rating of the place.
  - `latitude` (number): The latitude coordinate of the place.
  - `longitude` (number): The longitude coordinate of the place.
  - `city` (object): The city information containing the following:
    - `id` (number): The ID of the city.
    - `name` (string): The name of the city.
  - `photos` (array): An array of place photos containing the following information:
    - `id` (number): The ID of the photo.
    - `placeId` (number): The ID of the associated place.
    - `width` (string): The width of the photo.
    - `height` (string): The height of the photo.
    - `url` (string): The URL of the photo.
  - `openingHours` (array): An array of opening hours for the place containing the following information:
    - `id` (number): The ID of the opening hours entry.
    - `day` (string): The day of the week.
    - `openTime` (number): The opening time in minutes.
    - `closeTime` (number): The closing time in minutes.
    - `placeId` (number): The ID of the associated place.
  - `categories` (array): An array of category names associated with the place.
- `totalPages` (number): The total number of pages available.
- `currentPage` (number): The current page number.

**Example Request:**

```
GET /city/Balikpapan
```

**Example Response:**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Balikpapan",
    // More of city
    "places": [
      {
        "id": 1,
        "place_name": "Manggar Segarasari Beach",
        "description": "Manggar desc",
        "activity": "Outdoor",
        "min_price": 5000,
        "max_price": 30000,
        "rating": 3,
        "latitude": -1.212555,
        "longitude": 116.98106,
        "cityId": 1,
        "photos": [
          {
            "id": 1,
            "placeId": 1,
            "width": "150",
            "height": "150",
            "url": "https://media-cdn.tripadvisor.com/media/photo-l/09/93/04/4c/img-20151119-152608-largejpg.jpg"
          }
        ],
        "openingHours": [
          {
            "id": 1,
            "day": "Monday",
            "openTime": 800,
            "closeTime": 1600,
            "placeId": 1
          },
          // More of opening hours
        ],
        "city": {
          "id": 1,
          "name": "Balikpapan"
        },
        "categories": [
          {
            "placeId": 1,
            "categoryId": 1,
            "category": {
              "id": 1,
              "name": "Beach"
            }
          }
        ]
      }
    ]
  }
}
```
