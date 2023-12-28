import {useEffect, useState} from "react";

function Counter() {
    // let count = 0
    const [count, setCount] = useState(5)

    useEffect(() => {
        console.log(count)
    }, [count]);


    return (
        <>
            <p>{count}</p>

            <button onClick={()=>{
                setCount(count-1)

            }}>Decrease</button>



            <button onClick={()=>{
               setCount(-13)

            }}>Reset</button>




            <button onClick={()=>{
                setCount(count+1)

            }}>Increase</button>
        </>
    )

}

export default Counter







