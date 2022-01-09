import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { Route, Routes } from "react-router";
import { Link, useLocation } from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

const HomePageDemo = (props) => {
  console.log(props);
  const location = useLocation();
  console.log(location);
  return <div>
    <Link to='/topics'>TOPICS</Link>
    <h1>HOME PAGE</h1>
  </div>
};
const TopicListPage = () => (
  <div>
    TOPIC LIST PAGE
  </div>
);
const TopicDetailPage = () => (
  <div>
    TOPIC DETAIL PAGE
  </div>
);

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<ShopPage/>} />
      </Routes>
      {/* <Routes>
        <Route exact path="/" element={<HomePageDemo/>} />
        <Route exact path="/topics" element={<TopicListPage/>} />
        <Route exact path="/topics/:topicId" element={<TopicDetailPage/>} />
      </Routes> */}
    </div>
  );
}


export default App;
