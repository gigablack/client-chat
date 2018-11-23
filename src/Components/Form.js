import React,{Component} from 'react'
import {connect} from 'react-redux'
import { ACTIONS } from '../Actions/Actions'

const { addMessage, textChanging, setUsername } = ACTIONS
class Form extends Component {

    componentDidMount(){
        const {socket, username} = this.props
        this.props.setUsername(username)
        socket.emit('userConnect',username)
    }

    handleChange = (event) =>{
        this.props.textChanging(event.target.value)
    }

    submitMessage = (event) => {
        const {input,username,socket,bgAlert,bgPills} = this.props
        const message = {
            user: username,
            message: input,
            bgAlert,
            bgPills
        }
        event.preventDefault()
        if(!input) return
        socket.emit('updateUser',username)
        socket.emit('message',message)
        this.props.submitMessage(message)
    }

    render(){
        const {input} = this.props
        return (
            <div className='h-25 my-5 rounded'>
                <form onSubmit={this.submitMessage}>
                    
                    
                    <div className='row h-100'>
                        <div className='col-10'>
                            <input type='text' onChange={this.handleChange} value={input} className='form-control' id='form-message' autoComplete='off'/>
                        </div>
                        <div className='col-2'>
                            <button type='submit' value='Enviar' className='btn btn-outline-light'><i className='fas fa-paper-plane mr-2'></i>Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        input: state.input,
        socket: state.socket,
        username: state.username,
        bgAlert: state.bgAlert,
        bgPills: state.bgPills
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        textChanging(input){
            dispatch(textChanging(input))
        },
        submitMessage(text){
            dispatch(addMessage(text))
        },
        setUsername(username){
            dispatch(setUsername(username))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form)