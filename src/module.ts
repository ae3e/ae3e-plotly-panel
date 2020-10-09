import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import {PanelOptionCode} from './PanelOptionCode';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
    return builder
        .addCustomEditor({
            id: 'data',
            path: 'data',
            name: 'Data',
            description: 'Data of the chart',
            editor: PanelOptionCode,
            category: ['Plotly'],
            settings: {
                language: 'json',
            },
        })
        .addCustomEditor({
            id: 'layout',
            path: 'layout',
            name: 'Layout',
            description: 'Layout of the chart',
            editor: PanelOptionCode,
            category: ['Plotly'],
            settings: {
                language: 'json',
            },
        })
        .addCustomEditor({
            id: 'config',
            path: 'config',
            name: 'Configuration',
            description: 'Configuration of the chart',
            editor: PanelOptionCode,
            category: ['Plotly'],
            settings: {
                language: 'json',
            },
        })
        .addCustomEditor({
            id: 'script',
            path: 'script',
            name: 'Script',
            description: `
            Script executed whenever new data is available.
            
            Must return an object with one or more of the following properties : data, layout, config
            f(data, variables){...your code...}
            `,
            editor: PanelOptionCode,
            category: ['Script'],
            settings: {
                language: 'javascript',
            },
        })
        .addCustomEditor({
            id: 'onclick',
            path: 'onclick',
            name: 'Click script',
            description: `
            Script executed when chart is clicked.
            f(data){...your code...}`,
            editor: PanelOptionCode,
            category: ['Click script'],
            settings: {
                language: 'javascript',
            },
        })
});
