import React,{Component} from 'react'
import Form from './Form'
import Messages from './Messages'
//import UserList from './UserList'
//import $ from 'jquery'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'

class Chat extends Component {
    render(){
        const {appIsInit} = this.props
        if(appIsInit){
            //$('#chat').removeClass('d-none').addClass('zoomIn slow delay-2s')
        }
        return (
            <div className='' id='chat'>
                <Paper>
                    <Messages />
                    <Form />
                </Paper>
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