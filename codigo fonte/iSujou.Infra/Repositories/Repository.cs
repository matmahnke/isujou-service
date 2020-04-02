using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace iSujou.Infra.Repositories
{
    public abstract class Repository<TEntity, TKey> : IRepository<TEntity, TKey> where TEntity : EntityBase<TKey>
    {
        protected readonly DbContext _context;
        protected readonly DbSet<TEntity> _set;

        public Repository(DbContext context)
        {
            _context = context;
            _set = _context.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            _set.Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            _set.AddRange(entities);
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await _set.AddRangeAsync(entities);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _set;
        }

        public TEntity GetById(TKey id)
        {
            return _set.Find(id);
        }

        public async Task<TEntity> GetByIdAsync(TKey id)
        {
            return await _set.FindAsync(id);
        }

        public void Remove(params TKey[] ids)
        {
            _set.RemoveRange(GetAll().Where(d => ids.Contains(d.Id)).ToList());
        }

        public void Remove(Expression<Func<TEntity, bool>> criteria)
        {
            _set.RemoveRange(GetAll().Where(criteria).ToList());
        }

        public void Update(TEntity entity)
        {
            var exist = _set.Find(entity.Id);
            _context.Entry(exist).CurrentValues.SetValues(entity);
        }

        public async Task AddAsync(TEntity entity)
        {
            await _set.AddAsync(entity);
        }

        public async Task<IList<TEntity>> GetAllAsync()
        {
            return await _set.ToListAsync();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            var exist = await _set.FindAsync(entity.Id);
            _context.Entry(exist).CurrentValues.SetValues(entity);
        }

        public async Task RemoveAsync(params TKey[] ids)
        {
            foreach (var id in ids)
            {
                var entity = await _set.FindAsync(id);
                _set.Remove(entity);
            }
        }
    }
}