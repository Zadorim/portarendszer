using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class Tanulo
{
    public int Id { get; set; }

    public string OktAzonosito { get; set; } = null!;

    public string Nev { get; set; } = null!;

    public int? OsztalyId { get; set; }

    public bool? Tanszobas { get; set; }

    public bool? SpecHazavitel { get; set; }

    public string? GondviseloNev { get; set; }

    public string? GondviseloStatusz { get; set; }

    public virtual Osztaly? Osztaly { get; set; }

    public virtual ICollection<PortaUzenet> PortaUzenets { get; set; } = new List<PortaUzenet>();
    public bool AktivEvben { get; internal set; }
}
