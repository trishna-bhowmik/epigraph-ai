import {
  UploadCloud,
  ChartColumn,
  BrainCircuit,
  Network,
  Map,
  FileText,
} from "lucide-react";

export const FEATURES = [
  {
    title: "Smart Dataset Upload",
    description:
      "Import CSV, Excel, GitHub or Kaggle datasets with automatic validation.",
    icon: UploadCloud,
  },
  {
    title: "Automated EDA",
    description:
      "Generate statistics, correlations, missing-value analysis and visual insights instantly.",
    icon: ChartColumn,
  },
  {
    title: "AI Prediction",
    description:
      "Train ML and Graph Neural Network models to forecast disease spread.",
    icon: BrainCircuit,
  },
  {
    title: "Graph Intelligence",
    description:
      "Model interactions between regions using graph-based learning.",
    icon: Network,
  },
  {
    title: "Interactive Maps",
    description:
      "Visualize outbreaks using geographical and network visualizations.",
    icon: Map,
  },
  {
    title: "Export Reports",
    description:
      "Generate professional PDF reports with predictions and insights.",
    icon: FileText,
  },
];