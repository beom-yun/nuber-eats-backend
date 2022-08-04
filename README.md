# Nuber Eats

The Backend of Nuber Eats Clone

<br>

# 0 INTRODUCTION

## **0.6 Backend Setup**

Nest 프로젝트 초기화

```bash
$ nest g application nuber-eats-backend
```

<br>

# 1 GRAPHQL API

## **1.0 Apollo Server Setup**

TypeScript 및 GraphQL의 성능 활용
패키지 설치

```bash
$ npm i @nestjs/graphql graphql apollo-server-express
```

Nest는 GraphQL 애플리케이션을 구축하는 두 가지 방법, 즉 `code first` 및 `schema first`을 제공합니다.

`code first` 접근 방식에서는 데코레이터와 TypeScript 클래스를 사용하여 해당 GraphQL 스키마를 생성합니다.
이 접근 방식은 TypeScript로만 작업하고 언어 구문 간의 컨텍스트 전환을 피하려는 경우에 유용합니다.

`schema first` 접근 방식에서 진실의 소스는 GraphQL SDL(스키마 정의 언어) 파일입니다.
SDL은 서로 다른 플랫폼 간에 스키마 파일을 공유하는 언어에 구애받지 않는 방법입니다.

GraphQL 및 TypeScript 시작하기
패키지가 설치되면 GraphQLModule을 가져와 forRoot() 정적 메서드로 구성할 수 있습니다.
forRoot()를 통해 설정한 옵션은 ApolloServer 생성자에 전달됩니다.

https://docs.nestjs.com/graphql/quick-start#getting-started-with-graphql--typescript

+추가
Fastify를 사용하는 경우 apollo-server-express를 설치하는 대신 apollo-server-fastify를 설치해야 합니다.

<br>

## **1.1 Our First Resolver**

`Code first` (GraphQL스키마를 자동으로 생성)

code first 접근 방식에서는 데코레이터와 TypeScript 클래스를 사용하여 해당 GraphQL 스키마(schema.graphql파일)를 생성합니다.

code first 접근 방식을 사용하려면 먼저 옵션 객체에 autoSchemaFile 속성을 추가하세요.

autoSchemaFile 속성 값은 자동으로 생성된 스키마가 생성될 경로입니다.또는 메모리에서 즉석에서 스키마를 생성할 수 있습니다.
이를 활성화하려면 autoSchemaFile 속성을 true로 설정하십시오.

```ts
// 경로 지정시 해당 경로에 schema.graphql파일을 생성
autoSchemaFile: join(process.cwd(), 'src/schema.graphql');

// true로 지정시 자동으로 메모리에 생성 (파일은 생성되지 않음)
autoSchemaFile: true;
```

https://docs.nestjs.com/graphql/quick-start#code-first

`Schema first` (.graphql파일을 직접 생성 및 작성)

Schema first 접근 방식을 사용하려면 먼저 옵션 객체에 typePaths 속성을 추가합니다.

typePaths 속성은 GraphQLModule이 작성할 GraphQL SDL 스키마 정의 파일을 찾아야 하는 위치를 나타냅니다.
이러한 파일은 메모리에 결합됩니다.이를 통해 스키마를 여러 파일로 분할하고 해당 resolver 근처에서 찾을 수 있습니다.

https://docs.nestjs.com/graphql/quick-start#schema-first

`Code first resolver`

Code first방식에서 resolver 클래스는 resolver 함수를 정의하고 Query type을 생성합니다.
여러 해석기 클래스를 정의할 수 있습니다. Nest는 런타임에 이들을 결합합니다.

https://docs.nestjs.com/graphql/resolvers#code-first-resolver

<br>

## **1.2 ObjectType**

Object types (@ObjectTypes)

GraphQL 스키마의 대부분의 정의는 object types입니다.
정의하는 각 object type은 응용 프로그램 클라이언트가 상호 작용해야 하는 도메인 객체를 나타내야 합니다.
이 경우 code first 접근 방식을 사용하여 TypeScript 클래스를 사용하여 스키마를 정의하고 TypeScript 데코레이터를 사용하여 해당 클래스의 field에 주석을 추가합니다.

https://docs.nestjs.com/graphql/resolvers#object-types

GraphQL Playground (샌드박스용)

https://studio.apollographql.com/sandbox/explorer

GraphQL Playground IDE

https://github.com/graphql/graphql-playground#installation

