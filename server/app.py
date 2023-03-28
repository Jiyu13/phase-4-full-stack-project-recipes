#!/usr/bin/env python3
from flask import Flask, make_response, jsonify, request

from config import app, db, api
from models import Recipe



def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(port=5555, debug=True)

