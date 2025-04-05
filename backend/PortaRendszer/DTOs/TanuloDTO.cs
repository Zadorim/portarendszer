namespace PortaRendszer.DTOs
{
    public class TanuloDTO
    {
        public int Id { get; set; }
        public string OktAzonosito { get; set; } = string.Empty;
        public string Nev { get; set; } = string.Empty;
        public string? OsztalyNev { get; set; }
        public bool? Tanszobas { get; set; }
        public bool? SpecHazavitel { get; set; }

        public static TanuloDTO FromEntity(Models.Tanulo tanulo)
        {
            return new TanuloDTO
            {
                Id = tanulo.Id,
                OktAzonosito = tanulo.OktAzonosito,
                Nev = tanulo.Nev,
                OsztalyNev = tanulo.Osztaly?.Nev,
                Tanszobas = tanulo.Tanszobas,
                SpecHazavitel = tanulo.SpecHazavitel
            };
        }
    }
}
