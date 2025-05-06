# Preveri moč vašega gesla 🔐
Ta spletna aplikacija vam omogoča, da hitro in enostavno preverite, kako varno je vaše geslo. Uporablja napredno analizo, ki oceni moč gesla glede na dolžino, kompleksnost in pogoste vzorce, ki jih napadalci uporabljajo.
Ob vnosu gesla vam aplikacija v realnem času prikaže število znakov, vrsto uporabljenih znakov ter približen čas, ki bi ga potreboval heker za razbitje gesla. Na koncu prejmete tudi jasne predloge, kako svoje geslo še izboljšati.

## Predogled
![Preview](https://github.com/mrcyberwolfy/password-security-app/blob/0b95a8cb4b641081b7c4af5e090370bad770089e/static/github%20project.jpg)

## Funkcionalost
- Analiza gesla v realnem času (male/velike črke, številke, simboli)
- Ocena varnosti in izračun časa za razbitje
- Brez beleženja gesel – analiza je varna
- Predlogi za izboljšanje gesla
- Gumb za prikaz/skritje gesla
- Podpora za slovenski jezik 🇸🇮

## Zahtevane Python knjižnice
- Flask
- gunicorn

## Zagon lokalno
```bash
pip install -r requirements.txt
python app.py

