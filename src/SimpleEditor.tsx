import React, { PureComponent } from 'react';
import { PanelOptionsGroup, FormLabel } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import {config} from '@grafana/runtime'

import { SimpleOptions } from './types';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import 'brace/theme/tomorrow_night';
import 'brace/theme/github';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onTextChanged = (evt: any) => {
    this.props.onOptionsChange({
      ...this.props.options,
      title: evt.target.value,
    });
  };

  onLayoutChanged = (evt: any, editor?) => {
    console.log(editor.getValue());
    this.props.onOptionsChange({
      ...this.props.options,
      layout: JSON.parse(editor.getValue()),
    });
  };

  onDataChanged = (evt: any, editor?) => {
    this.props.onOptionsChange({
      ...this.props.options,
      data: JSON.parse(editor.getValue()),
    });
  };

  onConfigChanged = (evt: any, editor?) => {
    console.log(editor.getValue());
    this.props.onOptionsChange({
      ...this.props.options,
      config: JSON.parse(editor.getValue()),
    });
  };

  onScriptChanged = (evt: any, editor?) => {
    this.props.onOptionsChange({
      ...this.props.options,
      script: editor.getValue(),
    });
  };

  onTypeChanged = (evt: any) => {};

  render() {
    let theme = config.theme.isDark?"tomorrow_night":"tomorrow";

    return (
      <PanelOptionsGroup title="My Panel Options">
        {/*<FormField label="Title" value={this.props.options.title} onChange={this.onTextChanged} />*/}

        <div className="form-field">
          <FormLabel>{'Data'}</FormLabel>
          <AceEditor
            mode="javascript"
            theme={theme}
            name="dashboard_data"
            height="150px"
            value={JSON.stringify(this.props.options.data, null, 4)}
            onBlur={this.onDataChanged}
          />

<FormLabel>{'Layout'}</FormLabel>
          <AceEditor
            mode="javascript"
            theme={theme}
            name="dashboard_layout"
            height="150px"
            value={JSON.stringify(this.props.options.layout, null, 4)}
            onBlur={this.onLayoutChanged}
          />
        </div>
        <br />
        <div className="form-field">
          
        </div>
        <br />
        <div className="form-field">
          <FormLabel>{'Config'}</FormLabel>
          <AceEditor
            mode="javascript"
            theme={theme}
            name="dashboard_config"
            height="150px"
            value={JSON.stringify(this.props.options.config, null, 4)}
            onBlur={this.onConfigChanged}
          />
        </div>
        <br />
        <div className="form-field">
          <FormLabel>{'Script'}</FormLabel>
          <AceEditor
            mode="javascript"
            theme={theme}
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
