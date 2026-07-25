"use client";

import {
  Brain,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

interface Props {

  node:string;

  prediction:string;

  confidence:number;

}

export default function ExplanationCard({

node,

prediction,

confidence,

}:Props){

return(

<div className="rounded-3xl border bg-white p-6 shadow-sm">

<div className="flex items-center justify-between">

<div>

<p className="text-slate-500">

Prediction Explanation

</p>

<h2 className="mt-2 text-3xl font-bold">

{prediction}

</h2>

<p className="mt-2 text-slate-600">

Node

<b> {node}</b>

</p>

</div>

<div className="rounded-2xl bg-blue-100 p-4">

<Brain className="h-10 w-10 text-blue-600"/>

</div>

</div>

<div className="mt-6">

<p className="text-sm">

Confidence

</p>

<div className="mt-2 h-3 rounded-full bg-slate-200">

<div

className="h-full rounded-full bg-blue-800"

style={{

width:`${confidence*100}%`

}}

>

</div>

</div>

<p className="mt-2 font-bold">

{(confidence*100).toFixed(2)}%

</p>

</div>

<div className="mt-6 rounded-xl bg-green-50 p-4">

<div className="flex items-center gap-3">

<BadgeCheck className="text-green-600"/>

<p>

Prediction successfully explained.

</p>

</div>

</div>

</div>

);

}