from pydantic import BaseModel


class AuthResponse(BaseModel):
    id: int
    executive_id: int
    expires_in: int
    refresh_before: str
    platform_type: int
    client_details: str
    created_on: str
    access_token: str
    refresh_token: str
    token_type: str
