from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter(prefix="/api/teams", tags=["Teams"])

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
async def get_teams(league: int = None, season: int = None, country: str = None):
    """
    Obtiene equipos, opcionalmente filtrados por liga, temporada y país.
    """
    params = {}
    if league:
        params["league"] = league
    if season:
        params["season"] = season
    if country:
        params["country"] = country

    return await _make_api_request("teams", params)


@router.get("/country/{country_name}")
async def get_teams_by_country(country_name: str):
    """Obtiene todos los equipos de un país (solo clubes, excluyendo selecciones nacionales)"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{BASE_URL}teams",
                params={"country": country_name},
                headers={"x-apisports-key": API_KEY}
            )
            response.raise_for_status()
            data = response.json()
            teams = data.get("response", [])
            
            # Filtrar solo equipos de clubes (excluir selecciones nacionales)
            club_teams = []
            for team in teams:
                try:
                    team_info = team.get("team", {})
                    team_name = team_info.get("name", "").lower()
                    country_lower = country_name.lower()
                    
                    # Las selecciones nacionales generalmente tienen estas características:
                    is_national = (
                        team_info.get("national", False) or
                        "national" in team_name or
                        "selección" in team_name or
                        team_name == country_lower or
                        "u21" in team_name or
                        "u20" in team_name or
                        "u19" in team_name or
                        "u18" in team_name or
                        "u17" in team_name or
                        "women" in team_name or
                        "womens" in team_name
                    )
                    
                    if not is_national:
                        club_teams.append(team)
                        
                except Exception as e:
                    # Si hay error procesando un equipo, continuar con el siguiente
                    print(f"Error procesando equipo: {e}")
                    continue
            
            # Debug: imprimir estructura de datos
            print(f"API Response for {country_name}:")
            print(f"Total teams: {len(teams)}, Club teams: {len(club_teams)}")
            if club_teams:
                print(f"First club team: {club_teams[0].get('team', {}).get('name')}")
            
            if not club_teams:
                raise HTTPException(status_code=404, detail=f"No se encontraron equipos de clubes para {country_name}")
            return club_teams
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Error al consultar la API de Football")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))