type이나 returns를 쓸 때, 사용하지 않았다고 타입스크립트가 경고를 띄우는 걸 무시하고 싶다면
.eslintrc.js에 rules에 아래 룰을 추가해주시면 됩니다.

```ts
'@typescript-eslint/no-unused-vars': 'off'
```

<br>

## **1.3 Arguments**

Args decorator

@Args() 데코레이터를 사용하여 메서드 핸들러에서 사용할 요청에서 인수를 추출합니다. 이것은 REST 경로 매개변수 인수 추출과 매우 유사한 방식으로 작동합니다.

```ts
@Args('id') id: string
```

https://docs.nestjs.com/graphql/resolvers#args-decorator-options

<br>

## **1.4 InputTypes and ArgumentType**

Input Type (@InputType)

Mutation이 객체를 argument로 취해야 하는 경우 Input type을 만들 수 있습니다.
Input type은 argument로 전달할 수 있는 특수한 유형의 객체이다.

```ts
@InputType()
export class UpvotePostInput {
  @Field()
  postId: number;
}
```

https://docs.nestjs.com/graphql/mutations#code-first

Input Type과 ArgsType의 차이점

@InputType사용

```ts
@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput
```

@ArgsType사용

```ts
@Args() createRestaurantInput: CreateRestaurantInput
```

<br>

## **1.5 Validating ArgsTypes**

class-validator, class-transformer 설치

```bash
$ npm i class-validator
$ npm i class-transformer
```

<br>

# 2 DATABASE CONFIGURATION

## **2.0 TypeORM and PostgreSQL**

TypeORM
https://typeorm.io/#/

Postgresapp
https://postgresapp.com/

Postico
https://eggerapps.at/postico

PostgreSQL Download
https://www.postgresql.org/download/

<br>

## **2.1 MacOS Setup**

데이터베이스의 모든 유저 확인 (권한 확인)
\du

데이터베이스의 유저 비밀번호 변경
ALTER USER 유저명 WITH PASSWORD ‘비밀번호’

<br>

## **2.3 TypeORM Setup**

TypeORM
TypeORM은 NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo 및 Electron 플랫폼에서 실행할 수 있는 ORM이며 TypeScript 및 JavaScript(ES5, ES6, ES7, ES8)와 함께 사용할 수 있습니다.
https://github.com/typeorm/typeorm

Database
Nest는 데이터베이스에 구애받지 않으므로 모든 SQL 또는 NoSQL 데이터베이스와 쉽게 통합할 수 있습니다.
https://docs.nestjs.com/techniques/database

TypeORM Integration
SQL 및 NoSQL 데이터베이스와의 통합을 위해 Nest는 @nestjs/typeorm 패키지를 제공합니다.
Nest는 TypeScript에서 사용할 수 있는 가장 성숙한 ORM(Object Relational Mapper)이기 때문에 TypeORM을 사용합니다.
TypeScript로 작성되었기 때문에 Nest 프레임워크와 잘 통합됩니다.

설치
npm install --save @nestjs/typeorm typeorm pg

Warning
synchronize: true은 production에서 사용하면 안됩니다.
그렇지 않으면 production데이터가 손실될 수 있습니다.

Sequelize
https://github.com/sequelize/sequelize

<br>

## **2.4 Introducing ConfigService**

Configuration
응용 프로그램은 종종 다른 환경에서 실행됩니다. 환경에 따라 다른 구성 설정을 사용해야 합니다.
Nest에서 이 기술을 사용하는 좋은 방법은 적절한 .env 파일을 로드하는 ConfigService를 노출하는 ConfigModule을 만드는 것입니다.
npm i @nestjs/config --save

```json
"start:dev": "cross-env NODE_ENV=dev nest start --watch",
```

https://docs.nestjs.com/techniques/configuration

cross-env
NODE_ENV=production으로 환경 변수를 설정하면 대부분의 Windows 명령 프롬프트가 질식합니다.
cross-env를 사용하면 플랫폼에 맞게 환경 변수를 설정하거나 사용하는 것에 대해 걱정하지 않고 단일 명령을 사용할 수 있습니다.
POSIX 시스템에서 실행되는 것처럼 설정하기만 하면 cross-env가 적절하게 설정합니다.
npm i cross-env
https://www.npmjs.com/package/cross-env

- 주의! npm 레지스트리의 `crossenv` 멀웨어
  npm i crossenv (설치 X)

<br>

## **2.5 Configuring ConfigService**

.env.dev

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

ConfigModule.forRoot({})

