import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="login-container">
                <div className='form-login'>
                    <div className='form-inner'>
                        <form onSubmit={this.props.handleSubmit} >
                            <div className='user-pass'>
                                <label >
                                    Username
                                    <input placeholder="user name" type="text" value={this.props.username} onChange={this.props.handleUsername} />
                                </label>
                                <input placeholder="password" type="text" value={this.props.password} onChange={this.props.handlePassword} />
                            </div>
                            <div className='sumbit'>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;