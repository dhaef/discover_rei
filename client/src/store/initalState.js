import areas from './areas.json';
export const initalState = {
    metros: [],
    counties: [],
    currentMetro: {
        pop: { total: [], growth: [] },
        grp: { data: [], labels: [] },
        grp_total: { total: [], growth: [] },
        income: { total: [], growth: [] },
        employment: { total: [], growth: [] },
        temperature: [],
        unemployment: { total: [], growth: [] }
    },
    countyMetro: {},
    currentCounty: {
        pop: { total: [], growth: [] },
        employment: { total: [], growth: [] },
        grp: { data: [], labels: [] },
        grp_total: { total: [], growth: [] },
        severe_weather_total: [],
        income: { total: [], growth: [] },
        temperature: [],
        unemployment: { total: [], growth: [] },
    },
    currentCounties: [],
    loading: true,
    county_score: [],
    metro_score: [],
    banner: 'XplorePlaces',
    areas,
    filters: {
        population: [],
        population_growth: [],
        gdp_growth: [],
        gdp_diversity: [],
        job_growth: [],
        weather_dmg: [],
    },
    addToEmailList: false,
    alert: {
        show: false,
        text: ''
    }
}