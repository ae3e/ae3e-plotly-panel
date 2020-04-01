# Plotly Panel

[https://github.com/ae3e/plotly-panel](https://github.com/ae3e/plotly-panel)

Render chart from any datasource with [Plotly](https://plotly.com/javascript/) (An open source javascript graphing library)

Unlike the [natel-plotly-panel](https://github.com/NatelEnergy/grafana-plotly-panel), this plugin is not limited to specific types of charts. But, on the other hand, the user interface is really rough in order to let users to set all options available in Plotly.

Data can be transformed via a user-defined script before to be injected in the Plotly chart. The script includes 2 arguments :
- `data` : Data returns by the datasource
- `variables` : Object that contains [Grafana's variables](https://grafana.com/docs/grafana/latest/reference/templating/) available in the current dashboard

example :
```javascript
let x  = data.series[0].fields[0].values.buffer
let y  = data.series[0].fields[1].values.buffer

return [{
    x : x,
    y : y,
    name : variables.project //where project is the name of a Grafana's variable 
}]
````

The script must return the `data` common parameter as described in [Plotly's documentation](https://plotly.com/javascript/plotlyjs-function-reference/).

If no script is provided, the panel will use data in the *Data* field (JSON format).

The *Layout* field must contain layout of the chart in JSON format as described in [Plotly's documentation](https://plotly.com/javascript/plotlyjs-function-reference/).

![Editor](/img/editor.png)
![Panel](/img/panel.png)