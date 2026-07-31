# Self-Consistency Answer Engine

An experimental multi-agent AI comparison project built with Bun and TypeScript. It runs the same prompt through multiple model providers, compares their responses, and uses a judge step to pick the best answer.

## Overview

This project demonstrates a simple multi-agent workflow:

1. Send the same user prompt to multiple AI agents.
2. Collect each agent’s response.
3. Pass the responses to a judge.
4. Print the winning answer.

The current codebase includes agents for Claude, Gemini, and OpenAI, along with a judging layer that chooses the strongest result.

## Features

- Multi-model agent execution
- Claude, Gemini, and OpenAI integrations
- Judge-based answer selection
- Simple Bun runtime setup
- Environment-based configuration with `dotenv`
- TypeScript-first codebase

## Tech Stack

- Bun
- TypeScript
- dotenv
- Anthropic SDK
- Google Gen AI SDK
- OpenAI Agents SDK

## Project Structure

```bash
multi-agents/
├── agents/
│   ├── claude/
│   ├── gemini/
│   ├── openai/
│   └── index.ts
├── judge/
│   └── index.ts
├── index.ts
├── package.json
├── tsconfig.json
└── bun.lock
```

## How It Works

The entry file imports the agent runner and judge, then:

- runs all agents on the same prompt,
- logs every response,
- sends the answers to the judge,
- prints the final selected output.

## Installation

```bash
bun install
```

## Run

```bash
bun run index.ts
```

Or, if you prefer the script:

```bash
bun run dev
```

## Environment Variables

Create a `.env` file and add the API keys required by the providers you use.

Example:

```env
ANTHROPIC_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

## Example Flow

```ts
const answers = await runAllAgents("What is the capital of India?");
const judgeResult = await runJudge(answers);
console.log(answers[judgeResult.index]?.answer);
```

## What This Project Is Good For

- Comparing model quality on the same prompt
- Building a basic agent voting system
- Learning multi-model orchestration
- Experimenting with judge-based AI pipelines

## Roadmap

- Support more models and providers
- Add streaming responses
- Add scoring criteria for the judge
- Save results to a database
- Build a UI to compare outputs side by side
