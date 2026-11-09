using Microsoft.EntityFrameworkCore;
using Saizen.Api.Data;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicy = "AngularDev";

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<SaizenDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Saizen")));

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:4200"];
builder.Services.AddCors(options =>
    options.AddPolicy(CorsPolicy, policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors(CorsPolicy);
app.UseAuthorization();
app.MapControllers();

app.Run();
