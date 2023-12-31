import { useRef, useEffect } from "react";

function Maze() {
    const tileSize = 20;
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const map = [
            [3, 1, 0, 2, 0, 2, 5, 4, 0, 3],
            [5, 5, 2, 5, 4, 5, 0, 4, 4, 5],
            [5, 4, 3, 5, 5, 5, 2, 3, 1, 3],
            [4, 4, 2, 4, 5, 2, 5, 1, 4, 4],
            [5, 0, 2, 3, 5, 1, 1, 2, 3, 0],
            [3, 3, 4, 2, 5, 2, 0, 4, 1, 5],
            [3, 0, 5, 3, 1, 2, 4, 4, 4, 1],
            [3, 4, 4, 1, 4, 1, 4, 2, 3, 1],
            [0, 5, 2, 2, 5, 0, 4, 1, 4, 4],
            [0, 5, 1, 4, 3, 1, 3, 0, 0, 0]
        ]
    ;


    function drawWall(ctx, column, row) {
        ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
        ctx.fillRect(column * tileSize, row * tileSize, tileSize, tileSize);
    }

    function drawRect(ctx, column, row, color) {
        ctx.fillStyle = color;
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


    function draw(ctx) {
            for (let row= 0; row < map.length; row ++) {
                for (let column = 0; column < map[row].length; column++){
                    let tile = map[row][column];
                    switch(tile) {
                        case 1: // Wall
                            drawWall(ctx, column, row);
                            break;
                        case 0: // Pellet
                            drawDot(ctx, column, row);
                            break;
                        case 2: // brick
                            drawRect(ctx, column, row, "red");
                            break;
                        case 3: // grass
                            drawRect(ctx, column, row, "green");
                            break;
                        case 4: // Grame
                            drawRect(ctx, column, row, "purple");
                            break;

                    }
                }
            }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = map[0].length * tileSize;
        canvas.height =map.length * tileSize;

        const ctx = canvas.getContext('2d');


        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Draws a rectangle covering the entire canvas

        contextRef.current = ctx;

        draw (ctx)
    }, []);


    return (
        <canvas ref={canvasRef} />
    );
}

export default Maze;
