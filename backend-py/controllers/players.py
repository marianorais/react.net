from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter(prefix="/api/players", tags=["Players"])

# Configuración de la API
API_KEY = os.getenv("FOOTBALL_API_KEY", "2c2e27d93b68a5398eb6eba2acb5af01")  # Usar variable de entorno o valor por defecto
BASE_URL = "https://v3.football.api-sports.io/"

async def _make_api_request(endpoint: str, params: dict = None):
    """Función auxiliar para hacer peticiones a la API de fútbol"""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")

    headers = {"x-apisports-key": API_KEY}
    url = f"{BASE_URL}{endpoint}"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params, headers=headers)
            response.raise_for_status()
            data = response.json()
            return data.get("response", [])
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Error fetching data: {e.response.text}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
async def get_players(team: int = None, season: int = None, league: int = None):
    """
    Obtiene jugadores, opcionalmente filtrados por equipo, temporada y liga.
    """
    params = {}
    if team:
        params["team"] = team
    if season:
        params["season"] = season
    if league:
        params["league"] = league

    return await _make_api_request("players", params)
