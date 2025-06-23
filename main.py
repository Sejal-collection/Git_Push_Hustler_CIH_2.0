# main.py
# Backend for the AI Job Screening application.
# To run:
# 1. Install dependencies: pip install Flask Flask-Cors
# 2. Run the file: python main.py
# The server will start on http://127.0.0.1:5000

from flask import Flask, request, jsonify
from flask_cors import CORS
import re

# --- Flask App Initialization ---

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) to allow the React frontend 
# to communicate with this backend.
CORS(app)


# --- Core Logic: AI Simulation ---

def extract_keywords(text):
    """
    Extracts meaningful keywords from a given text.
    This simplified function splits the text, converts to lowercase, and removes
    common English stop words and short words.
    In a real-world scenario, this would be replaced by a more sophisticated
    NLP model (like spaCy, NLTK, or BERT).
    """
    if not text:
        return set()

    # A basic list of common English "stop words"
    stop_words = {
        'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 
        'he', 'him', 'his', 'she', 'her', 'it', 'its', 'they', 'them', 'their', 
        'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
        'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do',
        'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because',
        'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against',
        'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
        'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
        'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
        'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
        'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
        's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'd', 'll', 'm', 'o', 're',
        've', 'y', 'ain', 'aren', 'couldn', 'didn', 'doesn', 'hadn', 'hasn', 'haven',
        'isn', 'ma', 'mightn', 'mustn', 'needn', 'shan', 'shouldn', 'wasn', 'weren',
        'won', 'wouldn', 'experience', 'required', 'skills', 'responsibilities',
        'qualifications', 'duties', 'role'
    }

    # Use regex to find words, convert to lowercase, and filter
    words = re.findall(r'\b\w+\b', text.lower())
    # Return a set of unique keywords that are not stop words and are longer than 2 characters
    return {word for word in words if word not in stop_words and len(word) > 2}

def calculate_match_score(jd_keywords, resume_keywords):
    """
    Calculates a match score based on the intersection of keywords.
    The score is the percentage of job description keywords found in the resume.
    """
    if not jd_keywords:
        return 0.0
    
    matching_keywords = jd_keywords.intersection(resume_keywords)
    
    score = (len(matching_keywords) / len(jd_keywords)) * 100
    return score

def get_resume_snippet(resume_text):
    """
    Generates a short snippet from the beginning of the resume text.
    """
    if not resume_text:
        return ""
    # Strip leading/trailing whitespace and take the first 80 characters
    return resume_text.strip()[:80]


# --- API Endpoint ---

@app.route('/analyze', methods=['POST'])
def analyze_resumes():
    """
    This is the main API endpoint that the frontend calls.
    It expects a JSON payload with 'job_description' and 'resumes'.
    It processes the data and returns a ranked list of candidates.
    """
    try:
        data = request.get_json()
        if not data or 'job_description' not in data or 'resumes' not in data:
            return jsonify({"error": "Missing 'job_description' or 'resumes' in request"}), 400

        job_description = data['job_description']
        resumes_raw = data['resumes']
        
        # Split the raw resume string into individual resumes
        # The delimiter '---NEXT---' is expected from the frontend.
        resumes_list = resumes_raw.split('---NEXT---')
        
        # Extract keywords from the job description
        jd_keywords = extract_keywords(job_description)

        if not jd_keywords:
            return jsonify({"error": "Could not extract any keywords from the job description. Please provide more detail."}), 400
            
        ranked_candidates = []
        # Process each resume
        for i, resume_text in enumerate(resumes_list):
            if resume_text.strip(): # Ensure the resume is not just whitespace
                resume_keywords = extract_keywords(resume_text)
                score = calculate_match_score(jd_keywords, resume_keywords)
                
                ranked_candidates.append({
                    "id": i + 1,
                    "score": score,
                    "resume_snippet": get_resume_snippet(resume_text),
                })

        # Sort candidates by score in descending order
        ranked_candidates.sort(key=lambda x: x['score'], reverse=True)
        
        return jsonify({"ranked_candidates": ranked_candidates})

    except Exception as e:
        # Generic error handler for unexpected issues
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

# --- Main Execution ---

if __name__ == '__main__':
    # Starts the Flask development server.
    # Debug mode is on for development, which provides helpful error messages.
    app.run(debug=True)
