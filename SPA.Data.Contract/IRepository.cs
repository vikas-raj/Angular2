namespace SPA.Data.Contract
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;

    public interface IRepository<T>
        where T : class
    {
        IQueryable<T> GetAll();

        T GetById(int id);

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        void Delete(int id);

        //For future needs
        //void DeleteWhere(Expression<Func<T, bool>> predicate);
        //T GetSingle(Expression<Func<T, bool>> predicate);
        //T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        //IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);
    }
}
