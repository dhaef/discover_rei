import areas from './areas.json';
export const initalState = {
    metros: [],
    counties: [],
    currentMetro: null,
    currentCounty: null,
    currentCounties: null,
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