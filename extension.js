const vscode = require('vscode')
const GrammarsConfig = require('./syntaxes/palette.tmLanguage.json')

function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerColorProvider('palette', {
      provideDocumentColors(document) {
        return document.getText().split(document.eol === 1 ? '\n' : '\r\n').flatMap((line, lineNumber) =>
          Array.from(line.matchAll(new RegExp(GrammarsConfig.repository.colour.match, 'g'))).map(matched =>
            new vscode.ColorInformation(
              new vscode.Range(lineNumber, matched.index, lineNumber, matched.index + 7),
              new vscode.Color(...matched[0].slice(1).match(/../g).map(rgb => parseInt(rgb, 16) / 255), 1)
            )
          )
        )
      }
    })
  )
}

function deactivate() { }

module.exports = {
  activate,
  deactivate,
}