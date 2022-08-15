import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './Style/modified.css';
import Home from "./homeComponents/home";
import Navbar from './homeComponents/Navbar';
import About from './homeComponents/about';
import Login from './homeComponents/Login';
import Signup from './homeComponents/Signup';
import Authenticate from './Authenticate';
// import Seive from "./primeComponents/seive";
// import towerOfHanoi from "./towerOfHanoiComponents/util/towerApp";
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import Sort from "./sortComponents/sort";
import Queen from "./queenComponents/queen";
import ConvexHull from "./convexHullComponents/convexHull";
// import BinarySearch from "./binarySearchComponent/binarySearch";
import BinarySearch from './binarySearchComponent/BinarySearch';
import RecursiveSort from "./recursiveSortComponents/recursiveSort";
import { createContext } from 'react';
export const Url = createContext();

    function App(){
        return (
      <Url.Provider value={'https://algoviz-vbspu.herokuapp.com/api'}>
            <BrowserRouter>
            <Navbar/>
                <Routes>
                <Route path='/pathfinder' element={<PathfindingVisualizer/>}/>
                    {/* <Route path='/prime' component={Seive}/> */}
                    <Route path='/sort' element={<Sort/>}/>
                    <Route path='/nqueen' element={<Queen/>}/>
                    <Route path='/convexhull' element={<ConvexHull/>}/>
                    <Route path='/binarysearch' element={<BinarySearch/>}/>
                    <Route path='/recursivesort' element={<RecursiveSort/>}/>  
                    {/* <Route path='/towerOfHanoi' element={<towerOfHanoi/>}/> */}
                    <Route path='/Authenticate' element={<Authenticate/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/' element={<Home/>}/>
                </Routes>
         </BrowserRouter>
      </Url.Provider>
        );
    }


export default App;
