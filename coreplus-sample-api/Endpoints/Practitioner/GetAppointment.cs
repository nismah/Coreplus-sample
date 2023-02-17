using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Builder;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class GetAppointment
{
    
    public static RouteGroupBuilder MapGetAppointment(this RouteGroupBuilder group)
    {
        group.MapGet("/appointment/details/{id}", async (long id, PractitionerService practitionerService) => 
        {
            var appointment = await practitionerService.GetAppointmentDetails(id);
            return Results.Ok(appointment);
        });

        return group;
    }
}
