import React, { Component, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Cells from "./cells";
import Menu from "./menu";
import QueReply from "../Questions/QueReply";

// ======================Tutorial Component===================================
const Tutorial = () => {
    const [page, setPage] = useState(1);
    const [Tutdata, setTutdata] = useState({})
    const totalpage = 4; // === Please write total tutorial page use for this algorithm
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
                    h3: 'Welcome to N Queen Visualization!',
                    h6: 'This short tutorial will walk you through all of the features of this application.',
                    p: 'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
                })

                break;
            case 2:
                setTutdata({
                    h3: 'What is a N Queen visualization?',
                    h6: 'The N-Queen problem is a famous problem of placing N queens under some specific conditions.The problem is to place N-queens in a NxN grid such that no two queens can attack each other. More specifically a  column or row must not contain more than one queen and no two queens face each other diagonally as well.',
                    p: 'This part is a dynamic visualization of N -Queen problem in which users can easily observe how recursion and backtracking processes take place. ',
                })
                break;
            case 3:
                setTutdata({
                    h3: 'What is Backtracking Algorithm',
                    h6: 'Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point in time (by time, here, is referred to the time elapsed till reaching any level of the search tree).  ',
                    p: ' Backtracking can also be said as an improvement to the brute force approach. So basically, the idea behind the backtracking technique is that it searches for a solution to a problem among all the available options.',
                })
                break;
            case 4:
                setTutdata({
                    h3: 'How Backtracking Algorithm solves the N Queen Problem?',
                    h6: " When we place a queen in a column, we check for clashes with already placed queens. In the current column, if we find a row for which there is no clash, we mark this row and column as part of the solution. If we do not find such a row due to clashes, then we backtrack and return false.",
                    link: <Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/' rel="noreferrer" target="_blank">See Algorithm</a></Button>,

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
                <button id="nextButton" className="btn btn-default navbar-btn" type="button" onClick={Next}>{page === totalpage ? 'FINISH' : 'NEXT'}</button>
                <button id="previousButton" className="btn btn-default navbar-btn" type="button" onClick={Previous}>Previous</button>
                <button id="skipButton" className="btn btn-default navbar-btn" type="button" onClick={Skip}>Skip Tutorial</button>
            </div>
        </>
    )
}
class Queen extends Component {
    state = {
        board: [],
        number: 4,
        speed: 490,
        isRunning: false
    }

   
    componentDidMount() {
        const board = getBoard(this.state.number);
        // board[3][3].isPresent = true;
        this.setState({ board });
    }

    render() {
        return (
            <div>
                <Tutorial />
                <Menu
                    onSpeedChange={this.handleSpeedChange}
                    onCountChange={this.handleQueenChange}
                    onViusalize={this.startAlgo}
                    disable={this.state.isRunning}
                    onClear={this.handleClear}
                    onStop={this.handleStop}
                />
                <div style={{ textAlign: "Center" }}>
                    <Cells
                        board={this.state.board}
                    />
                </div>
                <QueReply pagename={"nqueen"} />
            </div>
        );
    }

    handleStop = () => {
        this.setState({ isRunning: false });
    }

    handleSpeedChange = (val) => {
        const speed = (100 - val) * 10;
        this.setState({ speed });
    }
    handleQueenChange = (number) => {
        this.setState({ number });
        const board = getBoard(this.state.number);
        this.setState({ board });
    }
    handleClear = () => {
        const board = getBoard(this.state.number);
        this.setState({ board });
    }
    handleTurnOff = () => {
        const newBoard = turnOffAttack(this.state.board, this.state.number);
        this.setState({ board: newBoard });
    }
    startAlgo = async () => {
        this.setState({ isRunning: true });
        const newBoard = this.state.board.slice();
        await this.queensAlgo(newBoard, 0);
        const newBoard2 = turnOffAttack(this.state.board, this.state.number);
        this.setState({ board: newBoard2, isRunning: false });
    }
    queensAlgo = async (board, col) => {

        if (col >= this.state.number) {
            return true;
        }

        let newBoard = board.slice();
        for (let i = 0; i < this.state.number; i++) {


            newBoard = turnOffAttack(newBoard, this.state.number);
            const result = getChecked(newBoard, i, col, this.state.number);
            newBoard = result[0];

            this.setState({ board: newBoard });
            await sleep(this.state.speed);
            if (result[1]) {
                const res = await this.queensAlgo(newBoard, col + 1)
                if (res === true) {
                    return true;
                }
                newBoard[i][col] = { ...newBoard[i][col], isPresent: true, isCurrent: true };
                this.setState({ board: newBoard });
                await sleep(this.state.speed);
                newBoard[i][col] = { ...newBoard[i][col], isPresent: false, isCurrent: false };
                this.setState({ board: newBoard });

            }
            newBoard[i][col] = { ...newBoard[i][col], isPresent: false, isCurrent: false };
            newBoard = turnOffAttack(newBoard, this.state.number);
            this.setState({ board: newBoard });
            await sleep(this.state.speed);
        }
        return false;
    }

}

export default Queen;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const turnOffAttack = (board, N) => {
    const newBoard = board.slice();
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            newBoard[i][j] = { ...newBoard[i][j], isChecked: false, isAttacked: false, isCurrent: false };
        }
    }
    return newBoard;
}

const getChecked = (board, row, col, N) => {
    const newBoard = board.slice();
    let pos = true;
    // same col
    for (let i = 0; i < N; i++) {
        if (newBoard[row][i].isPresent) {
            newBoard[row][i] = { ...newBoard[row][i], isAttacked: true };
            pos = false;
        } else {
            newBoard[row][i] = { ...newBoard[row][i], isChecked: true };
        }
    }
    // same row
    for (let i = 0; i < N; i++) {
        if (newBoard[i][col].isPresent) {
            newBoard[i][col] = { ...newBoard[i][col], isAttacked: true };
            pos = false;
        } else {
            newBoard[i][col] = { ...newBoard[i][col], isChecked: true };
        }
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (newBoard[i][j].isPresent) {
            newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
            pos = false;
        } else {
            newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
        }
    }
    for (let i = row, j = col; i < N && j >= 0; i++, j--) {
        if (newBoard[i][j].isPresent) {
            newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
            pos = false;
        } else {
            newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
        }
    }
    for (let i = row, j = col; i < N && j < N; i++, j++) {
        if (newBoard[i][j].isPresent) {
            newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
            pos = false;
        } else {
            newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
        }
    }
    for (let i = row, j = col; i >= 0 && j < N; i--, j++) {
        if (newBoard[i][j].isPresent) {
            newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
            pos = false;
        } else {
            newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
        }
    }

    newBoard[row][col] = { ...newBoard[row][col], isPresent: true, isCurrent: true };

    return [newBoard, pos];
}
const getBoard = (N) => {
    const rows = [];
    for (let i = 0; i < N; i++) {
        const cols = [];
        for (let j = 0; j < N; j++) {
            cols.push(getCell(i, j));
        }
        rows.push(cols);
    }
    return rows;
}

const getCell = (row, col) => {
    return {
        row,
        col,
        isPresent: false,
        isChecked: false,
        isAttacked: false,
        isCurrent: false
    }
}