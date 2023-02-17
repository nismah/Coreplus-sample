namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class MapEndpoints
{
    public static RouteGroupBuilder MapPractitionerEndpoints(this RouteGroupBuilder group)
    {
        group.MapGetAllPractitioners();
        group.MapGetSupervisorPractitioners();
        group.MapGetAllAppointments();
        group.MapGetFinancialReport();
        group.MapGetAppointment();
        group.MapGetAllPractitionersSorted();
        return group;
    }
}