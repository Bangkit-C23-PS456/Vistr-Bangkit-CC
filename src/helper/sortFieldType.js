const sortFieldType = async (sortField, search, rating, city) => {
    if (sortField === "city") {
        const countData = {
            rating: rating ? parseInt(rating) : undefined,
            city: {
                name: {
                    contains: search || "",
                },
            },
        };
        const data = {
            rating: rating ? parseInt(rating) : undefined,

            city: {
                name: {
                    contains: search || "",
                },
            },
        };
        return { data, countData };
    }

    if (sortField === "category") {
        const countData = {
            rating: rating ? parseInt(rating) : undefined,
            city: {
                name: {
                    contains: city || "",
                },
            },
            categories: {
                some: {
                    category: {
                        name: {
                            contains: search || "",
                        },
                    },
                },
            },
        };
        const data = {
            rating: rating ? parseInt(rating) : undefined,
            city: {
                name: {
                    contains: city || "",
                },
            },
            categories: {
                some: {
                    category: {
                        name: {
                            contains: search || "",
                        },
                    },
                },
            },
        };
        return { data, countData };
    }
};

module.exports = sortFieldType;
