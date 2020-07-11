import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/style/Banner';
import { useStore } from '../../store';

const Navbar = () => {
    const { state } = useStore();
    const { banner, areas } = state;
    const [dropdown, setDropdown] = useState(false);
    const [dimensions, setDimensions] = useState(window.innerWidth);
    const [search, setSearch] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setDimensions(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dimensions]);

    const onChangeSearch = e => {
        setSearchVal(e.target.value);
        if (e.target.value === '') {
            setSearch([])
        } else {
            setSearch(
                areas.filter(item => item.name.toLowerCase().includes(e.target.value))
            )
        }
    };

    const handleLinkClick = () => {
        setSearchVal('');
        setSearch([]);
    };

    return (
        <nav>
            <span className="nav-title"><Link to="/" className="link">{dimensions > 768 ? 'ExplorPlaces' : 'D-REI'}</Link></span>
            <div className="nav-link-container">
                <div className={`lg-nav ${dimensions > 768 ? 'show-nav' : 'hide'}`}>
                    <input
                        className="search"
                        value={searchVal}
                        type="text"
                        placeholder="Search Markets..."
                        onChange={onChangeSearch} />
                    <div className="search-results">
                        {search.length > 0 && search.map((item, index) => {
                            if (index < 10) {
                                const link = item.name.split(' ').includes('County,')
                                    ? `/county/${item.fips}`
                                    : `/metro/${item.fips}`;
                                return <p className="search-results-item" key={item.fips}>
                                    <Link
                                        to={link}
                                        onClick={handleLinkClick}
                                        className="search-link">
                                        {item.name}
                                    </Link>
                                </p>
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <Link
                        className="nav-item"
                        to="/metros"
                        onClick={() => setDropdown(false)}
                    >Metros</Link>
                    <Link
                        className="nav-item"
                        to="/counties"
                        onClick={() => setDropdown(false)}
                    >Counties</Link>
                </div>
                <div className="nav-dropdown nav-item">
                    <input
                        className={`search mr-1 ${dimensions <= 768 ? 'show-nav' : 'hide'}`}
                        value={searchVal}
                        type="text"
                        placeholder="Search Markets..."
                        onChange={onChangeSearch} />
                    <div className={`search-results ${dimensions <= 768 ? 'show-nav' : 'hide'}`}>
                        {search.length > 0 && search.map((item, index) => {
                            if (index < 10) {
                                const link = item.name.split(' ').includes('County,')
                                    ? `/county/${item.fips}`
                                    : `/metro/${item.fips}`;
                                return <p className="search-results-item" key={item.fips}>
                                    <Link
                                        to={link}
                                        onClick={handleLinkClick}
                                        className="search-link">
                                        {item.name}
                                    </Link>
                                </p>
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <button
                        className="dropdown-btn"
                        onClick={() => setDropdown(!dropdown)}>•••</button>
                    <div className={`dropdown-content ${dropdown && 'show'}`}>
                        <Link
                            className={`nav-item dropdown-item ${dimensions <= 768 ? 'show' : 'hide'}`}
                            to="/metros"
                            onClick={() => setDropdown(false)}
                        >Metros</Link>
                        <Link
                            className={`nav-item dropdown-item ${dimensions <= 768 ? 'show' : 'hide'}`}
                            to="/counties"
                            onClick={() => setDropdown(false)}
                        >Counties</Link>
                        <h5 className="dropdown-header">Growth</h5>
                        <Link
                            className="nav-item dropdown-item"
                            to="/metros/pop_growth"
                            onClick={() => setDropdown(false)}
                        >Metro Pop. <span role="img" aria-label="graph">📈</span></Link>
                        <Link
                            className="nav-item dropdown-item"
                            to="/counties/pop_growth"
                            onClick={() => setDropdown(false)}
                        >County Pop. <span role="img" aria-label="graph">📈</span></Link>
                    </div>
                </div>
            </div>
            <Banner name={banner} />
        </nav>
    )
}

export default Navbar
