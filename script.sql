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
   CONSTRAINT pk_contact PRIMARY KEY (idcontact)
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
   photo                VARCHAR(255)         NULL,
   stock                INT4                 NULL,
   CONSTRAINT pk_products PRIMARY KEY (id_products)
);

/*==============================================================*/
/* Table: shipping_cost                                         */
/*==============================================================*/
CREATE TABLE shipping_cost (
   id_shipping          VARCHAR(255)         NOT NULL,
   cost                 FLOAT8               NULL,
   region               VARCHAR(255)         NULL,
   CONSTRAINT pk_shipping_cost PRIMARY KEY (id_shipping)
);

/*==============================================================*/
/* Table: tickets                                               */
/*==============================================================*/
CREATE TABLE tickets (
   id_tickets           SERIAL               NOT NULL,
   id_shipping          VARCHAR(255)         NULL,
   id_users             INT4                 NULL,
   subtotal             FLOAT8               NULL,
   total                FLOAT8               NULL,
   contact              VARCHAR(255)         NULL,
   telephone            VARCHAR(255)         NULL,
   rut                  VARCHAR(255)         NULL,
   city                 VARCHAR(255)         NULL,
   razon_social         VARCHAR(255)         NULL,
   pay_method           VARCHAR(255)         NULL,
   status               VARCHAR(255)         NULL,
   CONSTRAINT pk_tickets PRIMARY KEY (id_tickets)
);

/*==============================================================*/
/* Table: ticket_details                                        */
/*==============================================================*/
CREATE TABLE ticket_details (
   id_ticket_details    SERIAL               NOT NULL,
   id_tickets           INT4                 NULL,
   id_products          INT4                 NULL,
   CONSTRAINT pk_ticket_details PRIMARY KEY (id_ticket_details)
);

/*==============================================================*/
/* Table: users                                                 */
/*==============================================================*/
CREATE TABLE users (
   id_users             SERIAL               NOT NULL,
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
   CONSTRAINT pk_users PRIMARY KEY (id_users)
);

ALTER TABLE products
   ADD CONSTRAINT fk_products_vende_users FOREIGN KEY (id_users)
      REFERENCES users (id_users)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE tickets
   ADD CONSTRAINT fk_tickets_reference_users FOREIGN KEY (id_users)
      REFERENCES users (id_users)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE tickets
   ADD CONSTRAINT fk_tickets_tiene_co_shipping FOREIGN KEY (id_shipping)
      REFERENCES shipping_cost (id_shipping)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE ticket_details
   ADD CONSTRAINT fk_ticket_d_tiene_det_products FOREIGN KEY (id_products)
      REFERENCES products (id_products)
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE ticket_details
   ADD CONSTRAINT fk_ticket_d_tiene_det_tickets FOREIGN KEY (id_tickets)
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

/* Agregar productos */ 
INSERT INTO PRODUCTS (ID_USERS, NAME, BRAND, DESCRIPTION, VARIANT, PRICE, IVA, CODEBAR, SKU, PHOTO)
VALUES
  (1, 'Albahaca', 'Naturaleza', 'Hierba aromática conocida por su aroma y sabor.', 'Variante A', 5500, 0.19, 'AB-001', 'ALBA-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (2, 'Romero', 'Bosque', 'Hierba aromática utilizada en la cocina mediterránea.', 'Variante B', 5200, 0.19, 'RO-001', 'ROM-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (1, 'Menta', 'Naturaleza', 'Hierba refrescante con múltiples usos culinarios y medicinales.', 'Variante C', 5700, 0.19, 'ME-001', 'MEN-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (2, 'Orégano', 'Bosque', 'Hierba utilizada como condimento en diversos platos.', 'Variante D', 5300, 0.19, 'OR-001', 'ORE-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (1, 'Perejil', 'Naturaleza', 'Hierba aromática popular en diversas cocinas.', 'Variante E', 5100, 0.19, 'PE-001', 'PER-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (2, 'Tomillo', 'Bosque', 'Hierba con sabor terroso utilizada en la cocina mediterránea.', 'Variante F', 5000, 0.19, 'TO-001', 'TOM-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (1, 'Salvia', 'Naturaleza', 'Hierba con propiedades medicinales y culinarias.', 'Variante G', 5400, 0.19, 'SA-001', 'SAL-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (2, 'Cilantro', 'Bosque', 'Hierba utilizada en diversas gastronomías.', 'Variante H', 5100, 0.19, 'CI-001', 'CIL-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (1, 'Hierbabuena', 'Naturaleza', 'Hierba aromática refrescante para infusiones y cócteles.', 'Variante I', 5600, 0.19, 'HB-001', 'HBU-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (2, 'Ajenjo', 'Bosque', 'Hierba con sabor amargo utilizada en licores y bebidas.', 'Variante J', 5200, 0.19, 'AJ-001', 'AJE-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (1, 'Eneldo', 'Naturaleza', 'Hierba con sabor anisado utilizada en la cocina escandinava.', 'Variante K', 5200, 0.19, 'EN-001', 'ENE-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg'),
  (2, 'Hinojo', 'Bosque', 'Hierba con sabor similar al anís y la menta.', 'Variante L', 5300, 0.19, 'HI-001', 'HIN-001', 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/04/23/menta_p.jpg');
