using Dapper;
using Microsoft.Data.SqlClient;
using Potty_Time.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.DataAccess
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=PottyTime;Trusted_Connection=True;";

        public List<User> GetAll()
        {

            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        From Users";

            return db.Query<User>(sql).ToList();
        }

        public void Add(User user)
        {
            var sql = @"Insert into Users(FirstName, LastName, Email, ImageUrl, [Description], FirebaseId)
                        output inserted.Id
                        values (@FirstName, @LastName, @Email, @ImageUrl, @Description, @FirebaseId)";

            var db = new SqlConnection(ConnectionString);
            var id = db.ExecuteScalar<int>(sql, user);

            user.Id = id;
        }

        public User Get(string id)
        {
            var sql = @"select *
                        from Users
                        where firebaseId = @id";

            using var db = new SqlConnection(ConnectionString);

            var user = db.QueryFirstOrDefault<User>(sql, new { Id = id });

            return user;
        }

        public void Update(User user)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE Users
                        SET FirstName = @FirstName,
                            LastName = @LastName,
	                        Email = @Email,
	                        ImageUrl = @ImageUrl,
                            [Description] = @Description,
                            @FirebaseId = @FirebaseId
                        WHERE Id = @id";

            db.Execute(sql, user);
        }
        
    }
}
