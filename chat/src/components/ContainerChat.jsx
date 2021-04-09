import '../pages/home.css'
import {useRef, useEffect} from 'react'

function ContainerChat ({chat}) {
  const containerRef = useRef(null);

  useEffect(() => {           // For Auto Scroll if Have New Messages
    if(containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth"
      })
    }
  }, [containerRef, chat])

  return (
    <div className="chat rounded" ref={containerRef}>
      {
        chat.map((el, index) => {
          return (
            <div key={index} className="m-2">
              {
                el.name === localStorage.name ? (
                  <div className="text-end">
                    <span>{el.name}</span>
                    <p className="bg-primary text-light p-1 rounded">{el.message}</p>
                  </div>
                ) : (
                  <>
                    <span>{el.name}</span>
                    <p className="bg-light p-1 rounded">{el.message}</p>
                  </>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default ContainerChat