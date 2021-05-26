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
    [Route("api/Photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        PhotoRepository _repo;

        public PhotosController()
        {
            _repo = new PhotoRepository();
        }

        [HttpGet]
        public IActionResult GetAllPhotos()
        {
            return Ok(_repo.GetAll());
        }

        [HttpPost]
        public IActionResult AddPhoto(Photo photo)
        {
            _repo.Add(photo);
            return Created($"api/Photos/{photo.Id}", photo);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var photo = _repo.Get(id);

            if (photo == null)
            {
                return NotFound("Photo not found");
            }

            return Ok(photo);
        }

        [HttpPut("{id}/update")]

        public IActionResult UpdatePhoto(Photo photo)
        {
            if (photo == null)
            {
                return NotFound("Can't find the photo to update");
            };
            _repo.Update(photo);

            return Ok(photo);
        }

        [HttpDelete("{photoId}")]
        public IActionResult DeletePhoto(int photoId)
        {
            _repo.Remove(photoId);

            return Ok();
        }
    }
}
