import React from 'react';
import MetricTabs from "./MetricTabs";
import {Panel} from 'react-bootstrap'
import { Grid,Col } from 'react-bootstrap'

const SubirExcel = ({rawData,metricas,postMes,parse}) =>
<div>
    <Grid>
        <Panel bsStyle="primary" className="panel_p">
            <Panel.Heading>Excel </Panel.Heading>
            <Panel.Body>
                <Col>
                    <MetricTabs data={rawData} metrics={metricas} onClick={postMes} parse={parse}/>
                </Col>
            </Panel.Body>
        </Panel>
    </Grid>
</div>

export default SubirExcel