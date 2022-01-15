import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from "../../components/collection/collection.component";

const ShopPage = () => {
    
    return (
        <div className="shop-page">
            <CollectionsOverview />

            {/* <Routes>
                <Route path=":categoryId" element={<Category />} />
            </Routes>
            <Outlet /> */}
        </div>
        
    );
};

export default ShopPage;