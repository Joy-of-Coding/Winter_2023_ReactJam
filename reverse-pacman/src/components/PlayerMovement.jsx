import {useState, useEffect} from 'react'

let moveBy = 10;
function PlayerMovement() {
    const [top, setTop] = useState(100);
    const [left, setLeft] = useState(100);

    console.log(top, left)


    useEffect(() => {
        document.addEventListener('keypress', characterMovement)

        return ()=> {
            document.removeEventListener('keypress', characterMovement);
        }
    }, []);


    const characterMovement = (event) => {
        console.log("Key pressed")
        switch(event.key) {
            case 'w':  //up
                setTop((prevState)=> prevState - moveBy );
                break;
            case 'a': //left
                setLeft( (prevState) => prevState - moveBy );
                break;
            case 's': //down
                setTop((prevState)=>  prevState + moveBy );
                break;
            case 'd': //right
                setLeft( prevState => prevState + moveBy );
                break;
            default:
                console.log("hello world")
                break;
        }
    };

    return (
        <>
            <div
                className='element'
                style={{
                    top: top + 'px',
                    left: left + 'px' ,
                    width:'10px',
                    height: '10px',
                    // position: 'absolute',
                    position: 'relative',
                    backgroundColor: 'red'}}
            />
        </>
    );
}

export default PlayerMovement