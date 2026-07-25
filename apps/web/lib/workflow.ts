import {
  Upload,
  ShieldCheck,
  ChartBar,
  Network,
 BrainCircuit,
  LayoutDashboard,
  FileDown,
} from "lucide-react";

export const WORKFLOW = [
  {
    title: "Upload Dataset",
    description: "Upload CSV, Excel, GitHub or Kaggle datasets.",
    icon: Upload,
  },
  {
    title: "Validate Data",
    description: "Automatically detect missing values and invalid columns.",
    icon: ShieldCheck,
  },
  {
    title: "Exploratory Analysis",
    description: "Generate charts, statistics and quality reports.",
    icon: ChartBar,
  },
  {
    title: "Graph Construction",
    description: "Build region-to-region interaction networks.",
    icon: Network,
  },
  {
    title: "AI Prediction",
    description: "Predict future disease spread using ML & GNNs.",
    icon: BrainCircuit,
  },
  {
    title: "Interactive Dashboard",
    description: "Explore predictions with dynamic visualizations.",
    icon: LayoutDashboard,
  },
  {
    title: "Export Report",
    description: "Download prediction reports as PDF.",
    icon: FileDown,
  },
];