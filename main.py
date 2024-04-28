import re
import torch
import numpy as np
import torch.nn as nn
from torchtext.vocab import GloVe
from torchtext.data.utils import get_tokenizer
from torch.nn.utils.rnn import pack_padded_sequence, pad_packed_sequence





quotes = []
tags = []

with open("training.txt", "r", encoding='utf-8') as f:
    content = f.read()
    for match in re.finditer(r'“(.*?)”', content):
        quotes.append(match.group().strip("”").strip("“").strip("?,.!''"))
    for match in re.finditer(r'tag: (.*)\n', content):
        tags.append(match.group().strip("”").strip("“").strip(","))

glove = GloVe(name="6B", dim=100)

tokenized_quotes = []
tokenizer = get_tokenizer("basic_english")
for quote in quotes:
    tokenized_quotes.append(tokenizer(quote))

tokenized_tags = []
tokenizer = get_tokenizer("basic_english")
for tag in tags:
    tokenized_tags.append(tokenizer(tag))
print(tokenized_tags)
longest = max([len(q) for q in tokenized_quotes]) #219

indexed_sentences = []
for sentence in tokenized_quotes:
    try:
        indexed_sentences.append([glove.stoi[word] for word in sentence])
    except KeyError:
        indexed_sentences.append(torch.zeros(100))


embedding_dim = glove.vectors.shape[1] 

indexed_tags = []
for tag in tokenized_tags:
    try:
        indexed_tags.append([glove.stoi[word] for word in tag])
    except KeyError:
        indexed_tags.append(torch.zeros(100))


# matrix_len = len(target_vocab)
# weights_matrix = np.zeros((vocab_size, 50))
# words_found = 0

# for i, word in enumerate(target_vocab):
#     try: 
#         weights_matrix[i] = glove.stoi[word]
#         words_found += 1
#     except KeyError:
#         weights_matrix[i] = np.random.normal(scale=0.6, size=(emb_dim, ))


# def create_emb_layer(weights_matrix, non_trainable=False):
#     num_embeddings, embedding_dim = weights_matrix.size()
#     emb_layer = nn.Embedding(num_embeddings, embedding_dim)
#     emb_layer.load_state_dict({'weight': weights_matrix})
#     if non_trainable:
#         emb_layer.weight.requires_grad = False

#     return emb_layer, num_embeddings, embedding_dim


# class RNN(nn.Module):
#     def __init__(self, input_size, hidden_size, output_size):
#         super(RNN, self).__init__()

#         self.hidden_size = hidden_size

#         self.i2h = nn.Linear(input_size, hidden_size)
#         self.h2h = nn.Linear(hidden_size, hidden_size)
#         self.h2o = nn.Linear(hidden_size, output_size)
#         self.softmax = nn.LogSoftmax(dim=1)

#     def forward(self, input, hidden):
#         hidden = F.tanh(self.i2h(input) + self.h2h(hidden))
#         output = self.h2o(hidden)
#         output = self.softmax(output)
#         return output, hidden

#     def initHidden(self):
#         return torch.zeros(1, self.hidden_size)

# n_hidden = 128
# rnn = RNN(n_letters, n_hidden, n_categories)


class LSTMClassifier(nn.Module):
    def __init__(self, embedding_dim, hidden_dim, vocab_size, output_dim):
        super(LSTMClassifier, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)
        self.softmax = nn.LogSoftmax(dim=1)

    def forward(self, x):
        x = self.embedding(x)
        _, (hidden, _) = self.lstm(x)
        hidden = hidden.squeeze(0)  # Assuming single-layer LSTM
        out = self.fc(hidden)
        return torch.sigmoid(out)  # Sigmoid output for multilabel classification

vocab_size = len(glove.stoi) 
model = LSTMClassifier(embedding_dim=100, hidden_dim=128, vocab_size=vocab_size, output_dim=1)

criterion = nn.BCELoss() 
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(5):
    for texts, labels in dataloader:
        texts = torch.LongTensor(texts)
        labels = torch.FloatTensor(labels)
        outputs = model(texts)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    print(f"Epoch {epoch+1}, Loss: {loss.item()}")

from torch.utils.data import Dataset, DataLoader
class TrainingDataset(Dataset):
    def __init__(self, quotes, labels):
        self.quotes = quotes
        self.labels = labels

    def __len__(self):
        return len(self.quotes)

    def __getitem__(self, idx):
        sample = {
            'input': self.quotes[idx],
            'label': self.labels[idx]
        }
        return sample

dataset = TrainingDataset(indexed_sentences, indexed_tags)