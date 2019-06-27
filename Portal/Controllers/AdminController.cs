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
            ViewBag.SolutionCount = _db.Solutions.Count(o => !o.IsDeleted);
            ViewBag.ProductionCount = _db.Productions.Count(o => !o.IsDeleted);

            return View(new AdminViewModel() { Page = "Index" });
        }

        #region 解决方案

        public IActionResult SolutionList()
        {
            return View(new AdminViewModel() { Page = "SolutionList" });
        }

        public IActionResult GetSolutionList()
        {
            var list = _db.Solutions.Include(o => o.SolutionItems).OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort).ThenByDescending(o => o.CreationTime).ToList();

            foreach (var solution in list)
            {
                solution.SolutionItems = solution.SolutionItems.OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort)
                    .ThenByDescending(o => o.CreationTime).ToList();
            }

            return Success(list);
        }
        public IActionResult GetSolution(Guid id)
        {
            var s = _db.Solutions.Include(o => o.SolutionItems).First(o=>o.Id == id);

            s.SolutionItems = s.SolutionItems.OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort)
                .ThenByDescending(o => o.CreationTime).ToList();

            return Success(s);
        }


        public IActionResult AddSolution(string name, int sort)
        {
            _db.Solutions.Add(new Solution() { Name = name, Sort = sort });
            _db.SaveChanges();
            return Success();
        }
        public IActionResult UpdateSolution(Guid id, string name, int sort)
        {
            var s = _db.Solutions.First(o => o.Id == id);
            s.Name = name;
            s.Sort = sort;
            _db.SaveChanges();
            return Success();
        }
        public IActionResult DeleteSolution(Guid id)
        {
            var s = _db.Solutions.First(o => o.Id == id);
            s.IsDeleted = true;
            _db.SaveChanges();
            return Success();
        }
        public IActionResult RecoverSolution(Guid id)
        {
            var s = _db.Solutions.First(o => o.Id == id);
            s.IsDeleted = false;
            _db.SaveChanges();
            return Success();
        }


        public IActionResult AddSolutionItem(Guid solutionId, string name, int sort)
        {
            var solution = _db.Solutions.Include(o=>o.SolutionItems).FirstOrDefault(o => o.Id == solutionId);
            if (solution == null)
            {
                return Error(-1, "没有找到对应的解决方案");
            }

            solution.SolutionItems.Add(new SolutionItem() { Name = name, Sort = sort, Post = new Post() });
            solution.SolutionItems = solution.SolutionItems.OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort)
                .ThenByDescending(o => o.CreationTime).ToList();
            _db.SaveChanges();
            return Success(solution);
        }
        public IActionResult UpdateSolutionItem(Guid id, string name, int sort)
        {
            var s = _db.SolutionItems.Include(o=>o.Solution).ThenInclude(o=>o.SolutionItems).First(o => o.Id == id);
            s.Name = name;
            s.Sort = sort;

            s.Solution.SolutionItems = s.Solution.SolutionItems.OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort)
                .ThenByDescending(o => o.CreationTime).ToList();
            _db.SaveChanges();
            return Success(s.Solution);
        }

        public IActionResult DeleteSolutionItem(Guid id)
        {
            var s = _db.SolutionItems.Include(o => o.Solution).ThenInclude(o => o.SolutionItems).First(o => o.Id == id);
            s.IsDeleted = true;
            s.Solution.SolutionItems = s.Solution.SolutionItems.OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort)
                .ThenByDescending(o => o.CreationTime).ToList();
            _db.SaveChanges();
            return Success(s.Solution);
        }
        public IActionResult RecoverSolutionItem(Guid id)
        {
            var s = _db.SolutionItems.Include(o => o.Solution).ThenInclude(o => o.SolutionItems).First(o => o.Id == id);
            s.IsDeleted = false;
            s.Solution.SolutionItems = s.Solution.SolutionItems.OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort)
                .ThenByDescending(o => o.CreationTime).ToList();
            _db.SaveChanges();
            return Success(s.Solution);
        }

        public IActionResult UpdateSolutionItemPost(Guid id, string content)
        {
            var s = _db.SolutionItems.Include(o => o.Post).First(o => o.Id == id);
            s.Post.Content = content;
            _db.SaveChanges();
            return Success();
        }

        public IActionResult GetSolutionItemPost(Guid id)
        {
            var s = _db.SolutionItems.Include(o => o.Post).FirstOrDefault(o => o.Id == id);
            return Success(s?.Post.Content??String.Empty);
        }


        #endregion

        #region 产品

        public IActionResult ProductionList()
        {
            return View(new AdminViewModel() { Page = "ProductionList" });
        }

        public IActionResult GetProductionList()
        {
            var list = _db.Productions.OrderBy(o => o.IsDeleted).ThenByDescending(o => o.Sort).ThenByDescending(o => o.CreationTime).ToList();
            return Success(list);
        }

        public IActionResult GetProductionPost(Guid id)
        {
            var pro = _db.Productions.Include(o => o.Post).FirstOrDefault(o => o.Id == id);
            return Success(pro?.Post.Content ?? String.Empty);
        }

        public IActionResult AddProduction(string name, string content, int sort)
        {
            _db.Productions.Add(new Production() { Name = name, Sort = sort, Post = new Post() { Content = content } });
            _db.SaveChanges();
            return Success();
        }


        public IActionResult UpdateProduction(Guid id, string name, string content, int sort)
        {
            var p = _db.Productions.Include(o => o.Post).First(o => o.Id == id);
            p.Post.Content = content;
            p.Name = name;
            p.Sort = sort;
            _db.SaveChanges();
            return Success();
        }

        public IActionResult DeleteProduction(Guid id)
        {
            var p = _db.Productions.First(o => o.Id == id);
            p.IsDeleted = true;
            _db.SaveChanges();
            return Success();
        }

        public IActionResult RecoverProduction(Guid id)
        {
            var p = _db.Productions.First(o => o.Id == id);
            p.IsDeleted = false;
            _db.SaveChanges();
            return Success();
        }

        #endregion


    }
}