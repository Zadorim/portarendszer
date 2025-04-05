using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class Belepe
{
    public int Id { get; set; }

    public int FelhasznaloId { get; set; }

    public DateTime BelepesiIdo { get; set; }

    public DateTime? KilepesiIdo { get; set; }

    public DateTime UtolsoAktivitas { get; set; }

    public virtual Felhasznalo Felhasznalo { get; set; } = null!;
}
