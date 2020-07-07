import areas from './areas.json';
export const initalState = {
    metros: [],
    counties: [],
    currentMetro: {
        pop: {},
        grp: [],
        grp_total: {},
        pie: {
            income: {},
            employment: {},
        },
    },
    countyMetro: {},
    currentCounty: {
        pop: {},
        employment: {},
        grp: [],
        grp_total: {},
        severe_weather: [],
        severe_weather_total: {},
        income: {},
        temperature: {},
    },
    currentCounties: [],
    loading: true,
    county_score: [],
    metro_score: [],
    banner: 'Home',
    areas,
    filters: {
        population: [],
        population_growth: [],
        gdp_growth: [],
        gdp_diversity: [],
        job_growth: [],
        weather_dmg: [],
    }
}