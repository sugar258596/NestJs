# Nest

### NestJs 概要

**NestJs** 是一个基于 **TpyeScript** 构建的开发框架，用于构建高效，可拓展的服务器应用程序。它借鉴了 **Angular** 框架的一下概念和设计原则，并结合现代的 **JavaScript/TypeScript** 特性提供了一种优雅而有强大的方式来构建可维护的后端应用。

**NestJs** 提供了一套模块化的框架，通过使用装饰器和依赖注入等技术，使应用组织结构更加的清晰和可测试。它支持很多插件和库，可以轻松的使用第三方库和工具，**例如:**数据库ORM,身份验证，日志记录等。
同时，NestJS还提供了一套强大的开发工具，包括代码生成器，代码重载，模块热加载等，极大地提高了开发效率。

### NestJS 的特点包括：

1. **模块化架构**：NestJS 倡导使用模块化的方式组织应用，使得代码结构清晰、可维护性强。

2. **强大的依赖注入系统**：NestJS 使用依赖注入进行组件的解耦和模块之间的交互，提供了更好的可测试性和可扩展性。

3. **TypeScript 支持**：NestJS 基于 TypeScript 构建，使得开发过程更加安全、高效，并且可以充分利用 TypeScript 的静态类型检查和语言特性。

4. **抽象层面的解耦**：NestJS 提供了一些抽象层面的解耦机制，使得开发人员可以灵活地切换和替换各种外部库和工具，而不影响应用的核心逻辑。

5. **典型的后端特性支持**：NestJS 内置了对常见的后端特性的支持，例如身份验证、请求处理、错误处理等，可以快速构建功能完备的后端应用。

### NestJs核心文件的简要概述：

| 文件名称               | 文件概述                                                    |
| ---------------------- | ----------------------------------------------------------- |
| app.controller.spec.ts | 控制器的单元测试。                                          |
| app.controller.ts      | 具有单一路由的基本控制器。                                  |
| app.module.ts          | 应用的根模块。                                              |
| app.service.ts         | 具有单一方法的基本服务。                                    |
| main.ts                | 使用核心函数 NestFactory 创建 Nest 应用实例的应用入口文件。 |

### NestJs 常用命令:

| 命令名称                    | 简写   | 说明                              | 文件名            |
| --------------------------- | ------ | --------------------------------- | ----------------- |
| new <name> [path]           |        | 创建一个新的 Nest 应用            |                   |
| build                       |        | 构建 Nest 应用                    |                   |
| start                       |        | 启动已构建的 Nest 应用            |                   |
| generate <schematic> [name] |        | 生成代码文件                      |                   |
| add <schematic> [name]      |        | 添加特性或库到现有的 Nest 应用    |                   |
| update                      |        | 更新 Nest CLI                     |                   |
| info                        |        | 输出关于系统环境的诊断信息        |                   |
| ——————————————————————————  | —————— | ————————————————————————————————— |                   |
| class                       | cl     | 生成一个类文件                    |                   |
| configuration               | config | 生成CLI配置文件                   |                   |
| controller                  | co     | 生成一个控制器文件                |                   |
| decorator                   | d      | 生成一个装饰器文件                |                   |
| filter                      | f      | 生成一个过滤器文件                |                   |
| gateway                     | ga     | 生成一个网关文件                  | \*.gateway.ts     |
| guard                       | gu     | 生成一个守卫文件                  | \*.guard.ts       |
| interceptor                 | itc    | 生成一个拦截器文件                | \*.interceptor.ts |
| library                     | lib    | 生成一个在monorep的新库           |                   |
| interface                   | itf    | 生成一个接口文件                  | \*.interface.ts   |
| middleware                  | mi     | 生成一个中间件文件                | \*.middleware.ts  |
| module                      | mo     | 生成一个模块文件                  | \*.module.ts      |
| pipe                        | pi     | 生成一个管道文件                  | \*.pipe.ts        |
| provider                    | pr     | 生成一个测试文件                  | \*.ts             |
| resolver                    | r      | 生成一个解析器文件                | \*.resolver.ts    |
| resource                    | res    | 生成一个新的CRUD资源              |                   |
| service                     | s      | 生成一个服务文件                  | \*.service.ts     |

### RESTful 版本控制

```ts
import { VersioningType } from '@nestjs/common';
  ....
  app.enableVersioning({
    type: VersioningType.URI
  })
  ....
```

| 方法                  | 说明                              |
| --------------------- | --------------------------------- |
| URI Versioning        | 版本将在请求的 URI 中传递（默认） |
| Header Versioning     | 自定义请求标头将指定版本          |
| Media Type Versioning | 请求的Accept标头将指定版本        |

### Code 码规范

