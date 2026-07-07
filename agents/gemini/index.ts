import { GoogleGenAI } from "@google/genai";

const agent = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export async function runAgent(query = '') {
    try {
        const interaction = await agent.interactions.create({
            model: "gemini-2.5-flash-lite",
            system_instruction: `You are a helpful assistant. Who can help the user with there query`,
            input: query,
            response_format: {
                type: "text",
                mime_type: "application/json",
                schema: {
                    type: "object",
                    properties: {
                        answer: { type: "string" },
                    },
                    required: ["answer"],
                    additionalProperties: false,
                },
            },
            generation_config: {
                temperature: 0,
            },
        });

        return {
            from: 'gemini',
            success: true,
            answer: interaction.output_text
        };
    } catch (error) {
        console.error(error);

        return {
            from: 'gemini',
            success: false,
            answer: "An error occurred while running the agent",
        };
    }
}