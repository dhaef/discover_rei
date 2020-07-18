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
            const unemp_arr = payload.unemp.filter(item => {
                if (item.month === 12) {
                    return item;
                } else if (item.year === 2020 && item.month === 5) {
                    return item;
                }
            });
            const grp_arr = payload.grp.filter(metro => {
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
            })
            return {
                ...state,
                currentCounties: payload.currentCounties,
                currentMetro: {
                    ...payload.score[0],
                    income: payload.income.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: payload.income[0].json_agg[0],
                            growth: payload.income[0].json_agg[0].map((item, index) => {
                                if (index === 0) { return null }
                                return (((item - payload.income[0].json_agg[0][index - 1]) / payload.income[0].json_agg[0][index - 1]) * 100).toFixed(3)
                            })
                        },
                    pop: {
                        total: payload.pop.length === 0
                            ? { total: [], growth: [] }
                            : payload.pop[0].json_agg[0],
                        growth: payload.pop[0].json_agg[0].map((item, index) => {
                            if (index === 0) { return null }
                            return (((item - payload.pop[0].json_agg[0][index - 1]) / payload.pop[0].json_agg[0][index - 1]) * 100).toFixed(3)
                        })
                    },
                    temperature: payload.temp.length === 0
                        ? []
                        : payload.temp[0].json_agg[0],
                    grp_total: payload.grp_total.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: payload.grp_total[0].json_agg[0],
                            growth: payload.grp_total[0].json_agg[0].map((item, index) => {
                                if (index === 0) { return null }
                                return (((item - payload.grp_total[0].json_agg[0][index - 1]) / payload.grp_total[0].json_agg[0][index - 1]) * 100).toFixed(3)
                            })
                        },
                    unemployment: unemp_arr.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: unemp_arr.map(item => item.unemployment.split(',').join('')),
                            growth: unemp_arr.map(item => item.unemployment_rate),
                        },
                    employment: unemp_arr.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: unemp_arr.map(item => item.employment.split(',').join('')),
                            growth: unemp_arr.map((item, index) => {
                                if (item.year === 2010) {
                                    return null
                                } else {
                                    return (((item.employment.split(',').join('') - unemp_arr[index - 1].employment.split(',').join('')) / unemp_arr[index - 1].employment.split(',').join('')) * 100).toFixed(3)
                                }
                            }),
                        },
                    grp: grp_arr.length === 0
                        ? { data: [], labels: [] }
                        : {
                            labels: grp_arr.map(item => item.description),
                            data: grp_arr.map(item => ((item.grp_2018 / payload.grp_total[0].json_agg[0][8]) * 100).toFixed(1))
                        }
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
            const county_grp_arr = payload.grp.filter(county => {
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
            })
            return {
                ...state,
                loading: false,
                countyMetro: payload.countyMetro[0],
                currentCounty: {
                    ...payload.score[0],
                    pop: payload.pop.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: payload.pop[0].json_agg[0],
                            growth: payload.pop[0].json_agg[0].map((item, index) => {
                                if (index === 0) { return null }
                                return (((item - payload.pop[0].json_agg[0][index - 1]) / payload.pop[0].json_agg[0][index - 1]) * 100).toFixed(3)
                            })
                        },
                    income: payload.income.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: payload.income[0].json_agg[0],
                            growth: payload.income[0].json_agg[0].map((item, index) => {
                                if (index === 0) { return null }
                                return (((item - payload.income[0].json_agg[0][index - 1]) / payload.income[0].json_agg[0][index - 1]) * 100).toFixed(3)
                            })
                        },
                    unemployment: payload.unemp.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: payload.unemp.map(item => item.unemployed.split(',').join('')),
                            growth: payload.unemp.map(item => item.rate),
                        },
                    grp: county_grp_arr.length === 0
                        ? { data: [], labels: [] }
                        : {
                            labels: county_grp_arr.map(item => item.description),
                            data: county_grp_arr.map(item => ((item.grp_2018 / payload.grp_total[0].json_agg[0][8]) * 100).toFixed(1))
                        },
                    grp_total: payload.grp_total.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: payload.grp_total[0].json_agg[0],
                            growth: payload.grp_total[0].json_agg[0].map((item, index) => {
                                if (index === 0) { return null }
                                return (((item - payload.grp_total[0].json_agg[0][index - 1]) / payload.grp_total[0].json_agg[0][index - 1]) * 100).toFixed(3)
                            })
                        },
                    employment: payload.unemp.length === 0
                        ? { total: [], growth: [] }
                        : {
                            total: payload.unemp.map(item => item.employed.split(',').join('')),
                            growth: payload.unemp
                                .map((item, index) => {
                                    if (item.year === 2010) {
                                        return null
                                    } else {
                                        return (((item.employed.split(',').join('') - payload.unemp[index - 1].employed.split(',').join('')) / payload.unemp[index - 1].employed.split(',').join('')) * 100).toFixed(3)
                                    }
                                }),
                        },
                    temperature: payload.temperature.length === 0
                        ? []
                        : payload.temperature[0].json_agg[0],
                    severe_weather_total: payload.severe_weather.length === 0
                        ? []
                        : payload.severe_weather[0].json_agg[0]
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
                    unemp_rate: []
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