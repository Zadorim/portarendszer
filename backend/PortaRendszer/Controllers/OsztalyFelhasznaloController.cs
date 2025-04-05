using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaRendszer.DTOs;
using PortaRendszer.Models;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OsztalyFelhasznaloController : ControllerBase
    {
        private readonly PortarendszerContext _context;

        public OsztalyFelhasznaloController(PortarendszerContext context)
        {
            _context = context;
        }

        // GET: api/OsztalyFelhasznalo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OsztalyFelhasznaloDTO>>> GetAll()
        {
            var list = await _context.OsztalyFelhasznalos.ToListAsync();
            return list.Select(OsztalyFelhasznaloDTO.FromEntity).ToList();
        }

        // GET: api/OsztalyFelhasznalo/5/napkozis
        [HttpGet("{osztalyId}/{szerepkor}")]
        public async Task<ActionResult<OsztalyFelhasznaloDTO>> GetByKey(int osztalyId, string szerepkor)
        {
            var of = await _context.OsztalyFelhasznalos
                .FirstOrDefaultAsync(x => x.OsztalyId == osztalyId && x.Szerepkor == szerepkor);

            if (of == null) return NotFound();

            return OsztalyFelhasznaloDTO.FromEntity(of);
        }

        // POST: api/OsztalyFelhasznalo
        [HttpPost]
        public async Task<ActionResult<OsztalyFelhasznaloDTO>> Post(OsztalyFelhasznaloDTO dto)
        {
            var of = new OsztalyFelhasznalo
            {
                OsztalyId = dto.OsztalyId,
                FelhasznaloId = dto.FelhasznaloId,
                Szerepkor = dto.Szerepkor
            };

            _context.OsztalyFelhasznalos.Add(of);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetByKey), new { osztalyId = of.OsztalyId, szerepkor = of.Szerepkor }, OsztalyFelhasznaloDTO.FromEntity(of));
        }

        // PUT: api/OsztalyFelhasznalo
        [HttpPut]
        public async Task<IActionResult> Put(OsztalyFelhasznaloDTO dto)
        {
            var of = await _context.OsztalyFelhasznalos.FirstOrDefaultAsync(x => x.OsztalyId == dto.OsztalyId && x.Szerepkor == dto.Szerepkor);
            if (of == null) return NotFound();

            of.FelhasznaloId = dto.FelhasznaloId;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/OsztalyFelhasznalo/5/napkozis
        [HttpDelete("{osztalyId}/{szerepkor}")]
        public async Task<IActionResult> Delete(int osztalyId, string szerepkor)
        {
            var of = await _context.OsztalyFelhasznalos.FirstOrDefaultAsync(x => x.OsztalyId == osztalyId && x.Szerepkor == szerepkor);
            if (of == null) return NotFound();

            _context.OsztalyFelhasznalos.Remove(of);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

