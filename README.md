# Terminal Pilot

**Terminal Pilot** is a VS Code extension that automates your workflow by launching multiple terminals with custom configurations in one command.

## Features

- **Automated Terminal Setup:** Launch multiple terminals with user-defined names and commands.
- **Flexible & Dynamic:** Configure your terminal setups via VS Code settings.

## Requirements

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [VSCE](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)


# Build Extension
- From project dir i.e `terminal-pilot-extension`, run following command:

```bash
 vsce package
```

- This will then generate `terminal-pilot-v.vsix` which you can install in VSCode. 
For info about packaging and installation: https://code.visualstudio.com/api/working-with-extensions/publishing-extension


## Configuration

Add your terminal settings to your `settings.json`:

```json
{
  "terminal-pilot.terminals": {
    "terminal1": { "command": "echo Hello" },
    "terminal2": { "command": "npm start", "show": true }
  }
}
```

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run **Terminal Pilot: Start Terminals**.
3. Or - use status menu called`Pilot` in your VSCode status bar at bottom.
