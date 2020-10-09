//Code from https://github.com/gapitio/gapit-htmlgraphics-panel
import React, { PureComponent } from 'react';
import MonacoEditor, { monaco, EditorDidMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorLanguageType } from 'types';
import { config } from '@grafana/runtime';
//import textEditorDeclarations from './text-editor-declarations';

interface MonacoEditorProps {
  language: EditorLanguageType;
  value: string | undefined;
  onChange: (value?: string) => void;
}

let keyCtrlCmd = 2048;
let keyS = 49;

monaco.init().then(monaco => {
  // Add autocompletion for panel definitions (htmlNode, codeData, data, options, and theme)
  //monaco.languages.typescript.javascriptDefaults.addExtraLib(textEditorDeclarations);

  // Override the key values (should be the same)
  keyCtrlCmd = monaco.KeyMod.CtrlCmd;
  keyS = monaco.KeyCode.KEY_S;
});

class TextPanelEditor extends PureComponent<MonacoEditorProps> {
  getEditorValue: (() => string) | undefined;
  editorInstance: editor.IStandaloneCodeEditor | undefined;

  onSourceChange = () => {
    if (this.getEditorValue) {
      this.props.onChange(this.getEditorValue());
    }
  };

  onEditorDidMount: EditorDidMount = (getEditorValue, editorInstance) => {
    this.getEditorValue = getEditorValue;
    this.editorInstance = editorInstance;
    editorInstance.addCommand(keyCtrlCmd | keyS, () => {
      this.onSourceChange();
      this.render();
    });
  };

  updateDimensions = () => {
    this.editorInstance?.layout();
  };

  render = () => {
    // Updates the layout (width) of the text editor
    if (this.editorInstance) {
      this.editorInstance.layout();
    }

    return (
      <div onBlur={this.onSourceChange}>
        <MonacoEditor
          height={'33vh'}
          language={this.props.language}
          theme={config.theme.isDark ? 'vs-dark' : 'vs-light'}
          value={this.props.value}
          editorDidMount={this.onEditorDidMount}
          options={{ fontSize: 12 }}
        />
      </div>
    );
  };
}

export { TextPanelEditor };