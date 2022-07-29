import React, { Component,useState,useEffect } from 'react';
import Rects from "./rects";
import mergeSort from '../algorithms/mergeSort';
import heapSort from "../algorithms/heapSort";
import {quickSortRecursive} from "../algorithms/quickSortRecursive";
import { Button } from '@material-ui/core';
import Menu from "./menu";
import QueReply from "../Questions/QueReply";

// ======================Tutorial Component===================================
const Tutorial=() =>{
    const [page, setPage] = useState(1);
    const [Tutdata, setTutdata] = useState({})
    const totalpage = 5; // === Please write total tutorial page use for this algorithm
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
                })
  
                break;
            case 2:
                setTutdata({
                    h3:'What is Recurrsive sorting',
                    h6:'The process in which a function calls itself directly or indirectly is called recursion and the corresponding function is called a recursive function. Using a recursive algorithm, certain problems can be solved quite easily.',
                    p:'Recursive techniques can be utilized in sorting algorithms, allowing for the sorting of n elements in O(nlogn) time (compared with the O(n2) efficiency of bubble sort. Two such algorithms which will be examined here are Mergesort, Quicksort and Heap Sort.',
                })
                break;
                case 3:
                setTutdata({
                    h3: 'Quick Sort',
                    p: 'Like Merge sort Quick sort is also a divide and conquer technique for sorting lists.It is the most commonly used algorithm for sorting and pretty optimal as well. It selects a pivot element from the list and partition the list into two sublists according to whether they are higher than pivot or not.After this the sublists are sorted recursively.It may give absurd results when elements in the list are repeated or equal,but most of the time it sorts them in nearly linear time',
                    link: <Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/quick-sort/' target="_blank">See Algorithm</a></Button>,
                })
                break;
            case 4:
                setTutdata({
                    h3:'Merge Sort',
                    p:'Merge sort is referred to as one of the efficient sorting algorithms and is a type of divide and conquer algorithm.It divides the unsorted list into multiple sublists each with one element and merge them repeatedly to produce new sorted list and this process is continued until only one sublist is remained.The merging process nearly takes linear time so it is quite fast algorithm for sorting.',
                    link:<Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/merge-sort/' target="_blank">See Algorithm</a></Button>,
                })
                break;
                case 5:
                    setTutdata({
                        h3:'Heap Sort',
                        p:'Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the minimum element and place the minimum element at the beginning. We repeat the same process for the remaining elements.',
                        link:<Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/heap-sort/' target="_blank">See Algorithm</a></Button>,

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
                <p><b>{Tutdata.link}</b></p>
                <div id="tutorialCounter">{page}/{totalpage}</div>
                <button id="nextButton" className="btn btn-default navbar-btn" type="button" onClick={Next}>{page==totalpage?'FINISH':'NEXT'}</button>
                <button id="previousButton" className="btn btn-default navbar-btn" type="button" onClick={Previous}>Previous</button>
                <button id="skipButton" className="btn btn-default navbar-btn" type="button" onClick={Skip}>Skip Tutorial</button>
            </div>
        </>
    )
  }
class RecursiveSort extends Component {
    state = {
        count: 20,
        rects: [],
        speed: 50,
        isRunning: false,
        algo: 0
    }

    constructor() {
        super();
    }

    componentDidMount() {
        var rects = getInitialRects(this.state.count);
        this.setState({rects});
        /* var rects2 = rects.slice();
         console.log(rects2);
         rects = mergeSort(rects);
         console.log(rects);*/

    }

    render() {
        return (
            <React.Fragment>
                <Tutorial/>
                <Menu
                    disable={this.state.isRunning}
                    onViusalize={this.handleSort}
                    onRandomize={this.handleRandomize}
                    onRefresh={this.handleRefresh}
                    onCountChange={this.handleCountChange}
                    onAlgoChanged={this.handleAlgoChanged}
                    onSpeedChange={this.handleSpeedChanged}
                />
                <div className=' justify-content-center'>
                    <Rects
                        rects={this.state.rects}
                    />

                </div>
                <QueReply pagename={"recursivesort"}/>
            </React.Fragment>
        );
    }

