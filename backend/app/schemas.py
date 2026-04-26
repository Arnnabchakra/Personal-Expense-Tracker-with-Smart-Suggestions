from pydantic import BaseModel, EmailStr
from typing import Optional, List


class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_name: str


class TransactionCreate(BaseModel):
    type: str
    amount: float
    category: str
    note: Optional[str] = None
    date: str


class TransactionResponse(BaseModel):
    id: int
    type: str
    amount: float
    category: str
    note: Optional[str]
    date: str

    class Config:
        from_attributes = True


class SummaryResponse(BaseModel):
    total_income: float
    total_expense: float
    balance: float


class SuggestionResponse(BaseModel):
    suggestions: List[str]