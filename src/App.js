import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOutPage from './pages/checkout/checkout.component';
import { Route, Routes, Navigate, useHistory } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
class App extends React.Component {
    unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userDocRef = await createUserProfileDocument(user);
        onSnapshot(userDocRef, userRef => {
          console.log('userRef', userRef);
          setCurrentUser({
            id: userRef.id,
            ...userRef.data()
          });
        });
      } 

      setCurrentUser(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/shop' element={<ShopPage/>} />
          <Route exact path='/checkout' element={<CheckOutPage/>} />
          <Route exact path='/signin' element={
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
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
