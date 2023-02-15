using System.Text.Json;
using Coreplus.Sample.Api.Types;
using Microsoft.Extensions.Hosting;

namespace Coreplus.Sample.Api.Services;

public record PractitionerDto(long id, string name);
public record AppointmentDto(long id, DateTime date, string client_name, string appointmentType, int duration, int revenue, int cost, long practitioner_id);
public record FinancialReportDto(int revenuePerMonth, int costPerMonth);

public class PractitionerService
{
    public async Task<IEnumerable<PractitionerDto>> GetPractitioners()
    {
        using var fileStream = File.OpenRead(@"./Data/practitioners.json");
        var data = await JsonSerializer.DeserializeAsync<Practitioner[]>(fileStream);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        return data.Select(prac => new PractitionerDto(prac.id, prac.name));
    }

    public async Task<IEnumerable<PractitionerDto>> GetSupervisorPractitioners()
    {
        using var fileStream = File.OpenRead(@"./Data/practitioners.json");
        var data = await JsonSerializer.DeserializeAsync<Practitioner[]>(fileStream);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        return data.Where(practitioner => (int)practitioner.level >= 2).Select(prac => new PractitionerDto(prac.id, prac.name));
    }

    public async Task<IEnumerable<AppointmentDto>> GetPractitionersAppointments(long practitionersId)
    {
        using var fileStream = File.OpenRead(@"./Data/appointments.json");
        var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        return data.Where(appointment => appointment.practitioner_id == practitionersId).Select(appt => new AppointmentDto(appt.id, appt.date, appt.client_name, appt.appointmentType, appt.duration, appt.revenue, appt.cost, appt.practitioner_id));
    }

    public async Task<FinancialReportDto> GetFinancialReport(long practitionerId, DateTime startDate, DateTime endDate)
    {
        using var fileStream = File.OpenRead(@"./Data/appointments.json");
        var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        var result = data.Where(appointment => appointment.practitioner_id == practitionerId && appointment.date >= startDate && appointment.date <= endDate.AddSeconds(1)).Select(appt => new AppointmentDto(appt.id, appt.date, appt.client_name, appt.appointmentType, appt.duration, appt.revenue, appt.cost, appt.practitioner_id));

        List<FinancialReportDto> report = new List<FinancialReportDto>();
        int revenue = 0;
        int cost = 0;
        foreach(var item in result)
        {
           cost += item.cost;
           revenue += item.revenue;
        }

        return new FinancialReportDto(revenue, cost);
    }

    public async Task<IEnumerable<AppointmentDto>> GetAppointmentDetails(long id)
    {
        using var fileStream = File.OpenRead(@"./Data/appointments.json");
        var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        return data.Where(appointment => appointment.id == id).Select(appt => new AppointmentDto(appt.id, appt.date, appt.client_name, appt.appointmentType, appt.duration, appt.revenue, appt.cost, appt.practitioner_id));
    }
}