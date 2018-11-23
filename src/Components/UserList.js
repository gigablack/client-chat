import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ACTIONS } from '../Actions/Actions'

const { addUser,removeUser,updateUserList } = ACTIONS

class UserList extends Component {
    componentDidMount(){
        const { socket,removeUser,updateUserList,addUser } = this.props
        
        socket.on('userConnect',(user)=>{
            addUser(user)
        })

        socket.on('userDisconnected',(userID) => {
            removeUser(userID)
        })

        socket.on('updateUser',(user) =>{
            updateUserList(user)
        })
    }
    render(){
        const users = this.props.usersOnline.map((user) =>{
            return (<li key={user.id} className='list-group-item justify-content-between d-flex h6 nunito'><i className='fas fa-user'></i>{user.user} <span className="badge badge-success badge-pill online">{' '}</span></li>)
        })
        return (
            <div className='h-100'>
            <h3 className='app-title'>Online Users</h3>
                <ul className='list-group'>{users}</ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        usersOnline: state.usersOnline,
        username: state.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser(user){
            dispatch(addUser(user))
        },

        removeUser(userID){
            dispatch(removeUser(userID))
        },

        updateUserList(user){
            dispatch(updateUserList(user))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList)