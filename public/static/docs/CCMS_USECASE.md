## 1. dashboard library

-   搜索

    ```
    Dashboard支持多种类型的搜索。

    

    1. 根据dashboard名称进行的模糊搜索。

    2. 根据group进行的按组搜索。

    3. 根据编辑次数，编辑时间，访问次数进行的个人喜好排序。

    

    当用户进行dashboard搜索之后，系统将会缓存这些搜索条件，直到用户更换搜索条件，或者退出登录。

    

    响应回车键搜索。

    

    默认dashboard会按照优先级以及创建时间两个条件进行排序，在用户每次返回页面在没有缓存搜索条件的情况下，采用默认条件进行排序。

    ```

-   喜欢
    ```
    喜欢(high priority)是提供给用户的，可以快速定位重要dashboard的功能。高优先级的dashboard将会在dashboard的搜索排序时排在最前面，方便用户选择。

    ```
-   添加
    ```
    允许权限通过的用户进行添加dashboard的操作。

    ```
-   删除
    ```
    允许权限通过的用户进行删除dashboard的操作。

    ```
-   重命名

    ```
    允许权限通过的用户进行dashbaord的重命名操作。

    

    注意：在同一个租户下，不能创建相同名字的dashbaord

    ```

-   复制

    ```
    允许权限通过的用户进行复制dashboard的操作。

    

    注意：在同一租户下，不能创建相同的dashboard。

    ```

-   分组
    ```
    允许权限通过的用户进行分组操作。

    ```
-   错误分析
    ```
    ...

    ```

## 2. 添加 dashboard

-   选择模板
    ```
    允许权限通过的用户通过选择已有的模板进行创建dashboard。模板中会存在一些预置的widget。

    ```
-   选择 application 关联
    ```
    AU-IOT中隐藏显示的操作，默认添加dashboard到进入的application下。

    ```
-   选择 page 组
    ```
    为dashboard创建不同的组，并可以在添加dashboard窗口选择将dashboard加入哪一个创建好的组。

    ```
-   设置是否私密
    ```
    设置dashboard的属性，私有的页面将会只有当前用户才能访问。公共页面下，所有同租户下的用户都可以看到和访问。

    ```
-   设置优先级
    ```
    设置dashboard的优先级，设置高的优先级可以让页面显示靠前。（默认情况下，dashbaord按照优先级以及创建时间排序）

    ```
-   错误分析
    ```
    ...

    ```

## 3. 管理 dashboard 组

-   搜索
    ```
    根据group名称进行的模糊组搜索。

    ```
-   添加组
    ```
    dashboard组可以在新建页面以及组管理中心创建。组命名规则：不允许在组名前后出现一个或多个空格

    ```
    -   设置组是否私密
        ```
        在组的属性中，CCMS也提供组是否为私有的状态，如果是私有则该组仅对当前用户可见。如果为共有，组对所有用户可见。

        ```
-   删除组
    ```
    对权限允许的用户，可以进行组的删除操作。

    ```
-   编辑组
    ```
    对权限允许的用户，可以进行组信息编辑的操作。

    ```

### default page

-   创建

    ```json
        {

            "metadata": {
                "author": "LJ",
                "version": "1.0.0",
                "desc": "this is a demo page"
            },
            "layout": {
                "padding":true,
                "container: [true,{}],
                "navbar": [true,{}],
                "header": [true,{"title": "Accounts"}]
            },
            "material-key": "ISC_WEB_PAGE_C_ACCOUNT_ACCOUNT_MANAGEMENT",
            "modules": [
                {
                    "identify": "account",
                    "uri": "/accountmanagement",
                    "props": {}
                }
            ]
        }
    ```

    ```text
    A. 页面配置

    

    项目中存在一些默认的页面，如Events，Rules，Deveices等。这些页面的配置放在 src/pages/config 下，

    典型的页面配置文件拥有四个基本属性。

    1. metadata (Object): 元数据记录页面的作者版本以及描述等各种信息。

    2. layout (Object): 页面模板的配置，模板配置包括，container，header，以及navbar，所以在layout中，我们可以根据不同的配置产生不同的模板。如需更换模板，需前往container模块中更换。

    3. modules (Array): modules中包含的是不同模块的信息，通过这些信息，CCMS，会加载到不同的view到container中。

    4. material-key (String)：CCMS中进行权限验证的关键字。（具体material-key规则参考...）

    ```

    ```
    B. 模块配置

    

    模块配置是modules下模块的配置，基本的一个模块的配置包括四个属性。

    1. identify (String)：模块的id。

    2. uri (String)：模块相对于modules文件夹的相对路径。（精确到文件夹即可）

    3. props (Any)：此中的数据是会注入到模块主视图中的数据，方便开发时候时候配置。写出可配置，可定制的组件。

    ```
