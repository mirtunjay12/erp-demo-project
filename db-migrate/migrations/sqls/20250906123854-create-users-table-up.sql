-- Create a users table
CREATE TABLE users (
    id BIGINT  AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    role_id BIGINT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_delete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT NULL,

    
    CONSTRAINT fk_user_company 
        FOREIGN KEY (company_id) 
        REFERENCES companies(company_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,

   
    CONSTRAINT fk_user_role 
        FOREIGN KEY (role_id) 
        REFERENCES roles(role_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE

    CONSTRAINT fk_user_created_by 
        FOREIGN KEY (created_by) 
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);
