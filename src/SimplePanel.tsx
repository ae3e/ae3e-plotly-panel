import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

// tslint:disable
import Plot from 'react-plotly.js';
// @ts-ignore
import Plotly from 'plotly.js/dist/plotly';
//declare plolty as global
declare global {
  interface Window {
    Plotly: any;
  }
}
window.Plotly = Plotly;

interface Props extends PanelProps<SimpleOptions> {}

export class SimplePanel extends PureComponent<Props> {
  render() {
    console.log(this);
    console.log(this.props.replaceVariables('$distance'));
    //console.log(this.props.replaceVariables('$__to'+' '+'$__from'));

    let data2: any[] = [];
    //const NbValues = data.series[0].rows.length;

    try {
      if (this.props.options.script !== '') {
        var f = new Function('data,dist', this.props.options.script);
        data2 = f(this.props.data, this.props.replaceVariables('$distance'));
      }else{
        console.log(this.props.options.data)
        data2 = this.props.options.data;
      }
    } catch (e) {
      console.log(e);
    }

    let series: any[] = [];
    if (data2.length && data2.length > 0) {
      data2.forEach((serie, index) => {
        let options = this.props.options.data[index];
        series.push({
          ...options,
          ...data2[index],
        });
      });
    }

    console.log(series);
    //let layout = { ...this.props.options.layout, autosize: true, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'transparent', height: this.props.height, title: this.props.options.title }
    let layout = { ...this.props.options.layout, autosize: true, height: this.props.height };
    return (
      <Plot
        style={{
          width: '100%',
          height: '100%',
        }}
        data={series}
        onInitialized={(figure: any, graphDiv: any) => this.setState({ figure: figure, graphDiv: graphDiv })}
        //layout={ {autosize:true, height:this.props.height, title: this.props.options.title} }
        layout={layout}
        config={{ displayModeBar: false }}
        useResizeHandler={true}
      ></Plot>
    );
  }
}
