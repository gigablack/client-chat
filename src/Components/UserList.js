import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ACTIONS } from '../Actions/Actions'
import { Typography,List,ListItem,ListItemText,Avatar } from '@material-ui/core'

const { addUser,removeUser,updateUserList } = ACTIONS

class UserList extends Component {
    
    render(){
        const users = this.props.usersOnline.map((user) =>{
            return (
            <ListItem key={user.id} divider>
                <Avatar>{user.user[0]}</Avatar>
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