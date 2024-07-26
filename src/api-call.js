import dotenv from "dotenv";
dotenv.config();
import LlamaAI from "llamaai";

async function getLlamaiAnswer(question = "Tell me a joke") {
    const apiToken = process.env.LLAMAAI_API_KEY;
    const llamaAPI = new LlamaAI(apiToken);

    // Build the Request
    const apiRequestJson = {
    "messages": [
        {
            "role": "user",
            "content": question,
        }
    ]};

    // Execute the Request
    try {
        const ApiResponse = await llamaAPI.run(apiRequestJson)
        return ApiResponse.choices[0].message.content;
    } catch (error) {
        console.log("Error in api-call.js: " + error);
        return "Error in api-call.js: " + error;
    }
}

export default getLlamaiAnswer;
