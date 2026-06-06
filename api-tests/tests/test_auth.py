import pytest


def test_api_login_returns_access_token(auth_client, credentials: dict) -> None:
    auth_response = auth_client.login(credentials['username'], credentials['password'])

    assert auth_response.access_token, 'Access token must be returned'
    assert auth_response.refresh_token, 'Refresh token must be returned'
    assert auth_response.token_type.lower() == 'bearer'
    assert auth_response.expires_in > 0


@pytest.mark.smoke
def test_api_login_payload_schema(auth_client, credentials: dict) -> None:
    auth_response = auth_client.login(credentials['username'], credentials['password'])

    assert isinstance(auth_response.id, int)
    assert isinstance(auth_response.executive_id, int)
    assert len(auth_response.access_token) > 20, 'Access token should appear valid'
