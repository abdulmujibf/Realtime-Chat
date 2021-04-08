function ContainerChat ({chat}) {
  return (
    <div className="chat bg-success rounded">
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