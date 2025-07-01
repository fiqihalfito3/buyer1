import { Context } from 'hono';
import { Env, TelegramMessage } from '../types';
import { clearState, getState } from '../services/state';
import { handleDefault } from '../commands/default';
import { executeCallback, executeStepCommand, executeStepFlow, getSimpleCommandHandler, getStepCommandConfig } from '../services/command-router';


export async function handleTelegramUpdate(body: TelegramMessage, c: Context): Promise<Response> {
    console.log("hitted telegram handler");
    const env = c.env;

    // Handle callback (inline keyboard)
    if (body.callback_query) {
        const chatId = body.callback_query.from.id.toString();
        const data = body.callback_query.data;
        const state = await getState(chatId, env);

        if (state?.command) {
            return executeCallback(chatId, data, state, env);
        }
        return new Response("OK");
    }

    console.log(JSON.stringify(body));

    // Handle text messages
    if (body.message?.text) {
        const chatId = body.message.chat.id.toString();
        const text = body.message.text.trim();
        const state = await getState(chatId, env);

        c.set("chatId", chatId);

        // Check if it's a simple command
        const simpleHandler = getSimpleCommandHandler(text);
        if (simpleHandler) {
            await clearState(chatId, env);
            return simpleHandler(chatId, text.toLowerCase(), env);
        }

        // Check if it's a step command
        const stepConfig = getStepCommandConfig(text);
        if (stepConfig) {
            return executeStepCommand(text.toLowerCase(), chatId, env);
        }

        // Handle ongoing step flow
        if (state?.step && state?.command) {
            return executeStepFlow(chatId, text, state, env);
        }

        // Default fallback
        return handleDefault(chatId, env);
    }

    return c.text('OK');
}
