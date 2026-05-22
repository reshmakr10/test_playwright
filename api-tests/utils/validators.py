from httpx import Response
from typing import List, Any


def assert_json_has_keys(response: Response, required_keys: List[str]) -> None:
    body = response.json()
    if not isinstance(body, dict):
        raise AssertionError('Expected JSON object in response body')

    missing = [key for key in required_keys if key not in body]
    if missing:
        raise AssertionError(f'Missing required response keys: {missing}')
