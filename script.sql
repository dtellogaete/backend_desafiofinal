/*==============================================================*/
/* DBMS name:      marketplace                                  */
/*==============================================================*/

CREATE DATABASE marketplace;

DROP TABLE IF EXISTS ticket_details;

DROP TABLE IF EXISTS tickets;

DROP TABLE IF EXISTS shipping_cost;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS contact;

/*==============================================================*/
/* Table: contact                                               */
/*==============================================================*/
CREATE TABLE contact (
   idcontact            SERIAL               NOT NULL,
   name                 VARCHAR(255)         NULL,
   email                VARCHAR(255)         NULL,
   telephone            VARCHAR(255)         NULL,
   subject              VARCHAR(255)         NULL,
   message              VARCHAR(1000)        NULL,
   CONSTRAINT PK_contact PRIMARY KEY (idcontact)
);

/*==============================================================*/
/* Table: products                                              */
/*==============================================================*/
CREATE TABLE products (
   id_products          SERIAL               NOT NULL,
   id_users             INT4                 NULL,
   name                 VARCHAR(255)         NULL,
   brand                VARCHAR(255)         NULL,
   description          VARCHAR(1000)        NULL,
   variant              VARCHAR(255)         NULL,
   price                FLOAT8               NULL,
   iva                  FLOAT8               NULL,
   codebar              VARCHAR(255)         NULL,
   sku                  VARCHAR(255)         NULL,
   CONSTRAINT PK_products PRIMARY KEY (id_products)
);

/*==============================================================*/
/* Table: shipping_cost                                         */
/*==============================================================*/
CREATE TABLE shipping_cost (
   id_shipping          VARCHAR(255)         NOT NULL,
   cost                 FLOAT8               NULL,
   region               VARCHAR(255)         NULL,
   CONSTRAINT PK_shipping_cost PRIMARY KEY (id_shipping)
);

/*==============================================================*/
/* Table: tickets                                               */
/*==============================================================*/
CREATE TABLE tickets (
   id_tickets           SERIAL               NOT NULL,
   id_shipping          VARCHAR(255)         NULL,
   subtotal             FLOAT8               NULL,
   total                FLOAT8               NULL,
   contact              VARCHAR(255)         NULL,
   telephone            VARCHAR(255)         NULL,
   rut                  VARCHAR(255)         NULL,
   city                 VARCHAR(255)         NULL,
   razon_social         VARCHAR(255)         NULL,
   pay_method           VARCHAR(255)         NULL,
   status               VARCHAR(255)         NULL,
   CONSTRAINT PK_tickets PRIMARY KEY (id_tickets)
);

/*==============================================================*/
/* Table: ticket_details                                        */
/*==============================================================*/
CREATE TABLE ticket_details (
   id_ticket_details    SERIAL               NOT NULL,
   id_tickets           INT4                 NULL,
   id_products          INT4                 NULL,
   CONSTRAINT PK_ticket_details PRIMARY KEY (id_ticket_details)
);

/*==============================================================*/
/* Table: users                                                 */
/*==============================================================*/
CREATE TABLE users (
   id_users             SERIAL               NOT NULL,
   id_tickets           INT4                 NULL,
   name                 VARCHAR(255)         NULL,
   lastname             VARCHAR(255)         NULL,
   email                VARCHAR(100)         NULL,
   rut                  VARCHAR(255)         NULL,
   address              VARCHAR(255)         NULL,
   city                 VARCHAR(255)         NULL,
   region               VARCHAR(255)         NULL,
   password             VARCHAR(255)         NULL,
   telephone            VARCHAR(255)         NULL,
   role                 VARCHAR(255)         NULL,
   store_name           VARCHAR(255)         NULL,
   store_razon          VARCHAR(255)         NULL,
   store_rut            VARCHAR(255)         NULL,
   store_address        VARCHAR(255)         NULL,
   store_region         VARCHAR(255)         NULL,
   store_city           VARCHAR(255)         NULL,
   CONSTRAINT PK_users PRIMARY KEY (id_users)
);

ALTER TABLE products
   ADD CONSTRAINT FK_products_vende_users FOREIGN KEY (id_users)
      REFERENCES users (id_users)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE tickets
   ADD CONSTRAINT FK_tickets_tiene__co_shipping FOREIGN KEY (id_shipping)
      REFERENCES shipping_cost (id_shipping)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE ticket_details
   ADD CONSTRAINT FK_ticket_d_tiene_det_products FOREIGN KEY (id_products)
      REFERENCES products (id_products)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE ticket_details
   ADD CONSTRAINT FK_ticket_d_tiene_det_tickets FOREIGN KEY (id_tickets)
      REFERENCES tickets (id_tickets)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE users
   ADD CONSTRAINT FK_users_compra_tickets FOREIGN KEY (id_tickets)
      REFERENCES tickets (id_tickets)
      ON DELETE RESTRICT ON UPDATE RESTRICT;


/* Crear usuarios con rol tienda */
INSERT INTO users (name, lastname, email, rut, address, city, region, password, telephone, role, store_name, store_razon, store_rut, store_address, store_region, store_city)
VALUES
   ('Juan', 'Gómez', 'juan@example.com', '12345678-9', 'Av. Providencia 123', 'Santiago', 'Metropolitana', 'contrasena1', '123456789', 'tienda', 'Tienda Hierbas La Naturaleza', 'La Naturaleza SpA', '12.345.678-9', 'Calle Las Flores 456', 'Valparaíso', 'Valparaíso'),
   ('María', 'Fernández', 'maria@example.com', '98765432-1', 'Av. Libertad 789', 'Concepción', 'Biobío', 'contrasena2', '987654321', 'tienda', 'Tienda de Hierbas El Bosque', 'El Bosque Ltda.', '98.765.432-1', 'Calle Los Pinos 789', 'La Araucanía', 'Temuco');

/* Crear usuarios con rol cliente */
INSERT INTO users (name, lastname, email, rut, address, city, region, password, telephone, role)
VALUES
   ('Pedro', 'González', 'pedro@example.com', '11111111-1', 'Av. 10 de Julio 456', 'Santiago', 'Metropolitana', 'contrasena3', '987654321', 'cliente'),
   ('Ana', 'López', 'ana@example.com', '22222222-2', 'Calle Principal 789', 'Valparaíso', 'Valparaíso', 'contrasena4', '123456789', 'cliente');
