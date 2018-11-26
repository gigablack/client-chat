import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ACTIONS } from '../Actions/Actions'
import { Typography,List,ListItem,ListItemAvatar,ListItemText } from '@material-ui/core'

const { addUser,removeUser,updateUserList } = ACTIONS

class UserList extends Component {
    componentDidMount(){
        const { socket,removeUser,updateUserList,addUser } = this.props
        
        socket.on('userConnect',(user)=>{
            console.log('new user')
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
            return (
            <ListItem key={user.id} divider>
                <ListItemAvatar>{user.user[0]}</ListItemAvatar>
                <ListItemText>{user.user}</ListItemText>
            </ListItem>)
        })
        return (
            <div className=''>
                <Typography variant='h6'>
                    Online Users
                </Typography>
                <List>{users}</List>
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