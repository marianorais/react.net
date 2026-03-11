from fastapi import APIRouter, HTTPException
from models.login_request import LoginRequest

router = APIRouter(prefix="/api/login", tags=["Login"])


@router.get("/")
def get_login():
    return {"message": "Backend FastAPI funcionando 🚀"}


@router.post("/")
def post_login(request: LoginRequest):

    # validar campos
    if not request.username or not request.password:
        raise HTTPException(
            status_code=400,
            detail="Usuario y contraseña requeridos"
        )

    # login simple (ejemplo)
    if request.username == "admin" and request.password == "password":
        return {
            "success": True,
            "message": "Login exitoso",
            "token": "fake-jwt-token-12345",
            "user": {
                "username": request.username
            }
        }

    # credenciales incorrectas
    raise HTTPException(
        status_code=401,
        detail="Usuario o contraseña inválido"
    )