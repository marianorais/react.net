from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.loginController import router as login_router
from controllers.matches import router as matches_router
from controllers.leagues import router as leagues_router
from controllers.teams import router as teams_router
from controllers.players import router as players_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar controllers
app.include_router(login_router)
app.include_router(matches_router)
app.include_router(leagues_router)
app.include_router(teams_router)
app.include_router(players_router)