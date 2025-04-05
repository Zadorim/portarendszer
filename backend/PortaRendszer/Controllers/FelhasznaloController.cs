using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaRendszer.DTOs;
using PortaRendszer.Models;
using PortaRendszer.Services;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FelhasznaloController : ControllerBase
    {
        private readonly PortarendszerContext _context;

        public FelhasznaloController(PortarendszerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FelhasznaloDTO>>> GetFelhasznalok()
        {
            var felhasznalok = await _context.Felhasznalos
                .Include(f => f.Belepes)
                .Include(f => f.Osztalies)
                .ToListAsync();

            return felhasznalok.Select(FelhasznaloDTO.FromEntity).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FelhasznaloDTO>> GetFelhasznalo(int id)
        {
            var f = await _context.Felhasznalos
                .Include(f => f.Belepes)
                .Include(f => f.Osztalies)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (f == null) return NotFound();

            return FelhasznaloDTO.FromEntity(f);
        }

        [HttpPost]
        public async Task<ActionResult<FelhasznaloDTO>> PostFelhasznalo(FelhasznaloDTO dto)
        {
            PasswordService.CreatePasswordHash("Titkos123", out byte[] hash, out byte[] salt);

            var f = new Felhasznalo
            {
                Nev = dto.Nev,
                Beosztas = dto.Beosztas,
                Felhasznalonev = dto.Felhasznalonev,
                Email = dto.Email,
                JelszoHash = hash,
                JelszoSalt = salt
            };

            _context.Felhasznalos.Add(f);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFelhasznalo), new { id = f.Id }, FelhasznaloDTO.FromEntity(f));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFelhasznalo(int id, FelhasznaloDTO dto)
        {
            var f = await _context.Felhasznalos.FindAsync(id);
            if (f == null) return NotFound();

            f.Nev = dto.Nev;
            f.Beosztas = dto.Beosztas;
            f.Felhasznalonev = dto.Felhasznalonev;
            f.Email = dto.Email;
            // jelszó nem frissül itt, csak manuálisan külön

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFelhasznalo(int id)
        {
            var f = await _context.Felhasznalos.FindAsync(id);
            if (f == null) return NotFound();

            _context.Felhasznalos.Remove(f);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpGet("titkos")]
        public IActionResult GetTitkosAdat()
        {
            return Ok("Csak bejelentkezve látható!");
        }

        [Authorize(Roles = "osztalyfonok")]
        [HttpGet("csak-osztalyfonoknek")]
        public IActionResult GetAdatOsztalyfonoknek()
        {
            return Ok("Ezt csak az osztályfőnök láthatja.");
        }

        [Authorize]
        [HttpPost("jelszocsere")]
        public async Task<IActionResult> JelszoCsere([FromBody] JelszoCsereDTO dto)
        {
            var bejelentkezettFelhasznalo = User.Identity?.Name;

            if (string.IsNullOrEmpty(bejelentkezettFelhasznalo))
                return Unauthorized("Nincs bejelentkezve felhasználó.");

            var felhasznalo = await _context.Felhasznalos.FirstOrDefaultAsync(f => f.Felhasznalonev == bejelentkezettFelhasznalo);

            if (felhasznalo == null)
                return NotFound("A felhasználó nem található.");

            if (!PasswordService.VerifyPasswordHash(dto.JelenlegiJelszo, felhasznalo.JelszoHash, felhasznalo.JelszoSalt))
                return BadRequest("A megadott jelenlegi jelszó hibás.");

            PasswordService.CreatePasswordHash(dto.UjJelszo, out byte[] ujHash, out byte[] ujSalt);
            felhasznalo.JelszoHash = ujHash;
            felhasznalo.JelszoSalt = ujSalt;

            await _context.SaveChangesAsync();
            return Ok("A jelszót sikeresen módosítottuk.");
        }

        [Authorize]
        [HttpGet("aktualis")]
        public async Task<ActionResult<FelhasznaloDTO>> GetAktualisFelhasznalo()
        {
            var felhasznalonev = User.Identity?.Name;

            if (string.IsNullOrEmpty(felhasznalonev))
                return Unauthorized("Nem sikerült azonosítani a bejelentkezett felhasználót.");

            var felhasznalo = await _context.Felhasznalos
                .Include(f => f.Osztalies)
                .Include(f => f.Belepes)
                .FirstOrDefaultAsync(f => f.Felhasznalonev == felhasznalonev);

            if (felhasznalo == null)
                return NotFound("A felhasználó nem található.");

            return FelhasznaloDTO.FromEntity(felhasznalo);
        }


    }
}
