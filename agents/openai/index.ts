import 'dotenv/config';
import { Agent, run } from '@openai/agents';
import z from 'zod';

const OutputSchema = z.object({
    answer: z.string().describe('The answer to the user\'s query'),
});

const agent = new Agent({
    name: 'My Agent',
    instructions: `You are a helpful assistant. Who can help the user with there query`,
    model: 'gpt-4o-mini',
    outputType: OutputSchema
});

export async function runAgent(query = '') {
    try {
        const result = await run(agent, query);

        return {
            from: 'openai',
            success: true,
            answer: result.finalOutput
        };
    } catch (error) {
        console.error(error);

        return {
            from: 'openai',
            success: false,
            answer: 'An error occurred while running the agent'
        };
    }
}