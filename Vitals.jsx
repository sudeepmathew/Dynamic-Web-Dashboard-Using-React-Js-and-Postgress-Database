import classes from './Vitals.module.css'
import { useState, useEffect } from 'react';
import TypographyMenu from '../UI/VitalsDropdown/VitalsDropdown';
import VitalsLineChart from '../Charts/VitalsLineChart';
import DropDwon from '../UI/Drwopdown/DropDwon'
import InfoBox from '../UI/InfoBox/InfoBox';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

function Vitals() {

    const [vitalData, setVitalData] = useState([]);
    const [pidData, setPidData] = useState([]);
    const [subDataChange, setSubDataChange] = useState([]);

    const fetchData = async() => {
        try {
            const vitals_data = await fetch("http://localhost:5000/vitals")
            const response_vtals_Pid = await fetch("http://localhost:5000/pid")
            const response = await vitals_data.json();
            const response_vitals_pid = await response_vtals_Pid.json();
            setVitalData(response)
            const pid_array = []
            response_vitals_pid.forEach(data =>{
                pid_array.push(data.pid)
        })
        setPidData(pid_array)

        } catch(err) {
            console.log(err)
        }
    }

    useEffect (() => {
    
        fetchData();
      }, []);

    //   console.log(vitalData)
      const ChartDataBuild = (data) => {
        const hr = []
        const resp = []
        const temp = []
        const diastolic = []
        const systolic = []
        const visit = []
        const date = []
        data.forEach(data => {
            hr.push(data.hr)
            resp.push(data.resp)
            temp.push(data.temp)
            diastolic.push(data.diastolic)
            systolic.push(data.hr)
            visit.push(data.visit)
            date.push(data.collection_date.split(':')[0])
        })
        return {
            "visit":date,
            "dataset": [
                {
                    label : "hr",
                    data: hr,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label : "resp",
                    data: resp,
                    fill: false,
                    borderColor: "rgba(100,1,121,111)"
                },
                {
                    label : "temp",
                    data: temp,
                    fill: false,
                    borderColor: "rgba(134,12,12,111)"
                },
                {
                    label : "diastolic",
                    data: diastolic,
                    fill: false,
                    borderColor: "rgba(12,12,166,11)"
                },
                {
                    label : "systolic",
                    data: systolic,
                    fill: false,
                    borderColor: "rgba(10,11,21,112)"
                },
            ]
        }   
      }

    const subjectChangeHandler = async (event) => {
        const subChange = event.target.value
        setSubDataChange(event.target.value)
        const pid = subChange
        const url1 = `http://localhost:5000/vitals`
        const url2 = `http://localhost:5000/vitals/${pid}`
        const url = subChange === 'All' ? 
        url1 : url2
        await fetch(url).then(response => response.json())
        .then(data => {
            setVitalData(data)
   
            // setButtonClick(false)
        })

    }
    const VitalChartData = ChartDataBuild(vitalData)
    // console.log(VitalChartData)
        let hr = 0;
        let temp = 0;
        let diastolic = 0;
        const total = vitalData.length;

        vitalData.forEach(data=> {
            hr += data.hr
            temp += data.temp
            diastolic += data.diastolic


        })

        const hr_avg = Math.round(hr/total);
        const temp_avg = Math.round(temp/total);
        const diastolic_avg = Math.round(diastolic/total);


        const vitalsAvgData = {
            "hr" : hr_avg,
            "temp" : temp_avg,
            "bp" : diastolic_avg,
        }
        console.log(vitalsAvgData)
    return (
        <div className={classes.VitalsContainer}>
            <div className={classes.VitalsLineChart}>
                {/* <TypographyMenu /> */}
                <VitalsLineChart data={VitalChartData}/>
            </div>
                 <div className={classes.InformationContainer}>
                    <div className={classes.dropdown}>
                                <h3>Select Subject</h3>
                                <DropDwon className={classes.item} value={subDataChange}  onChange={subjectChangeHandler} data={pidData}/>
                        </div>
                    <div className={classes.InfoBoxContainer}>
                        <div className={classes.Infobox_cn}>
                            <InfoBox title="Avg HR" data={vitalsAvgData.hr} Icon={FavoriteBorderIcon}/>
                        </div>
                        <div className={classes.Infobox_cn}>
                            <InfoBox className={classes.Infobox_cn} title="Avg Temp" data={vitalsAvgData.temp} Icon={LocalHospitalIcon}/>
                        </div>
                        <div className={classes.Infobox_cn}>
                            <InfoBox className={classes.Infobox_cn} title="Avg BP" data={vitalsAvgData.bp} Icon={DirectionsRunIcon}/>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default Vitals
