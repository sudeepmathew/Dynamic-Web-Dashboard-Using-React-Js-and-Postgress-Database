import classes from './Lab.module.css'
import DropDwon from '../UI/Drwopdown/DropDwon'
import { useState, useEffect } from 'react';
import AnalyteLine from '../Charts/AnalyteLine';
import LabTable from '../UI/LabTable/LabTable'
import BaselineAnalyte from '../Charts/BaselineAnalyte';
import AnalyteIndication from '../Charts/AnalyteIndication';
import BoxChart from '../Charts/BoxChart'


function Lab() {


    const [subject, setSubject] = useState('All');
    const [analyte, setAnalyte] = useState('All');
    const [fetch_analyte, setFetchAnalyte] = useState([]);
    const [fetchSubject, setFetchSubject] = useState([]);
    const [all_Analytes, setAllAnalytes] = useState([]);
    const [BoxChartData, setBoxChartData] = useState([]);
    const [buttonClick, setButtonClick] = useState(false)


  const fetchData = async () => {
    try {
        const response_analyte = await fetch("http://localhost:5000/analyte")
        const response_labPid = await fetch("http://localhost:5000/pid")
        const res_analyte = await response_analyte.json();
        const res_pid = await response_labPid.json();
        const data_array = []
        const pid_array = []
        res_analyte.forEach(data =>{
            data_array.push(data.test_name)
        })
        res_pid.forEach(data =>{
            pid_array.push(data.pid)
        })

        setFetchAnalyte(data_array)
        setFetchSubject(pid_array)
        
    } catch (err) {
      console.error(err)
    }
  }

useEffect (() => {
    
    fetchData();
  }, [analyte]);

  const chartDataBuid = (data_Points) => {
    const num_val = []
    const visit_id = []
    const graph_low = []
    const graph_high = []
    const test_low = []
    const test_high = []
    const test_unit = []
    const pid_val = []
    const test_name = []
    const baseline_val = []
    const indication = []
    data_Points.forEach(data => {
        num_val.push(data.num_val)
        visit_id.push(data.visit)
        graph_low.push(data.graph_low)
        graph_high.push(data.graph_high)
        test_low.push(data.low_range)
        test_high.push(data.high_range)
        test_unit.push(data.lab_unit)
        pid_val.push(data.pid)
        test_name.push(data.test_name)
        baseline_val.push(data.baseline_value)
        indication.push(data.indication)
    })
    return [
        {
        visit: visit_id,
        value:num_val,
        g_low:graph_low,
        g_high:graph_high,
        t_low:test_low,
        t_high:test_high,
        t_unit:test_unit,
        p_val:pid_val,
        t_name:test_name,
        b_val:baseline_val,
        ind_v:indication,
        }
    ]
    
    }


    const Indication_ChartBuild = (array_values) => {
    const res_val = []
    const symptom1 = []
    const symptom2 = []
    const symptom3 = []
    const symptom4 = []
    const symptom5 = []
    const symptom6 = []
    array_values.forEach(d => {
        if(d.res_val !== null ) {
            res_val.push(d.res_val)
            symptom1.push(d.symptom1)
            symptom2.push(d.symptom2)
            symptom3.push(d.symptom3)
            symptom4.push(d.symptom4)
            symptom5.push(d.symptom5)
            symptom6.push(d.symptom6)
        }
    })
    return [
        {
        'label':symptom1[0],
        'value':10
         },
         {
        'label':symptom2[0],
        'value':10
         },
         {
         'label':symptom3[0],
        'value':10
         },
        {
         'label':symptom4[0],
         'value':10
        },
        {
        'label':symptom5[0],
        'value':10
         },
         {
        'label':symptom6[0],
        'value':10
        }
    ]
    }


  const AnalyteChangeHandler = async (event) => {
        const analyteChange = event.target.value;
        setAnalyte(event.target.value)
        const test_value = analyteChange
        const url1 = `http://localhost:5000/labs/${test_value}`
        const url2 = `http://localhost:5000/labs/${test_value}/${subject}`
        const url = subject !== 'All' ? 
        url2 : url1
        await fetch(url).then(response => response.json())
        .then(data => {
            setAllAnalytes(data)
            // setButtonClick(false)
        })

        
    }   
    const ind_data = Indication_ChartBuild(all_Analytes)
    const data_Val = chartDataBuid(all_Analytes);

    // console.log(all_Analytes);
    const subjecBtnEvent =  (event) => {
        var result = Object.values(all_Analytes.reduce((a, c) => {
            (a[c.pid] || (a[c.pid] = {x: c.pid, y: []})).y.push(c.num_val);
            return a;
          }, {}));
          
          setBoxChartData(result)
        //   setButtonClick(true)   
    }


    const visitBtnEvent = (event) => {
        var result = Object.values(all_Analytes.reduce((a, c) => {
            (a[c.visit] || (a[c.visit] = {x: c.visit, y: []})).y.push(c.num_val);
            return a;
          }, {}));
          setBoxChartData(result)   
        //   setButtonClick(true) 
    }
    
    
    const subjectChangeHandler = async (event) => {
        const subjectChange = event.target.value;
        setSubject(subjectChange)
        const test_value = analyte
        const url1 = `http://localhost:5000/labs/${test_value}`
        const url2 = `http://localhost:5000/labs/${test_value}/${subjectChange}`
        const url = subjectChange === 'All' ? 
        url1 : url2
        await fetch(url).then(response => response.json())
        .then(data => {
            setAllAnalytes(data)
            // setButtonClick(false)
        })

        
    }   
     
    Array.prototype.isNull = function (){
        return this.join().replace(/,/g,'').length === 0;
    };


    return (
        <div className={classes.lab_container}>
            <div className={classes.lab_options}>
                <div className={classes.dropdown}>
                        <h3>Select Analyte</h3>
                        <DropDwon className={classes.item} value={analyte} onChange={AnalyteChangeHandler} data={fetch_analyte}/>
                </div>
                <div className={classes.dropdown}>
                    <h3>Select Subject</h3>
                    <DropDwon className={classes.item} value={subject} onChange={(e) => subjectChangeHandler(e,data_Val)} data={fetchSubject}/>
                </div>
            </div>
                
           <div className={classes.Chart_Table_container}> 
                <div className={classes.Analyte__chart_container}>
                    <AnalyteLine subjecData={data_Val} analyteName={analyte}/>
                </div>
                <div className={classes.baselineChart}>
                    <BaselineAnalyte subjectData={data_Val}/>
                </div>
                
            </div>
            
            <div className={classes.LabTable__cotainer}>
                <div className={classes.whisk__plot_container}>
                    <div className={classes.button__container}>
                        <button  onClick={subjecBtnEvent} className={classes.subject__button} type="submit">Subject</button>
                        <button onClick={visitBtnEvent} className={classes.visit__button} type="submit">Visit</button>
                    </div>
                    
                    <BoxChart data={BoxChartData} />
                    
                </div>
                
                {data_Val[0].ind_v.isNull() === false ?
                
                <AnalyteIndication data={ind_data} ind={data_Val}/>
                :
                
                   <h3>No Indication is present</h3> 

                
               }   
            </div>

            <div>
            <LabTable subjectData={data_Val} />
            </div>

        </div>
    )
}

export default Lab
