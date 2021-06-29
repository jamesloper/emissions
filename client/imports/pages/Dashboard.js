import React, { Fragment } from 'react';
import {
	FlexibleWidthXYPlot,
	HorizontalGridLines, LineMarkSeries,
	LineSeries,
	MarkSeries,
	VerticalBarSeries,
	VerticalGridLines, XAxis, YAxis,
} from 'react-vis';
import { DateTime } from 'luxon';
import { Card } from '../core/Card';

const formatDate = (date) => {
	return DateTime.fromJSDate(date).toLocaleString();
};

export const Dashboard = () => {
	const data = [
		{x: new Date('2020-12-18'), y: 8},
		{x: new Date('2020-12-17'), y: 5},
		{x: new Date('2020-12-16'), y: 4},
		{x: new Date('2020-12-15'), y: 9},
		{x: new Date('2020-12-14'), y: 1},
		{x: new Date('2020-12-13'), y: 7},
		{x: new Date('2020-12-12'), y: 6},
		{x: new Date('2020-12-11'), y: 3},
		{x: new Date('2020-12-10'), y: 2},
		{x: new Date('2020-12-09'), y: 0},
	];

	return (
		<div className="page-container">
			<div className="dashboard-graphs">
				<Card title="Cars">
					<FlexibleWidthXYPlot height={300} xType="time">
						<VerticalGridLines style={{stroke: "#333"}}/>
						<HorizontalGridLines style={{stroke: "#333"}}/>
						<XAxis style={{fill: '#fff'}}/>
						<YAxis style={{fill: '#fff'}}/>
						<LineMarkSeries
							data={data} stroke="white"
							strokeWidth={1}
							size={2}
							color="white"
						/>
					</FlexibleWidthXYPlot>
				</Card>
				{/*<div className="graph-container">*/}
				{/*	<div className="station-name">Revenue</div>*/}
				{/*	<FlexibleWidthXYPlot height={300}>*/}
				{/*		<VerticalGridLines style={{stroke: "#333"}}/>*/}
				{/*		<HorizontalGridLines style={{stroke: "#333"}}/>*/}
				{/*		<LineSeries data={data}/>*/}
				{/*	</FlexibleWidthXYPlot>*/}
				{/*</div>*/}
				{/*<FlexibleWidthXYPlot height={300}>*/}
				{/*	<VerticalGridLines style={{stroke: "#333"}}/>*/}
				{/*	<HorizontalGridLines style={{stroke: "#333"}}/>*/}
				{/*	<MarkSeries data={data}/>*/}
				{/*</FlexibleWidthXYPlot>*/}
			</div>
		</div>
	);
};