```ts
host: process.env.DB_HOST,
port: +process.env.DB_PORT,
username: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
```

<br>

## **2.6 Validating ConfigService**

Joi

JavaScript용 가장 강력한 스키마 설명 언어 및 데이터 유효성 검사기.
npm i joi
https://joi.dev/api/?v=17.4.2
https://www.npmjs.com/package/joi

Schema validation

Joi 내장 유효성 검사기.Joi를 사용하여 개체 스키마를 정의하고 이에 대해 JavaScript 개체의 유효성을 검사합니다.
https://docs.nestjs.com/techniques/configuration#schema-validation

validationOptions

allowUnknown: 환경 변수에 알 수 없는 키를 허용할지 여부를 제어합니다.기본값은 true입니다.
abortEarly: true인 경우 첫 번째 오류에서 유효성 검사를 중지합니다. 거짓이면 모든 오류를 반환합니다. 기본값은 false입니다.

<br>

# 3 TYPEORM AND NEST

## **3.0 Our First Entity**

TypeORM Entity

Entity는 데이터베이스 테이블(또는 MongoDB를 사용할 때 컬렉션)에 매핑되는 클래스입니다. 새 클래스를 정의하고 @Entity()로 표시하여 엔터티를 만들 수 있습니다. 기본 엔터티는 열과 관계로 구성됩니다. 각 엔터티에는 기본 열(또는 MongoDB를 사용하는 경우 ObjectId 열)이 있어야 합니다(MUST).

https://typeorm.io/#/entities

<br>

## **3.1 Data Mapper vs Active Record**

Active Record

Active Record 패턴은 모델 내에서 데이터베이스에 액세스하는 접근 방식입니다.

```ts
// example how to save AR entity
const user = new User();
user.firstName = 'Timber';
user.isActive = true;
await user.save();
const users = await User.find({ skip: 2, take: 5 });
```

Data Mapper

Data Mapper는 모델 대신 리포지토리 내의 데이터베이스에 액세스하는 접근 방식입니다. 데이터 매퍼 접근 방식을 사용하여 "리포지토리"라는 별도의 클래스에서 모든 쿼리 메서드를 정의하고 리포지토리를 사용하여 객체를 저장, 제거 및 로드합니다.
데이터 매퍼에서 엔터티는 매우 멍청합니다.객체는 속성을 정의하고 일부 "더미" 메서드가 있을 수 있습니다.

```ts
const userRepository = connection.getRepository(User);

// example how to save DM entity
const user = new User();
user.firstName = 'Timber';
user.isActive = true;
await userRepository.save(user);
const users = await userRepository.find({ skip: 2, take: 5 });
```

https://typeorm.io/#/active-record-data-mapper

<br>

## **3.2 Injecting The Repository**

Repository Pattern

TypeORM은 repository design pattern,을 지원하므로 각 엔터티에는 자체 저장소가 있습니다.
이러한 리포지토리는 데이터베이스 연결에서 얻을 수 있습니다.
forFeature() 메서드를 사용하여 현재 범위(현재 모듈)에 등록될 저장소를 정의합니다. @InjectRepository() 데코레이터를 사용하여 UsersRepository를 UsersService에 주입할 수 있습니다.
https://docs.nestjs.com/techniques/database#repository-pattern

NestJS Repository

https://docs.nestjs.com/recipes/sql-typeorm
https://docs.nestjs.com/recipes/mikroorm#repositories

<br>

# 4 USER CRUD

<br>

# 5 USER AUTHENTICATION

<br>

# 6 EMAIL VERIFICATION

## **6.1 Creating Verifications**

uuid

```b
$ npm i uuid
```

