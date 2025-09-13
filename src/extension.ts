import * as vscode from 'vscode';

interface TerminalConfig {
	command: string;
	show: boolean;
}


export async function activate(context: vscode.ExtensionContext) {
	console.log('Terminal Pilot is now active!');

	const startTerminalPilotCommand = 'extension.terminalPilot';

	// Function that reads the configuration and launches terminals.
	const startTerminals = () => {
		console.log('Terminal Pilot: Starting terminals...');
		const config = vscode.workspace.getConfiguration('terminal-pilot');
		const terminalConfigs: { [terminalName: string]: TerminalConfig } | undefined = config.get('terminals');

		// If no terminal configuration is set, show an error and return.
		if (!terminalConfigs || Object.keys(terminalConfigs).length === 0) {
			vscode.window.showErrorMessage('Terminal Pilot: No terminal configurations found in settings.');
			return;
		}

		// Dispose only those terminals whose names are in the configuration.
		const configTerminalNames = Object.keys(terminalConfigs);
		vscode.window.terminals.forEach(term => {
			if (configTerminalNames.includes(term.name)) {
				term.dispose();
			}
		});

		// Create new terminals based on the configuration.
		for (const terminalName in terminalConfigs) {
			if (Object.prototype.hasOwnProperty.call(terminalConfigs, terminalName)) {
				const termConfig = terminalConfigs[terminalName];
				const terminal = vscode.window.createTerminal({ name: terminalName });
				
				// Show the terminal if the "show" flag is true.
				if (termConfig.show) {
					terminal.show();
				}
				
				// Send the command if provided.
				if (termConfig.command && termConfig.command.trim() !== "") {
					terminal.sendText(termConfig.command);
				}
			}
		}
	};

	// Register the command for manual invocation.
	const disposable = vscode.commands.registerCommand(startTerminalPilotCommand, startTerminals);
	context.subscriptions.push(disposable);

	// Create a status bar item for manual launch.
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.text = '$(terminal) Pilot';
	statusBarItem.tooltip = 'Launch Terminal Pilot';
	statusBarItem.command = startTerminalPilotCommand;
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	// Auto-launch logic: only launch once per fresh VS Code start.
	const config = vscode.workspace.getConfiguration('terminal-pilot');
	const autoLaunch = config.get<boolean>('auto-launch', false);
	if (autoLaunch) {
		console.log('Terminal Pilot: Auto-launching terminals...');
		startTerminals();
	}
}

export function deactivate() {}
