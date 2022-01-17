import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOutPage from './pages/checkout/checkout.component';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {  onSnapshot } from 'firebase/firestore';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CollectionsContainer from './components/collection/collection.container';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from './redux/shop/shop.actions';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, fetchCollectionsStartAsync} = this.props;

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
    });

    fetchCollectionsStartAsync();

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shop" element={<><ShopPage /><Outlet/></>}>
          </Route>
          <Route path="shop/:collectionId" element={<CollectionsContainer />} />
          <Route path='checkout' element={<CheckOutPage />} />
          <Route path='signin' element={
              this.props.currentUser
              ? <Navigate to='/'/>
              : <SignInAndSignUpPage />
              } 
          /> 
        </Routes>
        
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
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
