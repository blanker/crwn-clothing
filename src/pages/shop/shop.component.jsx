import React from "react";
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const ShopPage = ({loading}) => {
    
    return (
        <div className="shop-page">
            <CollectionsOverviewWithSpinner isLoading={loading} />

            {/* <Routes>
                <Route path=":categoryId" element={<Category />} />
            </Routes>
            <Outlet /> */}
        </div>
    );
};

export default ShopPage;