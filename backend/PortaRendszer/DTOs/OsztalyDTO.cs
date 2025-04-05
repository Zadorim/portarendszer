namespace PortaRendszer.DTOs
{
    public class OsztalyDTO
    {
        public int Id { get; set; }
        public string Nev { get; set; } = string.Empty;
        public string? EgyediAzonosito { get; set; }
        public string? OsztalyfonokNev { get; set; }

        public static OsztalyDTO FromEntity(Models.Osztaly o)
        {
            return new OsztalyDTO
            {
                Id = o.Id,
                Nev = o.Nev,
                EgyediAzonosito = o.EgyediAzonosito,
                OsztalyfonokNev = o.Osztalyfonok?.Nev
            };
        }
    }
}