```ts
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

https://www.npmjs.com/package/uuid

uuid 앞에 4개 문자만 추출해서 저장하기

```ts
uuidv4().substring(0, 4).toUpperCase(); // CF26
```

Verification엔티티를 생성하고 난 후 user에 위에서 생성한 User 엔티티를 넣을 때 주의할 점은 await this.userRepository.save(createdUser)를 통해 모델을 DB에 완전히 저장한 후 넣어줘야 한다. 그렇지 않으면 user에 User데이터가 제대로 들어가지 않고, null값이 들어가게 된다.

```ts
await this.verificationRepository.create({ code: '', user: createdUser });
```

자바스크립트로 랜덤 문자열 추출하기

```js
Math.random().toString(36).substring(2);
```

<br>

## **6.2 Verifying User part One**

Prisma에서처럼 TypeORM에서도 관계를 가지고 있는 필드는 TypeORM에 따로 지정하지 않으면 자동으로 해당 필드를 보여주지 않는다.

loadRelationIds: true
true로 설정시 relation id값을 가져온다. (userId: 10)
엔터티의 모든 관계 ID를 로드하고 관계 개체가 아닌 관계 값에 매핑합니다.

relations
loadRelationIds를 통해 relation id만 가져올 수도 있고, relations를 통해 해당 필드의 전체 데이터를 가져올 수도 있다.

```ts
await this.verificationRepository.findOne({ code }, { relations: ['user'] });
await userRepository.find({ relations: ['profile'] });
```

<br>

## **6.3 Verifying User part Two**

비밀번호를 해시하지 않고 emailVerified를 false에서 true로 업데이트 하는 또 다른 방법입니다.
앞서 update()를 실행하게 되면 @BeforeUpdate()데코레이터가 실행되지 않는 것을 이용해서 아래와 같이 간단하게 update()메서드를 이용해서 verified를 true로 바꿔줄 수도 있습니다.
(password컬럼에 select:false를 지정해주지 않아도 됩니다.)
ex) await this.userRepository.update(foundVerification.user.id, { emailVerified: true });

@Column({ select: false })
QueryBuilder나 find 실행자(find메서드들)를 통해 해당 엔티티를 가져올 때 해당 column을 항상 선택되어질지 여부를 나타냅니다. 기본값은 "true"입니다.
false로 지정하게 되면 해당 column을 DB로부터 찾아오지 않는다.
https://typeorm.delightful.studio/interfaces/_decorator_options_columnoptions_.columnoptions.html

<br>

## **6.5 Mailgun Setup**

Mailgun

개발자를 위한 트랜잭션 이메일 API 서비스

https://www.mailgun.com

Receive SMS Online

온라인으로 즉시 SMS 수신

https://receive-smss.com/

<br>

## **6.6 Mail Module Setup**

NestJS Mailer

Nodemailer 라이브러리를 사용하는 Nest.js 프레임워크(node.js)용 메일러 모듈

https://nest-modules.github.io/mailer

https://github.com/nest-modules/mailer

Dynamic module use case

https://docs.nestjs.com/fundamentals/dynamic-modules#dynamic-module-use-case

MAILGUN_API_KEY

MAILGUN_DOMAIN_NAME

MAINGUN_FROM_EMAIL

<br>

## **6.7 Mailgun API**

cURL (Client URL)

URL로 데이터를 전송하기 위한 커맨드 라인 툴 및 라이브러리
curl은 데이터를 전송하기 위해 명령줄이나 스크립트에서 사용됩니다.

curl은 다양한 통신 프로토콜을 이용하여 데이터를 전송하기 위한 라이브러리와 명령 줄 도구를 제공하는 컴퓨터 소프트웨어 프로젝트이다.

GOT

Node.js를 위한 인간 친화적이고 강력한 HTTP request 라이브러리

- got 12버전 이상 사용시, 모듈을 import해올 때 오류가 발생하시는 분들은 12버전보다 아래인 11.8.3버전으로 설치해보세요
  npm i got@11.8.3
  https://www.npmjs.com/package/got

Form-Data
읽을 수 있는 "multipart/form-data" 스트림을 생성하는 라이브러리입니다. 다른 웹 애플리케이션에 form을 submit하고, 파일을 업로드하는 데 사용할 수 있습니다.
npm i form-data

이 예제에서는 문자열, 버퍼 및 파일 스트림을 포함하는 3개의 field가 있는 form을 구성합니다.

```ts
var FormData = require('form-data');
var fs = require('fs');

var form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));
```

https://www.npmjs.com/package/form-data

Mailgun Doc

https://documentation.mailgun.com/en/latest/quickstart-sending.html#how-to-start-sending-email

Buffer란?
Node.js 에서 제공하는 Binary의 데이터를 담을 수 있는 객체

Binary 데이터란?
01001010과 같은 이진수 시스템으로 표현되는 데이터

<br>

Node.js방식으로 Mailgun으로 메일 보내기

cURL와 got을 사용하지 않고, Node.js방식으로도 아래와 같이 메일을 보낼 수 있습니다.
mailgun.js을 require('mailgun.js')가 아닌 import로 가져오려면
tsconfig.json에 compilerOptions에 esModuleInterop를 true로 설정해주시면 됩니다.

```ts
import formData from 'form-data';
import Mailgun from 'mailgun.js';

