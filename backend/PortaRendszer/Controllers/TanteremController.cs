using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaRendszer.DTOs;
using PortaRendszer.Models;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TanteremController : ControllerBase
    {
        private readonly PortarendszerContext _context;

        public TanteremController(PortarendszerContext context)
        {
            _context = context;
        }

        // GET: api/Tanterem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TanteremDTO>>> GetTanteremek()
        {
            var tantermek = await _context.Tanterems.ToListAsync();
            return tantermek.Select(TanteremDTO.FromEntity).ToList();
        }

        // GET: api/Tanterem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TanteremDTO>> GetTanterem(int id)
        {
            var tanterem = await _context.Tanterems.FindAsync(id);

            if (tanterem == null) return NotFound();

            return TanteremDTO.FromEntity(tanterem);
        }

        // POST: api/Tanterem
        [HttpPost]
        public async Task<ActionResult<TanteremDTO>> PostTanterem(TanteremDTO dto)
        {
            var tanterem = new Tanterem
            {
                Nev = dto.Nev,
                Aktiv = dto.Aktiv
            };

            _context.Tanterems.Add(tanterem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTanterem), new { id = tanterem.Id }, TanteremDTO.FromEntity(tanterem));
        }

        // PUT: api/Tanterem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTanterem(int id, TanteremDTO dto)
        {
            var tanterem = await _context.Tanterems.FindAsync(id);
            if (tanterem == null) return NotFound();

            tanterem.Nev = dto.Nev;
            tanterem.Aktiv = dto.Aktiv;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Tanterem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTanterem(int id)
        {
            var tanterem = await _context.Tanterems.FindAsync(id);
            if (tanterem == null) return NotFound();

            _context.Tanterems.Remove(tanterem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
