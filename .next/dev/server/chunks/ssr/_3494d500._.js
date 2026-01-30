module.exports = [
"[project]/src/services/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiService",
    ()=>apiService
]);
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8000/api") || "http://localhost:8000/api";
const USE_MOCK_DATA = ("TURBOPACK compile-time value", "true") === "true";
const apiService = {
    // Get complete homepage data with improved error handling
    async getHomepageData () {
        // If mock data is enabled, return mock data immediately
        if ("TURBOPACK compile-time truthy", 1) {
            console.log("Using mock data (NEXT_PUBLIC_USE_MOCK_DATA=true)");
            return await this.getMockHomepageData();
        }
        //TURBOPACK unreachable
        ;
    },
    // Mock homepage data for development
    async getMockHomepageData () {
        // Simulate network delay
        await new Promise((resolve)=>setTimeout(resolve, 300));
        return {
            hero_banner: {
                message: "Make this your best Valentine's Day yet",
                image: null,
                search_placeholder: "Search for anything"
            },
            featured_interests: [
                {
                    id: 1,
                    title: "Linen Spotlight",
                    slug: "linen-spotlight",
                    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop",
                    products_count: 156,
                    icon: undefined
                },
                {
                    id: 2,
                    title: "Tactile Glass",
                    slug: "tactile-glass",
                    image: "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=500&fit=crop",
                    products_count: 89,
                    icon: undefined
                },
                {
                    id: 3,
                    title: "Handcrafted Home",
                    slug: "handcrafted-home",
                    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
                    products_count: 234,
                    icon: undefined
                },
                {
                    id: 4,
                    title: "Macrame Essentials",
                    slug: "macrame-essentials",
                    image: "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=500&fit=crop",
                    products_count: 112,
                    icon: undefined
                }
            ],
            discover_section: [
                {
                    id: 1,
                    title: "Valentine's Day Cards",
                    slug: "valentines-cards",
                    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
                    products_count: 245,
                    icon: undefined
                },
                {
                    id: 2,
                    title: "Top 100 Aquarius Gifts",
                    slug: "aquarius-gifts",
                    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
                    products_count: 100,
                    icon: undefined
                },
                {
                    id: 3,
                    title: "New Arrivals",
                    slug: "new-arrivals",
                    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
                    products_count: 567,
                    icon: undefined
                },
                {
                    id: 4,
                    title: "Best of Game Day",
                    slug: "game-day",
                    image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop",
                    products_count: 189,
                    icon: undefined
                },
                {
                    id: 5,
                    title: "Best of Valentine's Day",
                    slug: "valentines-best",
                    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
                    products_count: 342,
                    icon: undefined
                }
            ],
            birthday_gifts: {
                categories: [
                    {
                        id: 1,
                        title: "Aquarius Gifts",
                        slug: "aquarius-birthday-gifts",
                        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop",
                        products_count: 150,
                        icon: undefined
                    }
                ],
                products: [
                    {
                        id: 1,
                        title: "Sweets Charcuterie Boxes",
                        slug: "sweets-charcuterie-boxes",
                        price: 69.99,
                        discount_price: 49.98,
                        discount_percentage: 29,
                        final_price: 49.98,
                        main: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
                        rating: 4.8,
                        review_count: 156,
                        is_featured: true,
                        is_bestseller: true,
                        is_deal: true,
                        is_new_arrival: false,
                        condition: "new",
                        short_description: "Handcrafted sweet charcuterie boxes perfect for birthdays",
                        color: "Mixed"
                    },
                    {
                        id: 2,
                        title: "Cake Pops",
                        slug: "cake-pops",
                        price: 28.0,
                        discount_price: undefined,
                        discount_percentage: 0,
                        final_price: 28.0,
                        main: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
                        rating: 4.9,
                        review_count: 234,
                        is_featured: true,
                        is_bestseller: false,
                        is_deal: false,
                        is_new_arrival: true,
                        condition: "new",
                        short_description: "Delicious handmade cake pops for birthday celebrations",
                        color: "Assorted"
                    },
                    {
                        id: 3,
                        title: "Custom Birthday Crowns",
                        slug: "custom-birthday-crowns",
                        price: 65.0,
                        discount_price: 32.5,
                        discount_percentage: 50,
                        final_price: 32.5,
                        main: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
                        rating: 4.7,
                        review_count: 89,
                        is_featured: true,
                        is_bestseller: false,
                        is_deal: true,
                        is_new_arrival: false,
                        condition: "new",
                        short_description: "Personalized birthday crowns for the special day",
                        color: "Gold"
                    }
                ]
            },
            gift_categories: [],
            categories: [],
            todays_deals: [],
            editors_picks_vintage: [],
            top100_gifts: [],
            homepage_sections: [],
            featured_products: [],
            bestseller_products: [],
            new_arrival_products: []
        };
    },
    // Get specific component data
    async getComponentData (component) {
        try {
            const response = await fetch(`${API_BASE_URL}/homepage/component/?component=${component}`);
            if (!response.ok) {
                console.error(`Failed to fetch ${component} data:`, response.status);
                return null;
            }
            return response.json();
        } catch  {
            console.error(`Network error fetching ${component} data`);
            return null;
        }
    },
    // Get products for homepage section
    async getSectionProducts (sectionType) {
        try {
            const response = await fetch(`${API_BASE_URL}/homepage/section/${sectionType}/`);
            if (!response.ok) {
                console.error(`Failed to fetch ${sectionType} data:`, response.status);
                return {
                    section: {},
                    products: []
                };
            }
            return response.json();
        } catch  {
            console.error(`Network error fetching ${sectionType} data`);
            return {
                section: {},
                products: []
            };
        }
    },
    // Navigation
    async getNavigation () {
        try {
            const response = await fetch(`${API_BASE_URL}/navigation/`);
            if (!response.ok) {
                console.error("Failed to fetch navigation:", response.status);
                return null;
            }
            return response.json();
        } catch  {
            console.error("Network error fetching navigation");
            return null;
        }
    },
    // Categories
    async getCategories (params) {
        try {
            const query = params ? new URLSearchParams(params).toString() : "";
            const response = await fetch(`${API_BASE_URL}/categories/${query ? `?${query}` : ""}`);
            if (!response.ok) {
                console.error("Failed to fetch categories:", response.status);
                return [];
            }
            return response.json();
        } catch  {
            console.error("Network error fetching categories");
            return [];
        }
    },
    // Category detail with products
    async getCategoryProducts (slug, params) {
        try {
            const query = params ? new URLSearchParams(params).toString() : "";
            const response = await fetch(`${API_BASE_URL}/category/${slug}/products/${query ? `?${query}` : ""}`);
            if (!response.ok) {
                console.error(`Failed to fetch category ${slug}:`, response.status);
                return {
                    category: null,
                    products: []
                };
            }
            return response.json();
        } catch  {
            console.error(`Network error fetching category ${slug}`);
            return {
                category: null,
                products: []
            };
        }
    },
    // Products
    async getProducts (params) {
        try {
            const query = params ? new URLSearchParams(params).toString() : "";
            const response = await fetch(`${API_BASE_URL}/products/${query ? `?${query}` : ""}`);
            if (!response.ok) {
                console.error("Failed to fetch products:", response.status);
                return {
                    count: 0,
                    next: null,
                    previous: null,
                    results: []
                };
            }
            return response.json();
        } catch  {
            console.error("Network error fetching products");
            return {
                count: 0,
                next: null,
                previous: null,
                results: []
            };
        }
    },
    // Product detail
    async getProduct (slug) {
        try {
            const response = await fetch(`${API_BASE_URL}/product/${slug}/`);
            if (!response.ok) {
                console.error(`Failed to fetch product ${slug}:`, response.status);
                return null;
            }
            return response.json();
        } catch  {
            console.error(`Network error fetching product ${slug}`);
            return null;
        }
    },
    // Top 100 gifts
    async getTop100Gifts (random = true, count = 20) {
        try {
            const response = await fetch(`${API_BASE_URL}/top-100-gifts/?random=${random}&count=${count}`);
            if (!response.ok) {
                console.error("Failed to fetch top 100 gifts:", response.status);
                return {
                    title: "Top 100 Gifts",
                    products: []
                };
            }
            return response.json();
        } catch  {
            console.error("Network error fetching top 100 gifts");
            return {
                title: "Top 100 Gifts",
                products: []
            };
        }
    },
    // Cart operations - simplified for now
    async addToCart (slug, quantity = 1, sizeId) {
        return {
            message: "Cart functionality not implemented yet"
        };
    },
    async getCart () {
        return {
            items: [],
            total: 0,
            message: "Cart functionality not implemented yet"
        };
    },
    async updateCartItem (itemId, action) {
        return {
            message: "Cart functionality not implemented yet"
        };
    },
    // Wishlist
    async getWishlist () {
        return {
            products: [],
            message: "Wishlist functionality not implemented yet"
        };
    },
    async addToWishlist (productId) {
        return {
            message: "Wishlist functionality not implemented yet"
        };
    },
    async removeFromWishlist (productId) {
        return {
            message: "Wishlist functionality not implemented yet"
        };
    },
    async getGiftsPageData () {
        try {
            const response = await fetch(`${API_BASE_URL}/gifts-page/`, {
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                console.error("Failed to fetch gifts page data:", response.status);
                return this.getMockGiftsPageData();
            }
            return response.json();
        } catch  {
            console.error("Network error fetching gifts page data");
            return this.getMockGiftsPageData();
        }
    },
    async getMockGiftsPageData () {
        await new Promise((resolve)=>setTimeout(resolve, 300));
        return {
            page_title: "Etsy's Best Gift Guides",
            page_description: "Discover curated picks for every person and moment, straight from extraordinary small shops.",
            best_gift_guides: [
                {
                    id: 1,
                    title: "Etsy's Best Gift Guides",
                    section_type: "best_gift_guides",
                    description: "Discover curated picks for every person and moment, straight from extraordinary small shops.",
                    image: null,
                    background_image: null,
                    guide_links: [
                        {
                            title: "Best of Valentine's Day",
                            url: "/gifts/valentines-day"
                        },
                        {
                            title: "Top 100 Galentine's Picks",
                            url: "/gifts/galentines"
                        },
                        {
                            title: "Birthday Gifts",
                            url: "/gifts/birthday"
                        },
                        {
                            title: "Top 100 Aquarius Gifts",
                            url: "/gifts/aquarius"
                        },
                        {
                            title: "Milestone Birthdays",
                            url: "/gifts/milestone"
                        },
                        {
                            title: "Anniversary Gifts",
                            url: "/gifts/anniversary"
                        },
                        {
                            title: "Engagement Gifts",
                            url: "/gifts/engagement"
                        },
                        {
                            title: "Personalised Gifts",
                            url: "/gifts/personalized"
                        },
                        {
                            title: "Gifts for Him",
                            url: "/gifts/him"
                        },
                        {
                            title: "Gifts for Her",
                            url: "/gifts/her"
                        },
                        {
                            title: "Gifts for Kids",
                            url: "/gifts/kids"
                        },
                        {
                            title: "Gifts for Pets",
                            url: "/gifts/pets"
                        }
                    ],
                    featured_products: [],
                    gift_products: []
                }
            ],
            valentines_gifts: [
                {
                    id: 2,
                    title: "Valentine's Day Gifts",
                    section_type: "valentines_gifts",
                    description: "Find the perfect Valentine's Day gift",
                    image: null,
                    background_image: null,
                    featured_products: [],
                    gift_products: [
                        {
                            id: 1,
                            etsy_pick: true,
                            custom_title: "Boys Personalized Valentine's Day Buckle",
                            custom_description: null,
                            shop_name: "SewSweetDesignsForU",
                            badge_text: null,
                            product: {
                                id: 101,
                                title: "Boys Personalized Valentine's Day Buckle",
                                slug: "boys-personalized-valentines-buckle",
                                price: 38.0,
                                discount_price: undefined,
                                discount_percentage: 0,
                                final_price: 38.0,
                                main: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
                                rating: 4.9,
                                review_count: 2100,
                                is_featured: true,
                                is_bestseller: true,
                                is_deal: false,
                                is_new_arrival: false,
                                condition: "new",
                                short_description: "Personalized Valentine's Day gift for boys",
                                color: "Red"
                            }
                        }
                    ]
                }
            ],
            bestselling_gifts: [
                {
                    id: 3,
                    title: "Best-selling gifts they'll love",
                    section_type: "bestselling_gifts",
                    description: "Top picks based on customer reviews and sales",
                    image: null,
                    background_image: null,
                    featured_products: [],
                    gift_products: [
                        {
                            id: 2,
                            etsy_pick: true,
                            custom_title: "Embroidery Sketch Portrait Hoodies",
                            custom_description: "Custom embroidery portrait hoodies",
                            shop_name: null,
                            badge_text: "Etsy's Pick",
                            product: {
                                id: 102,
                                title: "Embroidery Sketch Portrait Hoodies",
                                slug: "embroidery-sketch-portrait-hoodies",
                                price: 47.37,
                                discount_price: undefined,
                                discount_percentage: 0,
                                final_price: 47.37,
                                main: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
                                rating: 4.8,
                                review_count: 2300,
                                is_featured: true,
                                is_bestseller: true,
                                is_deal: false,
                                is_new_arrival: false,
                                condition: "handmade",
                                short_description: "Custom embroidery portrait on hoodies",
                                color: "Black"
                            }
                        }
                    ]
                }
            ],
            personalized_presents: [
                {
                    id: 4,
                    title: "Presents you can personalise",
                    section_type: "personalized_presents",
                    description: "Customizable gifts for that personal touch",
                    image: null,
                    background_image: null,
                    featured_products: [],
                    gift_products: [
                        {
                            id: 3,
                            etsy_pick: true,
                            custom_title: "Personalised Bunny, Handmade Bunny Plush",
                            custom_description: "Handmade personalized bunny plush toy",
                            shop_name: "TheBunnyHat",
                            badge_text: "25% off",
                            product: {
                                id: 103,
                                title: "Personalised Bunny Plush",
                                slug: "personalised-bunny-plush",
                                price: 25.83,
                                discount_price: 19.37,
                                discount_percentage: 25,
                                final_price: 19.37,
                                main: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
                                rating: 4.9,
                                review_count: 137,
                                is_featured: true,
                                is_bestseller: false,
                                is_deal: true,
                                is_new_arrival: false,
                                condition: "handmade",
                                short_description: "Handmade personalized bunny plush toy",
                                color: "White"
                            }
                        }
                    ]
                }
            ],
            gift_occasions: [],
            gift_interests: [],
            gift_popular: [],
            top_rated_products: []
        };
    },
    async getGiftGuideSection (sectionType) {
        try {
            const response = await fetch(`${API_BASE_URL}/gifts-section/${sectionType}/`);
            if (!response.ok) {
                console.error(`Failed to fetch ${sectionType} data:`, response.status);
                return {
                    section: {},
                    products: []
                };
            }
            return response.json();
        } catch  {
            console.error(`Network error fetching ${sectionType} data`);
            return {
                section: {},
                products: []
            };
        }
    },
    async getGiftCategoryProducts (categorySlug, params) {
        try {
            const query = params ? new URLSearchParams(params).toString() : "";
            const response = await fetch(`${API_BASE_URL}/gift-category/${categorySlug}/products/${query ? `?${query}` : ""}`);
            if (!response.ok) {
                console.error(`Failed to fetch gift category ${categorySlug}:`, response.status);
                return {
                    category: null,
                    products: []
                };
            }
            return response.json();
        } catch  {
            console.error(`Network error fetching gift category ${categorySlug}`);
            return {
                category: null,
                products: []
            };
        }
    }
};
}),
"[project]/src/components/gifts/BestGiftGuides.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const BestGiftGuides = ()=>{
    const [sectionData, setSectionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getGiftsPageData();
                const bestGuides = data.best_gift_guides[0];
                setSectionData(bestGuides);
            } catch (error) {
                console.error("Error fetching best gift guides:", error);
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "bg-[#232347] py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-white",
                    children: "Loading gift guides..."
                }, void 0, false, {
                    fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!sectionData) {
        return null;
    }
    // Use default guide links if API doesn't provide them
    const guideLinks = sectionData.guide_links || [
        {
            title: "Best of Valentine's Day",
            url: "/gifts/valentines-day"
        },
        {
            title: "Top 100 Galentine's Picks",
            url: "/gifts/galentines"
        },
        {
            title: "Birthday Gifts",
            url: "/gifts/birthday"
        },
        {
            title: "Top 100 Aquarius Gifts",
            url: "/gifts/aquarius"
        },
        {
            title: "Milestone Birthdays",
            url: "/gifts/milestone"
        },
        {
            title: "Anniversary Gifts",
            url: "/gifts/anniversary"
        },
        {
            title: "Engagement Gifts",
            url: "/gifts/engagement"
        },
        {
            title: "Personalised Gifts",
            url: "/gifts/personalized"
        },
        {
            title: "Gifts for Him",
            url: "/gifts/him"
        },
        {
            title: "Gifts for Her",
            url: "/gifts/her"
        },
        {
            title: "Gifts for Kids",
            url: "/gifts/kids"
        },
        {
            title: "Gifts for Pets",
            url: "/gifts/pets"
        }
    ];
    // Mock images for each guide (in a real app, these would come from the API)
    const guideImages = [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-[#232347] py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl md:text-4xl font-serif text-white text-center mb-3",
                    children: sectionData.title || "Etsy's Best Gift Guides"
                }, void 0, false, {
                    fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/90 text-center mb-10 text-lg",
                    children: sectionData.description || "Discover curated picks for every person and moment, straight from extraordinary small shops."
                }, void 0, false, {
                    fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 md:grid-cols-6 gap-6",
                    children: guideLinks.map((guide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: guide.url,
                            className: "group flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-3 ring-4 ring-transparent group-hover:ring-white/30 transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: guideImages[index % guideImages.length],
                                        alt: guide.title,
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white text-sm text-center font-medium group-hover:underline",
                                    children: [
                                        guide.title,
                                        " →"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/gifts/BestGiftGuides.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BestGiftGuides;
}),
"[project]/src/components/gifts/GiftProductCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const GiftProductCard = ({ product, isEtsyPick = true, shopName, badgeText, showFreeDelivery = false })=>{
    const formatReviewCount = (count)=>{
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: `/product/${product.slug}`,
                className: "block relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: product.main,
                        alt: product.title,
                        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isEtsyPick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm",
                        children: "Etsy's Pick"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform opacity-0 group-hover:opacity-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: "h-5 w-5 text-foreground"
                        }, void 0, false, {
                            fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium text-foreground truncate",
                        children: product.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: product.rating
                            }, void 0, false, {
                                fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                children: "★"
                            }, void 0, false, {
                                fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: [
                                    "(",
                                    formatReviewCount(product.review_count),
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            shopName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground truncate",
                                        children: shopName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-medium ${product.discount_price ? 'text-green-700' : 'text-foreground'}`,
                                children: [
                                    "USD ",
                                    product.final_price.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            product.discount_price && product.discount_percentage > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-muted-foreground line-through",
                                        children: [
                                            "USD ",
                                            product.price.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-muted-foreground",
                                        children: [
                                            "(",
                                            product.discount_percentage,
                                            "% off)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    showFreeDelivery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: "Free delivery"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: badgeText
                    }, void 0, false, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/product/${product.slug}`,
                        className: "inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline mt-1",
                        children: "More like this →"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/gifts/GiftProductCard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GiftProductCard;
}),
"[project]/src/components/gifts/GiftProductSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-ssr] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$GiftProductCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gifts/GiftProductCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const GiftProductSection = ({ sectionType, defaultTitle })=>{
    const [section, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getGiftsPageData();
                let sectionData;
                switch(sectionType){
                    case 'valentines_gifts':
                        sectionData = data.valentines_gifts[0];
                        break;
                    case 'bestselling_gifts':
                        sectionData = data.bestselling_gifts[0];
                        break;
                    case 'personalized_presents':
                        sectionData = data.personalized_presents[0];
                        break;
                }
                if (sectionData) {
                    setSection(sectionData);
                    // Use gift_products if available, otherwise use featured_products
                    if (sectionData.gift_products && sectionData.gift_products.length > 0) {
                        setProducts(sectionData.gift_products.map((gp)=>gp.product));
                    } else if (sectionData.featured_products && sectionData.featured_products.length > 0) {
                        setProducts(sectionData.featured_products);
                    } else {
                        // Fallback to API call for section-specific products
                        const sectionResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getGiftGuideSection(sectionType);
                        setProducts(sectionResponse.products);
                    }
                }
            } catch (error) {
                console.error(`Error fetching ${sectionType}:`, error);
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [
        sectionType
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "container mx-auto px-4 py-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    "Loading ",
                    defaultTitle,
                    "..."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const title = section?.title || defaultTitle;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "container mx-auto px-4 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl md:text-3xl font-serif text-center mb-8",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "inline-flex items-center gap-2 px-4 py-2.5 border border-foreground rounded-full text-sm font-medium hover:bg-secondary transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        "Filters"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-6",
                children: products.length > 0 ? products.map((product, index)=>{
                    const giftProduct = section?.gift_products?.[index];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$GiftProductCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        product: product,
                        isEtsyPick: giftProduct?.etsy_pick || true,
                        shopName: giftProduct?.shop_name ?? undefined,
                        badgeText: giftProduct?.badge_text ?? undefined,
                        showFreeDelivery: sectionType === 'valentines_gifts' && index === 3
                    }, product.id, false, {
                        fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                        lineNumber: 90,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full text-center py-8 text-muted-foreground",
                    children: [
                        "No products found for ",
                        title
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/gifts/GiftProductSection.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GiftProductSection;
}),
"[project]/src/app/gifts/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$BestGiftGuides$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gifts/BestGiftGuides.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$GiftProductSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gifts/GiftProductSection.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const Gifts = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$BestGiftGuides$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/gifts/page.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$GiftProductSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sectionType: "valentines_gifts",
                defaultTitle: "Valentine's Day gifts"
            }, void 0, false, {
                fileName: "[project]/src/app/gifts/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$GiftProductSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sectionType: "bestselling_gifts",
                defaultTitle: "Best-selling gifts they'll love"
            }, void 0, false, {
                fileName: "[project]/src/app/gifts/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gifts$2f$GiftProductSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sectionType: "personalized_presents",
                defaultTitle: "Presents you can personalise"
            }, void 0, false, {
                fileName: "[project]/src/app/gifts/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = Gifts;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SlidersHorizontal
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 5H3",
            key: "1qgfaw"
        }
    ],
    [
        "path",
        {
            d: "M12 19H3",
            key: "yhmn1j"
        }
    ],
    [
        "path",
        {
            d: "M14 3v4",
            key: "1sua03"
        }
    ],
    [
        "path",
        {
            d: "M16 17v4",
            key: "1q0r14"
        }
    ],
    [
        "path",
        {
            d: "M21 12h-9",
            key: "1o4lsq"
        }
    ],
    [
        "path",
        {
            d: "M21 19h-5",
            key: "1rlt1p"
        }
    ],
    [
        "path",
        {
            d: "M21 5h-7",
            key: "1oszz2"
        }
    ],
    [
        "path",
        {
            d: "M8 10v4",
            key: "tgpxqk"
        }
    ],
    [
        "path",
        {
            d: "M8 12H3",
            key: "a7s4jb"
        }
    ]
];
const SlidersHorizontal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("sliders-horizontal", __iconNode);
;
 //# sourceMappingURL=sliders-horizontal.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-ssr] (ecmascript) <export default as SlidersHorizontal>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SlidersHorizontal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_3494d500._.js.map