sendEmail(){
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'Nuber', key: this.mailOptions.mailgunApiKey });

const messageData = {
from: 'Nuber @mailgun-test.com>',
to: 'nubereats@gmail.com',
subject: 'Hello',
template: 'nuber-eats',
'v:username': 'test',
'v:code': 'abcd123',
};

const response = await client.messages.create(this.mailOptions.mailgunDomainName, messageData);
console.log('response', response);
}
```

https://documentation.mailgun.com/en/latest/quickstart-sending.html#how-to-start-sending-email
https://www.npmjs.com/package/mailgun.js

<br>

Handlebars
핸들바는 간단한 템플릿 언어입니다. 템플릿과 input객체를 사용하여 HTML 또는 기타 텍스트 형식을 생성합니다.

핸들바 템플릿은 핸들바 표현식이 포함된 일반 텍스트처럼 보입니다.

// 핸들바에서 자바스크립트 변수를 가져오기: {{ 코드 }}
ex) < p >{{firstname}} {{lastname}}< / p >

https://handlebarsjs.com/guide/

sending 옵션 (parameters)

컴포넌트로부터 여러 옵션을 조합해서 메세지를 보낼 수 있습니다.
대부분의 매개변수를 여러 번 지정할 수 있으며 HTTP는 기본적으로 이를 지원합니다.

template (Mailgun template을 통해 생성한 템플릿 이름)

템플릿 API를 통해 저장된 템플릿 이름
ex) formData.append('template', 'nuber-eats');

v:my-var (사용할 변수 이름)

v: prefix를 통해 커스텀 JSON 데이터를 메세지에 이름을 붙여 보낼 수 있다.
ex) formData.append('v:code', 'abcd1234')
https://documentation.mailgun.com/en/latest/api-sending.html#sending

templates
https://documentation.mailgun.com/en/latest/user_manual.html#templates

<br>

# 7 UNIT TESTING THE USER SERVICE

## **7.0 Setting Up Tests**

test.todo(name) = it.todo(name)

테스트 작성을 계획할 때 test.todo를 사용하십시오. 이 테스트는 마지막에 요약 출력에 강조 표시되어 아직 수행해야 하는 테스트의 수를 알 수 있습니다. 테스트 콜백 함수를 제공하면 test.todo에서 오류가 발생합니다. 이미 테스트를 구현했는데 테스트가 중단되어 실행하지 않으려면 대신 test.skip을 사용하십시오.

```
const add = (a, b) => a + b;

test.todo('add should be associative');
```

https://jestjs.io/docs/api#testtodoname

beforeAll(fn, timeout)
모든 테스트가 실행되기 전에 딱 한 번 함수를 실행합니다.

https://jestjs.io/docs/api#beforeallfn-timeout

<br>

## **7.1 Mocking**

moduleNameMapper

moduleNameMapper를 사용하여 모듈 경로를 다른 모듈에 매핑할 수 있습니다.
기본적으로 사전 설정은 모든 이미지를 이미지 스텁 모듈에 매핑하지만 모듈을 찾을 수 없는 경우 이 구성 옵션이 도움이 될 수 있습니다.

```ts
{
  "moduleNameMapper": {
    "my-module.js": "/path/to/my-module.js"
  }
}
```

https://jestjs.io/docs/tutorial-react-native#modulenamemapper
https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring

Testing: getRepositoryToken()

단위 테스트 응용 프로그램에 관해서, 우리는 일반적으로 데이터베이스 연결을 피하고 테스트 스위트를 독립적으로 유지하고 실행 프로세스를 최대한 빠르게 유지하기를 원합니다.
그러나 우리 클래스는 연결 인스턴스에서 가져온 리포지토리에 의존할 수 있습니다.
해결책은 mock 리포지토리를 만드는 것입니다.이를 달성하기 위해 custom providers를 설정합니다.
등록된 각 리포지토리는 자동으로 < EntityName > 리포지토리 토큰으로 표시됩니다.여기서 EntityName은 엔터티 클래스의 이름입니다.
이제 대체 mockRepository가 UsersRepository로 사용됩니다. 클래스가 @InjectRepository() 데코레이터를 사용하여 UsersRepository를 요청할 때마다 Nest는 등록된 mockRepository 객체를 사용합니다.
https://docs.nestjs.com/techniques/database#testing

jest.fn(implementation)

새로운 mock 함수를 생성합니다.
선택적으로 mock implementation을 취합니다.

```ts
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();
```

https://jestjs.io/docs/jest-object#jestfnimplementation

<br>

## **7.2 Mocking part Two**

Record

속성 키가 Key이고 속성 값이 Type인 객체 유형을 구성합니다.
이 유틸리티는 유형의 속성을 다른 유형에 매핑하는 데 사용할 수 있습니다.

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};

cats.boris;
```

