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
    [Route("api/Activities")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        ActivityRepository _repo;

        public ActivitiesController()
        {
            _repo = new ActivityRepository();
        }

        [HttpGet]
        public IActionResult GetAllActivities()
        {
            return Ok(_repo.GetAll());
        }

        [HttpPost]
        public IActionResult AddAnActivity(Activity activity)
        {
            _repo.Add(activity);
            return Created($"api/Activities/{activity.Id}", activity);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var activity = _repo.Get(id);

            if (activity == null)
            {
                return NotFound("Activity not found");
            }

            return Ok(activity);
        }

        [HttpPut("{id}/update")]
        
        public IActionResult UpdateActivity(Activity activity)
        {
            if (activity == null)
            {
                return NotFound("Can't find the activity to update");
            };
            _repo.Update(activity);

            return Ok(activity);
        }

        [HttpDelete("{activityId}")]
        public IActionResult DeleteActivity(int activityId)
        {
            _repo.Remove(activityId);

            return Ok();
        }

        [HttpPost("poop")]
        public IActionResult AddPoop(Activity activity)
        {

            var newActivity = _repo.BabyPooped(activity);
            newActivity.ActivityType = ActivityType.Poop;
            newActivity.MealType = MealType.Poop;
            return Created($"api/Activities/{activity.Id}/poop", newActivity);
        }

        [HttpGet("{id}/all")]
        public IActionResult GetListOfActivities(int id)
        {
            var activities = _repo.GetBabyActivities(id);

            return Ok(activities);
        }

        [HttpPut("{id}/description")]
        public IActionResult UpdateDescription(Activity activity)
        {
            _repo.UpdateDescription(activity);

            return Ok(activity);
        }
    }
}
