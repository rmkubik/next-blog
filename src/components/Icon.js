const Icon = ({ children }) => (
  <>
    <span aria-hidden role="img">
      {children}
    </span>
    <style jsx>{`
      span {
        text-shadow: 2px 2px 0 black;
      }
    `}</style>
  </>
);

export default Icon;
