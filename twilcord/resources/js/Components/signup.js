import React, {useState, useEffect} from 'react'
import {Inertia} from '@inertiajs/inertia'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [userType, setUserType] = useState('username')
    const [convo, setConvo] = useState({sid: '', name: ''})
    const [chatExists, setChatExists] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    function handleChange(e){
        setUsername(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        
        // If user doesn't check the box to join existing room
        if (chatExists === false){
            Inertia.post('/convo/create', {}, {
                onSuccess: ({props}) => {

                    // If user joins by username
                    if (userType === 'username'){
                        Inertia.post(
                            `/convo/${props.flash.message}/chat-participant/new`,
                            {username: username},
                            {
                                onStart: () => {
                                    setSubmitting(true)
                                },/*
                                onSuccess: res => {
                                    console.log(res)
                                },
                                onFinish: () => {
                                    setSubmitting(false)
                                }*/
                            }
                        )
                    }
                    // If user joins by number
                    else {
                        Inertia.post(
                            `/convo/${props.flash.message}/sms-participant/new`,
                            {number: username},
                            {
                                onStart: () => {
                                    setSubmitting(true)
                                },/*
                                onSuccess: res => {
                                    console.log(res)
                                },
                                onFinish: () => {
                                    setSubmitting(false)
                                }*/
                            }
                        )
                    }
                }
            })
        }
        // If user checks the box to join existing room
        else {
            // If user joins by username
            if (userType === 'username'){
                Inertia.post(
                    `/convo/${convo.sid}/chat-participant/new`,
                    {username: username},
                    {
                        onStart: () => {
                            setSubmitting(true)
                        },/*
                        onSuccess: res => {
                            console.log(res)
                        },
                        onFinish: () => {
                            setSubmitting(false)
                        }*/
                    }
                )
            }
            // If user joins by number
            else {
                Inertia.post(
                    `/convo/${convo.sid}/sms-participant/new`,
                    {number: username},
                    {
                        onStart: () => {
                            setSubmitting(true)
                        },/*
                        onSuccess: res => {
                            console.log(res)
                        },
                        onFinish: () => {
                            setSubmitting(false)
                        }*/
                    }
                )
            }
        }
    }

    // Fetch data from sid.json
    async function jsonFile(){
        const response = await fetch('./sid.json', {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        const data = await response.json()
        setConvo({sid: data.sid, name: data.chat_name})
    }

    useEffect(() => {
        jsonFile()
    }, [])
  
    return (
        <div className="flex justify-center">
            <div className="align-middle mt-20">
                <form onSubmit={handleSubmit}>
                    {convo.name ? (
                        <div className="mt-2">
                            <div>
                                <label className="inline-flex items-center">
                                    <input 
                                        type="checkbox" 
                                        className="form-checkbox" 
                                        onChange={() => setChatExists(!chatExists)} 
                                    />
                                    <span className="ml-2">Join Chat "{convo.name}"</span>
                                </label>
                            </div>
                        </div>
                    ) : (
                        null
                    )}
                    <input 
                        id="username"
                        value={username}
                        onChange={handleChange}
                        className="my-6 p-3 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0" 
                    />
                    <div className="flex">
                        <button 
                            className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow-inner outline-none focus:outline-none mr-1 mb-1" 
                            onClick={() => setUserType('username')}
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Enter with Username"}
                        </button>
                        <button 
                            className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow-inner outline-none focus:outline-none mr-1 mb-1" 
                            onClick={() => setUserType('number')}
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Enter with Number"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default SignUp