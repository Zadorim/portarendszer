using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class Tanterem
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public bool? Aktiv { get; set; }

    public virtual ICollection<TanteremHasznalat> TanteremHasznalats { get; set; } = new List<TanteremHasznalat>();
}
