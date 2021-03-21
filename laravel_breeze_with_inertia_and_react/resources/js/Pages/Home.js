import React, {useEffect, useState} from 'react'
import {Inertia} from '@inertiajs/inertia-react'
import Bubble from '../Components/bubble'

const Home = () => {
    const [subject, setSubject] = useState({
        color: '', position: '', text: ''
    })
    const [thisText, setThisText] = useState('')

    function handleChange(e){
        setThisText(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        setSubject({
            color: 'bg-blue-500', position: 'ml-auto', text: thisText
        })
    }

    function clearField(){
        setThisText('')
    }

    useEffect(() => {
        clearField()
    }, [subject])

    return (
        <div className="mx-auto w-1/2 mt-20 mb-16">
            <div className="shadow-inner h-64 px-2 mb-2 bg-gray-200 rounded-md">
                <div className="flex flex-row">
                {subject.text ? (
                    <Bubble color={subject.color} position={subject.position} text={subject.text} />
                    ) : (
                        null
                    )
                }
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row">
                    <textarea 
                        className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 outline-none resize-none"
                        rows="1"
                        placeholder="Place your message here..."
                        value={thisText}
                        onChange={handleChange}
                    />
                    <button 
                        type="submit" 
                        className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow-inner outline-none focus:outline-none mr-1 mb-1"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Home