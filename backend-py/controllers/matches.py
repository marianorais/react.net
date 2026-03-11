from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter(prefix="/api/matches", tags=["Matches"])

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


def _extract_fixture_info(fixture):
    """Extrae solo la información necesaria de un partido"""
    return {
        "fixture": {
            "id": fixture.get("fixture", {}).get("id"),
            "date": fixture.get("fixture", {}).get("date"),
            "venue": {
                "name": fixture.get("fixture", {}).get("venue", {}).get("name")
            },
            "status": {
                "short": fixture.get("fixture", {}).get("status", {}).get("short")
            }
        },
        "teams": {
            "home": {
                "name": fixture.get("teams", {}).get("home", {}).get("name")
            },
            "away": {
                "name": fixture.get("teams", {}).get("away", {}).get("name")
            }
        },
        "goals": {
            "home": fixture.get("goals", {}).get("home"),
            "away": fixture.get("goals", {}).get("away")
        }
    }

@router.get("/match/{match_id}")
async def get_match(match_id: int):
    """
    Obtiene los detalles de un partido específico por su ID.
    """
    data = await _make_api_request("fixtures", {"id": match_id})
    if data:
        return data[0]  # La API devuelve una lista
    else:
        raise HTTPException(status_code=404, detail="Match not found")

@router.get("/live")
async def get_live_matches():
    """
    Obtiene todos los partidos en vivo en este momento.
    """
    params = {"live": "all"}
    
    try:
        fixtures = await _make_api_request("fixtures", params)
        # Extraer solo información necesaria y ordenar por fecha
        cleaned_fixtures = [_extract_fixture_info(f) for f in fixtures]
        cleaned_fixtures.sort(key=lambda x: x.get("fixture", {}).get("date", ""), reverse=True)
        return cleaned_fixtures
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching live matches: {str(e)}")

@router.get("/fixtures")
async def get_fixtures(league: int = None, season: int = None, team: int = None, live: str = None, date: str = None):
    """
    Obtiene fixtures (partidos) con filtros opcionales.
    Solo retorna información necesaria de los partidos (sin datos innecesarios).
    Parámetros: league, season, team, live, date
    Si no se especifica liga, busca en las principales ligas de Europa y América.
    """
    # IDs de las principales ligas (Europa y Sudamérica)
    DEFAULT_LEAGUES = [39, 140, 78, 135, 61, 128]  # Premier, La Liga, Bundesliga, Serie A, Ligue 1, Primera División Argentina
    
    # Si no hay liga especificada pero sí hay temporada, buscar en todas las ligas principales
    if not league and season:
        all_fixtures = []
        for league_id in DEFAULT_LEAGUES:
            params = {
                "league": league_id,
                "season": season
            }
            if team:
                params["team"] = team
            if live:
                params["live"] = live
            if date:
                params["date"] = date
            
            try:
                fixtures = await _make_api_request("fixtures", params)
                all_fixtures.extend(fixtures)
            except:
                # Si una liga falla, continuar con las demás
                continue
        
        # Extraer solo información necesaria y ordenar por fecha
        cleaned_fixtures = [_extract_fixture_info(f) for f in all_fixtures]
        cleaned_fixtures.sort(key=lambda x: x.get("fixture", {}).get("date", ""), reverse=True)
        return cleaned_fixtures
    
    # Si se especifica liga o no hay temporada, usar los parámetros normales
    params = {}
    if league:
        params["league"] = league
    if season:
        params["season"] = season
    if team:
        params["team"] = team
    if live:
        params["live"] = live
    if date:
        params["date"] = date

    fixtures = await _make_api_request("fixtures", params)
    # Extraer solo información necesaria
    return [_extract_fixture_info(f) for f in fixtures]