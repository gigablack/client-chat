import { ACTIONS } from '../Actions/Actions'
import io from 'socket.io-client'
import swal from 'sweetalert'
import store from './Store'
const { ADD_MESSAGE,
    TEXT_CHANGING,
    SET_USERNAME,
    ADD_USER,
    REMOVE_USER,
    UPDATE_USER_LIST,
    NEW_MESSAGE,setUsername,SET_USER_COLORS,setUserColors,
    INIT_APP,initApp } = ACTIONS

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


const socket = io('http://localhost:4000')

const initialState = {
    input: '',
    messages: [],
    socket,
    username: 'DESCONOCIDO',
    usersOnline: [],
    bgAlert: 'secondary',
    bgPills: 'dark',
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
            const colors = ['primary','secondary','success','danger','warning','info','light','dark']
            const bgAlert = colors[Math.floor(Math.random() * colors.length)]
            const bgPills = colors[Math.floor(Math.random() * colors.length)]
            return {
                ...state,
                bgAlert,
                bgPills
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