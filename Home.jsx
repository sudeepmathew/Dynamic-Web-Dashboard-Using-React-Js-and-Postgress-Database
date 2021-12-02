import  classes from './Home.module.css'
import Card from '../UI/Cards/Card'
import TableUI from '../UI/Table/Table'
import RaceChart from '../Charts/RaceChart'
import SiteSubject from '../Charts/SiteSubject' 
import SubjectArm from '../Charts/SubjectArm'
import Gender from '../Charts/Gender'

function Home() {
    return (
        <Card className={classes.home}>
            <div className={classes.home__wrapper}>
                <div className={classes.home__widget_wrapper}>
               <TableUI className={classes.table__widget}/>
               </div>
               <div className={classes.home__widget_wrapper}>
               <RaceChart />
               </div>
               <div className={classes.home__widget_wrapper}>
               <Gender />
               </div>
               
            </div>
            <div className={classes.barchart__wrapper}>
                <div className={classes.barchart}>
                    <SiteSubject />
                </div>
                <div className={classes.barchart_arm}>
                <SubjectArm />
                </div>
         </div>
        </Card>
    )
}

export default Home