https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type

Keyof Type Operator

keyof 연산자는 객체 type을 사용하여 해당 키의 문자열 또는 숫자 리터럴 통합을 생성합니다.

```ts
type Point = { x: number; y: number };
const hello: keyof Point; // hello에는 x, y만 할당 가능
```

https://www.typescriptlang.org/docs/handbook/2/keyof-types.html

<br>

## **7.3 Writing Our First Test**

mockFn.mockResolvedValue(value)

비동기(async) 테스트를 할 때, 비동기(async) 함수를 mock하는 데 유용합니다.

```ts
test('async test', async () => {
  const asyncMock = jest.fn().mockResolvedValue(43);

  await asyncMock(); // 43
});
```

https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue

<br>

## **7.5 createAccount Test part One**

coveragePathIgnorePatterns [array< string >]

Default: ["/node_modules/"]

테스트를 실행하기 전에 모든 파일 경로와 일치하는 정규 표현식 패턴 문자열의 배열입니다.
파일 경로가 패턴 중 하나와 일치하면 해당 파일을 스킵합니다.

https://jestjs.io/docs/configuration#coveragepathignorepatterns-arraystring

collectCoverageFrom [array]

Default: undefined

패턴이 일치하는 파일을 Coverage에 올립니다.
적용 범위 정보를 수집해야 하는 파일 집합을 나타내는 glob 패턴의 배열입니다. 파일이 지정된 glob 패턴과 일치하는 경우 이 파일에 대한 테스트가 없고 테스트 제품군에 필요하지 않은 경우에도 해당 파일에 대한 적용 범위 정보가 수집됩니다.

- service.ts파일만 테스트 하고 싶으신 분들은 collectCoverageFrom를 아래와 같이 지정하시면 됩니다.

```json
"collectCoverageFrom": [
"**/*.service.(t|j)s"
]
```

https://jestjs.io/docs/configuration#collectcoveragefrom-array

.toMatchObject(object)

.toMatchObject를 사용하여 JavaScript 개체가 개체 속성의 하위 집합과 일치하는지 확인합니다.

<br>

## **7.6 createAccount Test part Two**

expect.any(constructor)

expect.any(constructor)는 주어진 생성자로 생성된 모든 것과 일치하거나 전달된 유형의 프리미티브인 경우 일치합니다. 리터럴 값 대신 toEqual 또는 toBeCalledWith 내부에서 사용할 수 있습니다.
예를 들어, mock 함수가 숫자로 호출되었는지 확인하려면

```ts
expect(mock).toBeCalledWith(expect.any(Number));

expect(mock).toBeCalledWith(expect.any(Cat));
```

https://jestjs.io/docs/expect#expectanyconstructor

<br>

## **7.7 login Test part One**

mockFn.mockRejectedValue(value)

항상 거부하는 비동기 mock 함수를 만드는 데 유용합니다.

```ts
test('async test', async () => {
  const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));

  await asyncMock(); // throws "Async error"
});
```

https://jestjs.io/docs/mock-function-api#mockfnmockrejectedvaluevalue

<br>

# 8 UNIT TESTING JWT AND MAIL

## **8.1 JWT Sign Test**

jest.mock(moduleName, factory, options)

필요할 때 auto-mocked 버전으로 모듈을 mock합니다. 두 번째 인수는 factory에는 Jest의 automocking 기능을 사용하는 대신 실행 중인 명시적 모듈 팩토리를 지정하는 데 사용할 수 있습니다.

```ts
import moduleName, { foo } from '../moduleName';

jest.mock('../moduleName', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 42),
    foo: jest.fn(() => 43),
  };
});

moduleName(); // Will return 42
foo(); // Will return 43
```

jest.mock으로 mock되는 모듈은 jest.mock을 호출하는 파일에 대해서만 mock됩니다. 모듈을 가져오는 다른 파일은 모듈을 mock하는 테스트 파일 이후에 실행되더라도 원래 implementation을 가져옵니다.

https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options

<br>

## **8.3 sendVerificationEmail Test**

jest.spyOn(object, methodName)

