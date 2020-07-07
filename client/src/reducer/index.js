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
                    grp_total: payload.grp.find(metro => metro.description === 'All industry total'),
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
            let total2015 = 0;
            let total2016 = 0;
            let total2017 = 0;
            let total2018 = 0;
            let total2019 = 0;
            let total2020 = 0;
            let amount;
            payload.severe_weather.forEach(event => {
                if (!event.damage_property) {
                    return null;
                } else if (event.damage_property.endsWith('K')) {
                    amount = +event.damage_property.slice(0, -1) * 1000;
                } else if (event.damage_property.endsWith('M')) {
                    amount = +event.damage_property.slice(0, -1) * 1000000;
                }

                if (event.begin_yearmonth.toString().startsWith('2020')) {
                    total2020 += amount;
                } else if (event.begin_yearmonth.toString().startsWith('2019')) {
                    total2019 += amount;
                } else if (event.begin_yearmonth.toString().startsWith('2018')) {
                    total2018 += amount;
                } else if (event.begin_yearmonth.toString().startsWith('2017')) {
                    total2017 += amount;
                } else if (event.begin_yearmonth.toString().startsWith('2016')) {
                    total2016 += amount;
                } else if (event.begin_yearmonth.toString().startsWith('2015')) {
                    total2015 += amount;
                }
            });
            return {
                ...state,
                loading: false,
                countyMetro: payload.countyMetro[0],
                currentCounty: {
                    // ...state.currentCounty,
                    ...payload.score[0],
                    pop: payload.pop[0],
                    income: payload.income[0],
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
                    severe_weather: payload.severe_weather,
                    severe_weather_total: {
                        pd_2020: total2020,
                        pd_2019: total2019,
                        pd_2018: total2018,
                        pd_2017: total2017,
                        pd_2016: total2016,
                        pd_2015: total2015,
                    }
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
        default:
            return {
                ...state
            }
    }
}