import requests
import bs4
import re
import nltk
from nltk.corpus import stopwords
from collections import Counter


def main():
    # get the text to analyze from web scrapping
    url = 'https://gutenberg.net.au/ebooks03/0300771h.html'
    page = requests.get(url)
    page.raise_for_status()
    soup = bs4.BeautifulSoup(page.text, 'html.parser')
    p_elems = [element.text for element in soup.select("p")]
    text = ' '.join(p_elems)
    # re.sub function: re.sub(pattern, repl, string)
    text = re.sub("\s+", " ", text)  # remove one or more white space to a single space
    text_edit = re.sub("[^a-zA-Z]", " ",text)  # removing anything that is not a character, that is numbers, punctuation marks
    text_edit = re.sub("\s+", " ", text_edit)  # remove extra spaces again

    # reqeust the user input the number of sentences to include in the summary
    while True:
        max_words = input("Enter max words per sentence for summary:") 
        num_sents = input("Enter number of sentences for summary:")
        if max_words.isdigit() and num_sents.isdigit():  # using while loop and isdigit() to make sure that user input integer
            break
        else:
            print("\nInput must be in whole numbers")

    text_edit_no_stop = remove_stop_words(text_edit)
    word_freq = get_word_freq(text_edit_no_stop)
    sent_scores = score_sentences(text, word_freq, max_words)

    counts = Counter(sent_scores)
    sentences = counts.elements()
    summary = counts.most_common(int(num_sents))
    print('\nSummary')
    for i in summary:
        print(i[0])


def remove_stop_words(speech_edit):
    """Remove stopwords from string and return string with tokenized non-stopwords"""
    stop_words = set(stopwords.words('english'))  # searches are quicker in sets
    speech_edit_no_stop = " "
    for word in nltk.word_tokenize(speech_edit):
        if word.lower() not in stop_words:  # we want to count "One" and "one" as the same word
            speech_edit_no_stop += word + ""
    return speech_edit_no_stop


def get_word_freq(speech_edit_no_stop):
    word_freq = nltk.FreqDist(nltk.word_tokenize(speech_edit_no_stop.lower()))
    return word_freq


def score_sentences(speech, word_freq, max_words):  # use speech because you want the summary contain stopwords
    """Return a dictionary of sentence scores based on word frequency"""
    sent_scores = dict()
    sentences = nltk.sent_tokenize(speech)  # tokenize the speech string into sentences
    for sent in sentences:
        sent_scores[sent] = 0
        words = nltk.word_tokenize(sent.lower())
        sent_word_count = len(words)
        # long sentences are more likely to have more important words(nonstop words), normalized it by sentence length
        if sent_word_count <= int(
                max_words):  # Only sentences less than the max number of words by the author are considered
            for word in words:
                if word in word_freq.keys():
                    sent_scores[sent] += word_freq[
                        word]  # score is calculated by the frequency of non-stop words in the whole text
            sent_scores[sent] = sent_scores[sent] / sent_word_count
    return sent_scores


if __name__ == "__main__":
    main()
