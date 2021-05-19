DB
==

- 테마별 색을 적용하기 위해 각 테마 별로 색 열을 생성한 뒤, INSERT 해 .
- theme & highlight => 1:N
- User & highlight => 1:N
- User & Page => N:M
- Page & highlight => 1:N


* DESC themes

| Field   | Type       | Null | Key | Default | Extra          |
|---------|------------|------|-----|---------|----------------|
| themeId | int        | NO   | PRI | NULL    | auto_increment |
| color1  | varchar(7) | NO   |     | NULL    |                |
| color2  | varchar(7) | NO   |     | NULL    |                |
| color3  | varchar(7) | NO   |     | NULL    |                |


    * INSERT INTO themes ( color1, color2, color3 )
    * VALUES ( '#ffff8d', '#a5f2e9', '#ffd5c8' )
    * INSERT INTO themes ( color1, color2, color3 )
    * VALUES ( '#f6f0aa', '#d3edd1', '#f9d6c1' )
    * INSERT INTO themes ( color1, color2, color3 )
    * VALUES ( '#f4ff40', '#8affd7', '#ffc477' )


* DESC UserPage

| Field      | Type     | Null | Key | Default | Extra |
|------------|----------|------|-----|---------|-------|
| createdAt  | datetime | NO   |     | NULL    |       |
| updatedAt  | datetime | NO   |     | NULL    |       |
| UserUserId | int      | NO   | PRI | NULL    |       |
| PagePageId | int      | NO   | PRI | NULL    |       |


* DESC users

| Field      | Type        | Null | Key | Default | Extra          |
|------------|-------------|------|-----|---------|----------------|
| userId     | int         | NO   | PRI | NULL    | auto_increment |
| userName   | varchar(20) | NO   |     | NULL    |                |
| created_at | datetime    | YES  |     | NULL    |                |
| updated_at | datetime    | YES  |     | NULL    |                |


* DESC pages  

| Field      | Type         | Null | Key | Default | Extra          |
|------------|--------------|------|-----|---------|----------------|
| pageId     | int          | NO   | PRI | NULL    | auto_increment |
| pageUrl    | varchar(100) | NO   |     | NULL    |                |
| created_at | datetime     | YES  |     | NULL    |                |
| updated_at | datetime     | YES  |     | NULL    |                |


* DESC highlights

| Field       | Type         | Null | Key | Default | Extra          |
|-------------|--------------|------|-----|---------|----------------|
| highlightId | int          | NO   | PRI | NULL    | auto_increment |
| text        | varchar(100) | YES  |     | NULL    |                |
| created_at  | datetime     | YES  |     | NULL    |                |
| updated_at  | datetime     | YES  |     | NULL    |                |
| themeId     | int          | YES  | MUL | NULL    |                |
| userId      | int          | YES  | MUL | NULL    |                |
| pageId      | int          | YES  | MUL | NULL    |                |

* 주된 API 기능은 /controller/index.js 에 구현하였습니다.
* DB 구조는 /model 에 구현하였습니다.
* test용 db는 mysql을 사용하였습니다.
* POST test는 curl을 사용하였습니다.
* auruemPlanet repository는 제일 처음에 아무것도 모르고 만들어 놨었습니다. 하나의 DB에 모든 정보를 다 넣을 수 있을 것이라 판단하고 DB를 설계(?)하였는데 과제를 이해할 수록 그렇지 않다는 것을 알게 되었고, DB 설계를 다시 하여 express와 sequelize를 사용하려고 다시 마음먹었고, aurumPlanet에 대해 이것 저것 알아보다 스펠링이 잘못된 것을 알고 새로 repository를 만들어 구현하였습니다.
* 처음에 과제를 보고 제가 할 수 있는 것일까 하는 의문에 긴장이 너무 많이 되고 걱정을 했습니다.
* 살면서 이렇게 긴장해본 적이 몇 번이나 있었는지 밤에 잠도 잘 못잘 정도였습니다.
* 그렇게 걱정하였지만 과제를 마무리한 지금 와서 보니 제가 할 수 있는 만큼의 과제를 주신 것처럼 느껴졌고 지원자를 잘 파악하고 있다는 느낌이 들었습니다.
* 꼭 입사하여 더욱 많은 것을 배우고, 공헌하고 싶다는 마음이 과제하는 중에 점점 커졌습니다.
* API에 대해서 이번 과제만큼 많은 것을 알게 해준 경험은 없었습니다. 
* 제가 만약 선택받지 못 하더라도 이번 과제는 서버 개발자로 전직을 하려는 저에게 큰 자신감과 포트폴리오를 제공해줬다고 생각합니다.
* 정말 좋은 경험이었습니다.
* 이런 경험을 하게 해 주신 아우름플래닛 임직원 여러분께 감사하다는 말씀을 전합니다.
* 감사합니다.
* -
