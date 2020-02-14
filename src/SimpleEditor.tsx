import React, { PureComponent } from 'react';
import { PanelOptionsGroup, FormField, FormLabel } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { SimpleOptions } from './types';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onTextChanged = (evt: any) => {
    this.props.onOptionsChange({
      ...this.props.options,
      title: evt.target.value,
    });
  };

  onLayoutChanged = (evt: any, editor: any) => {
    console.log(editor.getValue());
    this.props.onOptionsChange({
      ...this.props.options,
      layout: JSON.parse(editor.getValue()),
    });
  };

  onDataChanged = (evt: any, editor: any) => {
    this.props.onOptionsChange({
      ...this.props.options,
      data: JSON.parse(editor.getValue()),
    });
  };

  onScriptChanged = (evt: any, editor: any) => {
    this.props.onOptionsChange({
      ...this.props.options,
      script: editor.getValue(),
    });
  };

  onTypeChanged = (evt: any) => {};

  render() {
    return (
      <PanelOptionsGroup title="My Panel Options">
        <FormField label="Title" value={this.props.options.title} onChange={this.onTextChanged} />

        <br />
        <div className="form-field">
          <FormLabel>{'Data'}</FormLabel>
          <AceEditor
            mode="javascript"
            theme="tomorrow"
            name="dashboard_script"
            height="150px"
            value={JSON.stringify(this.props.options.data, null, 4)}
            onBlur={this.onDataChanged}
          />
        </div>
        <br />
        <div className="form-field">
          <FormLabel>{'Layout'}</FormLabel>
          <AceEditor
            mode="javascript"
            theme="tomorrow"
            name="dashboard_script"
            height="150px"
            value={JSON.stringify(this.props.options.layout, null, 4)}
            onBlur={this.onLayoutChanged}
          />
        </div>
        <br />
        <div className="form-field">
          <FormLabel>{'Script'}</FormLabel>
          <AceEditor
            mode="javascript"
            theme="tomorrow"
            name="dashboard_script"
            height="150px"
            value={this.props.options.script}
            onBlur={this.onScriptChanged}
          />
        </div>
      </PanelOptionsGroup>
    );
  }
}
