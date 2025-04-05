using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaRendszer.DTOs;
using PortaRendszer.Models;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OsztalyController : ControllerBase
    {
        private readonly PortarendszerContext _context;

        public OsztalyController(PortarendszerContext context)
        {
            _context = context;
        }

        // GET: api/Osztaly
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OsztalyDTO>>> GetOsztalyok()
        {
            var osztalyok = await _context.Osztalies
                .Include(o => o.Osztalyfonok)
                .ToListAsync();

            return osztalyok.Select(OsztalyDTO.FromEntity).ToList();
        }

        // GET: api/Osztaly/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OsztalyDTO>> GetOsztaly(int id)
        {
            var osztaly = await _context.Osztalies
                .Include(o => o.Osztalyfonok)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (osztaly == null)
            {
                return NotFound();
            }

            return OsztalyDTO.FromEntity(osztaly);
        }

        // POST: api/Osztaly
        [HttpPost]
        public async Task<ActionResult<OsztalyDTO>> PostOsztaly(OsztalyDTO dto)
        {
            var osztaly = new Osztaly
            {
                Nev = dto.Nev,
                EgyediAzonosito = dto.EgyediAzonosito,
                Osztalyfonok = await _context.Felhasznalos.FirstOrDefaultAsync(f => f.Nev == dto.OsztalyfonokNev)
            };

            _context.Osztalies.Add(osztaly);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOsztaly), new { id = osztaly.Id }, OsztalyDTO.FromEntity(osztaly));
        }

        // PUT: api/Osztaly/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOsztaly(int id, OsztalyDTO dto)
        {
            var osztaly = await _context.Osztalies.FirstOrDefaultAsync(o => o.Id == id);
            if (osztaly == null) return NotFound();

            osztaly.Nev = dto.Nev;
            osztaly.EgyediAzonosito = dto.EgyediAzonosito;
            osztaly.Osztalyfonok = await _context.Felhasznalos.FirstOrDefaultAsync(f => f.Nev == dto.OsztalyfonokNev);

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Osztaly/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOsztaly(int id)
        {
            var osztaly = await _context.Osztalies.FindAsync(id);
            if (osztaly == null) return NotFound();

            _context.Osztalies.Remove(osztaly);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

