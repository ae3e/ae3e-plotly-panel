export interface SimpleOptions {
  title: string;
  layout: object;
  config:object;
  data: any[];
  script: string;
}

export const defaults: SimpleOptions = {
  title: 'title',
  layout: {},
  config:{},
  data: [
    {
      type: 'scatter',
      mode: 'lines+points',
      marker: { color: 'red' },
    },
  ],
  script: '',
};
