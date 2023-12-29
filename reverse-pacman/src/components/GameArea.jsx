import { useState } from 'react'
import './GameArea.css'
import bkgnd_image from "../assets/images/pac man tiles/background2.png"





// Import images for walls into array
const PngParser = () => {
    const [pixelData, setPixelData] = useState([]);

    const parsePngIntoSegments = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                const newPixelData = [];

                for (let y = 0; y < canvas.height; y += 16) {
                    for (let x = 0; x < canvas.width; x += 16) {
                        const segment = context.getImageData(x, y, 16, 16).data;
                        newPixelData.push(segment);
                    }
                }

                setPixelData(newPixelData);

            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];

        if (file) {
            parsePngIntoSegments(file);
        }
    };

    return (
        <div>
            <h3>Parse PNG into 16x16 Segments</h3>
            <input type="file" onChange={handleFileSelect} accept=".png" />
            {pixelData.length > 0 && (
                <div>
                    <h4>Displaying Segments:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {pixelData.map((segment, index) => (
                            <canvas
                                key={index}
                                width="16"
                                height="16"
                                style={{ border: '1px solid #000', margin: '3px' }}
                                ref={(canvas) => {
                                    if (canvas) {
                                        const context = canvas.getContext('2d');
                                        const imageData = new ImageData(new Uint8ClampedArray(segment), 16, 16);
                                        context.putImageData(imageData, 0, 0);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};



function GameArea() {
    // const score= 0
    // const highScore = 300

    // const pngFile = bkgnd_image;
    return (
        <div>
            <h1>React PNG Parser</h1>
            <PngParser />
            {/*<ImageInfoDisplay pngFile={ pngFile }/>*/}
            {/*/!*<PixelCountDisplay pngFile={ pngFile }/>*!/*/}
            {/*<PngImageDisplay pngFile={ pngFile }/>*/}
            {/*<PngParserFunction pngFile={ pngFile } />*/}
        </div>
    );

    // return (
    //     <div className='gameArea'>
    //         <div className='score'>
    //             <div>
    //                 <p>Score</p>
    //                 <p>{score}</p>
    //             </div>
    //             <div>
    //                 <p>High Score</p>
    //                 <p>{highScore}</p>
    //             </div>
    //         </div>
    //         <div className='board'>Game Play Area</div>
    //     </div>
    // )
}

export default GameArea
