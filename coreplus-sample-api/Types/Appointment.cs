namespace Coreplus.Sample.Api.Types;

public record Appointment(long id, string date, string client_name, string appointment_type, int duration, int revenue, int cost, long practitioner_id);
