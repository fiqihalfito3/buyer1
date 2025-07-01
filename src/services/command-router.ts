// services/command-router.ts - Command routing logic
import { Env, StepState } from '../types';
import { simpleCommands, stepCommands } from '../config/commands';
import { handleDefault } from '../commands/default';

export function getSimpleCommandHandler(command: string) {
    return simpleCommands[command.toLowerCase()];
}

export function getStepCommandConfig(command: string) {
    return stepCommands[command.toLowerCase()];
}

export async function executeStepCommand(command: string, chatId: string, env: Env): Promise<Response> {
    const config = getStepCommandConfig(command);
    if (config) {
        return config.initiate(chatId, command, env);
    }
    return handleDefault(chatId, env);
}

export async function executeStepFlow(chatId: string, text: string, state: StepState, env: Env): Promise<Response> {
    const config = getStepCommandConfig(state.command);
    if (config) {
        return config.handleStep(chatId, text, state, env);
    }
    return handleDefault(chatId, env);
}

export async function executeCallback(chatId: string, data: string, state: StepState, env: Env): Promise<Response> {
    const config = getStepCommandConfig(state.command);
    if (config?.handleCallback) {
        return config.handleCallback(chatId, data, state, env);
    }
    return new Response("OK");
}