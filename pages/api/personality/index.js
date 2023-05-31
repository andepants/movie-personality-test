const getPersonalityType = async (keywords) => {
  // console.log('keywords: ', keywords);
  // const apiKey = process.env.OPENAI_API_KEY;
  // const model = "text-davinci-003";
  // const maxTokens = 100;
  // let finalPrompt = 'Can you give me a personality type for the following keywords: ' + keywords;

  // const apiUrl = `https://api.openai.com/v1/engines/${model}/completions`;
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${apiKey}`,
  // };

  // try {
  //   const response = await fetch(apiUrl, {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify({
  //       prompt: finalPrompt,
  //       max_tokens: maxTokens,
  //     }),
  //   });
  //   if (response.ok) {
  //     const responseData = await response.json();
  //     console.log('responseData: ', responseData.choices[0].text.replace(/\\/g, ''));
  //     return responseData.choices[0].text.replace(/\\/g, '');
  //   }
  // } catch (error) {
  //   console.log('error', error);
  //   return error;
  // }
  return 'You are an Adventurous person!';
};

export default async function handler(req, res) {
  let method = req.method;
  let body = JSON.parse(req.body);

  if (method === "POST") {
    let data = await getPersonalityType(body.keywords);
    console.log('data: ', data);
    res.status(200).json({ data });
  }
}