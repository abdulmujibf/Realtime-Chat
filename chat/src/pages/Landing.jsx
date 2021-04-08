import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import './style.css'

function Landing () {
  const [name, setName] = useState('')
  const history = useHistory()

  const roomIn = (e) => {
    e.preventDefault()
    history.push('/')
    localStorage.setItem('name', name)
    localStorage.setItem('id', new Date().getTime())
  }

  return (
    <>
      <h1 className="my-5 text-center">Welcome To Chat App</h1>
      <div className="container d-flex justify-content-center align-items-center cont">
        <form onSubmit={roomIn}>
          <div className="form-floating mb-3">
            <input className="form-control" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Jaka" id="floatingInput" />
            <label className="form-label" htmlFor="floatingInput">Enter Your Name</label>
          </div>
          <div className="d-grid gap-2">
            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Landing