using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portal.Models;

namespace Portal.Controllers
{
    public class AdminViewModel
    {
        public string Page { get; set; }
    }

    public class AdminController : AibolBaseController
    {
        private readonly Db _db;

        public AdminController(Db db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View(new AdminViewModel(){Page = "Index"});
        }

        #region 解决方案

        public IActionResult SolutionList()
        {
            return View(new AdminViewModel() { Page = "SolutionList" });
        }

        public IActionResult GetList()
        {
            var list = _db.Solutions.Include(o => o.SolutionItems).OrderByDescending(o=>o.CreationTime).ToList();
            return Ok(list);
        }

        public IActionResult AddSolution(string name)
        {
            _db.Solutions.Add(new Solution(){Name = name});
            _db.SaveChanges();
            return Ok();
        }
        public IActionResult AddSolutionItem(Guid solutionId ,string name)
        {
            var solution = _db.Solutions.FirstOrDefault(o => o.Id == solutionId);
            if (solution == null)
            {
                return Error(-1, "没有找到对应的解决方案");
            }

            solution.SolutionItems.Add(new SolutionItem(){});

            return Ok();
        }



        #endregion




        public IActionResult ProductionList()
        {
            return View(new AdminViewModel() { Page = "ProductionList" });
        }
    }
}