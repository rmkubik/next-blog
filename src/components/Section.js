const Section = ({ children, area, color = "white" }) => {
  return (
    <section
      className={area}
      style={{ gridArea: area, backgroundColor: color }}
    >
      {/* <span>🔗</span> */}
      {children}
    </section>
  );
};

export default Section;