| Code码 | 英文                  | 中文                                   |
| ------ | --------------------- | -------------------------------------- |
| 200    | ok                    | 请求成功，服务器正常处理并返回数据     |
| 201    | Created               | 请求成功，并创建了资源                 |
| 204    | No Content            | 请求成功处理了请求，但没有返回任何内容 |
| 304    | Not Modified          | 客户端缓存的资源为最新，不需要重新下载 |
| 400    | Bad Request           | 服务器无法理解请求的格式               |
| 401    | Unauthorized          | 请求未经授权，需要身份验证             |
| 403    | Forbidden             | 服务器拒绝服务                         |
| 404    | Not Found             | 请求资源不存在                         |
| 500    | Internal Server Error | 服务端错误                             |
| 502    | Bad Gateway           | 上游接口有问题或者服务器问题           |
| 503    | Service Unavailable   | 通常是由于过载或维护                   |

### 方法装饰器

| 方法装饰器              | 对应参数                      |
| ----------------------- | ----------------------------- |
| @Request()              | req                           |
| @Response()             | res                           |
| @Next()                 | next                          |
| @Session()              | req.session                   |
| @Param(key?: string)    | req.params/req.params[key]    |
| @Body(key?: string)     | req.body/req.body[key]        |
| @Query(key?: string)    | req.query/req.query[key]      |
| @Headers(name?: string) | req.headers/req.headers[name] |
| @HttpCode               |

### Session

#### session 是服务器 为每个用户的浏览器创建的一个会话对象 这个session 会记录到 浏览器的 cookie 用来区分用户

安装

```ts
npm i express-session --save
npm i @types/express-session -D
```

参数配置详解

| 参数              | 默认值      | 说明                                                                                            |
| ----------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| secret            | undefined   | 生成服务端session 签名 可以理解为加盐                                                           |
| name              | connect.sid | 生成客户端cookie 的名字                                                                         |
| cookie            | true        | 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。 |
| resave            | false       | 是否在每次请求时强制更新会话                                                                    |
| rolling           | false       | 在每次请求时强行设置 cookie，这将重置 cookie 过期时间                                           |
| store             | string      | 用于指定会话数据的存储方式，                                                                    |
| saveUninitialized | true        | 表示是否在会话初始化时就进行存储。可以考虑将其设置为 false，以避免未经修改的会话被存储          |

**axios 携带 cookie**

```ts
axios.defaults.withCredentials = true;
```

### 连接数据库

**ORM 框架** typeOrm 是 TypeScript 中最成熟的对象关系映射器( ORM )。因为它是用 TypeScript 编写的，所以可以很好地与 Nest 框架集成
**依赖安装**

```tsnpm install --save @nestjs/typeorm typeorm mysql2
npm install --save @nestjs/typeorm typeorm mysql2
```

### ValidationPipe 验证配置

| 选项                    | 类型     | 描述                                                                                  |
| ----------------------- | -------- | ------------------------------------------------------------------------------------- |
| transform               | boolean  | 如果设置为 true，验证器将自动转换传入的数据类型                                       |
| enableDebugMessages     | boolean  | 如果设置为 true，验证器将在出现问题时向控制台打印额外的警告消息                       |
| skipUndefinedProperties | boolea   | 如果设置为 true，则验证器将跳过验证对象中未定义的所有属性的验证                       |
| skipNullProperties      | boolean  | 如果设置为 true，则验证器将跳过验证对象中所有为 null 的属性的验证                     |
| skipMissingProperties   | boolean  | 如果设置为 true，则验证器将跳过验证对象中所有为 null 或未定义的属性的验证             |
| whitelist               | boolean  | 如果设置为 true，验证器将去除任何不使用任何验证装饰器的属性的已验证（返回）对象       |
| forbidNonWhitelisted    | boolean  | 如果设置为 true，验证器将抛出异常而不是剥离非白名单属性                               |
| forbidUnknownValues     | boolean  | 如果设置为 true，验证未知对象的尝试会立即失败                                         |
| disableErrorMessages    | boolean  | 如果设置为 true，验证错误将不会返回给客户端                                           |
| errorHttpStatusCode     | number   | 此设置允许你指定在出现错误时将使用哪种异常类型。 默认情况下它抛出 BadRequestException |
| exceptionFactory        | Function | 获取验证错误数组并返回要抛出的异常对象                                                |
| groups                  | string[] | 对象验证期间要使用的组                                                                |
| always                  | boolean  | 为装饰器的 always 选项设置默认值。 可以在装饰器选项中覆盖默认                         |
| strictGroups            | boolean  | 如果 groups 未给出或为空，则忽略至少有一组的装饰器                                    |
| dismissDefaultMessages  | boolean  | 如果设置为 true，验证将不使用默认消息。 如果未明确设置，错误消息始终为 undefined      |
| validationError.target  | boolean  | 指示目标是否应在 ValidationError 中公开                                               |
| validationError.value   | boolean  | 指示是否应在 ValidationError 中公开经过验证的值                                       |
| stopAtFirstError        | boolean  | 当设置为 true 时，给定属性的验证将在遇到第一个错误后停止。 默认为假                   |
