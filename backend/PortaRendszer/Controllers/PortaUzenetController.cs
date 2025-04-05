// PortaUzenetController - Üzenetek kezelése tanulókhoz kapcsolva
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaRendszer.DTOs;
using PortaRendszer.Models;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortaUzenetController : ControllerBase
    {
        private readonly PortarendszerContext _context;

        public PortaUzenetController(PortarendszerContext context)
        {
            _context = context;
        }

        // GET: api/PortaUzenet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PortaUzenetDTO>>> GetUzenetek()
        {
            var uzenetek = await _context.PortaUzenets
                .Include(u => u.Tanulo)
                .ThenInclude(t => t.Osztaly)
                .ToListAsync();

            return uzenetek.Select(PortaUzenetDTO.FromEntity).ToList();
        }

        // GET: api/PortaUzenet/statusz/Jelen_van
        [HttpGet("statusz/{statusz}")]
        public async Task<ActionResult<IEnumerable<PortaUzenetDTO>>> GetUzenetekByStatusz(string statusz)
        {
            var uzenetek = await _context.PortaUzenets
                .Include(u => u.Tanulo)
                .ThenInclude(t => t.Osztaly)
                .Where(u => u.Statusz == statusz)
                .ToListAsync();

            return uzenetek.Select(PortaUzenetDTO.FromEntity).ToList();
        }

        // POST: api/PortaUzenet
        [HttpPost]
        public async Task<ActionResult<PortaUzenetDTO>> PostUzenet(PortaUzenetDTO dto)
        {
            var uzenet = new PortaUzenet
            {
                Idopont = dto.Idopont,
                Statusz = dto.Statusz,
                Uzenet = dto.Uzenet,
                TanuloId = dto.TanuloId
            };

            _context.PortaUzenets.Add(uzenet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUzenetek), new { id = uzenet.Id }, PortaUzenetDTO.FromEntity(uzenet));
        }

        // PUT: api/PortaUzenet/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUzenet(int id, PortaUzenetDTO dto)
        {
            var uzenet = await _context.PortaUzenets.FindAsync(id);
            if (uzenet == null) return NotFound();

            uzenet.Statusz = dto.Statusz;
            uzenet.Uzenet = dto.Uzenet;
            uzenet.TanuloId = dto.TanuloId;
            uzenet.Idopont = dto.Idopont;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/PortaUzenet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUzenet(int id)
        {
            var uzenet = await _context.PortaUzenets.FindAsync(id);
            if (uzenet == null) return NotFound();

            _context.PortaUzenets.Remove(uzenet);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
