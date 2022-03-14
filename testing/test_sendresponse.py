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

def get_letters(login_token):
    headers = {
        'Content-Type' : 'application/json',
        'token' : login_token
    }
    response = requests.get(url = BACKEND_URI+"dashboard/requestletters", headers = headers)
    return loads(response.json())
    
def test_sendresponse(login_token, letter_id, letter):
    payload = dumps(
        {
            'letter_id' : letter_id,
            'letter' : letter
        }
    )
    headers = {
        'Content-Type' : 'application/json',
        'token' : login_token
    }

    response = requests.post(url = BACKEND_URI+"dashboard/sendresponse", data = payload, headers = headers)
    return response

def test_suite_requestletter(): 
    # set up dummy login 
    name = "testUserSendResponse"
    email = "testUserSendResponse@gmail.com"
    password = "testUserSendResponse"
    login_token = get_token(name, email, password)

    # get dummy letter from global inbox
    letters = get_letters(login_token)
    letter = letters['0']
    
    #send response to letter
    response_text = "response from " + name + " for " + letter['letter'] 
    response = test_sendresponse(login_token, letter['letter_id'], response_text )
    assert response.status_code == 200
    print("Test for request letters passed.")
    

def main():
    test_suite_requestletter()


if __name__ == "__main__":
    main()