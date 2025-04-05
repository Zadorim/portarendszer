namespace PortaRendszer.DTOs
{
    public class PortaUzenetDTO
    {
        public int Id { get; set; }
        public DateTime Idopont { get; set; }
        public string Statusz { get; set; } = string.Empty;
        public string? Uzenet { get; set; }
        public int TanuloId { get; set; }
        public string TanuloNev { get; set; } = string.Empty;
        public string OsztalyNev { get; set; } = string.Empty;

        public static PortaUzenetDTO FromEntity(Models.PortaUzenet u)
        {
            return new PortaUzenetDTO
            {
                Id = u.Id,
                Idopont = u.Idopont,
                Statusz = u.Statusz,
                Uzenet = u.Uzenet,
                TanuloId = u.TanuloId,
                TanuloNev = u.Tanulo?.Nev ?? string.Empty,
                OsztalyNev = u.Tanulo?.Osztaly?.Nev ?? string.Empty
            };
        }
    }
}
