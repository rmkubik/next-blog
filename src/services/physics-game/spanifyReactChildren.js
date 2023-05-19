const spanifyReactChildren = (WrappedComponent, className) => {
  // Take a react component
  // Find all children
  // If children are TextNodes (how to define this? p? h1/h2/h3/etc.? strong? span?)
  // add a span wrapping the children with an "obstacle" class
  // Maybe this is an HOC you wrap a Section in??? This might be the way to go

  const SpanifiedComponent = ({ children, ...props }) => {
    console.log({ children });

    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };

  return SpanifiedComponent;
};

export default spanifyReactChildren;