jest.fn과 유사한 mock 함수를 생성하지만, object[methodName](메서드)에 대한 호출도 추적합니다. Jest mock 함수를 반환합니다. 기본적으로 jest.spyOn은 spied 메서드도 호출합니다. 이것은 대부분의 다른 테스트 라이브러리와 다른 동작입니다.
원래 함수를 덮어쓰려면 아래와 같이 덮어쓸수 있습니다.

```ts
jest.spyOn(object, methodName).mockImplementation(() => customImplementation);
```

또는

```ts
object[methodName] = jest.fn(() => customImplementation);
```

https://jestjs.io/docs/jest-object#jestspyonobject-methodname

mockFn.mockImplementation(fn)
mock Implementation으로 사용해야 하는 함수를 허용합니다.
const mockFn = jest.fn().mockImplementation(scalar => 42 + scalar);

https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn

<br>

# 9 USER MODULE E2E

## **9.0 Setup part One**

moduleNameMapper [object< string, string | array< string>>]

```ts
{
  "moduleNameMapper": {
  "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
  "^[./a-zA-Z0-9$_-]+\\.png$": "/RelativeImageStub.js",
  "module_name_(.*)": "/substituted_module_$1.js",
  "assets/(.*)": [
    "/images/$1",
    "/photos/$1",
    "/recipes/$1"
  ]
}
}
```

https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring

istanbul
이스탄불은 라인 카운터를 사용하여 ES5 및 ES2015+ JavaScript 코드를 계측하므로 단위 테스트가 코드베이스를 얼마나 잘 활용하는지 추적할 수 있습니다.
https://istanbul.js.org

<br>

## **9.1 Setup part Two**

End-to-end testing

Jest did not exit one second after the test run has completed.와 같은 에러가 뜬다면 app.close()를 통해 테스트가 끝나고 난 후, app을 종료시켜주기

```ts
afterAll(async () => {
  await app.close();
});
```

https://docs.nestjs.com/fundamentals/testing#end-to-end-testing

getConnection()

connection 관리자에서 connection을 가져옵니다. connection 이름이 지정되지 않은 경우 "default" connection이 검색됩니다.

https://orkhan.gitbook.io/typeorm/docs/connection-api#connection-api

Connection이란?

Connection은 특정 데이터베이스에 대한 단일 데이터베이스 ORM 연결

dropDatabase()

데이터베이스와 모든 데이터를 삭제합니다. 이 방법을 사용하면 모든 데이터베이스 테이블과 해당 데이터가 지워지므로 프로덕션 환경에서는 이 방법에 주의하십시오. 데이터베이스 연결이 완료된 후에만 사용할 수 있습니다.

ex) await connection.dropDatabase();

<br>

## **9.2 Testing createAccount part One**

SuperTest

https://www.npmjs.com/package/supertest

Testing GraphQL (Mutation 테스트하기)

https://www.katk.dev/testing-graphql

```ts
const createAccountInput = {
  input: {
    email: EMAIL,
    password: PASSWORD,
    role: ROLE,
  },
};

return request(app.getHttpServer())
  .post(GRAPHQL_ENDPOINT)
  .send({
    query: `
      mutation ($input: CreateAccountInput!) {
        createAccount(input: $input) {
          ok
          message
        }
      }
    `,
    variables: createAccountInput,
  });
```

Type 'typeof supertest' has no call signatures.와 같이 에러가 뜨시는 분은 import \* as request from 'supertest';대신 import request from 'supertest';로 가져오시면 됩니다.

<br>

## **9.7 Testing editProfile**

이메일이 이미 존재하는지 체크

```ts
const countedUser: number = await this.userRepository.count({ email });

if (countedUser !== 0) {
  return { ok: false, message: '이미 사용 중인 이메일입니다.' };
}
```

<br>

## **9.9 Conclusions**

ReferenceError: You are trying to `import` a file after the Jest environment has been torn down. From users.e2e-spec.ts.
테스트하면서 혹시 위와 같은 에러가 발생하시는 분들은 서비스 파일이나 테스트 파일에 async await를 빠뜨린 부분이 없는지 잘 체크해보세요.

this.userRepository.save(foundUser); (X)
await this.userRepository.save(foundUser); (O)

<br>

# 10 RESTAURANT CRUD

## **10.0 Restaurant Models**

Many-to-one / one-to-many relations

