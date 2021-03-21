import React from 'react'

const Bubble = (props) => {
    console.log(props)
    return (
        <div className={`${props.position} ${props.color} inline-block h-auto min-w-1/6 mx-4 my-2 p-2 rounded-lg`}>
            <p className="font-sans text-lg text-white font-semibold">{props.text}</p>
        </div>
    )
}

export default Bubble