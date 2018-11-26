import React,{Component} from 'react'
import {connect} from 'react-redux'
import { ACTIONS } from '../Actions/Actions'
import $ from 'jquery'
import {Grid, FormControl,TextField,InputAdornment, IconButton} from '@material-ui/core'
import { Message, Send } from '@material-ui/icons'

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

    handleKey = (event) => {
        if(event.key === 'Enter'){
            this.submitMessage(event)
        }
    }

    submitMessage = (event) => {
        const {input,username,socket,bgPaper,bgAvatar} = this.props
        const message = {
            user: username,
            message: input,
            bgPaper,
            bgAvatar
        }
        event.preventDefault()
        if(!input) return
        socket.emit('updateUser',username)
        socket.emit('message',message)
        this.props.submitMessage(message)
        
    }

    componentDidUpdate(){
        const {appIsInit} = this.props
        if(appIsInit){
            $('textarea').focus()
        }
    }

    render(){
        const {input} = this.props
        return (
            <div className=''>
                    <form onSubmit={this.submitMessage}>
                        <Grid container>
                                <Grid item xs={10}>
                                <FormControl fullWidth id='message'>
                                    <TextField onChange={this.handleChange} onKeyDown={this.handleKey} value={input} multiline InputProps={{
                                        startAdornment : (
                                            <InputAdornment position='start' >
                                                <Message />
                                            </InputAdornment>
                                        )
                                    }}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton color='secondary' onClick={this.submitMessage}>
                                    <Send />
                                </IconButton>
                            </Grid>
                        </Grid>
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
        bgPaper: state.bgPaper,
        bgAvatar: state.bgAvatar,
        appIsInit: state.init
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