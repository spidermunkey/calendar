export const Switch = ({ children }) => {
  let match = null;
  React.Children.forEach(children, child => {
    if (!match && child.type === Case && child.props.when) {
      match = child;
    }
  });

  if (match) return match;
  
  const defaultCase = React.Children.toArray(children).find(child => child.type === Default);
  return defaultCase || null;
};

export const Case = ({ children }) => children;

export const Default = ({ children }) => children;
