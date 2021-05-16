import React, {useState} from 'react'
import SignUp from '../Components/Signup'
import ChatForm from '../Components/Chatform'

const Home = () => {
    const [chat, setChat] = useState({
        chatStatus: false, sid: '', username: ''
    })
    
    function handleChange(value){
        setChat(value)
    }

    return (
        <>
            {chat.chatStatus ? (
                <ChatForm chat={chat} />
            ) : (
                <SignUp onChange={handleChange} />
            )}
        </>
    )
}

export default Home