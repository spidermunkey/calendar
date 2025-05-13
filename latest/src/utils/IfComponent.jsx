export const If = ({ condition, children }) => condition ? children : null;

<If condition={isActive}>
  <Foo />
</If>
