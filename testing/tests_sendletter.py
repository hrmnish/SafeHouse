from cgi import test
from json import dumps
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
    
def test_sendletter(letter_body, login_token):
    payload = dumps(
        {
            'state' : letter_body
        }
    )
    headers = {
        'Content-Type' : 'application/json',
        'token' : login_token
    }
    response = requests.post(url = BACKEND_URI+"dashboard/sendletter", data = payload, headers = headers)
    return response

def test_suite_sendletter(): 
    # set up dummy login 
    name = "testUserSendLetter"
    email = "testUserSendLetter@gmail.com"
    password = "testUserSendLetter"

    login_token = get_token(name, email, password)

    # send letter from dummy login
    letter_body = "test letter from dummy user"
    response = test_sendletter(letter_body, login_token)
    assert response.status_code == 200
    print("Test for send valid letter passed.")


def main():

    test_suite_sendletter()


if __name__ == "__main__":
    main()