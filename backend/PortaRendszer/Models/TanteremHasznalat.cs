using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class TanteremHasznalat
{
    public int Id { get; set; }

    public int FelhasznaloId { get; set; }

    public int TanteremId { get; set; }

    public int? OsztalyId { get; set; }

    public DateTime Idopont { get; set; }

    public virtual Felhasznalo Felhasznalo { get; set; } = null!;

    public virtual Osztaly? Osztaly { get; set; }

    public virtual Tanterem Tanterem { get; set; } = null!;
}
