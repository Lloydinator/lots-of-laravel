import React, {useState} from 'react'
import SignUp from '../Components/signup'
import ChatForm from '../Components/chatform'

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