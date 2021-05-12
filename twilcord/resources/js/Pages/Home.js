import React, { useEffect } from 'react'
import {Inertia} from '@inertiajs/inertia'
import ChatForm from '../Components/Chatform'

const Home = props => {
    console.log(props)
    useEffect(() => {
        window.Echo.channel('message').listen('MessageCreated', e => {
            console.log(e)
            Inertia.reload({only: ['convo']})
        })
    }, [])
    
    return (
        <ChatForm chat={props} />
    )
}

export default Home