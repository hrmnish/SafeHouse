from cgi import test
from json import dumps
import requests

from config import BACKEND_URI


def test_login(email, password):

    payload = dumps(
        {
            'email' : email,
            'password' : password,
        }
    )
    headers = {
        'Content-Type' : 'application/json'
    }
    response = requests.post(url = BACKEND_URI+"auth/login", data = payload, headers = headers)
    
    return response
    
def test_suite_login(): 

    # login in with valid credentials
    email = "testUser1@gmail.com"
    password = "testUser1Password"
    response = test_login(email, password)
    assert response.status_code == 200
    print("Test for valid login passed.")

    # login in with invalid email
    email = "invalidEmail"
    password = "testUserxPassword"
    response = test_login(email, password)
    assert response.status_code == 401
    print("Test for invalid email passed.")
    
    # login in with non-existent credentials
    email = "invalidEmail@gmail.com"
    password = "invalidPassword"
    response = test_login(email, password)
    assert response.status_code == 401
    print("Test for bad credentials passed.")

    # login in with missing credentials: email
    email = ""
    password = "invalidPassword"
    response = test_login(email, password)
    assert response.status_code == 401
    print("Test for missing email passed.")
    
    # login in with missing credentials: password
    email = "invalidEmail@gmail.com"
    password = ""
    response = test_login(email, password)
    assert response.status_code == 401
    print("Test for missing password passed.")


def main():

    test_suite_login()


if __name__ == "__main__":
    main()
