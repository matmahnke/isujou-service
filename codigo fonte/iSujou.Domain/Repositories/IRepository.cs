using iSujou.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace iSujou.Domain.Repositories
{
    public interface IRepository<TEntity, TKey> where TEntity : EntityBase<TKey>
    {
        void Add(TEntity entity);
        Task AddAsync(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);
        Task AddRangeAsync(IEnumerable<TEntity> entities);
        TEntity GetById(TKey id);
        Task<TEntity> GetByIdAsync(TKey id);
        IQueryable<TEntity> GetAll();
        Task<IList<TEntity>> GetAllAsync();
        void Update(TEntity entity);
        Task UpdateAsync(TEntity entity);
        void Remove(params TKey[] ids);
        Task RemoveAsync(params TKey[] ids);
        void Remove(Expression<Func<TEntity, bool>> criteria);
    }
}
