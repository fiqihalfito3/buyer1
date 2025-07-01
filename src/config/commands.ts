import { CommandHandler, StepCommandConfig, Env } from '../types';
import { handleStart } from '../commands/start';
import { handleDefault } from '../commands/default';
import { handleRekapSetiapBulan } from '../commands/rekapsetiapbulan';
import { handleRekapHariIni } from '../commands/rekaphariini';
import { handletesterror } from '../commands/testerror';
import { handleRekapBulanIni } from '../commands/rekapbulanini';
import {
    initiateInputFlow,
    handleInputStep,
    handleInputCallback
} from '../commands/input'
import {
    initiateStatusTambahFlow,
    handleStatusTambahStep
} from '../commands/status_tambah';
import { handleStatusLihat } from '../commands/status_lihat';

// Simple commands (no steps)
export const simpleCommands: Record<string, CommandHandler> = {
    '/start': handleStart,
    '/rekaphariini': handleRekapHariIni,
    '/rekapbulanini': handleRekapBulanIni,
    '/rekapsetiapbulan': handleRekapSetiapBulan,
    '/status_lihat': handleStatusLihat,
    '/testerror': handletesterror
};

// Step commands configuration
export const stepCommands: Record<string, StepCommandConfig> = {
    '/input': {
        initiate: initiateInputFlow,
        handleStep: handleInputStep,
        handleCallback: handleInputCallback
    },
    '/status_tambah': {
        initiate: initiateStatusTambahFlow,
        handleStep: handleStatusTambahStep
    }
};