using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Portal.Models;

namespace Portal.Controllers
{
    [ServiceFilter(typeof(ConfigurationActionFilter))]
    public class AibolBaseController : Controller
    {
        protected static IActionResult Success()
        {
            return new JsonResult(new { code = 200 });
        }
        protected static IActionResult Success(object data)
        {
            return new JsonResult(new { code = 200, data = data });
        }

        protected static IActionResult Error(int code, string msg)
        {
            return new JsonResult(new { code = code, msg = msg });
        }
        protected static IActionResult Error(int code, string msg, object data)
        {
            return new JsonResult(new { code = code, msg = msg, data = data });
        }
    }
}