다대일/일대다 관계는 A가 B의 여러 인스턴스를 포함하지만 B는 A의 인스턴스를 하나만 포함하는 관계입니다. User 및 Photo 엔터티를 예로 들어 보겠습니다. 사용자는 여러 장의 사진을 가질 수 있지만 각 사진은 한 명의 사용자만 소유합니다.

@OneToMany(): 일대다 관계에서 '다'에 속할 때 사용
(DB에 해당 컬럼은 저장되지 않음)
@ManyToOne(): 일대다 관계에서 '일'에 속할 때 사용
(DB에 user면 userId로 id값만 저장됨)

```ts
@Entity()
export class Photo {
  @ManyToOne(() => User, user => user.photos)
  user: User;
}

@Entity()
export class User {
  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];
}
```

https://typeorm.io/#/many-to-one-one-to-many-relations

<br>

## **10.1 Relationships and InputTypes**

nullable?: boolean;

relation column 값이 null을 허용할 수 있는지 여부를 나타냅니다.

Relation options

onDelete: "RESTRICT"|"CASCADE"|"SET NULL"
참조된 객체가 삭제될 때, 외래 키(foreign key)가 어떻게 작동해야 하는지 지정한다.

https://orkhan.gitbook.io/typeorm/docs/relations#relation-options

<br>

## **10.3 createRestaurant part Two**

정규표현식 테스트

/ /g: 모든 스페이스 제거
https://www.regexpal.com/

```ts
String.prototype.replaceAll();
```

정규표현식을 사용해도 되고 replaceAll()을 사용해도 됩니다.

```ts
'hi how are you'.replaceAll(' ', '-'); // 'hi-how-are-you'
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll

<br>

## **10.4 Roles part One**

Setting roles per handler(핸들러별 역할 설정): @SetMetadata()

예를 들어 CatsController는 다른 route에 대해 다른 권한 체계를 가질 수 있습니다. 일부는 관리자만 사용할 수 있고 다른 일부는 모든 사람에게 공개될 수 있습니다. 유연하고 재사용 가능한 방식으로 role을 route에 사용하려면 어떻게 해야 합니까?
여기서 custom metadata가 작동합니다. Nest는 @SetMetadata() 데코레이터를 통해 라우트 핸들러에 커스텀 메타데이터를 붙이는 기능을 제공합니다.
ex) @SetMetadata('role', Role.Owner)
key - 메타데이터가 저장되는 키를 정의하는 값
value - 키와 연결될 메타데이터

route에서 직접 @SetMetadata()를 사용하는 것은 좋은 습관이 아닙니다. 대신 아래와 같이 자신만의 데코레이터를 만듭니다.

```ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

https://docs.nestjs.com/guards#setting-roles-per-handler

<br>

## **10.5 Roles part Two**

Global 가드는 모든 컨트롤러와 모든 route handler에 대해 전체 애플리케이션에서 사용됩니다.
dependency injection 관점에서, 모듈 외부에서 등록된 전역 가드(위의 예에서와 같이 useGlobalGuards() 사용)는 dependency injection을 할 수 없습니다. 이는 이것이 모든 모듈의 context 외부에서 수행되기 때문입니다. 이 문제를 해결하기 위해 다음 구성을 사용하여 모든 모듈에서 직접 가드를 설정할 수 있습니다.

app.module.ts

```ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```

https://docs.nestjs.com/guards#binding-guards

Metadata가 설정되어있지 않으면 public(누구나 접근 가능)
Metadata가 설정되어있으면 private(특정 role만 접근 가능하도록 제한)

Putting it all together

이제 뒤로 돌아가서 이것을 RolesGuard와 연결해 보겠습니다. 현재 사용자에게 할당된 role을 처리 중인 현재 route에 필요한 실제 role과 비교하여 반환 값을 조건부로 만들고 싶습니다.

https://docs.nestjs.com/guards#putting-it-all-together

<br>

# 11 DISH AND ORDER CRUD

<br>

# 12 ORDER SUBSCRIPTIONS

<br>

# 13 PAYMENTS

<br>

# 14 FRONTEND SETUP

<br>

# 15 AUTHENTICATION

<br>

# 16 USER PAGES

<br>

# 17 RESTAURANTS

<br>

# 18 TESTING REACT COMPONENTS

<br>

# 19 E2E REACT TESTING

<br>

# 20 OWNER DASHBOARD

<br>

# 21 PAYMENTS

<br>

# 22 MAKING AN ORDER

<br>

# 23 REALTIME ORDER

<br>

# 24 DEPLOY TO PRODUCTION
