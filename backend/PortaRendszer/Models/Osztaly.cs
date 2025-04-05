using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class Osztaly
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string? EgyediAzonosito { get; set; }

    public int? OsztalyfonokId { get; set; }

    public virtual ICollection<OsztalyFelhasznalo> OsztalyFelhasznalos { get; set; } = new List<OsztalyFelhasznalo>();

    public virtual Felhasznalo? Osztalyfonok { get; set; }

    public virtual ICollection<TanteremHasznalat> TanteremHasznalats { get; set; } = new List<TanteremHasznalat>();

    public virtual ICollection<Tanulo> Tanulos { get; set; } = new List<Tanulo>();
}
