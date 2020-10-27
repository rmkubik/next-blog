// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  // This is the Next.js API, so this is what we do!
  // eslint-disable-next-line no-param-reassign
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
