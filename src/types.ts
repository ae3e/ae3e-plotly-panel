export interface SimpleOptions {
  title: string;
  layout: object;
  config:object;
  data: any[];
  script: string;
  onclick:string;
}

export const defaults: SimpleOptions = {
  title: 'title',
  layout: {
    "font": {
        "color": "darkgrey"
    },
    "paper_bgcolor": "rgba(0,0,0,0)",
    "plot_bgcolor": "rgba(0,0,0,0)",
    "margin":{
      "t":30,
      "b":20
    },
    "xaxis": {
        "type": "date"
    }
  },
  config:{
    "displayModeBar": false
  },
  data: [
    {
      type: 'scatter',
      mode: 'lines',
      line: { color: 'red', with:2 },
    },
  ],
  script: `console.log(data)
var trace = {
  x: data.series[0].fields[0].values.buffer,
  y: data.series[0].fields[1].values.buffer
};
  
return {data:[trace],layout:{title:'My Chart'}};`,
  onclick:`console.log(data)
window.updateVariables({query:{'var-project':'test'}, partial: true})`
};
