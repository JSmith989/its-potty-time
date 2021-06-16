using Dapper;
using Microsoft.Data.SqlClient;
using Potty_Time.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.DataAccess
{
    public class BabyRepository
    {
        const string ConnectionString = "Server=localhost;Database=PottyTime;Trusted_Connection=True;";

        public List<Baby> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Babies";

            return db.Query<Baby>(sql).ToList();
        }

        public Baby Add(Baby baby)
        {
            var sql = @"Insert into Babies(FirstName, LastName, ImageUrl,  Birthday, UserId, [Description], ParentId)
                        output inserted.*
                        values (@FirstName, @LastName, @ImageUrl, @Birthday, @UserId, @Description, @ParentId )";

            using var db = new SqlConnection(ConnectionString);

            var newBaby = db.QueryFirst<Baby>(sql, baby);

            return newBaby;
        }

        public Baby Get(int id)
        {
            var sql = @"Select *
                        From Babies
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var baby = db.QueryFirstOrDefault<Baby>(sql, new { id = id });

            return baby;
        }

        public void Update(Baby baby)
        {
            var sql = @"UPDATE Babies
                        SET
                        FirstName = @firstName,
						LastName = @lastName,
						ImageUrl = @imageUrl,
						Birthday = @birthday,
						UserId = @userId,
                        [Description] = @description,
                        ParentId = @parentId
                        WHERE Id = @id";

            using var db = new SqlConnection(ConnectionString);
            db.Execute(sql, baby);
        }

        public void Remove(int id)
        {
            var sql = @"UPDATE Babies
                        SET
                        FirstName = 'Deleted',
						LastName = NULL,
						ImageUrl = NULL,
						Birthday = NULL,
						UserId = NULL,
						Age = NULL,
                        [Description] = NULL,
                        ParentId = NULL
                        WHERE Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        public List<Baby> GetUsersBabies(string id)
        {
            var sql = @"SELECT b.*
                        FROM Babies b
	                        join Users u
		                        on u.Id = b.UserId
		                 WHERE u.FirebaseId = @id";

            using var db = new SqlConnection(ConnectionString);

            var baby = db.Query<Baby>(sql, new { id }).ToList();

            return baby;
        }

        public int ToAgeString(DateTime dob)
        {
            DateTime today = DateTime.Today;

            int months = today.Month - dob.Month;
            int years = today.Year - dob.Year;

            if (today.Day < dob.Day)
            {
                months--;
            }

            if (months < 0)
            {
                years--;
                months += 12;
            }

            int days = (today - dob.AddMonths((years * 12) + months)).Days;
/*            var thingToReturn = years > 0 ? years : months;
            var other = months > 0 ? months : days;*/
            var meh = 0;
            if (years > 0)
            {
                meh = years;
            }
            else if (months > 0)
            {
                meh = months;
            }
            else if (days > 0)
            {
                meh = days;
            }
            return meh;
        }
    }
}
