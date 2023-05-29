export default async function handler(req, res) {
  let method = req.method;
  if (method === "GET") {
    console.log("image request received");
    res.status(200);
  }
}
