const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export default async function hanlder(req, res){
    const body = JSON.parse(req.body);

    const {description} = body || {}
    const response = await openai.createImage({
        prompt: 
        `Create an image of a new Pokemon with no background object or text
         from this description:${description}  `,
        n: 2,
        size: "1024x1024",
      });

    res.status(200).json({
        image: response.data.data[0]
    })
};