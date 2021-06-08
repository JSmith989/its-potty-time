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

            var activity = db.QueryFirstOrDefault<Activity>(sql, new { id = id });

            return activity;
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
            var sql = @"UPDATE Activities
                        SET
                        ActivityType = NULL,
						[Date] = NULL,
						Rating = NULL,
						ImageUrl = NULL,
						[Description] = 'Deleted',
						isAllergy = NULL,
						MealType = NULL,
						ChildId = NULL
                        WHERE Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        public Activity BabyPooped(Activity activity)
        {
            var sql = @"Insert into Activities(ActivityType, [Date], MealType, ChildId)
                        output inserted.*
                        values (0, GETDATE(), 3, @ChildId)";

            using var db = new SqlConnection(ConnectionString);

            var newActivity = db.QueryFirst<Activity>(sql, activity);

            return newActivity;
        }

        public List<Activity> GetBabyActivities(int id)
        {
            var sql = @"SELECT a.*
                        FROM Activities a
	                        join Babies b
		                        on b.Id = a.ChildId
		                 WHERE b.Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var activities = db.Query<Activity>(sql, new { id }).ToList();

            return activities;
        }

        public void UpdateDescription(Activity activity)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE Activities
                        SET [Description] = @Description
                        WHERE Id = @id";

            db.Execute(sql, activity);
        }
    }
}
