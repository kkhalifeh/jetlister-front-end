const headers = (token) => new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-CSRF-Token": token
});

export default headers;