from flask import Flask, render_template, request, redirect, url_for, flash
from flask_wtf.csrf import CSRFProtect
import os

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'super-secret-key')

csrf = CSRFProtect(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # Process or log form submission
    print(f"New Message from {name} ({email}): {message}")
    
    flash("Message sent successfully!")
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)