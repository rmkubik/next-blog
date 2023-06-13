const Icon = ({ children, className = "" }) => (
  <>
    <span aria-hidden className={className} role="img">
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
