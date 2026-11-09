namespace Saizen.Api.Dtos;

public record HealthDto(string Status, bool Database, string? DatabaseError, DateTime TimestampUtc);
