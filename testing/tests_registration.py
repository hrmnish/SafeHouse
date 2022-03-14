from cgi import test
from json import dumps
import requests

from config import BACKEND_URI


def test_registration(name, email, password):

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
    
    return response
    
def test_suite_registration(): 
    # inserting user with invalid email
    name = "testUserx"
    email = "invalidEmail"
    password = "testUserxPassword"
    response = test_registration(name, email, password)
    assert response.status_code == 401
    print("Test for invalid email passed.")

    # inserting user with same username but different email
    name = "testUser1"
    email = name+"x@gmail.com"
    password = name+"Password"
    response = test_registration(name,email,password)
    if (response.status_code == 200):
        print("Test for duplicate username passed.")
    else:
        print("Test for duplicate username failed, err code:", response.status_code) 

    # inserting user with existing email
    name = "testUser2"
    email = "testUser2@gmail.com"
    password = "testUser2Password"
    response = test_registration(name, email, password)
    assert response.status_code == 401
    print("Test for duplicate email insertion passed.")

    # inserting user with no username
    name = ""
    email = "testUser2@gmail.com"
    password = "testUser2Password"
    response = test_registration(name, email, password)
    assert response.status_code == 401
    print("Test for missing username insertion passed.")
    
    # inserting user with no email
    name = "none"
    email = ""
    password = "testUser2Password"
    response = test_registration(name, email, password)
    assert response.status_code == 401
    print("Test for missing email insertion passed.")

    # inserting user with no password
    name = "none"
    email = "none@gmail.com"
    password = ""
    response = test_registration(name, email, password)
    assert response.status_code == 401
    print("Test for missing password insertion passed.")

def main():

    test_suite_registration()


if __name__ == "__main__":
    main()
