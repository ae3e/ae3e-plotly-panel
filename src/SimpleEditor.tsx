import React, { PureComponent } from 'react';

import { PanelEditorProps } from '@grafana/data';
import { config } from '@grafana/runtime'

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

  onClickChanged = (evt: any, editor?) => {
    this.props.onOptionsChange({
      ...this.props.options,
      onclick: editor.getValue(),
    });
  };

  onTypeChanged = (evt: any) => { };

  render() {
    let theme = config.theme.isDark ? "tomorrow_night" : "tomorrow";

    return (
      <div>
        {/*<FormField label="Title" value={this.props.options.title} onChange={this.onTextChanged} />*/}

        <div className="section gf-form-group">
          <h5 className="section-heading">Data</h5>
          <div className="gf-form-inline">
            <div className="gf-form">
              <AceEditor
                mode="javascript"
                theme={theme}
                name="dashboard_data"
                height="150px"
                value={JSON.stringify(this.props.options.data, null, 4)}
                onBlur={this.onDataChanged}
              />
            </div>
          </div>
        </div>
        <div className="section gf-form-group">
          <h5 className="section-heading">Layout</h5>
          <div className="gf-form-inline">
            <div className="gf-form">
              <AceEditor
                mode="javascript"
                theme={theme}
                name="dashboard_layout"
                height="150px"
                value={JSON.stringify(this.props.options.layout, null, 4)}
                onBlur={this.onLayoutChanged}
              />
            </div>
          </div>
        </div>
        <div className="section gf-form-group">
          <h5 className="section-heading">Config</h5>
          <div className="gf-form-inline">
            <div className="gf-form">
              <AceEditor
                mode="javascript"
                theme={theme}
                name="dashboard_config"
                height="150px"
                value={JSON.stringify(this.props.options.config, null, 4)}
                onBlur={this.onConfigChanged}
              />
            </div>
          </div>
        </div>

        <div className="section gf-form-group">
          <h5 className="section-heading">Script</h5>
          <div className="gf-form-inline">
            <div className="gf-form">
            <AceEditor
            mode="javascript"
            theme={theme}
            name="dashboard_script"
            height="150px"
            value={this.props.options.script}
            onBlur={this.onScriptChanged}
          />
            </div>
          </div>
        </div>

        <div className="section gf-form-group">
          <h5 className="section-heading">on Click Function</h5>
          <div className="gf-form-inline">
            <div className="gf-form">
            <AceEditor
            mode="javascript"
            theme={theme}
            name="dashboard_onclick"
            height="150px"
            value={this.props.options.onclick}
            onBlur={this.onClickChanged}
          />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
