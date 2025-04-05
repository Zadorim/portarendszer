using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class OsztalyFelhasznalo
{
    public int OsztalyId { get; set; }

    public int FelhasznaloId { get; set; }

    public string Szerepkor { get; set; } = null!;

    public virtual Felhasznalo Felhasznalo { get; set; } = null!;

    public virtual Osztaly Osztaly { get; set; } = null!;
}
