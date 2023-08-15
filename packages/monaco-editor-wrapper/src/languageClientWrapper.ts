import { MonacoLanguageClient } from 'monaco-languageclient';
import { toSocket, WebSocketMessageReader, WebSocketMessageWriter } from 'vscode-ws-jsonrpc';
import { BrowserMessageReader, BrowserMessageWriter } from 'vscode-languageserver-protocol/browser.js';
import { CloseAction, ErrorAction, MessageTransports } from 'vscode-languageclient/lib/common/client.js';
import { createUrl } from './utils.js';

export type WebSocketCallOptions = {
    /** Adds handle on languageClient */
    onCall: () => void;
    /** Reports Status Of Language Client */
    reportStatus?: boolean;
}

export type LanguageClientConfigBase = {
    name?: string;
}

export type LanguageClientConfigType = 'WebSocket' | 'WebSocketUrl' | 'WorkerConfig' | 'Worker';

export type WebSocketUrl = LanguageClientConfigBase & {
    secured: boolean;
    host: string;
    port?: number;
    path?: string;
}

export type WebSocketConfigOptions = LanguageClientConfigBase & {
    $type: 'WebSocket'
    secured: boolean;
    host: string;
    port?: number;
    path?: string;
    startOptions?: WebSocketCallOptions;
    stopOptions?: WebSocketCallOptions;
}

export type WebSocketConfigOptionsUrl = LanguageClientConfigBase & {
    $type: 'WebSocketUrl'
    url: string;
    startOptions?: WebSocketCallOptions;
    stopOptions?: WebSocketCallOptions;
}

export type WorkerConfigOptions = LanguageClientConfigBase & {
    $type: 'WorkerConfig'
    url: URL;
    type: 'classic' | 'module';
};

export type WorkerConfigDirect = LanguageClientConfigBase & {
    $type: 'WorkerDirect';
    worker: Worker;
};

export type LanguageClientConfig = {
    options: WebSocketConfigOptions | WebSocketConfigOptionsUrl | WorkerConfigOptions | WorkerConfigDirect;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initializationOptions?: any;
}

export class LanguageClientWrapper {

    private languageClient: MonacoLanguageClient | undefined;
    private languageClientConfig?: LanguageClientConfig;
    private worker: Worker | undefined;
    private languageId: string | undefined;
    private name;

    constructor(languageClientConfig?: LanguageClientConfig) {
        if (languageClientConfig) {
            this.languageClientConfig = languageClientConfig;
            this.name = this.languageClientConfig.options.name ?? 'unnamed';
        }
    }

    haveLanguageClient(): boolean {
        return this.languageClient !== undefined;
    }

    haveLanguageClientConfig(): boolean {
        return this.languageClientConfig !== undefined;
    }

    getLanguageClient(): MonacoLanguageClient | undefined {
        return this.languageClient;
    }

    getWorker(): Worker | undefined {
        return this.worker;
    }

    isStarted(): boolean {
        return this.languageClient !== undefined && this.languageClient?.isRunning();
    }

    init(languageId: string) {
        this.languageId = languageId;
    }

    async start() {
        if (this.languageClientConfig) {
            return this.startLanguageClientConnection();
        } else {
            return Promise.reject('Unable to start monaco-languageclient. No configuration was provided.');
        }
    }

    /**
     * Restart the languageclient with options to control worker handling
     *
     * @param updatedWorker Set a new worker here that should be used. keepWorker has no effect theb
     * @param keepWorker Set to true if worker should not be disposed
     */
    async restartLanguageClient(updatedWorker?: Worker, keepWorker?: boolean): Promise<void> {
        if (updatedWorker) {
            await this.disposeLanguageClient(false);
        } else {
            await this.disposeLanguageClient(keepWorker);
        }
        this.worker = updatedWorker;
        if (this.languageClientConfig) {
            console.log('Re-Starting monaco-languageclient');
            await this.startLanguageClientConnection();
        } else {
            await Promise.reject('Unable to restart languageclient. No configuration was provided.');
        }
    }

