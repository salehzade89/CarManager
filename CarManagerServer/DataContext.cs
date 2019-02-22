using System;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

public interface IDataContext : IDisposable
{
    PersonRepository PersonRepository { get; }
    CarRepository CarRepository { get; }

    DatabaseFacade Database { get; }
    IConfiguration Configuration { get; }
    IHttpContextAccessor HttpContextAccessor { get; set; }

    int Save();
}

public class DataContext : IDataContext
{
    #region Repositories

    private readonly DefaultDb _dbContext;
    public PersonRepository PersonRepository { get; private set; }
    public CarRepository CarRepository { get; private set; }

    private void InitRepositories()
    {
        PersonRepository = new PersonRepository(_dbContext);
        CarRepository = new CarRepository(_dbContext);
    }

    #endregion
    #region Fields
    public DatabaseFacade Database { get; set; }
    public IConfiguration Configuration { get; set; }
    public IHttpContextAccessor HttpContextAccessor { get; set; }

    #endregion

    public DataContext(DefaultDb dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        Database = _dbContext.Database;
        Configuration = configuration;

        InitRepositories();
    }

    private bool _isDisposed = false;
    protected virtual void Dispose(bool disposing)
    {
        if (!this._isDisposed)
        {
            if (disposing)
            {
                _dbContext.Database.BeginTransaction(IsolationLevel.ReadCommitted);
                _dbContext.Dispose();
            }
        }
        this._isDisposed = true;
    }
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public int Save()
    {
        return _dbContext.SaveChanges();
    }
}