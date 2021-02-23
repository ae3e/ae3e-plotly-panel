//Code from https://github.com/gapitio/gapit-htmlgraphics-panel
import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import {CodeEditor} from '@grafana/ui'

interface Props extends StandardEditorProps<string,any,any> {}

export const PanelOptionCode: React.FC<Props> = ({ value, item, onChange }) => {
    if(typeof value!=="string"){
        value=JSON.stringify(value, null, 2)
    }
  return <CodeEditor
    language={item.settings?.language}
    value={value==='null'?JSON.stringify(item.settings?.initValue,null,2):value}
    height="200px"
    onBlur={code => {
      if(item.settings?.language==='json' && code){
          code=JSON.parse(code);
      }  
      onChange(code)}
    }
    />;
};