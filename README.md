DB
==

- 테마별 색을 적용하기 위해 각 테마 별로 색 열을 생성한 뒤, INSERT 해 줌.
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