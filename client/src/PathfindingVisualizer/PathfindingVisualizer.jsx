import React, { Component,useState,useEffect } from 'react';
import { Button } from '@material-ui/core';
import Node from './Node/Node';
import { dijkstra } from '../Pathfinderalgo/dijkstra';
import { AStar } from '../Pathfinderalgo/aStar';
import { dfs } from '../Pathfinderalgo/dfs';
import { bfs } from '../Pathfinderalgo/bfs';
import { Box } from '@mui/material';
import QueReply from "../Questions/QueReply";
import './PathfindingVisualizer.css';

// ======================Tutorial Component===================================
const Tutorial=() =>{
  const [page, setPage] = useState(1);
  const [Tutdata, setTutdata] = useState({})
  const totalpage = 7; // === Please write total tutorial page used for this algorithm
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
                  h3: 'Welcome to Pathfinding Visualizer!',
                  h6: 'This short tutorial will walk you through all of the features of this application.',
                  p: 'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
              })

              break;
          case 2:
              setTutdata({
                  h3:'What is a pathfinding visualizer?',
                  h6:'At its core, a pathfinding visualizer seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!',
                  p:'All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.',
              })
              break;
          case 3:
              setTutdata({
                  h3:'Picking an algorithm',
                  h6:'Choose an algorithm from the "Algorithms" drop-down menu.',
                  p:<p>Note that some algorithms are <i><b>unweighted</b></i>, while others are <i><b>weighted</b></i>. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path. </p>,
              })
              break;
          case 4:
              setTutdata({
                  h3:'What is a pathfinding algorithm?',
                  h6:'A pathfinding algorithm is nothing but a searching which are used to search the nearest nodes.',
                  p:"There are major four types of algorithms which are used into this block which are as Dijkstra's Algorithm , A* Algorithm, DFS and BFS algo.",
              })
              break;              
          case 5:
              setTutdata({
                  h3:"Dijkstra's algorithm?",
                  h6:'This is a popular algorithm for finding shortest path between two nodes given by computer scientist Edsger W.Dijkstra.There are many versions of Dijkstra algorithm but in this module we will see the common variant which fixes a single node marks it as a source and find shortest path from the source to the destination node.',
                  p:"The paths are labeled as positive integers or real numbers and are ordered for traversing.It uses a separate data structure for storing partial solutions or distance from the source while original algorithm uses a min priority queue.",
                  link:<Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/' target="_blank" rel='noreferrer'>See Algorithm</a></Button>,
                  
              })
              break;              
          case 6:
              setTutdata({
                  h3:"A* algorithm?",
                  h6:"A* Search (weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm",
                  p:" A* is classified as one of the best and optimal algorithms for shortest path finding and graph traversal.It is often known for its completeness , optimality and efficiency.It uses heuristics value for guiding its path and also considered as extension of Dijkstra algorithm.",
                  link:<Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/a-search-algorithm/' rel='noreferrer' target="_blank">See Algorithm</a></Button>,

                })
              break;              
          case 7:
              setTutdata({
                  h3:"DFS and BFS algorithm?",
                  h6:'DFS stands for depth first search and BFS stands for breadth first search. These both algorithm are using bruteforce approach for finding the path.',
                  p:"The major difference between them is that dfs starts tracersing its nodes to depth of parent node and bfs traverse each and every level of tree parallely.",
                  link:<Button variant='contained' color='primary'><a href='https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' rel='noreferrer' target="_blank">See Algorithm</a></Button>,

                })
              break;              

          default:
              setTutdata({
                  h3:'Welcome in AlgoViz Project',
                  h6:"It's a project which demonstrate the working of different algorithms",
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
              <button id="nextButton" className="btn btn-default navbar-btn" type="button" onClick={Next}>{page===totalpage?'FINISH':'NEXT'}</button>
              <button id="previousButton" className="btn btn-default navbar-btn" type="button" onClick={Previous}>Previous</button>
              <button id="skipButton" className="btn btn-default navbar-btn" type="button" onClick={Skip}>Skip Tutorial</button>
          </div>
      </>
  )
}
export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: 5,
      FINISH_NODE_ROW: 5,
      START_NODE_COL: 5,
      FINISH_NODE_COL: 15,
      mouseIsPressed: false,
      ROW_COUNT: 25,
      COLUMN_COUNT: 35,
      MOBILE_ROW_COUNT: 10,
      MOBILE_COLUMN_COUNT: 20,
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false, // xxxxxxx
      currRow: 0,
      currCol: 0,
      isDesktopView: true,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.toggleIsRunning = this.toggleIsRunning.bind(this);
  }
  // ==========================================================================
  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  toggleIsRunning() {
    this.setState({ isRunning: !this.state.isRunning });
  }

  toggleView() {
    if (!this.state.isRunning) {
      this.clearGrid();
      this.clearWalls();
      const isDesktopView = !this.state.isDesktopView;
      let grid;
      if (isDesktopView) {
        grid = this.getInitialGrid(
          this.state.ROW_COUNT,
          this.state.COLUMN_COUNT,
        );
        this.setState({ isDesktopView, grid });
      } else {
        if (
          this.state.START_NODE_ROW > this.state.MOBILE_ROW_COUNT ||
          this.state.FINISH_NODE_ROW > this.state.MOBILE_ROW_COUNT ||
          this.state.START_NODE_COL > this.state.MOBILE_COLUMN_COUNT ||
          this.state.FINISH_NODE_COL > this.state.MOBILE_COLUMN_COUNT
        ) {
          alert('Start & Finish Nodes Must Be within 10 Rows x 20 Columns');
        } else {
          grid = this.getInitialGrid(
            this.state.MOBILE_ROW_COUNT,
            this.state.MOBILE_COLUMN_COUNT,
          );
          this.setState({ isDesktopView, grid });
        }
      }
    }
  }

  /******************** Set up the initial grid ********************/
  getInitialGrid = (
    rowCount = this.state.ROW_COUNT,
    colCount = this.state.COLUMN_COUNT,
  ) => {
    const initialGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(this.createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  createNode = (row, col) => {
    return {
      row,
      col,
      isStart:
        row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish:
        row === this.state.FINISH_NODE_ROW &&
        col === this.state.FINISH_NODE_COL,
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(this.state.FINISH_NODE_ROW - row) +
        Math.abs(this.state.FINISH_NODE_COL - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };

  /******************** Control mouse events ********************/
  handleMouseDown(row, col) {
    if (!this.state.isRunning) {
      if (this.isGridClear()) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          'node node-start'
        ) {
          this.setState({
            mouseIsPressed: true,
            isStartNode: true,
            currRow: row,
            currCol: col,
          });
        } else if (
          document.getElementById(`node-${row}-${col}`).className ===
          'node node-finish'
        ) {
          this.setState({
            mouseIsPressed: true,
            isFinishNode: true,
            currRow: row,
            currCol: col,
          });
        } else {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({
            grid: newGrid,
            mouseIsPressed: true,
            isWallNode: true,
            currRow: row,
            currCol: col,
          });
        }
      } else {
        this.clearGrid();
      }
    }
  }

  isGridClear() {
    for (const row of this.state.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName === 'node node-visited' ||
          nodeClassName === 'node node-shortest-path'
        ) {
          return false;
        }
      }
    }
    return true;
  }

  handleMouseEnter(row, col) {
    if (!this.state.isRunning) {
      if (this.state.mouseIsPressed) {
        const nodeClassName = document.getElementById(`node-${row}-${col}`)
          .className;
        if (this.state.isStartNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevStartNode = this.state.grid[this.state.currRow][
              this.state.currCol
            ];
            prevStartNode.isStart = false;
            document.getElementById(
              `node-${this.state.currRow}-${this.state.currCol}`,
            ).className = 'node';

            this.setState({ currRow: row, currCol: col });
            const currStartNode = this.state.grid[row][col];
            currStartNode.isStart = true;
            document.getElementById(`node-${row}-${col}`).className =
              'node node-start';
          }
          this.setState({ START_NODE_ROW: row, START_NODE_COL: col });
        } else if (this.state.isFinishNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevFinishNode = this.state.grid[this.state.currRow][
              this.state.currCol
            ];
            prevFinishNode.isFinish = false;
            document.getElementById(
              `node-${this.state.currRow}-${this.state.currCol}`,
            ).className = 'node';

            this.setState({ currRow: row, currCol: col });
            const currFinishNode = this.state.grid[row][col];
            currFinishNode.isFinish = true;
            document.getElementById(`node-${row}-${col}`).className =
              'node node-finish';
          }
          this.setState({ FINISH_NODE_ROW: row, FINISH_NODE_COL: col });
        } else if (this.state.isWallNode) {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({ grid: newGrid });
        }
      }
    }
  }

  handleMouseUp(row, col) {
    if (!this.state.isRunning) {
      this.setState({ mouseIsPressed: false });
      if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        this.setState({ isStartNode, START_NODE_ROW: row, START_NODE_COL: col });
      } else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({
          isFinishNode,
          FINISH_NODE_ROW: row,
          FINISH_NODE_COL: col,
        });
      }
      this.getInitialGrid();
    }
  }

  handleMouseLeave() {
    if (this.state.isStartNode) {
      const isStartNode = !this.state.isStartNode;
      this.setState({ isStartNode, mouseIsPressed: false });
    } else if (this.state.isFinishNode) {
      const isFinishNode = !this.state.isFinishNode;
      this.setState({ isFinishNode, mouseIsPressed: false });
    } else if (this.state.isWallNode) {
      const isWallNode = !this.state.isWallNode;
      this.setState({ isWallNode, mouseIsPressed: false });
      this.getInitialGrid();
    }
  }

  /******************** Clear Board/Walls ********************/

  clearGrid() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish' &&
            nodeClassName !== 'node node-wall'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
          }
          if (nodeClassName === 'node node-finish') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === 'node node-start') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }

  clearWalls() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (nodeClassName === 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            node.isWall = false;
          }
        }
      }
    }
  }

  /******************** Create Animations ********************/
  visualize(algo) {
    if (!this.state.isRunning) {
      this.clearGrid();
      this.toggleIsRunning();
      const { grid } = this.state;
      const startNode =
        grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode =
        grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      let visitedNodesInOrder;
      switch (algo) {
        case 'Dijkstra':
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
          break;
        case 'AStar':
          visitedNodesInOrder = AStar(grid, startNode, finishNode);
          break;
        case 'BFS':
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        default:
          // should never get here
          break;
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push('end');
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName !== 'node node-start' &&
          nodeClassName !== 'node node-finish'
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
  }

  /******************** Create path from start to finish ********************/
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === 'end') {
        setTimeout(() => {
          this.toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }
        }, i * 40);
      }
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
        <Tutorial/>
        <Box className="pathfinderbutton">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.clearGrid()}>
            Clear Grid
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.clearWalls()}>
            Clear Walls
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.visualize('Dijkstra')}>
            Dijkstra's
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.visualize('AStar')}>
            A*
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.visualize('BFS')}>
            Bread First Search
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.visualize('DFS')}>
            Depth First Search
          </button>
          {this.state.isDesktopView ? (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => this.toggleView()}>
              Mobile View
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => this.toggleView()}>
              Desktop View
            </button>
          )}
        </Box>
        <table
          className="grid-container"
          onMouseLeave={() => this.handleMouseLeave()}>
          <tbody className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp(row, col)}
                        row={row}></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <QueReply pagename={"pathfinder"}/>
      </div>
    );
  }
}

/******************** Create Walls ********************/
const getNewGridWithWallToggled = (grid, row, col) => {
  // mouseDown starts to act strange if I don't make newGrid and work off of grid instead.
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish && node.isNode) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

// Backtracks from the finishNode to find the shortest path.
// Only works when called after the pathfinding methods.
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
