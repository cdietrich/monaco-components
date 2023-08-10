import { disposeEditor, startEditor, swapEditors } from './common.js';

import 'vscode/default-extensions/theme-defaults';
import 'vscode/default-extensions/json';

import { buildWorkerDefinition } from 'monaco-editor-workers';

buildWorkerDefinition('../../../node_modules/monaco-editor-workers/dist/workers', import.meta.url, false);

const workerUrl = new URL('src/hello-world-server-worker.ts', window.location.href);
console.log(workerUrl)
const worker = new Worker(workerUrl, {
    type: 'module',
    name: 'Statemachine LS',
});
worker.postMessage({ model: "person A1 person B1 person C1" })

const languageId = 'hello';
let codeMain = `Hello A1`;
const codeOrg = `Hello A2`;

const monacoEditorConfig = {
    glyphMargin: true,
    guides: {
        bracketPairs: true
    },
    lightbulb: {
        enabled: true
    },
    "semanticHighlighting.enabled": true,
    "editor.semanticHighlighting.enabled": true
};

const monarchGrammar = {
    // recognized keywords
    keywords: [
        'person'
    ],
    // recognized operators
    operators: [
        '-', ',', '*', '/', '+', '='
    ],
    // pattern for symbols we want to highlight
    symbols: /-|,|\(|\)|\{|\}|\*|\/|\+|=/,

    // tokenizer itself, starts at the first 'state' (entry), which happens to be 'initial'
    tokenizer: {
        // initial tokenizer state
        initial: [
            { regex: /#(\d|[a-fA-F])+/, action: { "token": "string" } },
            { regex: /[_a-zA-Z][\w_]*/, action: { cases: { '@keywords': { "token": "keyword" }, '@default': { "token": "string" } } } },
            { regex: /-?[0-9]+/, action: { "token": "number" } },
            // inject the rules for the 'whitespace' state here, effectively inlined
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': { "token": "operator" }, '@default': { "token": "" } } } },
        ],
        // state for parsing whitespace
        whitespace: [
            { regex: /\s+/, action: { "token": "white" } },
            // for this rule, if we match, push up the next state as 'comment', advancing to the set of rules below
            { regex: /\/\*/, action: { "token": "comment", "next": "@comment" } },
            { regex: /\/\/[^\n\r]*/, action: { "token": "comment" } },
        ],
        // state for parsing a comment
        comment: [
            { regex: /[^\/\*]+/, action: { "token": "comment" } },
            // done with this comment, pop the current state & roll back to the previous one
            { regex: /\*\//, action: { "token": "comment", "next": "@pop" } },
            { regex: /[\/\*]/, action: { "token": "comment" } },
        ],
    }
};


const userConfig = {
    htmlElement: document.getElementById('monaco-editor-root') as HTMLElement,
    wrapperConfig: {
        useVscodeConfig: false,
        serviceConfig: {
            enableThemeService: false,
            enableTextmateService: false,

            enableModelService: true,
            configureEditorOrViewsServiceConfig: {
                enableViewsService: false,
                useDefaultOpenEditorFunction: true
            },
            configureConfigurationServiceConfig: {
                defaultWorkspaceUri: '/tmp/'
            },
            enableKeybindingsService: true,
            enableLanguagesService: true,
            // if you want debugging facilities, keep this on
            debugLogging: true
        },
        monacoEditorConfig: {
            languageExtensionConfig: {
                id: 'hello',
                extensions: ['.hello'],
                aliases: ['hello'],
                //mimetypes: ['application/json']
            },
            languageDef: monarchGrammar
        }
    },
    editorConfig: {
        languageId: languageId,
        code: codeMain,
        useDiffEditor: false,
        codeOriginal: codeOrg,
        editorOptions: monacoEditorConfig,
        diffEditorOptions: monacoEditorConfig,
        theme: 'vs-dark',
        automaticLayout: true
    },
    languageClientConfig: {
        enabled: true,
        useWebSocket: false,
        workerConfigOptions: worker
    }
};

try {
    document.querySelector('#button-start')?.addEventListener('click', () => {
        startEditor(userConfig, codeMain, codeOrg);
    });
    document.querySelector('#button-swap')?.addEventListener('click', () => {
        swapEditors(userConfig, codeMain, codeOrg);
    });
    document.querySelector('#button-dispose')?.addEventListener('click', async () => {
        codeMain = await disposeEditor(userConfig);
    });

    startEditor(userConfig, codeMain, codeOrg);
} catch (e) {
    console.error(e);
}
