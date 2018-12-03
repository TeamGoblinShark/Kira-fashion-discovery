import React from 'react';
import history from './history.jsx'
import PhotoUpload from './PhotoUpload.jsx'
import PhotoDisplay from './PhotoDisplay.jsx'
import Collapsible from 'react-collapsible';

import { Router, Route, Switch } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        console.log(this.props)
        return (
            <Router history={history}>
                <div>
                    <div className='header'>
                        <div className='photo-loader' onClick={this.props.handleLoader} >
                        </div>
                    </div>
                    <div className="div-shadow">
                        <Collapsible easing="ease-out" trigger={<div className='hamburger-click'></div>}>
                            <div className='filters-container'>
                                <div className="filter-item"> Filter </div>
                                <div className="filter-item"> Top </div>
                                <div className="filter-item"> Style </div>
                            </div>
                        </Collapsible>

                    </div>
                    <Switch>
                        <Route exact path="/home" render={(props) => 
                            <PhotoDisplay {...props}
                            parentState={this.props.parentState}
                            getTopPictureUrls={this.props.getTopPictureUrls}
                            />
                        } />
                        <Route exact path="/home/upload" render={(props) =>
                            <PhotoUpload {...props} 
                            parentState={this.props.parentState}
                            onImageDrop={this.props.onImageDrop}
                            uploadImageReturnHome={this.props.uploadImageReturnHome}
                            handleUploadText={this.props.handleUploadText}
                            uploadOnclickStyleOutDoor={this.props.uploadOnclickStyleOutDoor}
                            uploadOnclickStyleNightOut={this.props.uploadOnclickStyleNightOut}
                            handleUrlAndTextSubmit={this.props.handleUrlAndTextSubmit}
                            />
                        } />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Home;