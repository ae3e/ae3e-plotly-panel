# Plotly Panel

[https://github.com/ae3e/ae3e-plotly-panel](https://github.com/ae3e/ae3e-plotly-panel)

Render chart from any datasource with [Plotly](https://plotly.com/javascript/) (An open source javascript graphing library)

Unlike the [natel-plotly-panel](https://github.com/NatelEnergy/grafana-plotly-panel), this plugin is not limited to specific types of charts. But, on the other hand, the user interface is really rough in order to let users to set all options available in Plotly.

The *Data*, *Layout* and *Config* fields match the common parameters described in [Plotly's documentation](https://plotly.com/javascript/plotlyjs-function-reference/). They must be in JSON format.

Data provided by the datasource can be transformed via a user-defined script before to be injected in the Plotly chart. The script includes 2 arguments :
- `data` : Data returns by the datasource
- `variables` : Object that contains [Grafana's variables](https://grafana.com/docs/grafana/latest/reference/templating/) available in the current dashboard

The script must return an object with one or more of the following properties : `data`, `layout`, `config`.

example :
```javascript
let x  = data.series[0].fields[0].values.buffer
let y  = data.series[0].fields[1].values.buffer

let serie = {
    x : x,
    y : y,
    name : variables.project //where project is the name of a Grafana's variable 
}

return {
    data : [serie],
    config : {
        displayModeBar: false
    }
}
````

Object returned by the script and JSON provided in the  *Data*, *Layout* and *Config* fields will be merged (deep merge).

If no script is provided, the panel will use only *Data*, *Layout* and *Config* fields.

![Editor](/img/editor.png)
![Panel](/img/panel.png)