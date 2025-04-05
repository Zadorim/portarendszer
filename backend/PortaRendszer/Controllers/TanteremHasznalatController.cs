using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaRendszer.DTOs;
using PortaRendszer.Models;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TanteremHasznalatController : ControllerBase
    {
        private readonly PortarendszerContext _context;

        public TanteremHasznalatController(PortarendszerContext context)
        {
            _context = context;
        }

        // GET: api/TanteremHasznalat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TanteremHasznalatDTO>>> GetTanteremHasznalatok()
        {
            var hasznalatok = await _context.TanteremHasznalats.ToListAsync();
            return hasznalatok.Select(TanteremHasznalatDTO.FromEntity).ToList();
        }

        // GET: api/TanteremHasznalat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TanteremHasznalatDTO>> GetTanteremHasznalat(int id)
        {
            var hasznalat = await _context.TanteremHasznalats.FindAsync(id);

            if (hasznalat == null)
            {
                return NotFound();
            }

            return TanteremHasznalatDTO.FromEntity(hasznalat);
        }

        // POST: api/TanteremHasznalat
        [HttpPost]
        public async Task<ActionResult<TanteremHasznalatDTO>> PostTanteremHasznalat(TanteremHasznalatDTO dto)
        {
            var hasznalat = new TanteremHasznalat
            {
                TanteremId = dto.TanteremId,
                FelhasznaloId = dto.FelhasznaloId,
                OsztalyId = dto.OsztalyId,
                Idopont = dto.Idopont
            };

            _context.TanteremHasznalats.Add(hasznalat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTanteremHasznalat), new { id = hasznalat.Id }, TanteremHasznalatDTO.FromEntity(hasznalat));
        }

        // PUT: api/TanteremHasznalat/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTanteremHasznalat(int id, TanteremHasznalatDTO dto)
        {
            var hasznalat = await _context.TanteremHasznalats.FindAsync(id);
            if (hasznalat == null) return NotFound();

            hasznalat.TanteremId = dto.TanteremId;
            hasznalat.FelhasznaloId = dto.FelhasznaloId;
            hasznalat.OsztalyId = dto.OsztalyId;
            hasznalat.Idopont = dto.Idopont;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/TanteremHasznalat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTanteremHasznalat(int id)
        {
            var hasznalat = await _context.TanteremHasznalats.FindAsync(id);
            if (hasznalat == null) return NotFound();

            _context.TanteremHasznalats.Remove(hasznalat);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

