
// Function to analyze password characters
function analyzePassword(password) {
    const lower = /[a-z]/g;
    const upper = /[A-Z]/g;
    const digits = /\d/g;
    const special = /[^a-zA-Z0-9]/g;

    return {
        charCount: password.length,
        lowercaseCount: (password.match(lower) || []).length,
        uppercaseCount: (password.match(upper) || []).length,
        numberCount: (password.match(digits) || []).length,
        specialCharCount: (password.match(special) || []).length
    };
}

// Update strength bar
function updateStrengthBar(score) {
    const strengthBar = document.getElementById('strengthBar');
    strengthBar.style.width = (score + 1) * 20 + '%';

    const scoreMap = [
        { color: 'red' },
        { color: 'orange' },
        { color: 'yellow' },
        { color: 'lightgreen' },
        { color: 'green' }
    ];

    strengthBar.style.backgroundColor = scoreMap[score].color;
}

// Password generator
function generateAndFillPassword(length = 16) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    document.getElementById('password').value = password;
    document.getElementById('password').dispatchEvent(new Event('input'));
}

// Password visibility toggle
function togglePasswordVisibility() {
    const input = document.getElementById('password');
    const toggleBtn = document.getElementById('toggleVisibility');
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.textContent = '🙈 Skrij geslo';
    } else {
        input.type = 'password';
        toggleBtn.textContent = '👁️ Pokaži geslo';
    }
}

document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const result = zxcvbn(password);

    const analysis = analyzePassword(password);
    document.getElementById('charCount').innerText = 'Število znakov: ' + analysis.charCount;
    document.getElementById('lowercaseCount').innerText = 'Male črke: ' + analysis.lowercaseCount;
    document.getElementById('uppercaseCount').innerText = 'Velike črke: ' + analysis.uppercaseCount;
    document.getElementById('numberCount').innerText = 'Številke: ' + analysis.numberCount;
    document.getElementById('specialCharCount').innerText = 'Posebni znaki: ' + analysis.specialCharCount;

    updateStrengthBar(result.score);
    document.getElementById('zxcvbn_result').value = JSON.stringify(result);
});

document.getElementById('passwordForm').onsubmit = function (event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const result = zxcvbn(password);

    const scoreMap = [
        { label: '🔴 Zelo šibko', crack: 'manj kot 10 sekund' },
        { label: '🟠 Šibko', crack: 'nekaj minut' },
        { label: '🟡 Zmerno', crack: 'nekaj ur' },
        { label: '🟢 Dobro', crack: 'nekaj dni' },
        { label: '💪 Zelo močno', crack: 'mesece ali leta' }
    ];

    const passwordRating = document.getElementById('passwordRating');
    const crackTime = document.getElementById('crackTime');

    passwordRating.textContent = scoreMap[result.score].label;
    crackTime.textContent = result.crack_times_display.offline_slow_hashing_1e4_per_second;

    const analysis = analyzePassword(password);
    const suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = '';

    if (
        analysis.lowercaseCount === 0 ||
        analysis.uppercaseCount === 0 ||
        analysis.numberCount === 0 ||
        analysis.specialCharCount === 0
    ) {
        const li = document.createElement('li');
        li.innerText = 'Geslo naj vsebuje velike in male črke, posebne znake in številke';
        suggestionList.appendChild(li);
    }

    if (analysis.charCount < 16) {
        const li = document.createElement('li');
        li.innerText = 'Geslo mora vsebovati vsaj 16 znakov';
        suggestionList.appendChild(li);
    }

    [
        'Ne uporabljajte enakih gesel za vaše račune',
        'Vedno uporabljajte različna varna gesla',
        'Uporabljajte Password Manager program kot je npr. Bitwarden',
        'Geslo je samo vaše in ga ne zaupajte nikomur'
    ].forEach(text => {
        const li = document.createElement('li');
        li.innerText = text;
        suggestionList.appendChild(li);
    });

    document.getElementById('zxcvbn_result').value = JSON.stringify(result);
    document.getElementById('analysisSection').style.display = 'block';
};
