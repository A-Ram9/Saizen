using Microsoft.EntityFrameworkCore;

namespace Saizen.Api.Data;

public class SaizenDbContext(DbContextOptions<SaizenDbContext> options) : DbContext(options)
{
}
