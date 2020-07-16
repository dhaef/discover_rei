export default function rootReducer(state, { type, payload }) {
    switch (type) {
        case 'setMetros':
            return {
                ...state,
                metros: payload,
                loading: false
            }
        case 'setPlaces':
            return {
                ...state,
                metros: payload.metros,
                counties: payload.counties,
                loading: false
            }
        case 'setCurrentMetro':
            return {
                ...state,
                currentCounties: payload.currentCounties,
                currentMetro: {
                    ...payload.score[0],
                    pie: {
                        income: payload.pie.find(item => item.description === 'Per capita personal income (dollars) 4/'),
                        employment: payload.pie.find(item => item.description === 'Total employment')
                    },
                    pop: payload.pop[0],
                    temperature: payload.temp[0],
                    grp_total: payload.grp.find(metro => metro.description === 'All industry total'),
                    // unemployment: {
                    //     unemp_2010: payload.unemp.filter(item => item.year === 2010),
                    //     unemp_2011: payload.unemp.filter(item => item.year === 2011),
                    //     unemp_2012: payload.unemp.filter(item => item.year === 2012),
                    //     unemp_2013: payload.unemp.filter(item => item.year === 2013),
                    //     unemp_2014: payload.unemp.filter(item => item.year === 2014),
                    //     unemp_2015: payload.unemp.filter(item => item.year === 2015),
                    //     unemp_2016: payload.unemp.filter(item => item.year === 2016),
                    //     unemp_2017: payload.unemp.filter(item => item.year === 2017),
                    //     unemp_2018: payload.unemp.filter(item => item.year === 2018),
                    //     unemp_2019: payload.unemp.filter(item => item.year === 2019),
                    //     unemp_2020: payload.unemp.filter(item => item.year === 2020),
                    // },
                    unemployment: payload.unemp.filter(item => {
                        if (item.month === 12) {
                            return item;
                        } else if (item.year === 2020 && item.month === 5) {
                            return item;
                        }
                    }),
                    grp: payload.grp.filter(metro => {
                        if (metro.description === 'All industry total'
                            || metro.description === 'Private industries'
                            || metro.description === 'Durable goods manufacturing'
                            || metro.description === 'Nondurable goods manufacturing'
                            || metro.description === 'Finance and insurance'
                            || metro.description === 'Real estate and rental and leasing'
                            || metro.description === 'Professional, scientific, and technical services'
                            || metro.description === 'Management of companies and enterprises'
                            || metro.description === 'Administrative and support and waste management and remediation services'
                            || metro.description === 'Educational services'
                            || metro.description === 'Health care and social assistance'
                            || metro.description === 'Arts, entertainment, and recreation'
                            || metro.description === 'Accommodation and food services'
                            || metro.description === 'Private goods-producing industries 2/'
                            || metro.description === 'Private services-providing industries 3/'
                            || metro.description === 'Natural resources and mining'
                            || metro.description === 'Trade'
                            || metro.description === 'Transportation and utilities'
                            || metro.description === 'Manufacturing and information') {
                            return null;
                        } else {
                            return metro;
                        }
                    }),
                },
                loading: false
            }
        case 'setBanner':
            return {
                ...state,
                banner: payload
            }
        case 'setCurrentCounty':
            return {
                ...state,
                currentCounty: payload,
                loading: true
            }
        case 'setCountyData':
            return {
                ...state,
                loading: false,
                countyMetro: payload.countyMetro[0],
                currentCounty: {
                    ...payload.score[0],
                    pop: payload.pop[0],
                    income: payload.income[0],
                    unemployment: payload.unemp,
                    grp: payload.grp.filter(county => {
                        if (county.description === 'All industry total'
                            || county.description === 'Private industries'
                            || county.description === 'Durable goods manufacturing'
                            || county.description === 'Nondurable goods manufacturing'
                            || county.description === 'Finance and insurance'
                            || county.description === 'Real estate and rental and leasing'
                            || county.description === 'Professional, scientific, and technical services'
                            || county.description === 'Management of companies and enterprises'
                            || county.description === 'Administrative and support and waste management and remediation services'
                            || county.description === 'Educational services'
                            || county.description === 'Health care and social assistance'
                            || county.description === 'Arts, entertainment, and recreation'
                            || county.description === 'Accommodation and food services'
                            || county.description === 'Private goods-producing industries 2/'
                            || county.description === 'Private services-providing industries 3/'
                            || county.description === 'Natural resources and mining'
                            || county.description === 'Trade'
                            || county.description === 'Transportation and utilities'
                            || county.description === 'Manufacturing and information') {
                            return null;
                        } else {
                            return county;
                        }
                    }),
                    grp_total: payload.grp.find(county => county.description === 'All industry total'),
                    employment: payload.employment[0],
                    temperature: payload.temperature[0],
                    severe_weather_total: payload.severe_weather[0]
                }
            }
        case 'setScore':
            return {
                ...state,
                [`${payload.type}_score`]: payload.data,
                loading: false
            }
        case 'setFilter':
            const name = payload.split('-')[0];
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: state.filters[name].length > 0 ? state.filters[name].includes(payload) ? [...state.filters[name]] : [...state.filters[name], payload] : [payload]
                }
            }
        case 'removeFilter':
            const removeName = payload.split('-')[0];
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [removeName]: state.filters[removeName].filter(item => item !== payload)
                }
            }
        case 'removeWeatherFilter':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    weather_dmg: []
                }
            }
        case 'clearFilters':
            return {
                ...state,
                filters: {
                    population: [],
                    population_growth: [],
                    gdp_growth: [],
                    gdp_diversity: [],
                    job_growth: [],
                    weather_dmg: [],
                }
            }
        case "setLoading":
            return {
                ...state,
                loading: true
            }
        case 'showAddToEmailList':
            return {
                ...state,
                addToEmailList: true
            }
        case 'hideAddToEmailList':
            return {
                ...state,
                addToEmailList: false
            }
        case 'closeAlert':
            return {
                ...state,
                alert: {
                    show: false,
                    text: ''
                }
            }
        case 'setAlert':
            return {
                ...state,
                alert: {
                    show: true,
                    text: payload
                }
            }
        default:
            return {
                ...state
            }
    }
}