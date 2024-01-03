// Tile.js
import React from 'react';
import './Maze.css';

const Tile = ({ sprite }) => {
    const tileStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/${sprite})`,
    };

    return <div className="tile" style={tileStyle}></div>;
};

export default Tile;