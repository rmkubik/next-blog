import Icon from "./Icon";

const Badge = ({ children, icon, color }) => {
  return (
    <>
      <div>
        <Icon>{icon}</Icon> {children}
      </div>
      <style jsx>{`
        div {
          border: 2px solid black;
          background-color: ${color};
          padding: 0.75rem 0.5rem;
          display: inline-block;

          // This component will have an MDX value as children
          // MDX wraps each piece of text in a p tag.
          // We want to style this p tag.
          & > :global(p) {
            display: inline-block;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Badge;
