# 🦠 EpiGraph AI

> AI-powered Disease Spread Prediction & Graph Analytics Platform using Graph Neural Networks (GCN, GAT, GraphSAGE)

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.139-green)
![React](https://img.shields.io/badge/React-19-blue)
![PyTorch](https://img.shields.io/badge/PyTorch-2.13-red)
![PyTorch Geometric](https://img.shields.io/badge/Pytorch-Geometric-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📖 Overview

EpiGraph AI is an end-to-end Graph Machine Learning platform that enables researchers, healthcare professionals, and data scientists to model, analyze, and predict disease spread using Graph Neural Networks.

The platform converts epidemiological datasets into graph structures, trains multiple Graph Neural Network architectures, generates explainable AI insights, and visualizes disease propagation through an interactive dashboard.

Unlike traditional machine learning approaches, EpiGraph AI captures relationships between individuals, regions, or healthcare entities using graph representations, leading to more accurate predictions and richer insights.

---

# ✨ Features

### 🔐 Authentication

- JWT Authentication
- Secure Login & Registration
- Password Hashing
- Protected APIs

---

### 📁 Dataset Management

- Upload CSV
- Upload Excel
- Upload JSON
- Dataset Validation
- Metadata Extraction
- Dataset Preview

---

### 🌐 Graph Generation

Convert tabular datasets into graph structures.

Supports:

- Contact Networks
- Social Networks
- Regional Disease Networks
- Healthcare Networks

Graph Statistics

- Nodes
- Edges
- Density
- Connected Components

---

### 🧠 Graph Neural Network Training

Supports multiple architectures:

- GCN
- GAT
- GraphSAGE

Training Features

- Configurable Hidden Layers
- Adjustable Learning Rate
- Epoch Configuration
- Early Stopping
- Model Checkpoint Saving

Metrics

- Accuracy
- Precision
- Recall
- F1 Score
- Loss

---

### 📊 Dashboard

Visual Analytics including:

- Dataset Summary
- Graph Statistics
- Training History
- Best Performing Models
- Prediction Accuracy

---

### 🔮 Prediction Module

- Load Trained Models
- Disease Risk Prediction
- Node Classification
- Confidence Scores

---

### 🧪 Disease Spread Simulation

Simulate epidemic spread using trained graph models.

Supports

- Infection Rate
- Recovery Rate
- Spread Visualization
- Time-step Simulation

---

### 🔍 Explainable AI

Understand model decisions using explainability techniques.

Includes

- Node Importance
- Feature Importance
- Graph Interpretation

---

### 📄 Report Generation

Generate reports including

- Training Summary
- Model Performance
- Prediction Results
- Graph Statistics

Export formats:

- PDF
- JSON

---

# 🏗️ Architecture

```
                React Frontend
                       │
                       │ REST APIs
                       ▼
                 FastAPI Backend
                       │
       ┌───────────────┼──────────────┐
       │               │              │
 Authentication   Dataset Module   Graph Module
       │               │              │
       └───────────────┼──────────────┘
                       │
               Training Engine
              (GCN / GAT / GraphSAGE)
                       │
              Prediction Engine
                       │
           Explainability Module
                       │
               PostgreSQL Database
```

---

# 🛠 Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

---

## Machine Learning

- PyTorch
- PyTorch Geometric
- NetworkX
- Scikit-Learn
- Pandas
- NumPy

---

## Frontend

- React
- Tailwind CSS
- Axios
- React Router

---

## Visualization

- Plotly
- PyVis
- Matplotlib

---

# 📂 Project Structure

```
apps/
├── api/
│   ├── app/
│   │   ├── modules/
│   │   ├── db/
│   │   ├── core/
│   │   ├── utils/
│   │   └── schemas/
│   ├── storage/
│   ├── requirements.txt
│   └── main.py
│
├── web/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
```

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/yourusername/epigraph-ai.git
```

```
cd epigraph-ai
```

---

Backend

```bash
cd apps/api

python -m venv .venv
```

Windows

```bash
.venv\Scripts\activate
```

Linux / Mac

```bash
source .venv/bin/activate
```

Install packages

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn main:app --reload
```

---

Frontend

```bash
cd apps/web
```

Install

```bash
npm install
```

Run

```bash
npm run dev
```

---

# 📈 Machine Learning Pipeline

```
Dataset
    │
    ▼
Preprocessing
    │
    ▼
Graph Construction
    │
    ▼
Graph Dataset Builder
    │
    ▼
GCN / GAT / GraphSAGE
    │
    ▼
Training
    │
    ▼
Evaluation
    │
    ▼
Prediction
    │
    ▼
Explainability
```

---

# 📊 Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1 Score
- Loss

---

# 🌟 Future Enhancements

- Temporal Graph Neural Networks
- Dynamic Disease Simulation
- Real-time Data Streaming
- Federated Learning
- Multi-GPU Training
- Docker Support
- Kubernetes Deployment
- Cloud Training Pipelines
- LLM-powered Medical Assistant

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push to your branch
5. Create a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Trishna Bhowmik**

Backend Developer • AI Engineer • Machine Learning Enthusiast

GitHub: https://github.com/trishna-bhowmik

LinkedIn: www.linkedin.com/in/trishna-bhowmik-50286725b
