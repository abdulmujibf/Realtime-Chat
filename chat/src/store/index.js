import {createStore} from 'redux'

const initialState = {
  chat: []
}

const reducer = (state = initialState, action) => {
  const {type, payload} = action
  switch(type) {
    case 'SETMESSAGE':
      return {...state, chat: [...state.chat, payload]}
    case 'SETMESSAGES':
      return {...state, chat: payload}
    default:
      return state
  }
}

const store = createStore(reducer)

export default store