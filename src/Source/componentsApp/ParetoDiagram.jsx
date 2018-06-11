import React,{ Component } from 'react';
import * as d3 from 'd3';
import {select } from 'd3'; // scaleLinear,max ALEJANDRO
import './CssComponents/ParetoDiagram.css'

const dataFeik = [
    {
        mini: 'indicador 1',
        def: 20.56,
        nombre: 'Numero de feiks con cancer'
    },
    {
        mini: 'indicador 2',
        def: 79.56,
        nombre: 'Numero de feiks con gripe'
    },
    {
        mini: 'indicador 3',
        def: 45.56,
        nombre: 'Numero de feiks con viruela'
    },
    {
        mini: 'indicador 4',
        def: 25.6,
        nombre: 'Numero de feiks con alzheimer'
    }
];

const m = {top: 50, right: 50, bottom: 50, left: 50};
//const barWidth = 5;

class ParetoDiagram extends Component {
    constructor(...props){
        super(...props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }

    createBarChart() {
        const node = this.node;
        let w  = node.clientWidth;
        let h = w * 500 / 960;
        let pData = this.convertDataToPareto(dataFeik);

        console.log(h,w)

        let xScale = d3.scaleBand().rangeRound([0,w]).padding(0.1);
        xScale.domain(pData.map(d=>d.mini))

        let yHist = d3.scaleLinear()
            .domain([0,d3.max(pData,d=>d.def)])
            .range([h,0]);

        let yCum = d3.scaleLinear().domain([0,1]).range([h,0])

        let xAxis = d3.axisBottom(xScale)

        let yAxis = d3.axisLeft(yHist)

        let yAxis2 = d3.axisRight(yCum)

        let svg = select(node).append('svg').attr("viewBox", "0, 0,"+ (w+ m.left+ m.right) +", "+ (h+ m.top+ m.bottom) ).attr("preserveAspectRatio", "xMidYMid meet")
            .attr('width','100%').append('g').attr("transform", "translate(" + m.left + "," + m.top + ")");

        let bar = svg.selectAll('bar').data(pData).enter().append('g').attr('class','bar')

        bar.append('rect').attr('x',d=>xScale(d.mini)).attr('width',xScale.bandwidth()).attr('y',d=>yHist(d.def)).attr('height',d=>h-yHist(d.def));

        let guide = d3.line().x(d=>xScale(d.mini)).y(d=>yCum(d.Acumulado));

        let line = svg.append('path').datum(pData).attr('d',guide).attr('class','line').attr('transform', 'translate(' + xScale.bandwidth()/2 + ',0)')

        svg.append('g').attr('class','x axis').attr('transform','translate(0,'+h+')').call(xAxis)

        svg.append('g').attr('class','y axis').call(yAxis).append('text')
            .attr('transform','rotate(-90)').attr('y',6).attr('dy','.71em').style('text-anchor','end').style('fill','black').text('Cantidad')

        svg.append('g').attr('class','y axis').attr('transform','translate('+[w,0]+')').call(yAxis2).append('text')
            .attr('transform','rotate(-90)').attr('y',4).attr('dy','-.71em').style('text-anchor','end').style('fill','black').text('Acumulado %')

    }

    convertDataToPareto = (data) => {
        let oData = data.sort((a, b) => b.def - a.def);
        let suma = oData.reduce((acc, cv) => {
            let nacc = acc + cv.def;
            cv['Acumulado']=nacc;
            return nacc
            }, 0);
        return oData.map(n => {
            n['Acumulado'] = n['Acumulado']/suma;
            return n
        })
    }


    render = () => 
        <div ref={node=>this.node=node} />
}
export default ParetoDiagram
