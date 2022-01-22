import React from "react";
import './collection-preview.styles.scss';
import CollectionItem from "../collection-item/collection-item.component";
import { useNavigate, useLocation } from 'react-router-dom';

const CollectionPreview = ({ title, items }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <div className="collection-preview">
            <h1 className="title" onClick={()=> navigate(`${pathname}/${title.toLowerCase()}`)}>{title.toUpperCase()}</h1>
            <div className="preview">
                {
                    items
                        .filter((item, idx) => idx < 4)
                        .map(item => (
                            <CollectionItem
                                key={item.id}
                                item={item}
                            />
                        ))
                }
            </div>
        </div>
    )
};

export default CollectionPreview;