import os
import time
from typing import Dict, List

import torch
from sklearn.metrics import (
    accuracy_score,
    f1_score,
    precision_score,
    recall_score,
)
from torch.optim.lr_scheduler import (
    ReduceLROnPlateau,
)

from app.modules.training.models.factory import (
    ModelFactory,
)


MODEL_DIRECTORY = "storage/models"

os.makedirs(
    MODEL_DIRECTORY,
    exist_ok=True,
)


class Trainer:

    def __init__(
        self,
        data,
        model_name: str = "GCN",
        hidden_dim: int = 64,
        learning_rate: float = 0.001,
        epochs: int = 200,
        weight_decay: float = 5e-4,
        patience: int = 20,
    ):

        self.data = data

        self.model_name = model_name

        self.hidden_dim = hidden_dim

        self.learning_rate = learning_rate

        self.weight_decay = weight_decay

        self.epochs = epochs

        self.patience = patience

        self.device = torch.device(
            "cuda"
            if torch.cuda.is_available()
            else "cpu"
        )

        print(
            f"\nUsing device: {self.device}"
        )

        self.data = self.data.to(
            self.device
        )

        self.input_dim = (
            self.data.num_node_features
        )

        self.output_dim = (
            int(
                self.data.y.max().item()
            )
            + 1
        )

        self.model = ModelFactory.create(
            model_name=model_name,
            input_dim=self.input_dim,
            hidden_dim=self.hidden_dim,
            output_dim=self.output_dim,
        ).to(self.device)

        self.optimizer = torch.optim.Adam(
            self.model.parameters(),
            lr=self.learning_rate,
            weight_decay=self.weight_decay,
        )

        self.scheduler = (
            ReduceLROnPlateau(
                self.optimizer,
                mode="max",
                factor=0.5,
                patience=10,
            )
        )

        self.loss_fn = (
            torch.nn.CrossEntropyLoss()
        )

        self.best_accuracy = 0.0

        self.best_epoch = 0

        self.counter = 0

        self.history: List[
            Dict
        ] = []

        print("\nTrainer Configuration")

        print("-" * 40)

        print(
            f"Model        : {self.model_name}"
        )

        print(
            f"Input Dim    : {self.input_dim}"
        )

        print(
            f"Hidden Dim   : {self.hidden_dim}"
        )

        print(
            f"Output Dim   : {self.output_dim}"
        )

        print(
            f"LearningRate : {self.learning_rate}"
        )

        print(
            f"Epochs       : {self.epochs}"
        )

        print(
            f"Patience     : {self.patience}"
        )

        print("-" * 40)

    def train(
        self,
        checkpoint_path: str = "best_model.pt",
    ):

        self.history = []

        start_time = time.time()

        print("\nStarting training...\n")

        for epoch in range(self.epochs):

        # -------------------------
        # Training Mode
        # -------------------------

            self.model.train()

            self.optimizer.zero_grad()

            logits = self.model(
                self.data.x,
                self.data.edge_index,
            )

            train_loss = self.loss_fn(
                logits[self.data.train_mask],
                self.data.y[self.data.train_mask],
            )

            train_loss.backward()

            torch.nn.utils.clip_grad_norm_(
                self.model.parameters(),
                max_norm=1.0,
            )

            self.optimizer.step()

        # -------------------------
        # Validation
        # -------------------------

            validation_metrics = self.validate()

            validation_accuracy = (
                validation_metrics["accuracy"]
            )

            self.scheduler.step(
                validation_accuracy
            )

            current_lr = (
                self.optimizer.param_groups[0]["lr"]
            )

        # -------------------------
        # Save History
        # -------------------------

            epoch_result = {

                "epoch": epoch + 1,

                "loss": float(
                    train_loss.item()
                ),

                "accuracy": validation_metrics[
                    "accuracy"
                ],

                "precision": validation_metrics[
                    "precision"
                ],

                "recall": validation_metrics[
                    "recall"
                ],

               "f1": validation_metrics[
                    "f1"
                ],

               "learning_rate": current_lr,

            }

            self.history.append(
                epoch_result
            )

        # -------------------------
        # Save Best Model
        # -------------------------

            if (
                validation_accuracy
                > self.best_accuracy
            ):

                self.best_accuracy = (
                    validation_accuracy
                )

                self.best_epoch = (
                    epoch + 1
                )

                self.counter = 0

                torch.save(

                    {

                        "model_name":
                        self.model_name,

                        "model_state_dict":
                        self.model.state_dict(),

                        "hidden_dim":
                        self.hidden_dim,

                        "input_dim":
                        self.input_dim,

                        "output_dim":
                        self.output_dim,

                    },

                    os.path.join(
                        MODEL_DIRECTORY,
                        checkpoint_path,
                    ),

                )

            else:

                self.counter += 1

        # -------------------------
        # Progress Logging
        # -------------------------

            if (
                epoch == 0
                or (epoch + 1) % 10 == 0
            ):

                print("=" * 60)

                print(
                    f"Epoch {epoch + 1}/{self.epochs}"
                )

                print(
                    f"Loss          : {train_loss.item():.4f}"
                )

                print(
                    f"Val Accuracy  : {validation_metrics['accuracy']:.4f}"
                )

                print(
                    f"Precision     : {validation_metrics['precision']:.4f}"
                )

                print(
                    f"Recall        : {validation_metrics['recall']:.4f}"
                )

                print(
                    f"F1 Score      : {validation_metrics['f1']:.4f}"
                )

                print(
                    f"Learning Rate : {current_lr:.6f}"
                )

                print(
                    f"Best Accuracy : {self.best_accuracy:.4f}"
                )

                print(
                    f"Best Epoch    : {self.best_epoch}"
                )

                print("=" * 60)

        # -------------------------
        # Early Stopping
        # -------------------------

            if self.counter >= self.patience:

                print("\nEarly stopping triggered.")

                break

    # -------------------------
    # Load Best Model
    # -------------------------

        self.load_best_model(
            checkpoint_path
        )

    # -------------------------
    # Final Test Metrics
    # -------------------------

        test_metrics = self.test()

        training_time = (
            time.time() - start_time
        )

        print("\nTraining Completed")

        print("-" * 50)

        print(
            f"Best Accuracy : {self.best_accuracy:.4f}"
        )

        print(
            f"Best Epoch    : {self.best_epoch}"
        )

        print(
            f"Training Time : {training_time:.2f} sec"
        )

        print("-" * 50)

        return {
 
            "history": self.history,

            "training_time": training_time,

            "metrics": test_metrics,

            "hidden_dim": self.hidden_dim,

            "output_dim": self.output_dim,

            "best_epoch": self.best_epoch,

            "best_accuracy": self.best_accuracy,

        }

    def compute_metrics(
        self,
        y_true,
        y_pred,
    ) -> Dict:

        accuracy = accuracy_score(
            y_true,
            y_pred,
        )

        precision = precision_score(
            y_true,
            y_pred,
            average="weighted",
            zero_division=0,
        )

        recall = recall_score(
            y_true,
            y_pred,
            average="weighted",
            zero_division=0,
        )

        f1 = f1_score(
            y_true,
            y_pred,
            average="weighted",
            zero_division=0,
        )

        return {
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1": f1,
        }

    def validate(
        self,
    ) -> Dict:

        self.model.eval()

        with torch.no_grad():

            logits = self.model(
                self.data.x,
                self.data.edge_index,
            )

            prediction = logits.argmax(
                dim=1
            )

            y_true = (
                self.data.y[
                    self.data.val_mask
                ]
                .cpu()
                .numpy()
            )

            y_pred = (
                prediction[
                    self.data.val_mask
                ]
                .cpu()
                .numpy()
            )

        return self.compute_metrics(
            y_true,
            y_pred,
        )

    def test(
        self,
    ) -> Dict:

        self.model.eval()

        with torch.no_grad():

            logits = self.model(
                self.data.x,
                self.data.edge_index,
            )

            prediction = logits.argmax(
                dim=1
            )

            y_true = (
                self.data.y[
                    self.data.test_mask
                ]
                .cpu()
                .numpy()
            )

            y_pred = (
                prediction[
                    self.data.test_mask
                ]
                .cpu()
                .numpy()
            )

        return self.compute_metrics(
            y_true,
            y_pred,
        )

    def predict(
        self,
    ):

        self.model.eval()

        with torch.no_grad():

            logits = self.model(
                self.data.x,
                self.data.edge_index,
            )

            probabilities = torch.softmax(
                logits,
                dim=1,
            )

            prediction = probabilities.argmax(
                dim=1,
            )

        return {

            "prediction": prediction,

            "probabilities": probabilities,

        }

    def load_best_model(
        self,
        checkpoint_path: str = "best_model.pt",
    ):

        path = os.path.join(
            MODEL_DIRECTORY,
            checkpoint_path,
        )

        if not os.path.exists(path):

            raise FileNotFoundError(
                f"Checkpoint not found: {path}"
            )

        checkpoint = torch.load(
            path,
            map_location=self.device,
        )

        self.model.load_state_dict(
            checkpoint["model_state_dict"]
        )

        self.model.eval()

        print(
            "\nBest checkpoint loaded successfully."
        )

        print(
            f"Model : {checkpoint.get('model_name')}"
        )

        print(
            f"Hidden Dimension : {checkpoint.get('hidden_dim')}"
        )

        print(
            f"Output Dimension : {checkpoint.get('output_dim')}"
        )

        return self.model

    def summary(
        self,
    ):

        return {

            "model": self.model_name,

            "input_dim": self.input_dim,

            "hidden_dim": self.hidden_dim,

            "output_dim": self.output_dim,

            "epochs": self.epochs,

            "learning_rate": self.learning_rate,

            "best_accuracy": self.best_accuracy,

            "best_epoch": self.best_epoch,

        }    