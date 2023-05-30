const getPersonalityType = async (keywords) => {
  return keywords;
}

export default async function handler(req, res) {
  let method = req.method;
  let body = JSON.parse(req.body);

  if (method === "POST") {
    let data = await getPersonalityType(body.keywords);
    console.log('data: ', data);
    res.status(200).json({ data });
  }
}