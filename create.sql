CREATE TABLE `sensor_data`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `node_id`       VARCHAR(255) NOT NULL ,
  `sensor_type`   VARCHAR(255) NOT NULL ,
  `value`         INT NOT NULL ,
  `recorded_at`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `uploaded_at`   DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_node_sensor_value_unique` (`node_id`,`sensor_type`,`recorded_at`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE `users`
(
  `username`  VARCHAR(255) NOT NULL,
  `password`  VARCHAR(255) NOT NULL,
  `role`      ENUM('consumer', 'concessionaire', 'regulator') NOT NULL,
  `nodes`     VARCHAR(255) NULL,
  PRIMARY KEY (`username`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;