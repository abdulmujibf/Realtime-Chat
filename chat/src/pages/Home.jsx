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
  const [people, setPeople] = useState([])
  // const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const name = localStorage.name
    const id = +localStorage.id
    socket.emit('setPeople', {name: localStorage.name, id, isOnline: true})
    setName(name)
  }, [])

  useEffect(() => {
    socket.on('people', person => {
      setPeople(person)
    })
  }, [])

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
  }

  useEffect(() => {
    socket.on('SendChat', (payload) => {
      dispatch({type: 'SETMESSAGE', payload})
    })

  }, [])

  useEffect(() => {
    if(socket.disconnected){
      socket.on('offline', () => {
        socket.emit('offline', {name})
      })
    } else {
      socket.emit('setPeople', {name: localStorage.name, id: +localStorage.id, isOnline: true})
    }
  }, [socket.disconnected])

  console.log(people)

  return (
    <div className="d-flex">
      <div className="d-flex flex-column align-items-center">
        {
          people.map(el => {
            return (
              <div className="d-flex flex-column people ms-3 align-items-center">
                <img src={`https://avatars.dicebear.com/api/human/${el.name}.svg`} className="mt-4 img-people rounded-circle border" />
                <span>{el.name}</span>
              </div>
            )
          })
        }
      </div>
      <div className="container d-flex flex-column align-items-center cont-chat mt-4">
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