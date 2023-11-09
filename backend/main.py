from flask import Flask, request

from lcapy import Circuit

app = Flask(__name__)


@app.post('/')
def simulate():
    ckt_data = request.get_json()
    a = Circuit(ckt_data["netlist"])
    
    return {"voltage": str(a[1].v)}

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    