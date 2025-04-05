using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaRendszer.DTOs;
using PortaRendszer.Models;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TanuloController : ControllerBase
    {
        private readonly PortarendszerContext _context;

        public TanuloController(PortarendszerContext context)
        {
            _context = context;
        }

        // GET: api/Tanulo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TanuloDTO>>> GetTanulok()
        {
            var tanulok = await _context.Tanulos.Include(t => t.Osztaly).ToListAsync();
            var tanuloDtos = tanulok.Select(TanuloDTO.FromEntity).ToList();
            return Ok(tanuloDtos);
        }

        // GET: api/Tanulo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TanuloDTO>> GetTanulo(int id)
        {
            var tanulo = await _context.Tanulos.Include(t => t.Osztaly).FirstOrDefaultAsync(t => t.Id == id);
            if (tanulo == null) return NotFound();
            return TanuloDTO.FromEntity(tanulo);
        }

        // POST: api/Tanulo
        [HttpPost]
        public async Task<ActionResult<TanuloDTO>> PostTanulo(TanuloDTO tanuloDto)
        {
            var tanulo = new Tanulo
            {
                OktAzonosito = tanuloDto.OktAzonosito,
                Nev = tanuloDto.Nev,
                Osztaly = await _context.Osztalies.FirstOrDefaultAsync(o => o.Nev == tanuloDto.OsztalyNev),
                Tanszobas = tanuloDto.Tanszobas,
                SpecHazavitel = tanuloDto.SpecHazavitel
            };

            _context.Tanulos.Add(tanulo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTanulo), new { id = tanulo.Id }, TanuloDTO.FromEntity(tanulo));
        }

        // PUT: api/Tanulo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTanulo(int id, TanuloDTO tanuloDto)
        {
            var tanulo = await _context.Tanulos.FirstOrDefaultAsync(t => t.Id == id);
            if (tanulo == null) return NotFound();

            tanulo.OktAzonosito = tanuloDto.OktAzonosito;
            tanulo.Nev = tanuloDto.Nev;
            tanulo.Tanszobas = tanuloDto.Tanszobas;
            tanulo.SpecHazavitel = tanuloDto.SpecHazavitel;
            tanulo.Osztaly = await _context.Osztalies.FirstOrDefaultAsync(o => o.Nev == tanuloDto.OsztalyNev);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Tanulo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTanulo(int id)
        {
            var tanulo = await _context.Tanulos.FindAsync(id);
            if (tanulo == null) return NotFound();

            _context.Tanulos.Remove(tanulo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TanuloExists(int id)
        {
            return _context.Tanulos.Any(e => e.Id == id);
        }
    }
}
