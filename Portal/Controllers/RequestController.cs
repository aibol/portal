using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        /// <summary>
        /// 联系我们
        /// </summary>
        /// <param name="name">称呼</param>
        /// <param name="contact">联系方式</param>
        /// <param name="request">需求内容</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Index()
        {
            var form = HttpContext.Request.Form;
            var name = form["name"];
            var contact = form["contact"];
            var request = form["request"];
            if (string.IsNullOrWhiteSpace(name) || 
                string.IsNullOrWhiteSpace(contact) ||
                string.IsNullOrWhiteSpace(request))
                return BadRequest("name/contact/request are required");

            var msg = new MailMessage();
            msg.To.Add("cym@aibol.com");

            msg.From = new MailAddress("noreply@aibol.com", "Aibol NoReply Mail", Encoding.UTF8);
            msg.Subject = "官网客户需求邮件";
            msg.SubjectEncoding = Encoding.UTF8;
            msg.Body = $"<p>姓名: {name}</p><p>联系方式: {contact}</p><p>需求: {request}</p>";
            msg.BodyEncoding = Encoding.UTF8;
            msg.IsBodyHtml = true;
            msg.Priority = MailPriority.High;

            var client = new SmtpClient
            {
                Credentials = new NetworkCredential("noreply@aibol.com", "4hBfYxlkrd"),
                Port = 25,
                Host = "smtp.ym.163.com",
                EnableSsl = false
            };
            
            try
            {
                client.Send(msg);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
}