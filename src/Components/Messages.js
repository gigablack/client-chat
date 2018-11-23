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
            return (<div className={`alert alert-${message.bgAlert} mb-1 rounded nunito font-weight-bold font-size-pills`} key={index}><span className={`badge badge-pill badge-${message.bgPills}`}>{message.user}</span><i className='fas fa-angle-double-right'></i>   <span className='font-italic'>{message.message}</span></div>)
        })
        return (
            <div className='h-75 shadow-lg rounded p-5 messages bg-secondary' id='messages'>
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