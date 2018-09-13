namespace SPAJobPortal.Controllers
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using SPA.Data.Contract;
    using SPA.Model;
    using SPA.Model.Config;

    [Route("api/[controller]")]
    public class AuthController : BaseController
    {
        private readonly AppSettingsConfig appSettingsConfig;
        private readonly ConnectionStringsConfig connectionString;
        public AuthController(IAuthRepository repo, IOptions<ConnectionStringsConfig> connectionString, IOptions<AppSettingsConfig> options)
        {
            appSettingsConfig = options.Value;
            this.AuthUow = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await AuthUow.UserExists(userForRegisterDto.Username))
                ModelState.AddModelError("Username", "Username already exists");

            // validate request
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToCreate = new User
            {
                UserName = userForRegisterDto.Username,
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName
            };

            var createUser = await AuthUow.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await AuthUow.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            // generate token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettingsConfig.Token);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.UserId.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.UserName),
                    new Claim("UserRole", "User")
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { tokenString });
        }

    }
}
