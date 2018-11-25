import React,{Component} from 'react'
import {connect} from 'react-redux'
import { ACTIONS } from '../Actions/Actions'
//import $ from 'jquery'
import {Grid, FormControl,TextField,InputAdornment, IconButton} from '@material-ui/core'
import { Message } from '@material-ui/icons'

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
        const {input,appIsInit} = this.props
        if(appIsInit){
            //$('.form-control').focus()
        }
        return (
            <div className=''>
                <Grid container>
                    <Grid item xs={8}>
                        <FormControl>
                            <TextField  multiline InputProps={{
                                startAdornment : (
                                    <InputAdornment position='start' >
                                        <Message />
                                    </InputAdornment>
                                )
                            }}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        boton
                    </Grid>
                </Grid>
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
        bgPills: state.bgPills,
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