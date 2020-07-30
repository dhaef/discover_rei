import React, { useState, memo } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import ReactToolTip from 'react-tooltip'
import metroData from './metro_state.json'
import countyData from './counties-10m.json'
import { Link } from 'react-router-dom'

const Map = ({ dataScore, place }) => {
    const [content, setContent] = useState('')

    const pickColor = total => {
        if (place === 'metros') {
            if (total < 12) {
                return '#a1caf1'
            } else if (total >= 12 && total < 16) {
                return '#033454'
            } else if (total >= 16 && total < 20) {
                return '#910500'
            } else if (total >= 20) {
                return '#f48153'
            }
        } else if (place === 'counties') {
            if (total < 16) {
                return '#a1caf1'
            } else if (total >= 16 && total < 20) {
                return '#033454'
            } else if (total >= 20 && total < 24) {
                return '#910500'
            } else if (total >= 24) {
                return '#f48153'
            }
        }
    }

    return (
        <div className="map-container">
            <ComposableMap
                projection="geoAlbersUsa"
                data-tip=""
                height={500}
            >
                {/* <ZoomableGroup zoom={1} center={[0, 0]}> */}
                <Geographies geography={place === 'metros' ? metroData : countyData}>
                    {({ geographies }) =>
                        geographies.map((geo, index) => {
                            const current = dataScore.find(item => {
                                const fips = place === 'counties'
                                    ? item.fips.length === 4 ? `0${item.fips}` : item.fips
                                    : item.cbsa;
                                const geoId = place === 'counties' ? geo.id : geo.properties.cbsafp;
                                if (fips == geoId) {
                                    return item
                                }
                            })

                            return current ? <Link
                                to={place === 'metros' ? `/metro/${current.cbsa}` : `/county/${current.fips}`}
                                key={index}
                            // key={geo.properties.cbsafp}
                            >
                                <Geography
                                    geography={geo}
                                    // onClick={() => console.log(geo.properties.name)}
                                    onMouseEnter={() => setContent(`${place === 'metros' ? current.metro_name : current.county_name} - ${current.total}`)}
                                    onMouseLeave={() => setContent('')}
                                    stroke='#000000'
                                    fill={current ? pickColor(current.total) : '#d1d1d1'} />
                            </Link>
                                : <Geography
                                    key={index}
                                    geography={geo}
                                    stroke='#000000'
                                    fill={'STATE' in geo.properties ? '#f2f2f2' : '#d1d1d1'}
                                />
                        })
                    }
                </Geographies>
                {/* </ZoomableGroup> */}
            </ComposableMap>
            <ReactToolTip>{content}</ReactToolTip>
        </div>
    )
}

export default memo(Map)
