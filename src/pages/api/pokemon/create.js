const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const {POKEMON_ATTRIBUTES} = require('@/data/pokemon')


export default async function hanlder(req, res){

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user",
         content: 
         `Create a new Pokemon character with the following points:
         - Name
         - Short description less than 80 character
         - The type of Pokemon
         - The category of Pokemon it is
         - Number of Hit Points or health
         - The Pokemon's length in inches,
         - The Pokemon's weight in pounds,
         - The Pokeomon's power name and decription
         - The pokemon's attack name with description and Hit Points
         - The type of Pokemon it is weak against
         - The tyoe of Pokemon it is resistant against
         - The retreat cost of the Pokemon
         - The Pokemon's appearance in less than 600 character
         - The Pokemon's backstory in less than 600 character
         Format the response in the following JSON object:${JSON.stringify(POKEMON_ATTRIBUTES)} 
         `

         }],
    });
  

    const attributes = JSON.parse(completion.data.choices[0].message.content)



    res.status(200).json({attributes})
};