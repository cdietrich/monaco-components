import { buildWorkerDefinition } from 'monaco-editor-workers';
buildWorkerDefinition('../../../node_modules/monaco-editor-workers/dist/workers', import.meta.url, false);

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import * as vscode from 'vscode';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';

const languageId = 'json';
let codeMain = `{
    "$schema": "http://json.schemastore.org/coffeelint",
    "line_endings": {"value": "windows"}
}`;
const codeOrg = `{
    "$schema": "http://json.schemastore.org/coffeelint",
    "line_endings": {"value": "unix"}
}`;
const wrapper = new MonacoEditorLanguageClientWrapper();

const monacoEditorConfig = {
    glyphMargin: true,
    guides: {
        bracketPairs: true
    },
    lightbulb: {
        enabled: true
    },
};
wrapper.init({
    wrapperConfig: {
        useVscodeConfig: false,
        monacoEditorConfig: {
            languageExtensionConfig: {
                id: 'json',
                extensions: ['.json', '.jsonc'],
                aliases: ['JSON', 'json'],
                mimetypes: ['application/json']
            }
        }
    },

    editorConfig: {
        languageId: languageId,
        code: codeMain,
        useDiffEditor: false,
        codeModified: codeOrg,
        editorOptions: monacoEditorConfig,
        diffEditorOptions: monacoEditorConfig,
        theme: 'vs-dark',
        automaticLayout: true
    },
    languageClientConfig: {
        enabled: true,
        useWebSocket: true,
        webSocketConfigOptions: {
            host: 'localhost',
            port: 3000,
            path: 'sampleServer',
            secured: false
        }
    }
});

function startEditor() {
    if (wrapper.isStarted()) {
        alert('Editor was already started!');
        return;
    }
    configureCodeEditors();

    toggleSwapDiffButton(true);
    wrapper.startEditor(document.getElementById('monaco-editor-root') as HTMLElement)
        .then((s: unknown) => {
            console.log(s);
            logEditorInfo(wrapper);

            vscode.commands.getCommands().then((x) => {
                console.log('Currently registered # of vscode commands: ' + x.length);
            });
        })
        .catch((e: Error) => console.error(e));
}

function configureCodeEditors() {
    const runtimeConfig = wrapper.getRuntimeConfig();
    if (runtimeConfig.editorConfig.useDiffEditor) {
        runtimeConfig.editorConfig.code = codeOrg;
        runtimeConfig.editorConfig.codeModified = codeMain;
    } else {
        runtimeConfig.editorConfig.code = codeMain;
    }
}

function saveMainCode(saveFromDiff: boolean, saveFromMain: boolean) {
    if (saveFromDiff) {
        codeMain = wrapper.getDiffCode()!;
    }
    if (saveFromMain) {
        codeMain = wrapper.getMainCode()!;
    }
}

function swapEditors() {
    const runtimeConfig = wrapper.getRuntimeConfig();
    runtimeConfig.editorConfig.useDiffEditor = !runtimeConfig.editorConfig.useDiffEditor;
    saveMainCode(!runtimeConfig.editorConfig.useDiffEditor, false);
    configureCodeEditors();

    wrapper.startEditor(document.getElementById('monaco-editor-root') as HTMLElement)
        .then((s: string) => {
            console.log(s);
            logEditorInfo(wrapper);
        })
        .catch((e: Error) => console.error(e));
}

async function disposeEditor() {
    wrapper.reportStatus();
    toggleSwapDiffButton(false);
    const useDiffEditor = wrapper.getRuntimeConfig().editorConfig.useDiffEditor;
    saveMainCode(useDiffEditor, !useDiffEditor);
    await wrapper.dispose()
        .then(() => {
            console.log(wrapper.reportStatus().join('\n'));
        })
        .catch((e: Error) => console.error(e));
}

function toggleSwapDiffButton(enabled: boolean) {
    const button = document.getElementById('button-swap') as HTMLButtonElement;
    if (button !== null) {
        button.disabled = !enabled;
    }
}

function logEditorInfo(client: MonacoEditorLanguageClientWrapper) {
    console.log(`# of configured languages: ${monaco.languages.getLanguages().length}`);
    console.log(`Main code: ${client.getMainCode()}`);
    console.log(`Modified code: ${client.getDiffCode()}`);
}

document.querySelector('#button-start')?.addEventListener('click', startEditor);
document.querySelector('#button-swap')?.addEventListener('click', swapEditors);
document.querySelector('#button-dispose')?.addEventListener('click', disposeEditor);

startEditor();
