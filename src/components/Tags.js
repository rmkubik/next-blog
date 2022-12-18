const Tags = ({ tagString }) => {
  return (
    <>
      <ul>
        {tagString
          .split(",")
          .map((tag) => tag.trim())
          .map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
      </ul>
      <style jsx>
        {`
          :global(ul) {
            list-style: none;
            padding: 0;

            li {
              display: inline-block;
              margin: 0.25rem;
              padding: 0.5rem;
              background-color: lightblue;
              opacity: 0.5;

              &:hover {
                opacity: 0.8;
                cursor: pointer;
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default Tags;
