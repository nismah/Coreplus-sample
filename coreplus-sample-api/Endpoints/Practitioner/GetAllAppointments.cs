using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Builder;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class GetAllAppointments
{
    
    public static RouteGroupBuilder MapGetAllAppointments(this RouteGroupBuilder group)
    {
        group.MapGet("/appointment/{id}", async (long id, PractitionerService practitionerService) => 
        {
            var practitioners = await practitionerService.GetPractitionersAppointments(id);
            return Results.Ok(practitioners);
        });

        return group;
    }
}
