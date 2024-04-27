from flask import Flask
import csv

app = Flask(__name__)

@app.route('/read_csv')
def read_csv():
    data = []
    with open('data.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter='\t')
        for row in csvreader:
            data.append(row)
    return {'data': data}

if __name__ == '__main__':
    app.run(debug=True)