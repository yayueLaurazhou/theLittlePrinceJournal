import re
import torch.nn as nn
from torchtext.vocab import GloVe
from torchtext.data.utils import get_tokenizer


quotes = []
tags = []

with open("training.txt", "r", encoding='utf-8') as f:
    content = f.read()
    for match in re.finditer(r'“(.*?)”', content):
        quotes.append(match.group())
    for match in re.finditer(r'tag: (.*)\n', content):
        tags.append(match.group())

glove= GloVe(name='6B', dim=300)

def generate_embedding_matrix(self, word_to):


