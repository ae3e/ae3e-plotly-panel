export interface SimpleOptions {
  title: string;
  layout: object;
  data: any[];
  script: string;
}

export const defaults: SimpleOptions = {
  title: 'title',
  layout: {},
  data: [
    {
      type: 'scatter',
      mode: 'lines+points',
      marker: { color: 'red' },
    },
  ],
  script: '',
};
