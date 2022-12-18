import Section from "../../../src/components/Section";

import metadata from "./metadata.json";

const Infection = () => {
  return (
    <div className="main">
      <Section>
        <h1>{metadata.title}</h1>
      </Section>
    </div>
  );
};

export default Infection;
