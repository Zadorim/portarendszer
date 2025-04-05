namespace PortaRendszer.DTOs
{
    public class FelhasznaloDTO
    {
        public int Id { get; set; }
        public string Nev { get; set; } = string.Empty;
        public string Beosztas { get; set; } = string.Empty;
        public string Felhasznalonev { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<string>? Osztalyok { get; set; }
        public List<DateTime>? BelepesIdopontok { get; set; }

        public static FelhasznaloDTO FromEntity(Models.Felhasznalo f)
        {
            return new FelhasznaloDTO
            {
                Id = f.Id,
                Nev = f.Nev,
                Beosztas = f.Beosztas,
                Felhasznalonev = f.Felhasznalonev,
                Email = f.Email,
                Osztalyok = f.Osztalies.Select(o => o.Nev).ToList(),
                BelepesIdopontok = f.Belepes.Select(b => b.BelepesiIdo).ToList()
            };
        }
    }
}
