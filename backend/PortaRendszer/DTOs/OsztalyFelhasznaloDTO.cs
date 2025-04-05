namespace PortaRendszer.DTOs
{
    public class OsztalyFelhasznaloDTO
    {
        public int OsztalyId { get; set; }
        public int FelhasznaloId { get; set; }
        public string Szerepkor { get; set; } = string.Empty;

        public static OsztalyFelhasznaloDTO FromEntity(Models.OsztalyFelhasznalo o)
        {
            return new OsztalyFelhasznaloDTO
            {
                OsztalyId = o.OsztalyId,
                FelhasznaloId = o.FelhasznaloId,
                Szerepkor = o.Szerepkor
            };
        }
    }
}