    handleRandomize = () => {
        const rect = getInitialRects(this.state.count);
        this.setState({rects: rect});
    }
    handleRefresh = () => {
        const rects = this.state.rects;
        for (let i = 0; i < rects.length; i++) {
            const rect = {...rects[i], isSorted: false, isSorting: false}
            rects[i] = rect;
        }
        this.setState({rects});
    }
    handleCountChange = (val) => {
        this.setState({count: val});
        this.handleRandomize();
    }
    handleAlgoChanged = (pos, val) => {
        if (pos === 0) {
            console.log("sup 0");
            this.setState({algo: val});
        }
    }
    handleSpeedChanged = (val) => {
        const speed = (110 - val);
        this.setState({speed});
    }

    handleSort = () => {

        this.setState({isRunning: true});
        let steps;
        let rects2;
        switch (this.state.algo) {

            case 0:
                steps = mergeSort(this.state.rects);
                this.handleMerge(steps);
                break;
            case 1:
                rects2 = this.state.rects.slice();
                steps = heapSort(rects2);
                this.handleHeap(steps);
                break;
            case 2:
                rects2 = this.state.rects.slice();
                steps = quickSortRecursive(rects2);
                this.handleQuick(steps);
                break;
            default:
        }


    }

    handleQuick = async (steps) =>{
        this.setState({isRunning: true});
        let prevRect = this.state.rects;
        for (let j = 0; j < this.state.count; j++) {
            prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:false,isRange:false,isSorted: false};
        }
        this.setState({rects: prevRect});
        let hasChanged = -1;
        let changed;
        for(let i=0;i<steps.length;i++){
            let step = steps[i];
            if( hasChanged!==-1 ){
                let {left,right} = changed;
                prevRect[left] = {...prevRect[left], isLeft: false,isSorting: false,isRight:false,isRange:false};
                prevRect[right] = {...prevRect[right], isLeft: false,isSorting: false,isRight:false,isRange:false};
            }
            if( step.changedRange ){
                await sleep(this.state.speed);await sleep(this.state.speed);await sleep(this.state.speed);await sleep(this.state.speed);
                let {left,right} = step;
                for (let j = 0; j < this.state.count; j++) {
                    prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:false,isRange:false};
                }
                for (let j = left; j <=right; j++) {
                    prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:true,isRange:true};
                }
                this.setState({rects: prevRect});
                await sleep(this.state.speed);await sleep(this.state.speed);await sleep(this.state.speed);await sleep(this.state.speed);
                for (let j = 0; j < this.state.count; j++) {
                    prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:false};
                }
            }else if(step.swap){
                let {left,right} = step;
                prevRect[left] = {...prevRect[left], isLeft: false,isSorting: true,isRight:false,isRange:false};
                prevRect[right] = {...prevRect[right], isLeft: true,isSorting: false,isRight:false,isRange:false};
                let temp = prevRect[left];
                prevRect[left] = prevRect[right];
                prevRect[right] = temp;
                hasChanged = 1;
                changed = step;
            }
            this.setState({rects: prevRect});
            await sleep(this.state.speed);
            if (i === steps.length - 1) {
                for (let j = 0; j < this.state.count; j++) {
                    prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:false,isSorted: false,isRange:false};
                }
                this.setState({rects: prevRect});
                for (let j = 0; j < this.state.count; j++) {
                    prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:false,isSorted: true,isRange:false};
                    this.setState({rects: prevRect});
                    await sleep(10);
                }
                this.setState({isRunning: false,rects: prevRect});
            }
        }
    }
    handleHeap = async (steps) =>{
        this.setState({isRunning: true});
        let prevRect = this.state.rects;
        for (let j = 0; j < this.state.count; j++) {
            prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:false,isRange:false,isSorted: false};
        }
        this.setState({rects: prevRect});

        for(let i = 0;i<steps.length;i++){
            let step = steps[i];
            //   console.log(step);
            for (let i = 0; i < this.state.count; i++) {
                prevRect[i] = {...prevRect[i], isLeft: false,isSorting: false,isRight:false};
            }
            let {left,right,sorted} = step;
            prevRect[left] = {...prevRect[left],isLeft:true};
            prevRect[right] = {...prevRect[right],isRight:true};
            this.setState({rects: prevRect});
            await sleep(this.state.speed);
            let temp = prevRect[left];
            prevRect[left] = prevRect[right];
            prevRect[right] = temp;
            this.setState({rects: prevRect});
            if( sorted ) prevRect[left] = {...prevRect[left],isSorted: true};
            await sleep(this.state.speed);await sleep(this.state.speed);await sleep(this.state.speed);
            if (i === steps.length - 1) {

                for (let i = 0; i < this.state.count; i++) {
                    prevRect[i] = {...prevRect[i], isLeft: false,isSorting: false,isRight:false,isSorted: true};
                    this.setState({rects: prevRect});
                    await sleep(this.state.speed);
                }
                this.setState({isRunning: false,rects: prevRect});
            }
        }
    }
    handleMerge = async (steps) => {
        this.setState({isRunning1: true});

        const {speed} = this.state;

        let prevRect = this.state.rects;
        for (let j = 0; j < this.state.count; j++) {
            prevRect[j] = {...prevRect[j], isLeft: false,isSorting: false,isRight:false,isRange:false,isSorted: false};
        }
        this.setState({rects: prevRect});
        await sleep(this.state.speed);
      //  console.log("steps ", steps.length);
        for (let ii = 0; ii < steps.length; ii++) {
            let step = steps[ii];
            for (let i = 0; i < this.state.count; i++) {
                prevRect[i] = {...prevRect[i], isLeft: false,isSorting: false,isRight:false};
            }
           // console.log(step.left," ",step.mid," ",step.right);
            for (let i = step.left; i <= step.mid; i++) {
                prevRect[i] = {...prevRect[i], isLeft: true,isSorting: false};
            }
            for (let i = step.mid + 1; i <= step.right; i++) {
                prevRect[i] = {...prevRect[i], isRight: true,isLeft:false,isSorting: false};
            }
            this.setState({rects: prevRect});
            await sleep(this.state.speed);await sleep(this.state.speed);await sleep(this.state.speed);
          //  console.log(step);
            for(let i= step.left;i<=step.right;i++){
                prevRect[i] = {...prevRect[i],width:step.val[i-step.left].width,isSorting: true };
                this.setState({rects: prevRect});
                await sleep(this.state.speed);
            }

            if (ii === steps.length - 1) {

                for (let i = 0; i < this.state.count; i++) {
                    prevRect[i] = {...prevRect[i], isLeft: false,isSorting: false,isRight:false,isSorted: true};
                    this.setState({rects: prevRect});
                    await sleep(this.state.speed);
                }
                this.setState({isRunning: false});
            }

            this.setState({rects: prevRect});
            await sleep(this.state.speed);
            prevRect = this.state.rects;
          /*  for (let i = 0; i < this.state.count; i++) {
                prevRect[i] = {...prevRect[i], isLeft: false,isSorting: false,isRight:false,isSorted: false};
            }*/
            this.setState({rects: prevRect});
        }
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getInitialRects = (tot) => {
    const rects = [];
    for (let i = 0; i < tot; i++) {
        rects.push(getRect());
    }
    return rects;
}
const getRect = () => {
    return {
        width: Math.floor(Math.random() * 200) + 50,
        isSorted: false,
        isSorting: false,
        isLeft: false,
        isRight: false
    }
}

export default RecursiveSort;