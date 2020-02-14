const port = process.env.REACT_APP_SERVER_PORT;
const url = `http://localhost:${port}/graphql`;

export const request = async (query: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query })
  });
  return await res.json();
};
