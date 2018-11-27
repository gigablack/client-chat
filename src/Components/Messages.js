import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ACTIONS } from '../Actions/Actions'
import {Zoom,Paper,Avatar,Typography,Grid} from '@material-ui/core'

const {newMessage, clearUserTyping} = ACTIONS

class Messages extends Component {
    componentDidMount(){
        const { socket, newMessage,clearTyping } = this.props
        socket.on('message',(message) =>{
            newMessage(message)
            clearTyping()
        })
    }
    componentDidUpdate(){
        document.querySelector('#messages').scrollBy(0,1000)
    }
    render(){
        const {userIsTyping} = this.props
        const messages = this.props.messages.map((message,index) => {
            return (
                <Zoom key={index} in={true}>
                    <Paper style={{padding:'10px',marginBottom: '5px', backgroundColor: message.bgPaper}}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Avatar style={{backgroundColor: message.bgAvatar}}>{message.user[0]}</Avatar>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant='caption'>
                                    {message.user}
                                </Typography>
                                <Typography variant='body2' color='inherit'>
                                    {message.message}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Zoom>
            )
        })
        return (
            <div className='' id='messages' style={{padding: '10px',overflowY: 'auto',overflowX:'hidden',height: '80vh'}}>
                    <div className='' >{messages}</div>
                    <Typography variant='caption' style={{height:5}}><em>{userIsTyping}</em></Typography>
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
        },

        clearTyping(){
            dispatch(clearUserTyping())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Messages)