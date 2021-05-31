import React, {useState} from 'react'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

const Record = props => {
    const [details, setDetails] = useState({
        url: null, blog: null, chunks: null, duration: {
            h: null, m: null, s: null
        }
    })

    return (
        <Recorder 
            record={true}
            title={props.title}
            audioURL={details.url}
            showUIAudio
            handleAudioStop={data => handleAudioStop(data)}
            handleOnChange={value => handleOnChange(value, props.firstname)}
            handleAudioUpload={data => handleAudioStop(data)}
            handleRest={() => handleRest()}
        />
    )
}

export default Record