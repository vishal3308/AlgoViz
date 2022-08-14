import React, { Component, useState, useEffect } from 'react';
import Rects from "./rects";
import { Button } from '@material-ui/core';
import { bubbleSort, selectionSort, insertionSort } from "../algorithms/sortingAlgorithms";
import { quickSort } from "../algorithms/quickSort";
import Menu from "./menu";
import QueReply from "../Questions/QueReply";

// ======================Tutorial Component===================================
const Tutorial = () => {
    const [page, setPage] = useState(1);
    const [Tutdata, setTutdata] = useState({})
    const totalpage = 8 // === Please write total tutorial page use for this algorithm
    const Next = () => {
        if (page === totalpage) Skip();
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
                    h3: 'Welcome to Sorting Visualizer!',
                    h6: 'This short tutorial will walk you through all of the features of this application.',
                    p: <p>If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!</p>,
                })

                break;
            case 2:
                setTutdata({
                    h3: 'What is a Sorting Visualizer ?',
                    h6: 'This sorting visualizer is nothing but a javascript tool to visualize the sorting algorithms.In Sorting visualizer array is provide in the form of grids,created by javascript.',
                    p: <p>User has the option to select the algorithms in drop down menu, and can control the runnning time of algorithm by speed block.</p>,
                })
                break;
            case 3:
                setTutdata({
                    h3: 'Sorting algorithms used in this module?',
                    h6: 'There are different sorting algorithms present, users can select anyone of the algorithm which they wants to visualize. ',
                    p: <p>There are major four types of sorting algorithm are used into this block which are Bubble sort, Selection sort, Insertion sort and Quick sort.</p>,
                })
                break;
            case 4:
                setTutdata({
                    h3: 'Bubble Sort',
                    p: <p>Bubble sort is the simplest sorting algorithm that iterates through the whole list and swaps elements according to their values.This process happens until the list is sorted.In general bubble sort works poorly as compared to other sorting algorithms.The time complexity of this algorithm is way higher than other sorting algorithms.</p>,
                    link: <Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/bubble-sort/' rel="noreferrer" target="_blank">See Algorithm</a></Button>,

                })
                break;
            case 5:
                setTutdata({
                    h3: 'Selection Sort',
                    p: <p>This is a type of in place comparison and swap sorting algorithm.It divides the whole list into two parts the sorted part on the left and the unsorted part on the right.Initially the left part is empty and the right part contains the whole list. Further the smallest element selected from the unsorted part and swapped with the leftmost part of the sorted array and this process continues until no element is left in the unsorted part .Like insertion sort this algorithm is also not suitable for large data items and the reason is its quadratic time complexity</p>,
                    link: <Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/selection-sort/' rel="noreferrer" target="_blank">See Algorithm</a></Button>,

                })
                break;
            case 6:
                setTutdata({
                    h3: 'Insertion Sort',
                    p: <p>It is one of the simplest and adaptive sorting algorithms which is easy to implement on small lists and arrays. It deals with one input element in one repetition and grows the sorted list each time.One element is removed from the list and placed at a location from where it belongs in the sorted list , this process happens in each iteration until the whole list is sorted and no input element remains.It behaves poorly for long lists due to its quadratic time complexity</p>,
                    link: <Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/insertion-sort/' rel="noreferrer" target="_blank">See Algorithm</a></Button>,
                })
                break;
            case 7:
                setTutdata({
                    h3: 'Quick Sort',
                    p: <p>Like Merge sort Quick sort is also a divide and conquer technique for sorting lists.It is the most commonly used algorithm for sorting and pretty optimal as well. It selects a pivot element from the list and partition the list into two sublists according to whether they are higher than pivot or not.After this the sublists are sorted recursively.It may give absurd results when elements in the list are repeated or equal,but most of the time it sorts them in nearly linear time</p>,
                    link: <Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/quick-sort/' rel="noreferrer" target="_blank">See Algorithm</a></Button>,
                })
                break;
            case 8:
                setTutdata({
                    h3: 'Notice',
                    h6: 'There are four type of algorithm used in this page in which Quick sort and Insertion sort are faster than Bubble sort and Selection sort.',
                    p: <p>We are providing a <b>DUO</b> button which help to demonstrate two algorithm simultaneously.</p>,
                })
                break;
            default:
                setTutdata({
                    h3: 'Welcome in AlgoViz Project',
                    h6: "It's a project which demonstaight the working of different algorithms",
                    p: <p>All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.</p>,
                })
        }
    }, [page])

    return (
        <>
            <div id="tutorial">
                <h3>{Tutdata.h3}</h3>
                <h6>{Tutdata.h6}</h6>
                {Tutdata.p}
                <p><b>{Tutdata.link}</b></p>
                <div id="tutorialCounter">{page}/{totalpage}</div>
                <button id="nextButton" className="btn btn-default navbar-btn" type="button" onClick={Next}>{page == totalpage ? 'FINISH' : 'NEXT'}</button>
                <button id="previousButton" className="btn btn-default navbar-btn" type="button" onClick={Previous}>Previous</button>
                <button id="skipButton" className="btn btn-default navbar-btn" type="button" onClick={Skip}>Skip Tutorial</button>
            </div>
        </>
    )
}
class Sort extends Component {
    state = {
        count: 20,
        rects: [],
        rects2: [],
        doubles: false,
        speed: 50,
        isRunning: false,
        isRunning1: false,
        isRunning2: false,
        algo1: 0,
        algo2: 0
    }
    constructor() {
        super();
    }
    componentDidMount() {
        const rect = getInitialRects(this.state.count);
        const rect2 = rect.slice();
        this.setState({ rects: rect, rects2: rect2 });
    }

