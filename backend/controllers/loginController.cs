using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Backend .NET funcionando 🚀");
    }
}