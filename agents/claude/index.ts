import { Anthropic } from "@anthropic-ai/sdk";

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

export async function runAgent(query = '') {
    try {
        const message = await client.messages.create({
            max_tokens: 1024,
            messages: [{ role: "user", content: query }],
            model: "claude-sonnet-5"
        })
        return {
            from: 'claude',
            success: true,
            answer: message.content[0]?.text ?? 'An error occurred while running the agent'
        };
    } catch (error) {
        console.error(error);

        return {
            from: 'claude',
            success: false,
            answer: 'An error occurred while running the agent'
        };
    }
}