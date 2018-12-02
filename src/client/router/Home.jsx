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
        return (
            <Router history={history}>
                <div>
                    <div className='header'>
                        <div className='photo-loader' onClick={this.props.handleLoader} >
                        </div>
                    </div>
                    <div className="div-shadow">
                        <Collapsible trigger={<div className='hamburger-click'></div>}>
                            <div className='filters-container'>
                                <div className="filter-item"> Filter </div>
                                <div className="filter-item"> Top </div>
                                <div className="filter-item"> Style </div>
                            </div>
                        </Collapsible>

                    </div>
                    <Switch>
                        <Route exact path="/home" component={PhotoDisplay} />
                        <Route exact path="/home/upload" component={PhotoUpload} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Home;