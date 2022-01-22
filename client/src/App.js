import React, {useEffect} from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOutPage from './pages/checkout/checkout.component';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import CollectionsContainer from './components/collection/collection.container';
import { fetchCollectionsStart } from "./redux/shop/shop.actions";
import { checkUserSession } from './redux/user/user.actions';

const App = (  ) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetchCollectionsStart();
    dispatch(checkUserSession());
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

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
            currentUser
            ? <Navigate to='/'/>
            : <SignInAndSignUpPage />
            } 
        /> 
      </Routes>
      
    </div>
  );
}


export default App;
