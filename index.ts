import 'dotenv/config';
import { runAllAgents } from "./agents";
import { runJudge } from "./judge";

async function streamPrint(text: string, delayMs = 15) {
    for (const char of text) {
        process.stdout.write(char);
        await new Promise((r) => setTimeout(r, delayMs));
    }
    process.stdout.write('\n');
}

async function main() {
    const answers = await runAllAgents("What is the capital of india?");

    console.log(answers);
    console.log("\n\n");

    console.log("Judge the answers and pick the best one.");
    const judgeResult = await runJudge(answers);
    console.log(judgeResult);
    console.log("\n\n");

    console.log("Final Output:\n\n");
    streamPrint(answers[judgeResult.index]?.answer);
}

main();