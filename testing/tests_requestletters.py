from cgi import test
from json import dumps, loads
import requests

from config import BACKEND_URI

def get_token(name, email, password):

    payload = dumps(
        {
            'name' : name,
            'email' : email,
            'password' : password,
        }
    )
    headers = {
        'Content-Type' : 'application/json'
    }
    response = requests.post(url = BACKEND_URI+"auth/register", data = payload, headers = headers)
    if(response.status_code != 200):
        response = requests.post(url = BACKEND_URI+"auth/login", data = payload, headers = headers)
    return response.json()['token']


def test_requestletter(login_token):
    headers = {
        'Content-Type' : 'application/json',
        'token' : login_token
    }
    response = requests.get(url = BACKEND_URI+"dashboard/requestletters", headers = headers)
    return response
    

def test_suite_requestletter(): 
    # set up dummy login 
    name = "testUserRequestLetters"
    email = "testUserRequestLetters@gmail.com"
    password = "testUserRequestLetters"

    login_token = get_token(name, email, password)

    # request letters from global inbox
    response = test_requestletter(login_token)
    
    #check if letters exist
    assert response.status_code == 200
    letters = loads(response.json())
    assert len(letters) >= 10
    print("Test for request letters passed.")
    

def main():
    test_suite_requestletter()


if __name__ == "__main__":
    main()