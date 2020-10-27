const Section = ({ children, area, color = "white" }) => {
  return (
    <section
      className={area}
      style={{
        backgroundColor: color,
        gridArea: area,
      }}
    >
      {/* <span>🔗</span> */}
      {children}
    </section>
  );
};

export default Section;
