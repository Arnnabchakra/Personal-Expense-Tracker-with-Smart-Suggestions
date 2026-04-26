from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from .database import get_db
from .models import User, Transaction
from .schemas import (
    UserSignup,
    UserLogin,
    TokenResponse,
    TransactionCreate,
    TransactionResponse,
    SummaryResponse,
    SuggestionResponse,
)
from .auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter()


@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_name": db_user.name,
    }


@router.post("/transactions")
def add_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_transaction = Transaction(
        user_id=current_user.id,
        type=transaction.type,
        amount=transaction.amount,
        category=transaction.category,
        note=transaction.note,
        date=transaction.date,
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    return {"message": "Transaction added successfully"}


@router.get("/transactions", response_model=list[TransactionResponse])
def get_transactions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transactions = (
        db.query(Transaction)
        .filter(Transaction.user_id == current_user.id)
        .order_by(Transaction.id.desc())
        .all()
    )

    return transactions


@router.delete("/transactions/{transaction_id}")
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transaction = (
        db.query(Transaction)
        .filter(
            Transaction.id == transaction_id,
            Transaction.user_id == current_user.id,
        )
        .first()
    )

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    db.delete(transaction)
    db.commit()

    return {"message": "Transaction deleted successfully"}


@router.get("/summary", response_model=SummaryResponse)
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total_income = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0.0))
        .filter(Transaction.user_id == current_user.id, Transaction.type == "income")
        .scalar()
    )

    total_expense = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0.0))
        .filter(Transaction.user_id == current_user.id, Transaction.type == "expense")
        .scalar()
    )

    balance = total_income - total_expense

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": balance,
    }


@router.get("/suggestions", response_model=SuggestionResponse)
def get_suggestions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transactions = (
        db.query(Transaction)
        .filter(Transaction.user_id == current_user.id)
        .all()
    )

    total_income = sum(t.amount for t in transactions if t.type == "income")
    total_expense = sum(t.amount for t in transactions if t.type == "expense")

    food_expense = sum(
        t.amount
        for t in transactions
        if t.type == "expense" and t.category.lower() == "food"
    )

    shopping_expense = sum(
        t.amount
        for t in transactions
        if t.type == "expense" and t.category.lower() == "shopping"
    )

    suggestions = []

    if total_expense > total_income and total_income > 0:
        suggestions.append(
            "Your total expense is higher than your income. Try reducing non-essential spending."
        )

    if food_expense > 3000:
        suggestions.append(
            "Your food spending is high. Try to reduce outside meals."
        )

    if shopping_expense > 2000:
        suggestions.append(
            "Your shopping expense is high. Consider cutting down on unnecessary purchases."
        )

    if not suggestions:
        suggestions.append("Your spending looks under control. Keep it up.")

    return {"suggestions": suggestions}


@router.get("/me")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "name": current_user.name,
        "email": current_user.email,
    }