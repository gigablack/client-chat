import React,{Component} from 'react'
import Form from './Form'
import Messages from './Messages'
import UserList from './UserList'

class Chat extends Component {
    render(){
        return (
            <div className='container h-75 shadow-lg rounded p-5 chat'>
                
                
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

export default Chat