using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace Portal.Models
{
    /// <summary>
    /// 解决方案
    /// </summary>
    public class Solution:FullAuditedEntity<Guid>
    {
        public string Name { get; set; }

        /// <summary>
        /// 排序越大越往前
        /// </summary>
        public int Sort { get; set; }

        public List<SolutionItem> SolutionItems { get; set; }
    }
}
