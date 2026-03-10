using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowLocal")]
public class LoginController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Backend .NET funcionando 🚀");
    }

    [HttpPost]
    public IActionResult Post([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request?.Username) || string.IsNullOrEmpty(request?.Password))
        {
            return BadRequest(new { message = "Usuario y contraseña requeridos" });
        }

        // Simple validation (replace with real auth logic)
        if (request.Username == "admin" && request.Password == "password")
        {
            return Ok(new { 
                success = true, 
                message = "Login exitoso", 
                token = "fake-jwt-token-12345",
                user = new { username = request.Username }
            });
        }

        return Unauthorized(new { success = false, message = "Usuario o contraseña inválido" });
    }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}