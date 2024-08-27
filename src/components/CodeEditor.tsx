import './CodeEditor.css';
import { useState } from 'react';
import { Editor, OnChange } from '@monaco-editor/react';
import * as prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

function CodeEditor({ initialValue, onChange }: CodeEditorProps) {
  const [editorValue, setEditorValue] = useState(initialValue || '');

  const handleEditorChange: OnChange = (value) => {
    const newValue = value || '';
    setEditorValue(newValue);
    onChange(newValue);
  };

  const onClickFormat = async () => {
    try {
      const formatted: string = (
        await prettier.format(editorValue, {
          parser: 'babel',
          plugins: [parserBabel, prettierPluginEstree],
          semi: true,
          singleQuote: true,
        })
      ).replace(/\n$/, '');

      setEditorValue(formatted);
      onChange(formatted);
    } catch (error) {
      console.error('Error formatting code:', error);
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onClickFormat}
      >
        Format
      </button>
      <Editor
        onChange={handleEditorChange}
        value={editorValue || ''}
        theme="vs-dark"
        height="100%"
        defaultLanguage="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}

export default CodeEditor;
