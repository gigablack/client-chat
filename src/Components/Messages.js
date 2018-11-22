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
        })
    }
    render(){

        const messages = this.props.messages.map((message,index) => {
            //return (<li key={index} className='list-group-item mb-1 rounded nunito font-weight-bold'><span className='badge badge-pill badge-dark font-weight-bold'>{message.user}</span><i className='fas fa-angle-double-right'></i> <span className='font-italic'>{message.message}</span></li>)
            return (<div className='alert alert-secondary mb-1 rounded nunito font-weight-bold font-size-pills' key={index}><span className='badge badge-pill badge-dark'>{message.user}</span><i className='fas fa-angle-double-right'></i>   <span className='font-italic'>{message.message}</span></div>)
        })
        return (
            <div className='h-75 shadow-lg rounded p-5 messages bg-secondary'>
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