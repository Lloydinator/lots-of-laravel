import React from 'react'

const Bubble = ({text, time, username}) => (
    <div className="flex items-start mb-4 py-2">
        <img 
            src="https://picsum.photos/id/237/200/300.jpg" 
            className="w-10 h-10 rounded-full mr-3" 
        />
        <div className="flex-1 overflow-hidden">
            <div>
                <span className="text-2xl font-semibold text-blue-200 mr-4">{username}</span>
                <span className="text-gray-300 text-xs">{time}</span>
            </div>
            <p className="text-lg text-white leading-normal">{text}</p>
        </div>
    </div>
)

export default Bubble