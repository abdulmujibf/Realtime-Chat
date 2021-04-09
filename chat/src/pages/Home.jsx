import {useEffect, useState} from 'react'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import './home.css'
import ContainerChat from '../components/ContainerChat';
const baseUrl = 'http://localhost:3001'
const socket = io(baseUrl)

function Home () {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const chat = useSelector(state => state.chat)
  const [name, setName] = useState('')
  const [people, setPeople] = useState([])

  useEffect(() => {   // initialize user
    const name = localStorage.name
    const id = +localStorage.id
    socket.emit('setPeople', {name: localStorage.name, id, isOnline: true})
    setName(name)
  }, [])

  useEffect(() => {   // Get Current People
    socket.on('people', person => {
      setPeople(person)
    })
  }, [])

  useEffect(() => {   // Send request History Messages
    if(!chat.length){
      socket.emit('setMessages')
    }
  }, [chat.length])

  useEffect(() => {   // Get History Messages
    if(!chat.length){
      socket.on('messages', msg => {
        dispatch({type: 'SETMESSAGES', payload: msg})
      })
    }
  }, [chat.length, dispatch])

  const sendMessage = (e) => {    // Send Messages To server
    e.preventDefault()
    if(message){
      socket.emit('chat', {message, name})
      setMessage('')
    }
  }

  useEffect(() => {               // Get Messages From Server
    socket.on('SendChat', (payload) => {
      dispatch({type: 'SETMESSAGE', payload})
    })

  }, [dispatch])

  return (
    <div className="d-flex mx-2">
      <div className="d-flex flex-column align-items-center darkgray mt-4 rounded p-2 container-people">
        <h4>People</h4>
        {
          people.map((el, index) => {
            return (
              <div className="d-flex flex-column people align-items-center" key={index}>
                <img src={`https://avatars.dicebear.com/api/human/${el.name}.svg`} className="mt-3 img-people rounded-circle border" alt={el.name} />
                <span className={localStorage.name === el.name ? 'text-light fw-bold' : 'fw-bold'}>{el.name === localStorage.name ? `${el.name} (You)` : el.name}</span>
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