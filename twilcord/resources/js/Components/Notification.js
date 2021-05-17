import React, {useEffect, useState} from 'react'

const Notification = props => {
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        if (props.notification){
            setMessage(props.notification.message)
        }
    }, [props.notification])
    
    return (
        <div 
            className={`${message ? '': 'hidden'} text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500`}
        >
            <span className="text-2xl font-bold inline-block mr-5 align-middle">
                !
            </span>
            <span className="inline-block max-w-lg align-middle mr-8">
                {message}
            </span>
            <button 
                type='button'
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                onClick={() => setMessage('')}    
            >
                <span>×</span>
            </button>
        </div>  
    )
    
}

export default Notification