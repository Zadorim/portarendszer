using System;
using System.Collections.Generic;

namespace PortaRendszer.Models;

public partial class TanuloArchiv
{
    public int Id { get; set; }

    public string OktAzonosito { get; set; } = null!;

    public string Nev { get; set; } = null!;

    public string? OsztalyNev { get; set; }

    public DateTime TorlesIdopont { get; set; }
}
