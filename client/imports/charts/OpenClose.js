import React from 'react';
import {
	XAxis,
	FlexibleWidthXYPlot,
	VerticalGridLines,
	HorizontalGridLines,
	YAxis,
	VerticalRectSeries,
} from 'react-vis';

const data = [
	{x0: new Date('2021-01-01'), x: new Date('2021-01-02'), y0: 1, y: 10},
	{x0: new Date('2021-01-02'), x: new Date('2021-01-03'), y0: 0, y: 5},
	{x0: new Date('2021-01-03'), x: new Date('2021-01-04'), y0: 0, y: 15},
];

const OpenCloseChart = () => {
	return (
		<FlexibleWidthXYPlot height={300} xType="time">
			<VerticalGridLines style={{stroke: "#333"}}/>
			<HorizontalGridLines style={{stroke: "#333"}}/>
			<XAxis
				style={{fill: '#fff'}}
				tickFormat={d => d.toISOString().slice(0, 10)}
				tickTotal={4}
			/>
			<YAxis style={{fill: '#fff'}}/>
			<VerticalRectSeries
				data={data}
				stroke="white"
				strokeWidth={1}
				color="black"
			/>
		</FlexibleWidthXYPlot>
	);
};

export default OpenCloseChart;