export const Form = ({children, handlers}) => {
    const formRef = useRef(null);
    const currentField = useRef(null);
    
    const form = () => formRef.current;
    const input = (formField) => formField.querySelector(input);
    const formFields = () => formRef.current.querySelectorAll('.field');
    const nextField = () => {
      if (currentField.current){
        return getSiblingRecursive();
        function getSiblingRecursive() {
          const next = currentField.current.nextElementSibling;
          if (next.classList.contains('field'))
            return next;
          else if (next != null){
            return getSiblingRecursive();
          } return;
        }
      }
    }
    const previousField = () => {
      if (currentField.current){
        return getSiblingRecursive();
        function getSiblingRecursive() {
          const next = currentField.current.previousElementSibling;
          if (next == null)
            return;
          else if (next.classList.contains('field'))
            return next;
          else if (next != null){
            return getSiblingRecursive();
          }

        }
      }
    }
    const firstField = () => formFields()[0]

    const handleShortcuts = (event) => {
      if (eventMaps.enter(event)){
        const formData = new FormData(form());
        console.log('TODO SUBMISSION REQUESTED', formData);
      }
      if (eventMaps.tab(event)){
        const next = nextField();
        if (nextField){ 
          input(next)?.focus() 
        } else {
          input(firstField)?.focus()
        }
  
      }
    }
  const handleClick = (event) => {
    const field = event.target.closest('.field')
    if (field){
      currentField.current = field;
    }
    return handlers.onClick && handlers.onClick( event, formRef )
  }
  const handleSubmit = (event) => {
    const formData = new FormData(formRef.current)
    return handlers.onSubmit && handlers.onSubmit( event, formData, formRef.current )
  }
  return (
    <form ref={formRef} className="form" onClick={handleClick} onSubmit={handleSubmit} onKeyDown={handleShortcuts}>
      {children}
    </form>
  )
}
