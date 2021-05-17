import React, {useState, useEffect} from 'react'
import {Inertia} from '@inertiajs/inertia'
import Message from './Message'
import Notification from './Notification'

const ChatForm = ({chat}) => {
    const [thisText, setThisText] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [chatName, setChatName] = useState('')

    function handleChange(e){
        setThisText(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        
        Inertia.post(`/convo/${chat.sid}/create-message`, {
            message: thisText
        }, 
        {
            onStart: () => {
                setSubmitting(true)
            },
            onFinish: () => {
                clearField()
                setSubmitting(false)
            }
        })
    }

    function clearField(){
        setThisText('')
    }

    // Fetch data from sid.json
    async function jsonFile(){
        const response = await fetch('./sid.json', {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        const data = await response.json()
        setChatName(data.chat_name)
    }

    useEffect(() => {
        jsonFile()
    }, [])

<<<<<<< HEAD
    // Fetch messages
    async function getMessages(){
        const response = await fetch(`/convo/${chat.sid}/messages`)
        const json = await response.json()

        if (json.messages.length > arrLength){
            setMessages(json.messages)
            setArrLength(json.messages.length)
        }
    }

    // Fetch messages every three seconds and clean up once component unmounts
    useEffect(() => {
        const interval = setInterval(() => {
            getMessages()
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    
=======
>>>>>>> part2
    return (
        <div className="h-screen mx-auto lg:w-1/2 md:w-4/6 w-full mt-2">
            <h1 className="font-mono font-semibold text-black text-4xl text-center my-6">TWILCORD</h1>
            <Notification notification={chat.flash.notification} />
            <div className="flex justify-between">
                <p className="font-sans font-semibold text-lg text-black">{chatName}</p>
                <p className="font-sans font-semibold text-lg text-black">{chat.user}</p>
            </div>
            <div className="h-3/4 overflow-y-scroll px-6 py-4 mb-2 bg-gray-800 rounded-md">
<<<<<<< HEAD
                {messages.map((message, i) => (
                    <Message 
=======
                {chat.convo.map((message, i) => (
                    <Message
>>>>>>> part2
                        key={i} 
                        time={message[3]}
                        username={message[1] == chat.user ? "Me" : message[1]} 
                        text={message[2]} 
                    />
                ))}
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
                        disabled={submitting}
                    >
                        {submitting ? "Sending" : "Send"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatForm