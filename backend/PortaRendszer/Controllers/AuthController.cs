using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PortaRendszer.DTOs;
using PortaRendszer.Models;
using PortaRendszer.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace PortaRendszer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly PortarendszerContext _context;
        private readonly IConfiguration _config;

        public AuthController(PortarendszerContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthDTO dto)
        {
            if (await _context.Felhasznalos.AnyAsync(f => f.Felhasznalonev == dto.Felhasznalonev))
                return BadRequest("A felhasználónév már létezik.");

            CreatePasswordHash(dto.Jelszo, out byte[] hash, out byte[] salt);

            var user = new Felhasznalo
            {
                Nev = dto.Felhasznalonev, // Ezt átírhatod ha másik mezőt használsz névként
                Felhasznalonev = dto.Felhasznalonev,
                Email = dto.Felhasznalonev + "@szidi.hu",
                Beosztas = "tanar",
                JelszoHash = hash,
                JelszoSalt = salt
            };

            _context.Felhasznalos.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Sikeres regisztráció.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthDTO dto)
        {
            var user = await _context.Felhasznalos.FirstOrDefaultAsync(f => f.Felhasznalonev == dto.Felhasznalonev);
            if (user == null) return Unauthorized("Hibás felhasználónév.");

            if (!VerifyPasswordHash(dto.Jelszo, user.JelszoHash, user.JelszoSalt))
                return Unauthorized("Hibás jelszó.");

            string token = CreateToken(user);
            return Ok(new { token });
        }

        // Jelszóhash generálás
        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        // Jelszó ellenőrzés
        private bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using var hmac = new HMACSHA512(salt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(hash);
        }

        // JWT Token generálás
        private string CreateToken(Felhasznalo user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Felhasznalonev),
                new Claim(ClaimTypes.Role, user.Beosztas)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}