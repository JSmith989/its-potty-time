using Dapper;
using Microsoft.Data.SqlClient;
using Potty_Time.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.DataAccess
{
    public class ActivityRepository
    {
        const string ConnectionString = "Server=localhost;Database=PottyTime;Trusted_Connection=True;";

        public List<Activity> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Activities";

            return db.Query<Activity>(sql).ToList();
        }

        public void Add(Activity activity)
        {
            var sql = @"Insert into Activities(ActivityType, [Date], Rating, ImageUrl, [Description], isAllergy, MealType, ChildId)
                        output inserted.Id
                        values (@ActivityType, @Date, @Rating, @ImageUrl, @Description, @isAllergy, @MealType, @ChildId)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, activity);

            activity.Id = id;
        }

        public Activity Get(int id)
        {
            var sql = @"Select *
                        From Activities
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var animal = db.QueryFirstOrDefault<Activity>(sql, new { id = id });

            return animal;
        }

        public void Update(Activity activity)
        {
            var sql = @"UPDATE Activities
                        SET
                        ActivityType = @activityType,
						[Date] = @date,
						Rating = @rating,
						ImageUrl = @imageUrl,
						[Description] = @description,
						isAllergy = @isAllergy,
						MealType = @mealType,
						ChildId = @childId
                        WHERE Id = @id";

            using var db = new SqlConnection(ConnectionString);
            db.Execute(sql, activity);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from Activities 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
