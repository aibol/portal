using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using JetBrains.Annotations;

namespace Portal.Models
{
    /// <summary>
    /// 富文本帖子
    /// </summary>
    public class Post:FullAuditedEntity<Guid>
    {
        public string Content { get; set; }

        [CanBeNull] public SolutionItem SolutionItem { get; set; }
        public Guid? SolutionItemId { get; set; }


        [CanBeNull] public Production Production { get; set; }
        public Guid? ProductionId { get; set; }
    }


}
