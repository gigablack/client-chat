import { ACTIONS } from '../Actions/Actions'
import io from 'socket.io-client'
import swal from 'sweetalert'
import store from './Store'
import {red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,yellow,amber,orange,deepOrange,brown,grey,blueGrey} from '@material-ui/core/colors'
const { ADD_MESSAGE,
    TEXT_CHANGING,
    SET_USERNAME,
    ADD_USER,
    REMOVE_USER,
    UPDATE_USER_LIST,
    NEW_MESSAGE,SET_USER_COLORS,
    INIT_APP,setUsername,setUserColors,initApp } = ACTIONS

    swal({
        title: 'Introduce tu nombre de Usuario',
        content: 'input',
        icon: 'info'
    }).then((value) =>{
        store.dispatch(setUsername(value || 'DESCONOCIDO'))
        store.dispatch(setUserColors())
        socket.emit('updateUser',value || 'DESCONOCIDO')
        swal({
            icon: 'success',
            title: `BIENVENID@ ${store.getState().username}`
        }).then(() =>{
            store.dispatch(initApp())
        })
    })


const socket = io('https://server-react-chat.now.sh/')

const initialState = {
    input: '',
    messages: [],
    socket,
    username: 'DESCONOCIDO',
    usersOnline: [],
    bgPaper: '',
    bgAvatar: '',
    init: false
}

export const addMessageReducer = (state = initialState,action)=>{
    switch(action.type){
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,action.message],
                input: ''
            }
        case TEXT_CHANGING:
            return {
                ...state,
                input: action.input
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        case ADD_USER:
            return {
                ...state,
                usersOnline: [...state.usersOnline,action.user]
            }
        case REMOVE_USER:
            const usersOnlineUpdated = state.usersOnline.filter(user => {
                if(user.id === action.userID) console.log(user.user,'has been DISCONNECTED') 
                return user.id !== action.userID
            })
            return{
                ...state,
                usersOnline: usersOnlineUpdated
            }
        case UPDATE_USER_LIST:
            const userList = state.usersOnline.filter(user => {
                return user.id !== action.user.id
            })

            return{
                ...state,
                usersOnline: [...userList,action.user]
            }

        case NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,action.message]
            }

        case SET_USER_COLORS:
            const colors = [red,pink,purple,deepPurple,indigo,blue,lightBlue,cyan,teal,green,lightGreen,lime,yellow,amber,orange,deepOrange,brown,grey,blueGrey]
            const colorLevel = [50,100,200,300,400,500,600,700,800,900]
            const bgPaper = colors[Math.floor(Math.random() * colors.length)][colorLevel[Math.floor(Math.random() * colorLevel.length)]]
            const bgAvatar = colors[Math.floor(Math.random() * colors.length)][colorLevel[Math.floor(Math.random() * colorLevel.length)]]
            return {
                ...state,
                bgPaper,
                bgAvatar
            }

        case INIT_APP:
            return {
                ...state,
                init: true
            }

        default:
            return state
    }
    
}