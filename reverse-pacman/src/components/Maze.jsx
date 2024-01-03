import React from "react";
import Tile from './Tile.jsx'
import './Maze.css';

// Matrix Codes:
//
// Types of pieces that are found in spritesheet background2.png
// Outer Edges
// double_up&right_rnd_corner      A
// double_left&down_rnd_corner     B
// double_down&right_rnd_corner    C
// double_down&left_rnd_corner     D
// double_up&right_sqr_corner      E
// double_up&left_sqr_corner       F
// double_down&right_sqr_corner    H
// double_up&left_sqr_corner       J
// double_left_right_edge          K
// double_up_down_edge             L
//
// Inner Edges
// up&right_sqr_corner             M
// up&left_sqr_corner              N
// down&right_sqr_corner           O
// down&left_sqr_corner            Q
// left_right_edge                 R
// up_down_edge                    S
// path_square                     X
// horizontal_ghost_entry          G
// pacman_start_location           P
// blank                           Z

// Map Rules:
// Map is 28x31 tiles.
// Paths are only 1 tile thick
// No sharp turns (i.e. intersections are separated by atleast 2 tiles).
// There are 1 or 2 tunnels
// No dead-ends.
//    Only I, L, T, or + wall shapes are allowed, including the occasional rectangular wall.
//    Any non-rectangular wall pieces must only be 2 tiles thick.

const pacMaze = [   // 26 wide  the original pacman has a 28 long x 31 wide tile matrix
    'AKKKKKKKKKKKKKKKKKKKKKKKKKB',  // Row  1
    'L           SSS           L',  // Row  2
    'L MRRN MRRN SSS MRRN MRRN L',  // Row  3
    'L S  S S  S SSS S  S S  S L',  // Row  4
    'L ORRQ ORRQ     ORRQ ORQR L',  // Row  5
    'L           MRN           L',  // Row  6
    'L MRRN MN    S    MN MRRN L',  // Row  7
    'L ORRQ SS    S    SS ORRQ L',  // Row  8
    'L      SORRN S MRRQS      L',  // Row  9
    'ORRRRN SMRRQ S ORRMS NRRRRQ',  // Row 10
    'RRRRRQ SS         SS ORRRRR',  // Row 11
    '       OQ  MR--RN OQ       ',  // Row 12
    'RRRRRN     SG  GS    MRRRRR',  // Row 13
    'MRRRRQ     ORRRRQ    ORRRRN',  // Row 14
    'L                         L',  // Row 15
    'L                         L',  // Row 16
    'L                         L',  // Row 17
    'L                         L',  // Row 18
    'L                         L',  // Row 19
    'L                         L',  // Row 20
    'L                         L',  // Row 21
    'CKKKKKKKKKKKKKKKKKKKKKKKKKJ'   // Row 21
]

const Maze = ({ mazeData }) => {
    return (
        <div className='maze-container'>
            {mazeData.map((row, rowIndex) =>
              row.map((tile, colIndex) => {
                  return (
                      <Tile key={`${rowIndex}-${colIndex}`} sprite={tile.sprite} />
                  );
              })
            )}
        </div>
    );
};

export default Maze;
