DB
==

- 테마별 색을 적용하기 위해 각 테마 별로 색 열을 생성한 뒤, INSERT 해 줌.
* theme table name: theme
    * CREATE TABLE theme (  
        _id INT PRIMARY KEY AUTO_INCREMENT,  
        color1 VARCHAR(7) NOT NULL,  
        color2 VARCHAR(7) NOT NULL,  
        color3 VARCHAR(7) NOT NULL  
    )
    * INSERT INTO theme ( color1, color2, color3 )
    * VALUES ( '#ffff8d', '#a5f2e9', '#ffd5c8' )
    * INSERT INTO theme ( color1, color2, color3 )
    * VALUES ( '#f6f0aa', '#d3edd1', '#f9d6c1' )
    * INSERT INTO theme ( color1, color2, color3 )
    * VALUES ( '#f4ff40', '#8affd7', '#ffc477' )
* highlight table name: highlight
    * CREATE TABLE highlight (  
        highlightId INT PRIMARY KEY AUTO_INCREMENT,  
        userId VARCHAR(16) NOT NULL,  
        pageURL VARCHAR(80) NOT NULL,  
        colorHex VARCHAR(7) NOT NULL,  
        text VARCHAR(100),  
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP  
    )