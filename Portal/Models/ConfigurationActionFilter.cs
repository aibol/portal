using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

namespace Portal.Models
{
    public class ConfigurationActionFilter : ActionFilterAttribute
    {
        private readonly IConfiguration _configuration;

        public ConfigurationActionFilter(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            if (!(context.Controller is Controller controller))
                throw new NullReferenceException("controller is not ControllerBase");

            controller.ViewBag.Configuration = _configuration;
        }
    }
}