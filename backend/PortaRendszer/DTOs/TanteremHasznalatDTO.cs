namespace PortaRendszer.DTOs
{
    public class TanteremHasznalatDTO
    {
        public int Id { get; set; }
        public int TanteremId { get; set; }
        public int FelhasznaloId { get; set; }
        public int? OsztalyId { get; set; }
        public DateTime Idopont { get; set; }

        public static TanteremHasznalatDTO FromEntity(Models.TanteremHasznalat th)
        {
            return new TanteremHasznalatDTO
            {
                Id = th.Id,
                TanteremId = th.TanteremId,
                FelhasznaloId = th.FelhasznaloId,
                OsztalyId = th.OsztalyId,
                Idopont = th.Idopont
            };
        }
    }
}
