from __future__ import annotations
import os
from typing import Any, Dict, Optional

import httpx
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))


class BaseClient:
    def __init__(self, base_url: Optional[str] = None) -> None:
        self.base_url = base_url or os.getenv('API_BASE_URL', 'https://dev-api.entebus.com')
        self.client = httpx.Client(base_url=self.base_url, timeout=20.0)

    def post(
        self,
        path: str,
        json: Optional[Dict[str, Any]] = None,
        data: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> httpx.Response:
        return self.client.post(path, json=json, data=data, headers=headers or {})

    def close(self) -> None:
        self.client.close()
