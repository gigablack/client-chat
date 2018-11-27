import React,{Component} from 'react'
import Form from './Form'
import Messages from './Messages'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import {ACTIONS} from '../Actions/Actions'

const {userIsTyping,clearUserTyping} = ACTIONS

class Chat extends Component {
    componentDidUpdate(){
        const {socket,userTyping,clearUserTyping} = this.props
        socket.on('typing',(username)=>{
            userTyping(username)
            
            
        })

        setTimeout(()=>{
            clearUserTyping()
        },5000)
        
    }
    render(){
        const {userIsTyping} = this.props
        return (
            <div className='' id='chat'>
                <Paper>
                    <Messages userIsTyping={userIsTyping}/>
                </Paper>
                    <Form />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        appIsInit: state.init,
        socket: state.socket,
        userIsTyping: state.userIsTyping
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userTyping(username){
            dispatch(userIsTyping(username))
        },

        clearUserTyping(){
            dispatch(clearUserTyping())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat)