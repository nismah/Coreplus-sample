using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class GetFinancialReport
{

    public static RouteGroupBuilder MapGetFinancialReport(this RouteGroupBuilder group)
    {
        group.MapGet("/getFinancialReport/{practitionerId}", async (long practitionerID, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate, PractitionerService practitionerService) =>
        {
            var report = await practitionerService.GetFinancialReport(practitionerID, startDate, endDate);
            return Results.Ok(report);
        });

        return group;
    }
}
