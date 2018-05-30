import React from 'react';
import MetricTabs from "./MetricTabs";
import { Grid,Col } from 'react-bootstrap'

const SubirExcel = ({rawData,metricas,postMes,parse,...props}) =>
<div>
    <Grid>
        <Col>
            <MetricTabs data={rawData} metrics={metricas} onClick={postMes} parse={parse}/>
        </Col>
    </Grid>
</div>

export default SubirExcel