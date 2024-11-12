# generate_quiz.py
import os
import json
import google.generativeai as genai
# from dotenv import load_dotenv
from django.conf import settings

# Load environment variables


# Configure the Google Generative AI API

genai.configure(api_key=settings.GEMINI_API_KEY)

# Set up generation configuration
generation_config = {
    "temperature": 0.6,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 600,
    "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Load and Save User Inputs
def load_user_inputs():
    try:
        with open("user_inputs.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_user_inputs(user_inputs):
    with open("user_inputs.json", "w") as file:
        json.dump(user_inputs, file)

# Generate Quiz Questions
def generate_quiz_questions(topic):
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(f"Generate a quiz with 5 MCQ questions and also correct option on {topic}")
    return response.text.strip().split('\n')

# Generate Suggestions
def get_suggestions(user_inputs):
    if not user_inputs:
        return ["No previous topics found."]
    
    previous_topics = [entry['text'] for entry in user_inputs]
    combined_input = ". ".join(previous_topics)
        
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(f"Suggest only simple 6 one linetopics based on: {combined_input}")
    return response.text.strip().split('\n')[:6]




def extract_mcqs(text_dict):
    questions = []
    
    for line in text_dict:
        # Skip headers, instructions, and blank lines
        if "##" in line or "Instructions" in line or line.strip() == "":
            continue
        # Clean line and append it to the questions list
        questions.append(line.strip())

    return questions 

def extract_suggested_qs(text_dict):
    suggetion =[]
    for line in text_dict:
        # Skip headers, instructions, and blank lines
        if "##" in line or "Here are 6 one-line" in line or line.strip() == "":
            continue
        # Clean line and append it to the questions list
        suggetion.append(line.strip())
    
    return suggetion 
