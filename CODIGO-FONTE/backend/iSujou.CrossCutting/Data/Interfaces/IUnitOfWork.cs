using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace iSujou.CrossCutting.Data.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> Commit();
    }
}
