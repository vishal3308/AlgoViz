import React, { Component,useState,useEffect } from 'react';
import { Button } from '@material-ui/core';
import Canvas from "./canvas";
import Menu from "./menu";
import QueReply from "../Questions/QueReply";

// ======================Tutorial Component===================================
const Tutorial=() =>{
    const [page, setPage] = useState(1);
    const [Tutdata, setTutdata] = useState({})
    const totalpage = 4; // === Please write total tutorial page use for this algorithm
    const Next = () => {
      if(page === totalpage) Skip();
      else if (page < totalpage) setPage(page + 1)
    }
    const Previous = () => {
        if (page > 1) setPage(page - 1);
    }
    const Skip = () => {
        document.getElementById("tutorial").style.display = "none";
    }
    // 
    useEffect(() => {
        switch (page) {
            case 1:
                setTutdata({
                    h3: 'Welcome to Algorithm Visualizer!!',
                    h6: 'This short tutorial will walk you through all of the features of this application.',
                    p: 'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
                })
  
                break;
            case 2:
                setTutdata({
                    h3:'What is a convex Hull ?',
                    h6:'The convex hull of a set of points is defined as the smallest convex polygon, that encloses all of the points in the set. Convex means that the polygon has no corner that is bent inwards',
                    p:'As far as a convex hull problem is concerned , it is a problem of finding the smallest polygon from the given set of points such that it includes all the points in the given region.',
                })
                break;
            case 3:
                setTutdata({
                    h3:'How we will visualize convex hull of given points.',
                    h6:'We will visualize the convex hull of given points by the help avery famous algorithm named graham scan algorithm.',
                    p:'To find the convex hull of a set of points, we can use an algorithm called the Graham Scan, which is considered to be one of the first algorithms of computational geometry. Using this algorithm, we can find the subset of points that lie on the convex hull, along with the order in which these points are encountered when going around the convex hull. ',
                })
                break;
            case 4:
                setTutdata({
                    h3:'What is Graham Scan ? How it Visualize the graham scan!',
                    p:"'Graham's scan is a method of finding the convex hull of a finite set of points in the plane with time complexity O(n log n). It is named after Ronald Graham, who published the original algorithm in 1972. The algorithm finds all vertices of the convex hull ordered along its boundary. It uses a stack to detect and remove concavities in the boundary efficiently.",
                  link:<Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/convex-hull-using-divide-and-conquer-algorithm/' rel='noreferrer' target="_blank">See Algorithm</a></Button>,
                    
                })
                break;
            default:
                setTutdata({
                    h3:'Welcome in AlgoViz Project',
                    h6:"It's a project which demonstaight the working of different algorithms",
                    p:'All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.',
                })
        }
    }, [page])
  
    return (
        <>
            <div id="tutorial">
                <h3>{Tutdata.h3}</h3>
                <h6>{Tutdata.h6}</h6>
                <p>{Tutdata.p}</p>
                <p>{Tutdata.link}</p>
                <div id="tutorialCounter">{page}/{totalpage}</div>
                <button id="nextButton" className="btn btn-default navbar-btn" type="button" onClick={Next}>{page ===totalpage?'FINISH':'NEXT'}</button>
                <button id="previousButton" className="btn btn-default navbar-btn" type="button" onClick={Previous}>Previous</button>
                <button id="skipButton" className="btn btn-default navbar-btn" type="button" onClick={Skip}>Skip Tutorial</button>
            </div>
        </>
    )
  }
class ConvexHull extends Component {
    state={
        dots:[],
        lines:[],
        isALgoLive:false,
        width:100,
        height:100,
        isRunning:false,
        speed:100,
        number:50
        
    }
    constructor() {
        super();
        this.setState({width:window.innerWidth,height:window.innerHeight-200});
    }
    componentDidMount() {
        this.setState({width:window.innerWidth,height:window.innerHeight-100});
        // =======Refreshing the COnvex hull for firstTime=============
        this.handleRefreshDots();
    }
    render() {
        return (
            <React.Fragment>
                <Tutorial/>
            <div className='convexcontainer' style={{height:"500px",padding:"10px"}}>
                <Menu
                    onRefresh={this.handleRefreshDots}
                    onVisualize={this.handleVisualize}
                    onChangeSpeed={this.changeSpeed}
                    onChangeValues={this.handleValueIncease}
                />
                <Canvas
                    sx={{width:'90vw'}}
                    height={this.state.height}
                    dots={this.state.dots}
                    onTurnOff={this.handleTurnOff}
                    onGoing={this.state.isRunning}
                    speed={this.state.speed}
                />
            </div>
                <QueReply pagename={"convexhull"}/>
            </React.Fragment>
        );
    }
    handleValueIncease = (value) => {
        this.setState({number:value});
        this.handleRefreshDots();
    }
    changeSpeed = (speed) => {
        //console.log(typeof speed);
        this.setState({speed:600-speed*10});
    }
    handleAlgoStateChanged = (val) => {
        this.setState({isAlgoLive:val});
    }
    handleVisualize = () =>{
        this.setState({isRunning:true});
    }
    handleTurnOff = () =>{
        this.setState({onGoing:false});
    }
    handleRefreshDots = () =>{
        this.setState({isRunning:false});
        this.setState({dots:getNewDots(this.state.number)});
    }

    handleMoreDot = () =>{
        const row = Math.floor(Math.random()*400)+10;
        const col = Math.floor(Math.random()*400)+10;
        const dot = {
            row:row,
            col:col
        }
        const dots = this.state.dots;
        dots.push(dot);
        this.setState(dots);
    }
}
function getNewDots(number){
    const dots= [];
    for(let  i = 0; i<number;i++){
        dots.push(getDot());
    }
    dots.sort( (a,b) => {
       if( a.xx!==b.xx ){
           return a.xx-b.xx;
       } else{
           return a.yy - b.yy;
       }
    } );
    return dots;
}
function getDot(){
    const width = window.innerWidth-50;
    const height = window.innerHeight-250;
    const rowpos = Math.floor( Math.random()*height )+25;
    const colpos = Math.floor(Math.random()*width)+25;
    return {
        xx:colpos,
        yy:rowpos,
    }
}
export default ConvexHull;