import React, {Component} from "react";
import ReactDOM from "react-dom";
import FusionCharts from "fusioncharts/core";
import Column2D from "fusioncharts/viz/column2d";
import doughnut2d from 'fusioncharts/viz/doughnut2d'
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import classes from './AnalyteIndication.module.css'

ReactFC.fcRoot(FusionCharts, doughnut2d, FusionTheme);

function AnalyteIndication(props) {
    // console.log(props.data)
    const newArray = props.data.filter(function (el)
    {
        return el.label !== null ;
        }
        );
    const chartConfigs = {
        type: "doughnut2d", // The chart type
        width: "600", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                caption: props.ind[0].ind_v[0],
                subcaption: "Click on the bar",
                // xaxisname: "Flavor",
                // yaxisname: "Amount (In USD)",
                // numberprefix: "$",
                theme: "fusion",
                // rotateValues: "0",
                "showvalues": "0",
            },
            data: [{
                    label: props.ind[0].ind_v[0],
                    value: props.data.length,
                    link: "newchart-xml-chart"
                },
                // {
                //     label: "Cranberry",
                //     value: "620000",
                //     link: "newchart-xml-cranberry"
                // },
               
            ],
            linkeddata: [{
                    id: "chart",
                    linkedchart: {
                        chart: {
                             caption: `${props.ind[0].ind_v[0]} - Symptoms`,
                            // subcaption: "Last year",
                            // numberprefix: "$",
                            theme: "fusion",
                            // rotateValues: "0",
                            // plottooltext: "$label, $dataValue,  $percentValue",
                            "showvalues": "0",
                        },
                         data: newArray
                    }
                },
              
            ]
        }
    };

    const alterChart = chart => {
        chart.configureLink({
            type: "doughnut2d",
            overlayButton: {
                message: "Back",
                fontColor: "880000",
                bgColor: "FFEEEE",
                borderColor: "660000"
            }
        });
    };

    return (
        <div className={classes.AnalyteIndication__Chart}>
            <ReactFC {
            ...chartConfigs
        } />;
        </div>
    )
}

export default AnalyteIndication;