from gensim import corpora
from gensim.parsing.preprocessing import preprocess_string
from gensim.models.ldamodel import LdaModel
NUM_TOPICS = 10

with open('the_little_prince.txt') as file:
    text = file.read()
    preprocessed_data = preprocess_string(text)
    preprocessed_data_list = [d.split() for d in preprocessed_data]

    dictionary = corpora.Dictionary(preprocessed_data_list)
    corpus = [dictionary.doc2bow(doc) for doc in preprocessed_data_list]
    ldamodel = LdaModel(corpus, num_topics=NUM_TOPICS, id2word=dictionary,passes=15)
    print(ldamodel.show_topics(num_topics=10, num_words=10, log=False, formatted=True))


# [(0, '0.064*"ask" + 0.037*"came" + 0.035*"mean" + 0.027*"sure" + 0.026*"world" + 0.018*"far" + 0.016*"inhabit" + 0.016*"moment" + 0.015*"judg" + 0.015*"step"'), 
#  (1, '0.215*"comfort" + 0.214*"said" + 0.067*"planet" + 0.029*"draw" + 0.021*"desert" + 0.016*"beauti" + 0.014*"volcano" + 0.014*"set" + 0.013*"let" + 0.012*"wai"'), 
#  (2, '0.289*"answer" + 0.020*"night" + 0.020*"long" + 0.018*"thought" + 0.017*"heart" + 0.017*"us" + 0.016*"make" + 0.016*"took" + 0.016*"true" + 0.014*"sad"'),
#  (3, '0.316*"littl" + 0.162*"man" + 0.154*"question" + 0.042*"like" + 0.024*"sheep" + 0.020*"order" + 0.016*"thing" + 0.011*"went" + 0.008*"boa" + 0.007*"sleep"'), 
#  (4, '0.093*"flower" + 0.059*"shall" + 0.037*"water" + 0.033*"awai" + 0.029*"matter" + 0.025*"great" + 0.025*"ad" + 0.023*"think" + 0.022*"saw" + 0.021*"small"'), 
#  (5, '0.220*"word" + 0.219*"golden" + 0.033*"morn" + 0.028*"understand" + 0.018*"love" + 0.017*"baobab" + 0.014*"thousand" + 0.013*"abl" + 0.012*"demand" + 0.012*"minut"'), 
#  (6, '0.302*"come" + 0.079*"look" + 0.063*"good" + 0.027*"want" + 0.017*"place" + 0.017*"consequ" + 0.016*"drink" + 0.013*"felt" + 0.012*"work" + 0.011*"eat"'), 
#  (7, '0.227*"know" + 0.206*"laugh" + 0.166*"princ" + 0.019*"earth" + 0.014*"need" + 0.013*"peopl" + 0.009*"right" + 0.007*"try" + 0.007*"talk" + 0.007*"second"'), 
#  (8, '0.295*"star" + 0.040*"dai" + 0.034*"rose" + 0.028*"repli" + 0.022*"life" + 0.020*"grown" + 0.018*"light" + 0.016*"sand" + 0.014*"sunset" + 0.014*"hear"'), 
#  (9, '0.250*"appear" + 0.060*"time" + 0.034*"ye" + 0.027*"friend" + 0.023*"live" + 0.022*"old" + 0.019*"year" + 0.018*"import" + 0.018*"million" + 0.018*"up"')]