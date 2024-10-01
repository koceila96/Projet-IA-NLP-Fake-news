import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from data_preparation.embedding import wordopt, output_label
import ssl
import nltk
from nltk.corpus import words, stopwords
import logging


ssl._create_default_https_context = ssl._create_unverified_context
nltk.download('stopwords')
nltk.download('wordnet') 
english_words = set(words.words())
stop_words = set(stopwords.words('english'))
#lemmatizer = WordNetLemmatizer() 

app = Flask(__name__)
CORS(app)

# mode debug 
logging.basicConfig(level=logging.DEBUG)
# Chargement du modèle et du vectoriseur TF-IDF
export_folder = '/Users/soufianebelhabibe/Desktop/IA-project/data/model/model.pickle'
with open(export_folder, 'rb') as f:
    model = pickle.load(f)

export_folder_vect = '/Users/soufianebelhabibe/Desktop/IA-project/data/model/tfidf_vectorizer.pickle'
with open(export_folder_vect, 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

# Chargement du modèle de traitement de texte
nlp = spacy.load('en_core_web_sm')
@app.route('/')

def index():
    return "Welcome to the Fake News Detection API!"

# Point de terminaison pour la prédiction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        news = data['news']
        cleaned_news = wordopt(news)  # Appliquer le prétraitement sur la nouvelle
        vectorized_news = tfidf_vectorizer.transform([cleaned_news])  # Transformer la nouvelle avec le vectoriseur
        prediction = model.predict(vectorized_news)  # Faire la prédiction
        return jsonify({'prediction': output_label(prediction[0])})
    except ValueError as e:
        print("ValueError: {}".format(e))
        return jsonify({'error': 'An error occurred during prediction.'})

if __name__ == '__main__':
    app.run(debug=True) 

   
