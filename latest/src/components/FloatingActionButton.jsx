export const FloatingActionOpen = ({ref,children, handlers }) => {
  const handleClick = (event) => {
    if (ref.current) {
      ref.current.classList.add('active')
    }
    return handlers.onClick && handlers.onClick(event,ref)
  }
  return (
    <div className="btn-open" onClick={handleClick}>
      {children}
    </div>
  )
}

export const FloatingActionClose = ({ref,children, handlers }) => {
  const handleClick = (event) => {
    if (ref.current){
      ref.current.classList.remove('active')
    }
    return handlers.onClick && handlers.onClick(event,ref)
  }
  return (
    <div className="btn-close" onClick={handleClick}>
      {children}
    </div>
  )
}

export const FloatingActionToggle = ({ ref, children, handlers }) => {
  const handleClick = (event) => {
    if (ref.current){
      ref.current.classList.toggle('active');
    }
    if (handlers?.onClick)
      handleClick.onClick(event,ref.current)
  } 
  return (
    <div className="btn-toggle" onClick={handleClick}>
      {children}
    </div>
  )
}
