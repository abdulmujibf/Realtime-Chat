import {useEffect, useState} from 'react'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import './home.css'
import { NavLink } from 'react-router-dom';
import ContainerChat from '../components/ContainerChat';
const baseUrl = 'http://localhost:3001'
const socket = io(baseUrl)

function Home () {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const chat = useSelector(state => state.chat)
  const [name, setName] = useState('')
  useEffect(() => {
    setName(localStorage.name)
  })

  useEffect(() => {
    if(!chat.length){
      socket.emit('setMessages')
    }
  }, [])

  useEffect(() => {
    if(!chat.length){
      socket.on('messages', msg => {
        dispatch({type: 'SETMESSAGES', payload: msg})
      })
    }
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('chat', {message, name})
    setMessage('')
    // dispatch({type: 'SETMESSAGE', payload: {message, name}})
  }

  useEffect(() => {
    socket.on('SendChat', (payload) => {
      dispatch({type: 'SETMESSAGE', payload})
    })
  }, [])

  const back = () => {
    localStorage.removeItem('name')
    socket.disconnect()
  }

  return (
    <div>
      <NavLink to="/landing" onClick={back} className="btn btn-outline-dark m-3">Back</NavLink>
      <div className="container d-flex flex-column align-items-center cont-chat">
        <ContainerChat chat={chat} />
        <div className="position-relative w-100 h-100">
          <form onSubmit={sendMessage} className="position-absolute bottom-0 w-100">
            <div className="d-flex">
              <input className="form-control" type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
              <input type="submit" value="send" className="btn btn-primary ms-3" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home