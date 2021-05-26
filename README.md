1. 하이라이트 저장(Create)

•유저 ID, pageUrl, colorHex, text 값을 필수로 받습니다

•받은 정보를 기반으로 하이라이트 정보를 저장합니다.

•페이지 URL을 기반으로 페이지 정보를 DB에 저장한 뒤 응답에 page의 ID 값을 넘깁니다.

•출력에 저장된 하이라이트 ID를 반환합니다.


2. 하이라이트 수정(Update)

•하이라이트 ID와 유저 ID를 필수로 받습니다

•text 혹은 colorHex 둘 중에 하나는 값이 유효해야 합니다.

•둘 다 받는 것도 고려합니다.

•둘 중에 하나만 있는 경우도 고려합니다.

•입력 받은 정보를 바탕으로 하이라이트를 저장합니다.



3. 페이지 내 하이라이트 정보 가져오기(Read)

•유저 ID 값을 필수로 받습니다

•pageID 혹은 pageUrl 둘 중에 하나는 유효한 값을 갖습니다.

•두 값 중 하나만 있는 경우도 고려합니다.

•두 값 모두 들어오는 경우 pageId를 우선하여 사용합니다.

•하이라이트의 정렬은 수정된 시간의 역순입니다.

•수정된 시간이 없는 경우 생성 시간을 대신 사용합니다.



4. 유저가 하이라이트한 정보와 페이지 가져오기(Read)

•유저 ID를 필수로 받습니다

•페이지의 정렬은 마지막 하이라이트가 마지막으로 저장된 시간의 역순으로 합니다.

•하이라이트 정렬은 3번과 같습니다.



5. 하이라이트 삭제(Delete)

•하이라이트 ID, 유저 ID를 필수로 받습니다

•삭제된 하이라이트는 모든 조회 관련 API에서 제외되어 반환됩니다.



6. 유저의 하이라이트 테마 변경(Update)

•유저 ID를 필수로 받습니다

•테마 1, 2, 3 중에 하나로 테마를 변경합니다.

•테마가 변경된 이후에는 하이라이트 정보 요청의 응답이 모두 변경된 테마의 색으로 바뀌어야 합니다.



==============================================================================
DB
==

- 테마별 색을 적용하기 위해 각 테마 별로 색 열을 생성한 뒤, INSERT 해 준다.
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
