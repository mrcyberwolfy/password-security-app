from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    crack_times = None
    feedback = None
    entropy = None
    score = None

    if request.method == 'POST':
        zxcvbn_result = request.form.get('zxcvbn_result')

        if zxcvbn_result:
            try:
                zxcvbn_data = json.loads(zxcvbn_result)
                entropy = zxcvbn_data.get('entropy')
                score = zxcvbn_data.get('score')
                crack_times = zxcvbn_data.get('crack_times_display')
                feedback = zxcvbn_data.get('feedback')
            except json.JSONDecodeError:
                feedback = {"warning": "Gesla ni bilo mogoče analizirati. Neveljavni podatki."}

    return render_template('index.html', crack_times=crack_times, feedback=feedback, entropy=entropy, score=score)

if __name__ == '__main__':
    app.run(debug=True)
