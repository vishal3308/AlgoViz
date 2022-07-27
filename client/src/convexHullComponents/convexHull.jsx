import React, { Component,useState,useEffect } from 'react';
import Canvas from "./canvas";
import Menu from "./menu";
import QueReply from "../Questions/QueReply";

// ======================Tutorial Component===================================
const Tutorial=() =>{
    const [page, setPage] = useState(1);
    const [Tutdata, setTutdata] = useState({})
    const totalpage = 3; // === Please write total tutorial page use for this algorithm
    const Next = () => {
      if(page == totalpage) Skip();
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
                    h3: 'Welcome to Pathfinding Visualizer!',
                    h6: 'This short tutorial will walk you through all of the features of this application.',
                    p: 'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
                    other:"Hi I am Vishal",
                })
  
                break;
            case 2:
                setTutdata({
                    h3:'What is a pathfinding algorithm?',
                    h6:'At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!',
                    p:'All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.',
                })
                break;
            case 3:
                setTutdata({
                    h3:'Picking an algorithm',
                    h6:'Choose an algorithm from the "Algorithms" drop-down menu.',
                    p:'Note that some algorithms are <i><b>unweighted</b></i>, while others are <i><b>weighted</b></i>. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path. ',
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
                <p><b>{Tutdata.other}</b></p>
                <div id="tutorialCounter">{page}/{totalpage}</div>
                <button id="nextButton" className="btn btn-default navbar-btn" type="button" onClick={Next}>{page==totalpage?'FINISH':'NEXT'}</button>
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