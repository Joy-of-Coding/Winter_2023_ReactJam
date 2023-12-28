import {useRef, useEffect, useState} from "react";

function Maze() {
    const tileSize = 20;
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const requestRef = useRef();
    const ghost1Location = useRef({x: 13, y: 15})
    const ghost1Direction = useRef({dx: 1, dy:0})

    const map = useRef([
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
        [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
        [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
        [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]);



    function drawWall(ctx, column, row) {
        ctx.fillStyle = "#3457D5"
        ctx.fillRect(column * tileSize, row * tileSize, tileSize, tileSize);
    }

    function drawDot (ctx, column, row) {
        ctx.fillStyle = "yellow";  // yellow color for pellets
        ctx.beginPath();
        // Calculate the center of the tile for the arc
        let centerX = column * tileSize + tileSize / 2;
        let centerY = row * tileSize + tileSize / 2;
        ctx.arc(centerX, centerY, tileSize / 6, 0, 2 * Math.PI); // smaller radius for pellet
        ctx.fill();
    }
    function drawGhost (ctx, column, row, color) {
        ctx.fillStyle = color;  // yellow color for pellets
        ctx.fillRect(column * tileSize, row * tileSize, tileSize, tileSize);
    }



    function update() {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Correctly accessing ghost position and direction
        let g1x = ghost1Location.current.x;
        let g1y = ghost1Location.current.y;
        let dx = ghost1Direction.current.dx;
        let dy = ghost1Direction.current.dy;
        console.log(g1x, g1y, dx, dy)

        // Calculate new potential position of the ghost
        let newG1x = g1x + dx;
        let newG1y = g1y + dy;

        // Convert pixel position to tile position for collision checking
        let tileX = Math.floor(ghost1Location.current.x / tileSize);
        let tileY = Math.floor(ghost1Location.current.y / tileSize);

        console.log("Ghost Pixel Position:", ghost1Location.current.x, ghost1Location.current.y);
        console.log("Proposed New Pixel Position:", newG1x, newG1y);
        console.log("Calculated Tile Position:", tileX, tileY);



        if (
            newG1x >= 0 && newG1x < canvas.width && // Ensure the new position is within the canvas width
            newG1y >= 0 && newG1y < canvas.height && // Ensure the new position is within the canvas height
            tileX >= 0 && tileX < map.current[0].length && // Ensure the tile position is within the map width
            tileY >= 0 && tileY < map.current.length && // Ensure the tile position is within the map height
            map.current[tileY][tileX] !== 1 // Check if the tile is not a wall
        )  {
            // Update the position if it's not colliding
            ghost1Location.current.x = newG1x;
            ghost1Location.current.y = newG1y;
        } else {
            // Change direction if hitting a wall or boundary
            ghost1Direction.current.dx *= -1;
            ghost1Direction.current.dy *= -1;
        }

        // Drawing the maze
        for (let row = 0; row < map.current.length; row++) {
            for (let column = 0; column < map.current[row].length; column++) {
                let tile = map.current[row][column];
                switch(tile) {
                    case 1: // Wall
                        drawWall(ctx, column, row);
                        break;
                    case 0: // Pellet
                        drawDot(ctx, column, row);
                        break;
                    // case 2: //Ghost 1
                    //     drawGhost(ctx, column, row, "pink")
                }
            }
        }


        drawGhost(ctx, ghost1Location.current.x, ghost1Location.current.y, "pink")

        requestRef.current = requestAnimationFrame(update);
    }


    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.width = map.current[0].length * tileSize;
        canvas.height =map.current.length * tileSize;

        const ctx = canvas.getContext('2d');


        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Draws a rectangle covering the entire canvas

        contextRef.current = ctx;
        update (ctx)

        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current);
    }, [ghost1Location, map]);


    return (
        <canvas ref={canvasRef} />
    );
}

export default Maze;
