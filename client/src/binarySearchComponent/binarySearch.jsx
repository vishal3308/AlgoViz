import React, { Component,useState,useEffect } from 'react';
import EntryPoint from "./entryPoint";
import Search from "./search";
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
class BinarySearch extends Component {
    state={
        upper:100,
        lower:0,
        max:100,
        isRunning:false
    }
    render() {
        return (
            <div>
                <Tutorial/>   
            <center style={{marginBottom:"20px"}}>
                {!this.state.isRunning &&
                <EntryPoint
                    startGame={this.handleStartGame}
                    upper={this.state.upper}
                    setUpper={this.handleSetUpper}
                /> }
                {this.state.isRunning &&
                <Search
                    yesButton={this.handleYes}
                    noButton={this.handleNo}
                    upper={this.state.upper}
                    lower={this.state.lower}
                    max={this.state.max}
                    onRestart={this.handleRestart}
                />
                }
            </center>
            <QueReply pagename={"binarysearch"}/>
            </div>
        );
    }
    handleStartGame = () =>{
        this.setState({isRunning:true});
    }
    handleRestart = () =>{
        this.setState({isRunning:false,upper:100,lower:0});
    }
    handleYes = () =>{
        const mid = Math.floor( (this.state.upper+this.state.lower)/2);
        this.setState({lower:mid+1});
    }
    handleNo = () =>{
        const mid = Math.floor( (this.state.upper+this.state.lower)/2);
        this.setState({upper:mid});
    }
    handleSetUpper = (up) =>{
        let val = parseInt(up);
        if( val<=0 ){
            val = 100;
        }
        this.setState({upper:val,max:val});
    }
}

export default BinarySearch;