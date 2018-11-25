import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ACTIONS } from '../Actions/Actions'

const {newMessage} = ACTIONS

class Messages extends Component {
    componentDidMount(){
        const { socket, newMessage } = this.props
        socket.on('message',(message) =>{
            console.log(message)
            newMessage(message)
            document.getElementById('messages').scrollBy(0,10000)
        })
    }
    render(){

        const messages = this.props.messages.map((message,index) => {
            return (<div key={index}><span >{message.user}</span>   <span>{message.message}</span></div>)
        })
        return (
            <div className='' id='messages'>
                <div className=''>{messages}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages : state.messages,
        socket: state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newMessage(message){
            dispatch(newMessage(message))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Messages)