using System.Security.Cryptography;
using System.Text;

namespace PortaRendszer.Services
{
    public static class PasswordService
    {
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public static bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(storedHash);
        }

        internal static bool VerifyPasswordHash(string jelenlegiJelszo, byte[] jelszoHash, byte[] jelszoSalt)
        {
            throw new NotImplementedException();
        }
    }
}