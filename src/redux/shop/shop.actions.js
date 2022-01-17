import ShopActionTypes from "./shop.types";
import { getDocs, collection } from "firebase/firestore";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = error => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error.message
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        // this.unsubscribeFromSnapshot = onSnapshot(collectonsRef, collectionsSnapshot => {
        //   const collectionMap = convertCollectionsSnapshotToMap(collectionsSnapshot);
        //   updateCollections(collectionMap);
        //   this.setState({ ...this.state, loading: false })
        // });
            
        const collectonsRef = collection(firestore, 'collections');
        dispatch(fetchCollectionsStart());

        getDocs(collectonsRef)
            .then(collectionsSnapshot => {
                const collectionMap = convertCollectionsSnapshotToMap(collectionsSnapshot);
                dispatch(fetchCollectionsSuccess(collectionMap));
            }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
            ;
    }
};