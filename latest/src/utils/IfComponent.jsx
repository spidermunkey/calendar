export const If = ({ condition, children }) => condition ? children : null;
export const Conditional = ({condition,children}) => {
  {
  const elseChild = React.Children.toArray(children).find(
    child => child.type === Else || child.type === ElseIf
  );

  if (condition) {
    const trueChild = React.Children.toArray(children).find(
      child => child.type !== Else && child.type !== ElseIf
    );
    return trueChild || null;
  } else {
    if (elseChild?.type === ElseIf) {
      return <If condition={elseChild.props.condition}>{elseChild.props.children}</If>;
    }
    return elseChild || null;
  }
};
}
{/* 
  <If condition={isActive}>
    <Foo />
  </If> 
*/}

{/* 
  <If condition={status === 'loading'}>
    <LoadingSpinner />
    <ElseIf condition={status === 'error'}>
      <ErrorMessage />
    </ElseIf>
    <Else>
      <SuccessContent />
    </Else>
  </If> 
*/}
