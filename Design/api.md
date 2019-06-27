## 获取解决方案列表
url:/admin/GetSolutionList
type:all
data:/
res:
```
{
    "code": 200,
    "data": [
        {
            "name": "bb",
            "sort": 0,
            "solutionItems": [
                {
                    "name": "bb11",
                    "sort": 3,
                    "post": null,
                    "isDeleted": false,
                    "deleterUserId": null,
                    "deletionTime": null,
                    "lastModificationTime": null,
                    "lastModifierUserId": null,
                    "creationTime": "2019-06-26T13:35:41.9443809",
                    "creatorUserId": null,
                    "id": "5e691406-77dc-4047-1cab-08d6f9f820fe"
                },
                ...
            ],
            "isDeleted": false,
            "deleterUserId": null,
            "deletionTime": null,
            "lastModificationTime": null,
            "lastModifierUserId": null,
            "creationTime": "2019-06-26T13:12:13.2374476",
            "creatorUserId": null,
            "id": "af248965-a04c-4ab0-a2fe-08d6f9f493ae"
        },
        {
            "name": "aa",
            "sort": 0,
            "solutionItems": [],
            "isDeleted": false,
            "deleterUserId": null,
            "deletionTime": null,
            "lastModificationTime": null,
            "lastModifierUserId": null,
            "creationTime": "2019-06-26T13:10:16.4253577",
            "creatorUserId": null,
            "id": "348db0fe-9000-4cd5-a2fd-08d6f9f493ae"
        }
    ]
}
```

## 获取解决方案详情
url:/admin/GetSolution/{id}
type:all
data: id 路由中直接传入
res:
```
{
    "code": 200,
    "data": {
        "name": "bb",
        "sort": 0,
        "solutionItems": [
            {
                "name": "bb11",
                "sort": 3,
                "post": null,
                "isDeleted": false,
                "deleterUserId": null,
                "deletionTime": null,
                "lastModificationTime": null,
                "lastModifierUserId": null,
                "creationTime": "2019-06-26T13:35:41.9443809",
                "creatorUserId": null,
                "id": "5e691406-77dc-4047-1cab-08d6f9f820fe"
            },
            ...
        ],
        "isDeleted": false,
        "deleterUserId": null,
        "deletionTime": null,
        "lastModificationTime": null,
        "lastModifierUserId": null,
        "creationTime": "2019-06-26T13:12:13.2374476",
        "creatorUserId": null,
        "id": "af248965-a04c-4ab0-a2fe-08d6f9f493ae"
    }
}
```

## 根据分栏获取富文本内容
url:/admin/GetSolutionItemPost/{id}
type:all
data: id 路由中直接传入
res:
```
{
    "code": 200,
    "data": "<p><img src=\"/upload/image/20190626/6369715626416145165666540.png\" title=\"image.png\" alt=\"image.png\"/></p>"
}
```

## 产品列表
url:/admin/GetProductionList
type:all
data: /
res:
```
{
    "code": 200,
    "data": [
        {
            "name": "a",
            "sort": 1,
            "post": null,
            "isDeleted": false,
            "deleterUserId": null,
            "deletionTime": null,
            "lastModificationTime": null,
            "lastModifierUserId": null,
            "creationTime": "2019-06-26T10:21:24.3582655",
            "creatorUserId": null,
            "id": "6fcff6e2-b9c4-435b-9127-08d6f9dcfc80"
        },
        ...
    ]
}
```

## 根据产品获取富文本内容
url:/admin/GetProductionPost/{id}
type:all
data: id 路由中直接传入
res:
```
{
    "code": 200,
    "data": "<p><img src=\"/upload/image/20190626/6369715626416145165666540.png\" title=\"image.png\" alt=\"image.png\"/></p>"
}
```