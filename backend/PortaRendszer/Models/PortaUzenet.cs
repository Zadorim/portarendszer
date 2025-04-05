using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class PortaUzenet
{
    public int Id { get; set; }

    public int TanuloId { get; set; }

    public string Uzenet { get; set; } = null!;

    public string? Statusz { get; set; }

    public DateTime Idopont { get; set; }

    public virtual Tanulo Tanulo { get; set; } = null!;
}
