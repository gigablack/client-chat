import React,{Component} from 'react'
import Form from './Form'
import Messages from './Messages'
import UserList from './UserList'
import $ from 'jquery'
import { connect } from 'react-redux'

class Chat extends Component {
    render(){
        const {appIsInit} = this.props
        if(appIsInit){
            $('#chat').removeClass('d-none').addClass('zoomIn slow delay-2s')
        }
        return (
            <div className='container h-75 shadow-lg rounded p-5 chat animated d-none' id='chat'>
                
                
                <div className='row h-100'>
                    <div className='col-3'>
                        <UserList />
                    </div>
                    <div className='col-9'>
                        <Messages />
                        <Form />
                    </div>
                </div>
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