    private startLanguageClientConnection(): Promise<string> {
        if (this.languageClient && this.languageClient.isRunning()) {
            return Promise.resolve('monaco-languageclient already running!');
        }

        return new Promise((resolve, reject) => {
            const lcConfig = this.languageClientConfig?.options;
            if (lcConfig?.$type === 'WebSocket' || lcConfig?.$type === 'WebSocketUrl') {
                const url = createUrl(lcConfig);
                const webSocket = new WebSocket(url);

                webSocket.onopen = () => {
                    const socket = toSocket(webSocket);
                    const messageTransports = {
                        reader: new WebSocketMessageReader(socket),
                        writer: new WebSocketMessageWriter(socket)
                    };
                    this.handleLanguageClientStart(messageTransports, resolve, reject);
                };
                webSocket.onerror = () => {
                    reject(`languageClientWrapper (${this.name}): Websocket connection failed.`);
                };
            } else {
                if (!this.worker) {
                    if (lcConfig?.$type === 'WorkerConfig') {
                        const workerConfig = lcConfig as WorkerConfigOptions;
                        this.worker = new Worker(new URL(workerConfig.url, window.location.href).href, {
                            type: workerConfig.type,
                            name: workerConfig.name
                        });

                        this.worker.onerror = () => {
                            reject(`languageClientWrapper (${this.name}): Illegal worker configuration detected. Potentially the url is wrong.`);
                        };
                    } else {
                        const workerDirectConfig = lcConfig as WorkerConfigDirect;
                        this.worker = workerDirectConfig.worker;
                    }
                }
                const messageTransports = {
                    reader: new BrowserMessageReader(this.worker),
                    writer: new BrowserMessageWriter(this.worker)
                };
                this.handleLanguageClientStart(messageTransports, resolve, reject);
            }
        });
    }

    private async handleLanguageClientStart(messageTransports: MessageTransports,
        resolve: (value: string) => void,
        reject: (reason?: unknown) => void) {

        this.languageClient = this.createLanguageClient(messageTransports);
        const lcConfig = this.languageClientConfig?.options;
        messageTransports.reader.onClose(async () => {
            await this.languageClient?.stop();
            if ((lcConfig?.$type === 'WebSocket' || lcConfig?.$type === 'WebSocketUrl') && lcConfig?.stopOptions) {
                const stopOptions = lcConfig?.stopOptions;
                stopOptions.onCall();
                if (stopOptions.reportStatus) {
                    console.log(this.reportStatus().join('\n'));
                }
            }
        });

        try {
            await this.languageClient.start();
            if ((lcConfig?.$type === 'WebSocket' || lcConfig?.$type === 'WebSocketUrl') && lcConfig?.startOptions) {
                const startOptions = lcConfig?.startOptions;
                startOptions.onCall();
                if (startOptions.reportStatus) {
                    console.log(this.reportStatus().join('\n'));
                }
            }
        } catch (e) {
            const errorMsg = `languageClientWrapper (${this.name}): Start was unsuccessful: ${e}`;
            reject(errorMsg);
        }
        resolve(`languageClientWrapper (${this.name}): Start was successfully.`);
    }

    private createLanguageClient(transports: MessageTransports): MonacoLanguageClient {
        return new MonacoLanguageClient({
            name: 'Monaco Wrapper Language Client',
            clientOptions: {
                // use a language id as a document selector
                documentSelector: [this.languageId!],
                // disable the default error handler
                errorHandler: {
                    error: () => ({ action: ErrorAction.Continue }),
                    closed: () => ({ action: CloseAction.DoNotRestart })
                },
                // allow to initialize the language client with user specific options
                initializationOptions: this.languageClientConfig?.initializationOptions
            },
            // create a language client connection from the JSON RPC connection on demand
            connectionProvider: {
                get: () => {
                    return Promise.resolve(transports);
                }
            }
        });
    }

    public async disposeLanguageClient(keepWorker?: boolean): Promise<void> {
        if (this.languageClient && this.languageClient.isRunning()) {
            try {
                await this.languageClient.dispose();
                if (keepWorker === undefined || keepWorker === false) {
                    this.worker?.terminate();
                    this.worker = undefined;
                }
                this.languageClient = undefined;
                await Promise.resolve('monaco-languageclient and monaco-editor were successfully disposed.');
            } catch (e) {
                await Promise.reject(`Disposing the monaco-languageclient resulted in error: ${e} `);
            }
        }
        else {
            await Promise.reject('Unable to dispose monaco-languageclient: It is not yet started.');
        }
    }

    reportStatus() {
        const status: string[] = [];
        status.push('LanguageClientWrapper status:');
        status.push(`LanguageClient: ${this.getLanguageClient()} `);
        status.push(`Worker: ${this.getWorker()} `);
        return status;
    }
}
