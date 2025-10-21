export const categoryDropdownData = {
    // order of the menu items
    menuOrder: [
        'All categories',
        'Baby fashion',
        'Toys',
        'Footwear & Accessories',
        'Moms & Baby care',
        'Furniture & Bedding',
        'Rental Services',
        'Offers'
    ],

    // categories that require dropdown
    'All categories': {
        hasDropdown: true,
        type: 'mega',
        columns: [
            // Column 1: New Baby Clothing / Baby Boys / Baby Girls
            {
                title: "New Baby Clothing",
                links: [
                    { name: "New born onesies & rompers" },
                    { name: "New born nightwear & sleepsuits" },
                    { name: "New born baby sets & suits" },
                    { name: "New born baby dresses & frocks" },
                    { name: "New born baby leggings & shorts" },
                    { name: "New born baby t-shirts" },
                    { name: "New born caps, gloves & mittens" },
                    { name: "New born inner wear" },
                    { name: "New born baby jackets" },
                    { name: "New born baby sweaters" },
                ],
                subSections: [
                    {
                        title: "Baby boys clothing",
                        links: [
                            { name: "Baby boys t-shirts" },
                            { name: "Baby boys shirts" },
                            { name: "Baby boys jeans & trousers" },
                            { name: "Baby boys shorts" },
                            { name: "Baby boys innerwear & thermals" },
                            { name: "Baby boys socks" },
                            { name: "Baby boys sweat shirts & jackets" },
                            { name: "Baby boys sweaters" },
                            { name: "Baby boys swim wear" },
                            { name: "Baby boys sets & suits" },
                        ]
                    },
                    {
                        title: "Baby girls clothing",
                        links: [
                            { name: "Baby girls tops & t-shirts" },
                            { name: "Baby girls dresses & frocks" },
                            { name: "Baby girls jeans & trousers" },
                            { name: "Baby girls leggings" },
                            { name: "Baby girls shorts & skirts" },
                            { name: "Baby girls sets & suits" },
                            { name: "Baby girls socks" },
                            { name: "Baby girls swim wear" },
                            { name: "Baby girls sweat shirts & jackets" },
                            { name: "Baby girls sweaters" },
                        ]
                    }
                ]
            },

            // Column 2: Baby Footwear / Kids Footwear / Accessories / Baby Care
            {
                title: "Baby Footwear",
                links: [
                    { name: "Baby Booties" },
                ],
                subSections: [
                    {
                        title: "Kids Footwear",
                        links: [
                            { name: "Kids casual shoes" },
                            { name: "Kids sneakers & sports shoes" },
                            { name: "Kids bellies" },
                            { name: "Kids sandals" },
                            { name: "Kids flip flops" },
                        ]
                    },
                    {
                        title: "Fashion Accessories",
                        links: [
                            { name: "Kids bags" },
                            { name: "Kids hair accessories" },
                            { name: "Kids caps & gloves" },
                            { name: "Kids scarfs" },
                        ]
                    },
                    {
                        title: "Baby hair care",
                        links: [
                            { name: "Baby shampoo" },
                            { name: "Baby conditioner" },
                            { name: "Baby hair oil" },
                        ]
                    },
                    {
                        title: "Baby grooming",
                        links: [
                            { name: "Baby toothbrush & baby toothpaste" },
                            { name: "Baby brush & comb" },
                            { name: "Baby nail cutter & scissors" },
                            { name: "Cotton buds & pleats" },
                        ]
                    },
                    {
                        title: "Diaper and toilet training",
                        links: [
                            { name: "Diaper pins" },
                            { name: "Diaper & nappy accessories" },
                            { name: "Baby potty seat & chair" },
                        ]
                    },
                    {
                        title: "Bath accessories",
                        links: [
                            { name: "Baby bath tub" },
                            { name: "Baby bather & chair" },
                            { name: "Baby bath sponge & bath caps" },
                            { name: "Bath stands & box" },
                            { name: "Baby quick dry sheet & changing mats" },
                        ]
                    },
                ]
            },

            // Column 3: Breast Feeding / Maternity Pillows / Maternity Clothing / Diaper Bags / Bedding
            {
                title: "Breast Feeding",
                links: [
                    { name: "Electric breast pump" },
                    { name: "Manual breast pump" },
                    { name: "Feeding shawls" },
                    { name: "Breast pads & nipple shields" },
                ],
                subSections: [
                    {
                        title: "Maternity Pillows",
                        links: [
                            { name: "Feeding Pillows" },
                            { name: "Pregnancy Pillows" },
                        ]
                    },
                    {
                        title: "Maternity clothing",
                        links: [
                            { name: "Maternity lingerie" },
                            { name: "Maternity bottom wear" },
                            { name: "Maternity sleep wear" },
                            { name: "Maternity tops" },
                            { name: "Maternity dresses" },
                        ]
                    },
                    {
                        title: "Maternity care",
                        links: [
                            { name: "Stretch mark cream" },
                            { name: "Maternity pads" },
                            { name: "Disposable maternity panties" },
                            { name: "Maternity bed mats" },
                        ]
                    },
                    {
                        title: "Diaper bags",
                        links: [
                            { name: "Diaper bags" },
                        ]
                    },
                    {
                        title: "Blankets, quilts & wraps",
                        links: [
                            { name: "Baby blankets" },
                            { name: "Swaddles" },
                            { name: "Baby quilts & comforters" },
                            { name: "Sleeping bags" },
                        ]
                    }
                ]
            },

            // Column 4: Baby Feeding & Nursery Essentials / Baby Bedding / Furniture / Baby Skincare & Health
            {
                title: "Baby feeding & Nursery essentials",
                links: [
                    { name: "Bibs & burp cloths" },
                    { name: "Feeding bottles" },
                    { name: "Muslins" },
                    { name: "Soothers & pacifiers" },
                    { name: "Teethers & nibblers" },
                    { name: "Baby food storage & milk storages" },
                    { name: "Baby sippers & cups" },
                    { name: "Weaning plates & bowls" },
                    { name: "Kids water bottles & lunch box" },
                    { name: "Bottle warmer & sterilizer" },
                ],
                subSections: [
                    {
                        title: "Baby Bedding",
                        links: [
                            { name: "Baby bedding sets" },
                            { name: "Baby cot sheets & crib sheets" },
                            { name: "Baby mattress" },
                            { name: "Baby mosquito nets" },
                            { name: "Baby pillows" },
                        ]
                    },
                    {
                        title: "Baby furniture & storage",
                        links: [
                            { name: "Baby cots & cribs" },
                            { name: "Travel baby bed" },
                            { name: "Baby storage cabinets" },
                        ]
                    },
                    { // Baby skincare moved here
                        title: "Baby skincare",
                        links: [
                            { name: "Baby body oil & baby massage Oil" },
                            { name: "Baby body wash" },
                            { name: "Baby cream & baby lotion" },
                            { name: "Baby diaper rash cream" },
                            { name: "Baby powder" },
                            { name: "Baby wipes & tissues" },
                        ]
                    },
                    { // Health & Safety moved here
                        title: "Health & Safety",
                        links: [
                            { name: "Baby care equipments" },
                            { name: "Detergent & cleansers" },
                            { name: "Humidifiers & air purifiers" },
                            { name: "Mosquito repellents" },
                            { name: "Sanitisers & hand cleansing gels" },
                            { name: "Thermometer" },
                        ]
                    }
                ]
            }
        ],
    },

    // Baby fashion (3 columns, centered, reduced width)
    'Baby fashion': {
        mainUrl: '/baby-fashion-link',
        hasDropdown: true,
        type: 'mega',
        columns: [
            // Column 1: New Baby Clothing
            {
                title: "New Baby Clothing",
                links: [
                    { name: "New born onesies & rompers" },
                    { name: "New born nightwear & sleepsuits" },
                    { name: "New born baby sets & suits" },
                    { name: "New born baby dresses & frocks" },
                    { name: "New born baby leggings & shorts" },
                    { name: "New born baby t-shirts" },
                    { name: "New born caps, gloves & mittens" },
                    { name: "New born inner wear" },
                    { name: "New born baby jackets" },
                    { name: "New born baby sweaters" },
                ],
            },
            // Column 2: Baby boys clothing
            {
                title: "Baby boys clothing",
                links: [
                    { name: "Baby boys t-shirts" },
                    { name: "Baby boys shirts" },
                    { name: "Baby boys jeans & trousers" },
                    { name: "Baby boys shorts" },
                    { name: "Baby boys innerwear & thermals" },
                    { name: "Baby boys socks" },
                    { name: "Baby boys sweat shirts & jackets" },
                    { name: "Baby boys sweaters" },
                    { name: "Baby boys swim wear" },
                    { name: "Baby boys sets & suits" },
                ]
            },
            // Column 3: Baby girls clothing
            {
                title: "Baby girls clothing",
                links: [
                    { name: "Baby girls tops & t-shirts" },
                    { name: "Baby girls dresses & frocks" },
                    { name: "Baby girls jeans & trousers" },
                    { name: "Baby girls leggings" },
                    { name: "Baby girls shorts & skirts" },
                    { name: "Baby girls sets & suits" },
                    { name: "Baby girls socks" },
                    { name: "Baby girls swim wear" },
                    { name: "Baby girls sweat shirts & jackets" },
                    { name: "Baby girls sweaters" },
                ]
            },
        ]
    },

    // Footwear & Accessories (3 columns, centered, reduced width - similar to baby fashion)
    'Footwear & Accessories': {
        mainUrl: '/footwear-accessories-link',
        hasDropdown: true,
        type: 'mega',
        columns: [
            // Column 1: Baby Footwear
            {
                title: "Baby Footwear",
                links: [
                    { name: "Baby Booties" },
                ],
            },
            // Column 2: Kids Footwear
            {
                title: "Kids Footwear",
                links: [
                    { name: "Kids casual shoes" },
                    { name: "Kids sneakers & sports shoes" },
                    { name: "Kids bellies" },
                    { name: "Kids sandals" },
                    { name: "Kids flip flops" },
                ]
            },
            // Column 3: Fashion Accessories
            {
                title: "Fashion Accessories",
                links: [
                    { name: "Kids bags" },
                    { name: "Kids hair accessories" },
                    { name: "Kids caps & gloves" },
                    { name: "Kids scarfs" },
                ]
            },
        ]
    },

    // Moms & Baby care (4 columns, full width - similar to all categories)
    'Moms & Baby care': {
        mainUrl: '/moms-baby-care',
        hasDropdown: true,
        type: 'mega',
        columns: [
            // Column 1: Breast Feeding / Maternity Pillows / Diaper Bags
            {
                title: "Breast Feeding",
                links: [
                    { name: "Electric breast pump" },
                    { name: "Manual breast pump" },
                    { name: "Feeding shawls" },
                    { name: "Breast pads & nipple shields" },
                ],
                subSections: [
                    {
                        title: "Maternity Pillows",
                        links: [
                            { name: "Feeding Pillows" },
                            { name: "Pregnancy Pillows" },
                        ]
                    },
                    {
                        title: "Diaper bags",
                        links: [
                            { name: "Diaper bags" },
                        ]
                    }
                ]
            },

            // Column 2: Maternity Clothing / Maternity Care
            {
                title: "Maternity clothing",
                links: [
                    { name: "Maternity lingerie" },
                    { name: "Maternity bottom wear" },
                    { name: "Maternity sleep wear" },
                    { name: "Maternity tops" },
                    { name: "Maternity dresses" },
                ],
                subSections: [
                    {
                        title: "Maternity care",
                        links: [
                            { name: "Stretch mark cream" },
                            { name: "Maternity pads" },
                            { name: "Disposable maternity panties" },
                            { name: "Maternity bed mats" },
                        ]
                    }
                ]
            },

            // Column 3: Baby hair care / Baby grooming / Diaper and toilet training / Bath accessories
            {
                title: "Baby hair care",
                links: [
                    { name: "Baby shampoo" },
                    { name: "Baby conditioner" },
                    { name: "Baby hair oil" },
                ],
                subSections: [
                    {
                        title: "Baby grooming",
                        links: [
                            { name: "Baby toothbrush & baby toothpaste" },
                            { name: "Baby brush & comb" },
                            { name: "Baby nail cutter & scissors" },
                            { name: "Cotton buds & pleats" },
                        ]
                    },
                    {
                        title: "Diaper and toilet training",
                        links: [
                            { name: "Diaper pins" },
                            { name: "Diaper & nappy accessories" },
                            { name: "Baby potty seat & chair" },
                        ]
                    },
                    {
                        title: "Bath accessories",
                        links: [
                            { name: "Baby bath tub" },
                            { name: "Baby bather & chair" },
                            { name: "Baby bath sponge & bath caps" },
                            { name: "Bath stands & box" },
                            { name: "Baby quick dry sheet & changing mats" },
                        ]
                    }
                ]
            },

            // Column 4: Baby Skincare / Health & Safety
            {
                title: "Baby skincare",
                links: [
                    { name: "Baby body oil & baby massage Oil" },
                    { name: "Baby body wash" },
                    { name: "Baby cream & baby lotion" },
                    { name: "Baby diaper rash cream" },
                    { name: "Baby powder" },
                    { name: "Baby wipes & tissues" },
                ],
                subSections: [
                    {
                        title: "Health & Safety",
                        links: [
                            { name: "Baby care equipments" },
                            { name: "Detergent & cleansers" },
                            { name: "Humidifiers & air purifiers" },
                            { name: "Mosquito repellents" },
                            { name: "Sanitisers & hand cleansing gels" },
                            { name: "Thermometer" },
                        ]
                    }
                ]
            }
        ]
    },

    // Furniture & Bedding (3 columns, centered, reduced width - similar to baby fashion)
    'Furniture & Bedding': {
        mainUrl: '/furniture-bedding',
        hasDropdown: true,
        type: 'mega',
        columns: [
            // Column 1: Baby Bedding
            {
                title: "Baby Bedding",
                links: [
                    { name: "Baby bedding sets" },
                    { name: "Baby cot sheets & crib sheets" },
                    { name: "Baby mattress" },
                    { name: "Baby mosquito nets" },
                    { name: "Baby pillows" },
                ]
            },
            // Column 2: Baby Furniture
            {
                title: "Baby furniture & storage",
                links: [
                    { name: "Baby cots & cribs" },
                    { name: "Travel baby bed" },
                    { name: "Baby storage cabinets" },
                ]
            },
            // Column 3: Blankets, quilts & wraps
            {
                title: "Blankets, quilts & wraps",
                links: [
                    { name: "Baby blankets" },
                    { name: "Swaddles" },
                    { name: "Baby quilts & comforters" },
                    { name: "Sleeping bags" },
                ]
            },
        ]
    },

    // simple links without dropdown
    'Toys': {
        mainUrl: '/toys-link',
        hasDropdown: false,
    },
    'Rental Services': {
        mainUrl: '/rental-services-link',
        hasDropdown: false,
    },
    'Offers': {
        hasDropdown: false,
    },
};
