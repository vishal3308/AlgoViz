import React, { useEffect, useState } from 'react'
import QueReply from "../Questions/QueReply";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import { Button } from '@material-ui/core';

import "./Binary.css"

// ======================Tutorial Component===================================
const Tutorial = () => {
    const [page, setPage] = useState(1);
    const [Tutdata, setTutdata] = useState({})
    const totalpage = 3; // === Please write total tutorial page use for this algorithm
    const Next = () => {
        if (page == totalpage) Skip();
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
                    h3: 'Welcome to Algorithm Visualizer!',
                    h6: 'This short tutorial will walk you through all of the features of this application.',
                    p: 'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
                })

                break;
            case 2:
                setTutdata({
                    h3: 'What is a Binary Search algorithm?',
                    h6: 'Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(Log n).',
                    p: 'If you wanted to deep dive into the concept of binary searching please click the link given bellow!s',
                    link: <Button variant='contained' color='primary'><a href='https://www.youtube.com/watch?v=P3YID7liBug' rel='noreferrer' target="_blank">Watch Video</a></Button>,

                })
                break;
            case 3:
                setTutdata({
                    h3: 'How to use',
                    h6: 'User can enter the size of Array of range(1-100) and generate the array by clicking on "GENERATE RANDOM" button.',
                    p: 'Binary search Algorithm starts the searching when the user click on "START" button after entering search element.',
                    link: <Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/binary-search/' rel='noreferrer' target="_blank">See Algorithm</a></Button>,

                })
                break;
            default:
                setTutdata({
                    h3: 'Welcome in AlgoViz Project',
                    h6: "It's a project which demonstaight the working of different algorithms",
                    p: 'All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.',
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
                <button id="nextButton" className="btn btn-default navbar-btn" type="button" onClick={Next}>{page == totalpage ? 'FINISH' : 'NEXT'}</button>
                <button id="previousButton" className="btn btn-default navbar-btn" type="button" onClick={Previous}>Previous</button>
                <button id="skipButton" className="btn btn-default navbar-btn" type="button" onClick={Skip}>Skip Tutorial</button>
            </div>
        </>
    )
}
export default function BinarySearch() {
    const [Arraysize,setArraysize]=useState(10)
    const [Searchelement, setSearch] = useState('');
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);
    const [errormsg, seterrormsg] = useState("");
    const [Randarray,setRandarray]=useState([])
    const [Result,setResult]=useState(0);
    const [Button,setButton]=useState(false);

    useEffect(()=>{
        RandomArray();
    },[])
    const RandomArray=()=>{
        if(Arraysize <=0 || Arraysize >100){
            return seterror(true);
        }
        let temp=[]
        for(let i=0;i<Arraysize;i++){
            temp.push(Math.floor(Math.random()*100))
        }
        temp=temp.sort(function(a,b){return (a-b)})
        setRandarray(temp)
    }

    const handleresult=()=>{
        seterror(false);
        setsuccess(false);
        seterrormsg('')
        if(!Searchelement){
            seterrormsg('Please enter search element')
            return seterror(true)
        }
        setButton(true);
        let tempresult=new Promise((resolve,reject)=>{
            resolve(BinarySearch(Randarray,0,(Randarray.length)-1,Searchelement))
        });
        tempresult.then((res)=>{
            setResult(res);
            if(res==-1){
                seterror(true)
                seterrormsg('Sorry element does not exist')
                setsuccess(false)
            }
            else{
                seterror(false)
                setsuccess(true)
            }
            setButton(false)
        })

    }
    // ==============================================================
    BinarySearch = (arr, left, right, searchelement) => {
        if (right >= left) {
            let mid = Math.floor((left + right) / 2);
            document.getElementById('input'+mid).focus();
            return new Promise((res,rej)=>{
                setTimeout(res ,2000)}).then(()=>{
                    if (arr[mid] == searchelement) {
                        return mid;
                    }
                    else if (arr[mid] > searchelement) {
                        return BinarySearch(arr, left, mid - 1, searchelement)
                    }
                    else {
                        return BinarySearch(arr, mid + 1, right, searchelement)
                    }
                })
            
        }
        else {
            return -1
        }
    }
    return (
        <div>
                <Tutorial />
            <div className="binarySearch">
            <TextField label="Enter size of Array" id="outlined-size-small" size="small" color="secondary" required
                    helperText="Array size must be in between 0-100"
                    error={error}
                    value={Arraysize}
                    type='number'
                    onChange={(e) => setArraysize(e.target.value)}
                />
                <Fab variant="extended" color='secondary' sx={{ ml: 1 }} onClick={RandomArray} disabled={Button}>
                    <AddIcon sx={{ mr: 1 }} />
                    Generate Random
                </Fab>
                
                <div className="array_input">
                    {Randarray.map((item,id)=>(
                         <TextField size="small" key={id} label={id} id={"input"+id}
                         sx={{mr:1,mb:1}}
                         color='secondary'
                         value={item}
                         type='number'
                        
                     />
                    ))}
                </div>
                 <TextField label="Enter search Element" id="outlined-size-small" size="small" color="secondary" required
                    error={error}
                    helperText={errormsg}
                    value={Searchelement}
                    type='number'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Fab variant="extended" color='success' sx={{ ml: 1 }} onClick={handleresult} disabled={Button}>
                    <AddIcon sx={{ mr: 1 }} />
                    start
                </Fab>
                {error && <Alert  severity="error">{errormsg}</Alert>}
                {success && <Alert severity="success">Element is found at index {Result}</Alert>}
            </div>
            <QueReply pagename={"binarysearch"} />

        </div>
    )
}
