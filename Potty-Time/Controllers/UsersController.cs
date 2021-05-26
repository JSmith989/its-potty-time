using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Potty_Time.DataAccess;
using Potty_Time.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;
        public UsersController()
        {
            _repo = new UserRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _repo.Add(user);
            return Created($"api/Users/{user.Id}", user);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(string id)
        {
            var user = _repo.Get(id);

            if (user == null)
            {
                return NotFound("This user does not exist.");
            }

            return Ok(user);
        }


        [HttpPut("{id}/update")]
        public IActionResult UpdateUser(User user)
        {
            _repo.Update(user);

            return Ok(user);
        }
    }
}
