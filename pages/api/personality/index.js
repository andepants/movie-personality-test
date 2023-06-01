const getPersonalityType = async (keywords) => {
  // console.log('keywords: ', keywords);
  const apiKey = process.env.OPENAI_API_KEY;
  const model = "text-davinci-003";
  const maxTokens = 200;
  let finalPrompt = `Give me a personality title AND 3 sentences of a personality summary starting with "You are". Keywords: ${keywords} Format 1 JSON OBJECT{ "title" :  "title", "summary": "summary" }`;

  const apiUrl = `https://api.openai.com/v1/engines/${model}/completions`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        prompt: finalPrompt,
        max_tokens: maxTokens,
      }),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData.choices[0].text.replace(/\\/g, '');
    }
  } catch (error) {
    console.log('error', error);
    return error;
  }

  // let apple = await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(`{"title": "Detective of Suspense and Mysteries", "summary": "You are a Detective of Suspense and Mysteries, known for your skill in unraveling even the darkest of murder and thriller cases."}`);
  //   }, 2000);
  // });
  // return apple;
};

export default async function handler(req, res) {
  let method = req.method;
  let body = JSON.parse(req.body);

  if (method === "POST") {
    let data = await getPersonalityType(body.keywords);
    res.status(200).json({ data });
  }
}