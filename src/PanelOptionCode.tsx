//Code from https://github.com/gapitio/gapit-htmlgraphics-panel
import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { TextPanelEditor } from 'TextPanelEditor';
import { EditorLanguageType, EditorCodeType } from 'types';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<EditorCodeType, Settings> {}

export const PanelOptionCode: React.FC<Props> = ({ value, item, onChange }) => {
    if(typeof value!=="string"){
        value=JSON.stringify(value, null, 2)
    }
  return <TextPanelEditor language={item.settings?.language} value={value} onChange={code => {
    if(item.settings?.language==='json' && code){
        code=JSON.parse(code);
    }  
    onChange(code)}} />;
};