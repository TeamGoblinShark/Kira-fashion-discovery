import React from 'react'
import history from './history.jsx'


class PhotoUpload extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                Pictures
                <button className='back-btn' onClick={() => history.push('/home')}>Go Back</button>
            </div>
        )
    }
};


export default PhotoUpload;