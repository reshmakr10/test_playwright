import json
from typing import Dict

from .base_client import BaseClient
from models.auth import AuthResponse


class AuthClient(BaseClient):
    def login(self, username: str, password: str) -> AuthResponse:
        payload: Dict[str, str] = {
            "username": username,
            "password": password,
            "grant_type": "password",
            "client_details": json.dumps({"userAgent": "python-httpx"})
        }
        response = self.client.post(
            '/executive/entebus/account/token',
            data=payload,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        response.raise_for_status()
        return AuthResponse.model_validate(response.json())
