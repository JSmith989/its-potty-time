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
    [Route("api/Babies")]
    [ApiController]
    public class BabiesController : ControllerBase
    {
        BabyRepository _repo;

        public BabiesController()
        {
            _repo = new BabyRepository();
        }

        [HttpGet]
        public IActionResult GetAllBabies()
        {
            return Ok(_repo.GetAll());
        }

        [HttpPost]
        public IActionResult AddBaby(Baby baby)
        {
            _repo.Add(baby);
            return Created($"api/Babies/{baby.Id}", baby);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var baby = _repo.Get(id);

            if (baby == null)
            {
                return NotFound("Baby not found");
            }

            return Ok(baby);
        }

        [HttpPut("{id}/update")]

        public IActionResult UpdateBaby(Baby baby)
        {
            if (baby == null)
            {
                return NotFound("Can't find the baby to update");
            };
            _repo.Update(baby);

            return Ok(baby);
        }

        [HttpDelete("{babyId}")]
        public IActionResult DeleteBaby(int babyId)
        {
            _repo.Remove(babyId);

            return Ok();
        }

        [HttpGet("{Id}/yours")]
        public IActionResult GetUsersBabies(string id)
        {
           var baby = _repo.GetUsersBabies(id);

            return Ok(baby);
        }
    }
}
