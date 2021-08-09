import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { getTemplateSrv, getLocationSrv } from '@grafana/runtime';
import { SimpleOptions, defaults } from 'types';
import merge from 'deepmerge';
import _ from 'lodash';

// tslint:disable
import Plot from 'react-plotly.js';
// @ts-ignore
import Plotly from 'plotly.js/dist/plotly';
//declare plolty as global
declare global {
  interface Window {
    Plotly: any;
    //LocationSrv: any;
  }
}
window.Plotly = Plotly;
//window.LocationSrv = getLocationSrv();

let templateSrv: any = getTemplateSrv();

interface Props extends PanelProps<SimpleOptions> {}

export class SimplePanel extends PureComponent<Props> {
  render() {
    //Get all variables
    const context = {
      //interval: templateSrv.getBuiltInIntervalValue(),//dataSource.templateSrv.builtIns.__interval.value,
      __from: this.props.replaceVariables('$__from'),
      __to: this.props.replaceVariables('$__to'),
      __interval: this.props.replaceVariables('$__interval'),
      __interval_ms: this.props.replaceVariables('$__interval_ms'),
    } as any;
    templateSrv.getVariables().forEach((elt: any) => {
      context[elt.name] = elt.current.text;
    });

    //const NbValues = data.series[0].rows.length;

    let config = this.props.options.config || defaults.config;
    let data = this.props.options.data || defaults.data;
    let layout = this.props.options.layout || defaults.layout;
    let frames = this.props.options.frames || defaults.frames;

    let parameters: any;
    parameters = [this.props.options.data, layout, config];

    let error: any;
    try {
      if (this.props.options.script !== '' && this.props.data.state !== 'Error') {
        var f = new Function('data,variables', this.props.options.script);
        parameters = f(this.props.data, context);
        if (!parameters) {
          throw new Error('Script must return values');
        }
      }
    } catch (e) {
      error = e;
      console.error(e);

      //Can't update chart when script is changing if throw error?!?
      //throw new Error('There\'s an error in your script. Check the console to see error\'s details');
    }

    const combineMerge = (target, source, options) => {
      const destination = target.slice();

      source.forEach((item, index) => {
        if (typeof destination[index] === 'undefined') {
          destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
        } else if (options.isMergeableObject(item)) {
          destination[index] = merge(target[index], item, options);
        } else if (target.indexOf(item) === -1) {
          destination.push(item);
        }
      });
      return destination;
    };
    //Merge data field and data transformed by script
    /*let series: any[] = [];
      if (data2.length && data2.length > 0) {
        data2.forEach((serie, index) => {
          let options = this.props.options.data[index];
          series.push({
            ...options,
            ...data2[index],
          });
        });
      }*/

    layout = { ...layout, autosize: true, height: this.props.height };
    let display: any;
    if (error) {
      let matches = error.stack.match(/anonymous>:.*\)/m);
      let lines = matches ? matches[0].slice(0, -1).split(':') : null;
      display = (
        <div>
          There&apos;s an error in your script : <br />
          <span style={{ color: '#D00' }}>{error.toString()}</span>{' '}
          {lines ? '- line ' + (parseInt(lines[1], 10) - 2) + ':' + lines[2] : ''} (Check your console for more details)
        </div>
      );
    } else {
      display = (
        <Plot
          style={{
            width: '100%',
            height: '100%',
          }}
          data={parameters.data ? merge(data, parameters.data, { arrayMerge: combineMerge }) : data}
          frames={parameters.frames ? merge(data, parameters.frames, { arrayMerge: combineMerge }) : frames}
          onInitialized={(figure: any, graphDiv: any) => this.setState({ figure: figure, graphDiv: graphDiv })}
          //layout={ {autosize:true, height:this.props.height, title: this.props.options.title} }
          layout={parameters.layout ? merge(layout, parameters.layout) : layout}
          config={parameters.config ? merge(config, parameters.config) : config}
          useResizeHandler={true}
          onClick={(data) => {
            //console.log(data)
            var f = new Function('data', 'getLocationSrv', 'getTemplateSrv', this.props.options.onclick);
            f(data, getLocationSrv, getTemplateSrv);
          }}
        ></Plot>
      );
    }
    return display;
  }
}
