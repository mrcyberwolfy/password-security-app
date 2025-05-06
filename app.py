from flask import Flask, render_template, request
import json
import hashlib

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    crack_times = None
    feedback = None
    entropy = None
    score = None

    if request.method == 'POST':
        password = request.form.get('password')
        zxcvbn_result = request.form.get('zxcvbn_result')

        if password and zxcvbn_result:
            try:
                zxcvbn_data = json.loads(zxcvbn_result)
                entropy = zxcvbn_data.get('entropy')
                score = zxcvbn_data.get('score')
                crack_times = zxcvbn_data.get('crack_times_display')
                feedback = zxcvbn_data.get('feedback')

                hashed_password = hashlib.sha256(password.encode()).hexdigest()

                with open("data.txt", "a") as file:
                    file.write(f"Hash: {hashed_password}\n")
                    file.write(f"Entropy: {entropy}\n")
                    file.write(f"Score: {score}\n")
                    file.write(f"Suggestions: {feedback.get('suggestions', [])}\n")
                    file.write(f"---\n")

            except json.JSONDecodeError:
                feedback = {"warning": "Could not analyze the password. Invalid data."}

    return render_template('index.html', crack_times=crack_times, feedback=feedback, entropy=entropy, score=score)

if __name__ == '__main__':
    app.run(debug=True)
