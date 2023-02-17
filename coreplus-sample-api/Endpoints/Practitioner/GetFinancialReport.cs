using Coreplus.Sample.Api.Services;
using Coreplus.Sample.Api.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class GetFinancialReport
{

    public static RouteGroupBuilder MapGetFinancialReport(this RouteGroupBuilder group)
    {
        group.MapGet("/getFinancialReport/{practitionerId}", async (long practitionerID, [FromQuery] string startDate, [FromQuery] string endDate, PractitionerService practitionerService) =>
        {
            var report = await practitionerService.GetFinancialReport(practitionerID, DateTime.ParseExact(startDate, "M/d/yyyy", System.Globalization.CultureInfo.InvariantCulture).Date, DateTime.ParseExact(endDate, "M/d/yyyy", System.Globalization.CultureInfo.InvariantCulture).Date);
            return Results.Ok(report);
        });

        return group;
    }
}
