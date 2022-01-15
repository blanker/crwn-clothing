import React from 'react';
import './menu-item.styles.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div
            className={`menu-item ${size}`}
            onClick={() => navigate(`${location.pathname}${linkUrl}`)}
        >
            <div className='background-image' style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className='content'>
                <h1 className='title'>{title.toUpperCase()}</h1>
                <span className='subtitle'>SHOP NOW</span>
            </div>
        </div>
    );
}

export default MenuItem;
