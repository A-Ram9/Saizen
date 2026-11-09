using Microsoft.AspNetCore.Mvc;
using Saizen.Api.Data;
using Saizen.Api.Dtos;

namespace Saizen.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController(SaizenDbContext db, ILogger<HealthController> logger) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<HealthDto>> Get(CancellationToken ct)
    {
        try
        {
            var canConnect = await db.Database.CanConnectAsync(ct);
            var dto = new HealthDto(canConnect ? "Healthy" : "Unhealthy", canConnect,
                canConnect ? null : "Could not connect to the database.", DateTime.UtcNow);
            return canConnect ? Ok(dto) : StatusCode(StatusCodes.Status503ServiceUnavailable, dto);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Health check database probe failed");
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                new HealthDto("Unhealthy", false, ex.Message, DateTime.UtcNow));
        }
    }
}
