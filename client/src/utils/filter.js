export const handleFilter = (filters, places) => {
    let filtered = places.slice();
    // Population filter
    if (filters.population.length === 1) {
        filtered = filtered.filter(place => place.pop_score === +filters.population[0].slice(-1))
    } else if (filters.population.length > 1) {
        filtered = filtered.filter(place => {
            for (let i = 0; i < filters.population.length; i++) {
                if (place.pop_score === +filters.population[i].split('-')[1]) {
                    return place
                }
            }
        });
    }
    // Population Growth filter
    if (filters.population_growth.length === 1) {
        filtered = filtered.filter(place => place.pop_grow_score === +filters.population_growth[0].slice(-1))
    } else if (filters.population_growth.length > 1) {
        filtered = filtered.filter(place => {
            for (let i = 0; i < filters.population_growth.length; i++) {
                if (place.pop_grow_score === +filters.population_growth[i].split('-')[1]) {
                    return place
                }
            }
        });
    }
    // GDP Growth filter
    if (filters.gdp_growth.length === 1) {
        filtered = filtered.filter(place => place.grp_grow_score === +filters.gdp_growth[0].slice(-1))
    } else if (filters.gdp_growth.length > 1) {
        filtered = filtered.filter(place => {
            for (let i = 0; i < filters.gdp_growth.length; i++) {
                if (place.grp_grow_score === +filters.gdp_growth[i].split('-')[1]) {
                    return place
                }
            }
        });
    }
    // GDP Diversity filter
    if (filters.gdp_diversity.length === 1) {
        filtered = filtered.filter(place => place.grp_score === +filters.gdp_diversity[0].slice(-1))
    } else if (filters.gdp_diversity.length > 1) {
        filtered = filtered.filter(place => {
            for (let i = 0; i < filters.gdp_diversity.length; i++) {
                if (place.grp_score === +filters.gdp_diversity[i].split('-')[1]) {
                    return place
                }
            }
        });
    }
    // Job Growth filter
    if (filters.job_growth.length === 1) {
        filtered = filtered.filter(place => place.emp_score === +filters.job_growth[0].slice(-1))
    } else if (filters.job_growth.length > 1) {
        filtered = filtered.filter(place => {
            for (let i = 0; i < filters.job_growth.length; i++) {
                if (place.emp_score === +filters.job_growth[i].split('-')[1]) {
                    return place
                }
            }
        });
    }
    // Weather Damage filter
    if (filters.weather_dmg.length === 1) {
        filtered = filtered.filter(place => place.sw_score === +filters.weather_dmg[0].slice(-1))
    } else if (filters.weather_dmg.length > 1) {
        filtered = filtered.filter(place => {
            for (let i = 0; i < filters.weather_dmg.length; i++) {
                if (place.sw_score === +filters.weather_dmg[i].split('-')[1]) {
                    return place
                }
            }
        });
    }
    return filtered;
}