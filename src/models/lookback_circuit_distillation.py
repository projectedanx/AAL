import torch
import torch.nn as nn
import torch.nn.functional as F

class CKALoss(nn.Module):
    """
    Centered Kernel Alignment (CKA) Loss for comparing representations.
    Calculates the linear CKA between two sets of activations.
    """
    def __init__(self):
        super().__init__()

    def centering(self, K):
        n = K.shape[0]
        unit = torch.ones([n, n], device=K.device)
        I = torch.eye(n, device=K.device)
        H = I - unit / n
        return torch.mm(torch.mm(H, K), H)

    def linear_HSIC(self, X, Y):
        L_X = torch.mm(X, X.t())
        L_Y = torch.mm(Y, Y.t())
        return torch.sum(self.centering(L_X) * self.centering(L_Y))

    def forward(self, X, Y):
        # X: (batch_size, seq_len, hidden_dim) or similar flattened to (N, D)
        # Flattening assuming N is the number of samples (batch * seq_len)
        X_flat = X.view(-1, X.size(-1))
        Y_flat = Y.view(-1, Y.size(-1))

        hsic_xy = self.linear_HSIC(X_flat, Y_flat)
        hsic_xx = self.linear_HSIC(X_flat, X_flat)
        hsic_yy = self.linear_HSIC(Y_flat, Y_flat)

        cka = hsic_xy / (torch.sqrt(hsic_xx * hsic_yy) + 1e-8)
        return 1.0 - cka

class CompositeDistillationLoss(nn.Module):
    """
    Composite Loss for Mechanistic Lookback Circuit Distillation.
    L_total = L_task(y, y_s) + lambda * Sum_c L_CKA(K_s(c), K_t(c))
    """
    def __init__(self, cka_lambda: float = 1.0):
        super().__init__()
        self.cka_lambda = cka_lambda
        self.task_loss_fn = nn.CrossEntropyLoss()
        self.cka_loss_fn = CKALoss()

    def forward(self, student_logits, target_labels, student_activations, teacher_activations):
        """
        Args:
            student_logits: (batch_size, num_classes)
            target_labels: (batch_size,)
            student_activations: List of tensors from paired student circuit heads
            teacher_activations: List of tensors from paired teacher circuit heads
        """
        task_loss = self.task_loss_fn(student_logits, target_labels)

        cka_loss = 0.0
        for s_act, t_act in zip(student_activations, teacher_activations):
            cka_loss += self.cka_loss_fn(s_act, t_act)

        total_loss = task_loss + self.cka_lambda * cka_loss
        return total_loss, task_loss, cka_loss

if __name__ == "__main__":
    print("Testing Composite Distillation Loss...")
    batch_size = 4
    seq_len = 10
    hidden_dim = 64
    num_classes = 3

    student_logits = torch.randn(batch_size, num_classes, requires_grad=True)
    target_labels = torch.randint(0, num_classes, (batch_size,))

    student_acts = [torch.randn(batch_size, seq_len, hidden_dim, requires_grad=True)]
    teacher_acts = [torch.randn(batch_size, seq_len, hidden_dim)]

    loss_fn = CompositeDistillationLoss(cka_lambda=0.5)
    total_loss, task_loss, cka_loss = loss_fn(student_logits, target_labels, student_acts, teacher_acts)

    print(f"Total Loss: {total_loss.item():.4f}, Task Loss: {task_loss.item():.4f}, CKA Loss: {cka_loss.item():.4f}")
    assert total_loss > 0
    print("All tests passed.")
