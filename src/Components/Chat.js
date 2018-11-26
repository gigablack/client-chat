import React,{Component} from 'react'
import Form from './Form'
import Messages from './Messages'
//import UserList from './UserList'
//import $ from 'jquery'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'

class Chat extends Component {
    render(){
        return (
            <div className='' id='chat'>
                <Paper>
                    <Messages />
                </Paper>
                    <Form />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        appIsInit: state.init
    }
}

export default connect(mapStateToProps)(Chat)