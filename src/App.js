import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOutPage from './pages/checkout/checkout.component';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument, firestore, convertCollectionsSnapshotToMap } from './firebase/firebase.utils';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CollectionPage from './components/collection/collection.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import WithSpinner from './components/with-spinner/with-spinner.component';
import { updateCollections } from './redux/shop/shop.actions';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class App extends React.Component {
  state = {
      loading: true
  }
  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { setCurrentUser, updateCollections } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userDocRef = await createUserProfileDocument(user);
        onSnapshot(userDocRef, userSnapshot => {
          console.log('userSnapshot onSnapshot: ', userSnapshot);
          setCurrentUser({
            id: userSnapshot.id,
            ...userSnapshot.data()
          });
        });
      } 

      setCurrentUser(user);
      // 添加shop data
      // addCollectionAndDocuments('collections',
      //   collectionsArray.map(({ title, items }) => ({ title, items })));
    })


    const collectonsRef = collection(firestore, 'collections');
    // this.unsubscribeFromSnapshot = onSnapshot(collectonsRef, collectionsSnapshot => {
    //   const collectionMap = convertCollectionsSnapshotToMap(collectionsSnapshot);
    //   updateCollections(collectionMap);
    //   this.setState({ ...this.state, loading: false })
    // });

    getDocs(collectonsRef)
      .then(collectionsSnapshot => {
        const collectionMap = convertCollectionsSnapshotToMap(collectionsSnapshot);
        updateCollections(collectionMap);
        this.setState({ ...this.state, loading: false })
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    if (this.unsubscribeFromSnapshot) this.unsubscribeFromSnapshot();
  }

  render() {
    
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shop" element={<><ShopPage loading={this.state.loading} /><Outlet/></>}>
          </Route>
          <Route path="shop/:collectionId" element={<CollectionPageWithSpinner isLoading={this.state.loading} />} />
          <Route path='checkout' element={<CheckOutPage />} />
          <Route path='signin' element={
              this.props.currentUser
              ? <Navigate to='/'/>
              : <SignInAndSignUpPage />
              } 
          /> 
        </Routes>
        
        {/* <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop/*' element={<ShopPage />} />
          <Route path='/checkout' element={<CheckOutPage/>} />
          <Route path='/signin' element={
              this.props.currentUser
              ? <Navigate to='/'/>
              : <SignInAndSignUpPage />
              } 
          />  
          
        </Routes> */}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
