using Dapper;
using Microsoft.Data.SqlClient;
using Potty_Time.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.DataAccess
{
    public class PhotoRepository
    {
        const string ConnectionString = "Server=localhost;Database=PottyTime;Trusted_Connection=True;";
        public List<Photo> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Photos";

            return db.Query<Photo>(sql).ToList();
        }

        public void Add(Photo photo)
        {
            var sql = @"Insert into Photos(ImageUrl, ChildId, ActivityId)
                        output inserted.Id
                        values (@ImageUrl, @ChildId, @ActivityId)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, photo);

            photo.Id = id;
        }

        public Photo Get(int id)
        {
            var sql = @"Select *
                        From Photos
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var photo = db.QueryFirstOrDefault<Photo>(sql, new { id = id });

            return photo;
        }

        public void Update(Photo photo)
        {
            var sql = @"UPDATE Photos
                        SET
						ImageUrl = @imageUrl,
						ChildId = @ChildId,
						ActivityId = @activityId
                        WHERE Id = @id";

            using var db = new SqlConnection(ConnectionString);
            db.Execute(sql, photo);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from Photos
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
