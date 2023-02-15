namespace Coreplus.Sample.Api.Types;

public record Appointment(long id, DateTime date, string client_name, string appointmentType, int duration, int revenue, int cost, long practitioner_id);

