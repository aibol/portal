using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace Portal.Models
{
    public class Production:FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        /// <summary>
        /// 排序越大越往前
        /// </summary>
        public int Sort { get; set; }

        public Post Post { get; set; }
    }
}