    render() {
        return (
            <React.Fragment>
                <Tutorial />
                <Menu
                    disable={this.state.isRunning}
                    onDoubleChange={this.handleDouble}
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
                    {this.state.doubles && <hr style={{ width: "90%" }} />}
                    {this.state.doubles &&
                        <Rects
                            rects={this.state.rects2}
                        />}
                </div>

                {/* // ===============Importing Question Answer Feature========================== */}
                <QueReply pagename={"sorting"} />
            </React.Fragment>
        );
    }
    handleRandomize = () => {
        const rect = getInitialRects(this.state.count);
        const rect2 = rect.slice();
        this.setState({ rects: rect, rects2: rect2 });
    }
    handleRefresh = () => {
        const rects = this.state.rects;
        for (let i = 0; i < rects.length; i++) {
            const rect = { ...rects[i], isSorted: false, isSorting: false }
            rects[i] = rect;
        }
        const rects2 = rects.slice();
        this.setState({ rects, rects2 });
    }

    handleDouble = (val) => {
        this.setState({ doubles: val });
    }
    handleCountChange = (val) => {
        this.setState({ count: val });
        this.handleRandomize();
    }
    handleAlgoChanged = (pos, val) => {
        if (pos === 0) {
            this.setState({ algo1: val });
        } else {
            this.setState({ algo2: val });
        }
    }
    handleSpeedChanged = (val) => {
        const speed = (110 - val);
        this.setState({ speed });
    }
    handleSort = () => {

        this.setState({ isRunning: true });
        let steps1;
        switch (this.state.algo1) {
            case 0:
                steps1 = bubbleSort(this.state.rects);
                break;
            case 1:
                steps1 = selectionSort(this.state.rects);
                break;
            case 2:
                steps1 = insertionSort(this.state.rects);
                break;
            case 3:
                steps1 = quickSort(this.state.rects2);
                console.log(steps1)
                break;
            default:
                steps1 = bubbleSort(this.state.rects);
                break;
        }
        let steps2;
        if (this.state.doubles) {

            switch (this.state.algo2) {
                case 0:
                    steps2 = bubbleSort(this.state.rects2);
                    break;
                case 1:
                    steps2 = selectionSort(this.state.rects2);
                    break;
                case 2:
                    steps2 = insertionSort(this.state.rects2);
                    break;
                case 3:
                    steps2 = quickSort(this.state.rects2);
                    break;
                default:
                    steps2 = bubbleSort(this.state.rects2);
                    break;
            }

        }
        this.handleFirst(steps1);
        if (this.state.doubles) this.handleSecond(steps2);
    }
    handleFirst = async (steps) => {
        // console.log("fsdfsdfsdfasdf");
        this.setState({ isRunning1: true });
        const { speed } = this.state;
        // const steps = bubbleSort(this.state.rects);
        //  console.log(steps.length);
        const prevRect = this.state.rects;
        for (let i = 0; i < steps.length; i++) {
            //   setTimeout(()=>{
            if (i !== 0) {
                prevRect[steps[i - 1].xx] = { ...prevRect[steps[i - 1].xx], isSorting: false };
                prevRect[steps[i - 1].yy] = { ...prevRect[steps[i - 1].yy], isSorting: false };
            }
            if (steps[i].xx === steps[i].yy) {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorted: true, isSorting: false };
            } else if (steps[i].changed) {
                const recti = { ...prevRect[steps[i].xx], isSorting: true };
                const rectj = { ...prevRect[steps[i].yy], isSorting: true };
                prevRect[steps[i].yy] = recti;
                prevRect[steps[i].xx] = rectj;
            } else {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorting: true };
                prevRect[steps[i].yy] = { ...prevRect[steps[i].yy], isSorting: true };
            }
            if (i === steps.length - 1) {
                this.setState({ isRunning1: false });
                if (this.state.isRunning2 === false) {
                    this.setState({ isRunning: false });
                }
            }
            /* if( i === (steps.length)-2 ){
                 this.setState({isRunning1:false});
                 if( this.state.isRunning2 === false ){
                     this.setState({isRunning:false});
                 }
                 prevRect[steps[i].xx] = {...prevRect[steps[i].xx],isSorting:false,isSorted:true};
                 prevRect[steps[i].yy] = {...prevRect[steps[i].yy],isSorting:false,isSorted:true};
             }*/
            this.setState({ rects: prevRect });
            await sleep(this.state.speed);
            // },i*speed);
        }
    }
    handleSecond = async (steps) => {
        const { speed } = this.state;
        this.setState({ isRunning2: true });
        const prevRect = this.state.rects2;
        for (let i = 0; i < steps.length; i++) {
            //   setTimeout(()=>{
            if (i !== 0) {
                prevRect[steps[i - 1].xx] = { ...prevRect[steps[i - 1].xx], isSorting: false };
                prevRect[steps[i - 1].yy] = { ...prevRect[steps[i - 1].yy], isSorting: false };
            }
            if (steps[i].xx === steps[i].yy) {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorted: true, isSorting: false };
            } else if (steps[i].changed) {
                const recti = { ...prevRect[steps[i].xx], isSorting: true };
                const rectj = { ...prevRect[steps[i].yy], isSorting: true };
                prevRect[steps[i].yy] = recti;
                prevRect[steps[i].xx] = rectj;
            } else {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorting: true };
                prevRect[steps[i].yy] = { ...prevRect[steps[i].yy], isSorting: true };
            }
            if (i === steps.length - 1) {
                this.setState({ isRunning2: false });
                if (this.state.isRunning1 === false) {
                    this.setState({ isRunning: false });
                }
            }
            /* if( i === (steps.length)-2 ){
                 prevRect[steps[i].xx] = {...prevRect[steps[i].xx],isSorting:false,isSorted:true};
                 prevRect[steps[i].yy] = {...prevRect[steps[i].yy],isSorting:false,isSorted:true};
                 this.setState({isRunning2:false});
                 if( this.state.isRunning1 === false ){
                     this.setState({isRunning:false});
                 }
             }*/
            this.setState({ rects2: prevRect });
            await sleep(this.state.speed);
            // },i*speed);
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
        isSorting: false
    }
}
export default Sort;
