import Section from "../src/components/Section";

const Home = () => {
  return (
    <>
      <Section>
        <h1>{"Hi!"}</h1>
        <p>{"I make video games, usually with JavaScript."}</p>
      </Section>
      <Section>
        <h2>{"Projects"}</h2>
        <ul>
          <li>{"Wildfire Swap"}</li>
          <li>{"TwilioQuest"}</li>
          <li>{"Trainsmission"}</li>
          <li>{"Make for the Waves"}</li>
          <li>{"Grim Repair"}</li>
          <li>{"Unstable"}</li>
          <li>{"Warships"}</li>
          <li>{"Status Code"}</li>
        </ul>
      </Section>
    </>
  );
};

export default Home;
