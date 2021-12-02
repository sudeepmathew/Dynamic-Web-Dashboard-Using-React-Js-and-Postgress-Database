import classes from './AnalyteLine.module.css'
import ReactApexChart from 'react-apexcharts';


function AnalyteLine(props) {

    const series = [
        {
          name: `${props.analyteName + ' ' +'('+props.subjecData[0].t_unit[0]+')'}`,
          data: props.subjecData[0].value
         
          
        },
      
      ];

      const options = {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
          annotations: {
            yaxis: [{
              y: props.subjecData[0].t_low[0],
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
                text: 'lower limit',
              }
            },
            {
              y: props.subjecData[0].t_high[0],
              borderColor: '#db1d1d',
              label: {
                borderColor: '#db1d1d',
                style: {
                  color: '#fff',
                  background: '#db1d1d',
                },
                text: 'upper limit',
              }
            }
        ]
      },
        colors: ['#77B6EA', '#545454', '#325ea8'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: `${props.analyteName === 'All' ? 'Select Any Analyte'
          : props.analyteName + ' ' +'('+props.subjecData[0].t_unit[0]+')'}`,
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: props.subjecData[0].visit,
          title: {
            text: 'Viist'
          }
        },
        yaxis: {
          title: {
            text: 'SIRESC'
          },
          min: props.subjecData[0].g_low[0],
          max: props.subjecData[0].g_high[0]
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      };

    return (
        <div className={classes.lab_analyte_chart}>
            <ReactApexChart className={classes.analytes_chart}
             options={options} series={series} type="line" height={350} width={600}/>
        </div>
    )
}

export default AnalyteLine
