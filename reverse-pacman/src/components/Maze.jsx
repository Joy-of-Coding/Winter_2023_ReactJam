import {useRef, useEffect, useState} from "react";

function Maze() {
    const speed = -0.3
    const tileSize = 20;
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const requestRef = useRef();
    const ghost1Location = useRef({x: 239, y: 279})
    // const ghost1Location = useRef({x: 20, y: 20})

    const ghost1Direction = useRef({dx: speed, dy:0})
    // let [iter, setIter] = useState(0)

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
        ctx.fillRect(column , row , tileSize, tileSize);
    }

    function isValidCell(tileX, tileY) {
        return (
            tileX >= 0 &&
            tileX < map.current[0].length &&
            tileY >= 0 &&
            tileY < map.current.length &&
            map.current[tileY][tileX] !== 1
        );
    }

    function update() {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Current ghost position and direction

        let g1x = ghost1Location.current.x;
        let g1y = ghost1Location.current.y;
        let dx = ghost1Direction.current.dx;
        let dy = ghost1Direction.current.dy;


        // Calculate new potential position of the ghost
        let newG1x = g1x + dx;
        let newG1y = g1y + dy;

        // Convert pixel position to tile position for collision checking
        let tileXLeft = Math.floor((newG1x) / tileSize);
        let tileYTop = Math.floor((newG1y) / tileSize);
        let tileXRight = Math.floor((newG1y + tileSize - 1 ) / tileSize);
        let tileYBottom = Math.floor((newG1y + tileSize - 1) / tileSize);

            if (
                isValidCell(tileXLeft, tileYTop) &&
                isValidCell(tileXRight, tileYTop) &&
                isValidCell(tileXLeft, tileYBottom) &&
                isValidCell(tileXRight, tileYBottom)
                ) // tile is a corridor
            {
                // Update the position if it// 's not colliding
                console.log("update non colliding position")
                ghost1Location.current.x = newG1x;
                ghost1Location.current.y = newG1y;
            }
             else
            {
                //choose random direction up, down, right or left
                const direction = Math.floor(Math.random() * 4)

                switch (direction) {
                    case 0:
                        console.log("Go up")
                        ghost1Direction.current.dx = 0 // go up
                        ghost1Direction.current.dy = -speed
                        break;
                    case 1:
                        console.log("Go right")
                        ghost1Direction.current.dx = speed  // go right
                        ghost1Direction.current.dy = 0
                        break;
                    case 2:
                        console.log("Go down")
                        ghost1Direction.current.dx = 0 // go down
                        ghost1Direction.current.dy = speed
                        break;
                    case 3:
                        console.log("Go left")
                        ghost1Direction.current.dx = -speed  // go left
                        ghost1Direction.current.dy = 0
                        break;
                }
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
    }, []);


    return (
        <canvas ref={canvasRef} />
    );
}

export default Maze;
