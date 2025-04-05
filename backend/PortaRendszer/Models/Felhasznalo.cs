using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class Felhasznalo
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string Beosztas { get; set; } = null!;

    public string Felhasznalonev { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte[] JelszoHash { get; set; } = null!;

    public byte[] JelszoSalt { get; set; } = null!;

    public virtual ICollection<Belepe> Belepes { get; set; } = new List<Belepe>();

    public virtual ICollection<Osztaly> Osztalies { get; set; } = new List<Osztaly>();

    public virtual ICollection<OsztalyFelhasznalo> OsztalyFelhasznalos { get; set; } = new List<OsztalyFelhasznalo>();

    public virtual ICollection<TanteremHasznalat> TanteremHasznalats { get; set; } = new List<TanteremHasznalat>();
}
