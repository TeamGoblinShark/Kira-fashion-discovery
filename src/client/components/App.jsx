import React from 'react';
import Login from './../router/Login.jsx'
import { Router, Route, Switch } from 'react-router-dom'
import Home from './../router/Home.jsx'
import history from './../router/history.jsx'
import PhotoUpload from './../router/PhotoUpload.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoader = this.handleLoader.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault();
        // event.target.reset();
        history.push('/home');
    }

    handleUsername(event) {
        console.log(event.target.value)
        this.setState({
            username: event.target.value
        })
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    handleLoader() {
        history.push('/home/upload');
        console.log("hi")
    }

    render() {
        return (
            // ROUTES
            <Router history={history}>
                <Switch>
                    <Route exact path="/"
                        render={(props) =>
                            <Login {...props}
                                handleUsername={this.handleUsername}
                                handlePassword={this.handlePassword}
                                handleSubmit={this.handleSubmit} />
                        }
                    />
                    <Route path="/home"
                        render={(props) =>
                            <Home {...props} handleLoader={this.handleLoader}
                            />
                        }
                    />
                    <Route exact path="/upload" render={(props) => <PhotoUpload {...props}
                    />
                    } />

                </Switch>

            </Router>
        )
    }

}


export default App;