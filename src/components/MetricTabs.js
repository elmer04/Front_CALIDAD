import React from 'react';
import {Tab,Tabs} from 'react-bootstrap'
import MetricUpload from './MetricUpload'

const MetricTabs = ({data,metrics,...props}) =>
    <Tabs bsStyle='pills' defaultActiveKey={1} id="uncontrolled-tab-example">
    {metrics.map((val,me)=>
                <Tab eventKey={val} key={val.key} title={val.nombre.toString()}>
                    <MetricUpload key={val} me={val} data={data[me][0]} {...props}/>
                </Tab>
        )}
    </Tabs>

export default MetricTabs