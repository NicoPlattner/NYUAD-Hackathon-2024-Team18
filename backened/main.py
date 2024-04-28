from flask import Flask
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/read_csv')
def read_csv():
    data = []
    with open('data2.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            data.append(row)
    return {'data': data}

if __name__ == '__main__':
    app.run(debug=True)