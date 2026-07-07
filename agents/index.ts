import { runAgent as claude } from "./claude";
import { runAgent as gemini } from "./gemini";
import { runAgent as openai } from "./openai";

export async function runAllAgents(query = '') {
    const agents = [
        claude(query),
        gemini(query),
        openai(query),
    ];

    return Promise.all(agents);
}