export const ACTIONS = {
    ADD_MESSAGE: 'ADD_MESSAGE',
    TEXT_CHANGING: 'TEXT_CHANGING',
    SET_USERNAME: 'SET_USERNAME',
    ADD_USER: 'ADD_USER',
    REMOVE_USER: 'REMOVE_USER',
    UPDATE_USER_LIST: 'UPDATE_USER_LIST',
    NEW_MESSAGE: 'NEW_MESSAGE',
    SET_USER_COLORS: 'SET_USER_COLORS',
    INIT_APP: 'INIT_APP',
    TOGGLE_LIST: 'TOGGLE_LIST',

    addMessage(message){
        return {
            type: 'ADD_MESSAGE',
            message
        }
    },

    textChanging(input){
        return {
            type: 'TEXT_CHANGING',
            input
        }
    },

    setUsername(username){
        return {
            type: 'SET_USERNAME',
            username
        }
    },

    addUser(user){
        return {
            type: 'ADD_USER',
            user
        }
    },

    removeUser(userID){
        return {
            type: 'REMOVE_USER',
            userID
        }
    },

    updateUserList(user){
        return {
            type: 'UPDATE_USER_LIST',
            user
        }
    },

    newMessage(message){
        return {
            type: 'NEW_MESSAGE',
            message
        }
    },

    setUserColors(){
        return {
            type: 'SET_USER_COLORS',
        }
    },

    initApp(){
        return {
            type: 'INIT_APP'
        }
    },

    toggleList(){
        return {
            type: 'TOGGLE_LIST'
        }
    }
}