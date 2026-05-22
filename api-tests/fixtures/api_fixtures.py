import os
from typing import Dict

import pytest
from dotenv import load_dotenv

from clients.auth_client import AuthClient


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))


@pytest.fixture(scope='session')
def credentials() -> Dict[str, str]:
    return {
        'username': os.getenv('API_USERNAME', 'guest'),
        'password': os.getenv('API_PASSWORD', 'password')
    }


@pytest.fixture(scope='session')
def auth_client() -> AuthClient:
    client = AuthClient()
    yield client
    client.close()
