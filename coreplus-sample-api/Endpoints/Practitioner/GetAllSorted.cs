using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Cors;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class GetAllSorted
{
    public static RouteGroupBuilder MapGetAllPractitionersSorted(this RouteGroupBuilder group)
    {
        group.MapGet("/sorted", async (PractitionerService practitionerService) =>
        {
            var practitioners = await practitionerService.GetPractitionersSorted();
            return Results.Ok(practitioners);
        });

        return group;
    }
}