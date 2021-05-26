using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public ActivityType ActivityType { get; set; }
        public DateTime Date { get; set; }
        public int Rating { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public bool isAllergy { get; set; }
        public MealType MealType { get; set; }
        public int ChildId { get; set; }
    }

    public enum ActivityType
    {
        Poop,
        FirstMeal,
        SecondMeal,
        ThirdMeal
    }

    public enum MealType
    {
        Vegetable,
        Fruit,
        Meat
    }
}
