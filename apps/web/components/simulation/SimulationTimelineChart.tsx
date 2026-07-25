"use client";

import {

ResponsiveContainer,

LineChart,

Line,

XAxis,

YAxis,

Tooltip,

CartesianGrid,

Legend,

} from "recharts";

interface Point{

step:number;

susceptible:number;

infected:number;

recovered:number;

}

interface Props{

history:Point[];

}

export default function SimulationTimelineChart({

history,

}:Props){

return(

<div className="rounded-3xl border bg-white p-6 shadow-sm">

<h2 className="mb-6 text-2xl font-bold">

Simulation Timeline

</h2>

<ResponsiveContainer
width="100%"
height={400}
>

<LineChart data={history}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="step"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Line
dataKey="susceptible"
stroke="#22c55e"
strokeWidth={3}
/>

<Line
dataKey="infected"
stroke="#ef4444"
strokeWidth={3}
/>

<Line
dataKey="recovered"
stroke="#2563eb"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

);

}