from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter(prefix="/api/leagues", tags=["Leagues"])

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
async def get_leagues(country: str = None, season: int = None, type: str = None):
    """
    Obtiene ligas disponibles, opcionalmente filtradas por país, temporada y tipo.
    """
    params = {}
    if country:
        params["country"] = country
    if season:
        params["season"] = season
    if type:
        params["type"] = type

    return await _make_api_request("leagues", params)

@router.get("/standings")
async def get_standings(league: int, season: int):
    """
    Obtiene la tabla de posiciones (standings) de una liga específica.
    """
    if not league or not season:
        raise HTTPException(status_code=400, detail="League and season are required")

    params = {"league": league, "season": season}
    return await _make_api_request("standings", params)
