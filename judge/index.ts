import { Agent, run} from '@openai/agents'
import { z } from 'zod';

type Answer = {
    from: string;
    success: boolean;
    answer: string;
}

const OutputSchema = z.object({
    winner: z.string().describe('The winner of the judge'),
    index: z.number().describe('The index of the winner'),
    reason: z.string().describe('The reason for the winner')
});
type JudgeResult = z.infer<typeof OutputSchema>;

export async function runJudge(answers: Answer[]): Promise<JudgeResult> {
    try {
        const input = `Judge the following agent answers and pick the best one. ${answers.map((a, index) => `Answer ${index}: - Agent: ${a.from} - Success: ${a.success} - Answer: ${typeof a.answer === 'string' ? a.answer : JSON.stringify(a.answer)}`).join('\n')} Return the winner's agent name, their 0-based index, and your reason.`;

        const judgeAgent = new Agent({
            name: 'Judge',
            instructions: `You are a judge. You will receive multiple agent answers.
                            Pick the best answer based on accuracy and completeness.
                            Return winner (agent name), index (0-based), and reason.
                            `,
            model: 'gpt-4o',
            outputType: OutputSchema
        });

        const result = await run(judgeAgent, input);
        return result.finalOutput as JudgeResult;

    } catch (error) {
        console.error(error);
        
        if (answers[0]?.success) return {
            winner: answers[0].from,
            index: 0,
            reason: 'The first answer is successful'
        };

        if (answers[1]?.success) return {
            winner: answers[1].from,
            index: 1,
            reason: 'The second answer is successful'
        };

        if (answers[2]?.success) return {
            winner: answers[2].from,
            index: 2,
            reason: 'The third answer is successful'
        };

        return {
            winner: 'none',
            index: -1,
            reason: 'No answer is successful'
        };
    }
}