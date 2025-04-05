namespace PortaRendszer.DTOs
{
    public class TanteremDTO
    {
        public int Id { get; set; }
        public string Nev { get; set; } = string.Empty;
        public bool Aktiv { get; set; }

        public static TanteremDTO FromEntity(Models.Tanterem t)
        {
            return new TanteremDTO
            {
                Id = t.Id,
                Nev = t.Nev ?? string.Empty,
                Aktiv = t.Aktiv.HasValue && t.Aktiv.Value
            };
        }
    }
}
