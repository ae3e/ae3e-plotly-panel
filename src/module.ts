import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
//Import an entire module for side effects only, without importing anything.
//This runs the module's global code, but doesn't actually import any values.
//It set global variable for Plotly before loading plotly.js
import 'utils'

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
                initValue:defaults.data
            },
            defaultValue: null//defaults.data,
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
                initValue: defaults.layout,
            },
            defaultValue: null//defaults.layout,
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
                initValue: defaults.config,
            },
            defaultValue: null//defaults.config,
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
            defaultValue: defaults.script,
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
            defaultValue: defaults.onclick,
        })
});
