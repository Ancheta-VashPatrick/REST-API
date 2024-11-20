const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, date = "curdate()") {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT id, node_id, sensor_type, value, recorded_at, uploaded_at 
    FROM sensor_data WHERE recorded_at LIKE CONCAT(${
      date !== "curdate()" ? "'" + date + "'" : date
    },'%') LIMIT ${offset}, ${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, date };

  return {
    data,
    meta: date !== "curdate()" ? meta : { page },
  };
}

async function create(sensorData) {
  const result = await db.query(
    `INSERT INTO sensor_data 
      (node_id, sensor_type, value${
        sensorData.recordedAt === undefined ? "" : ", recorded_at"
      }) 
      VALUES 
      ('${sensorData.nodeId}', '${sensorData.sensorType}', ${sensorData.value}${
      sensorData.recordedAt === undefined
        ? ""
        : ", '" + sensorData.recordedAt + "'"
    })`
  );

  let message = "Error in creating sensor data record";

  if (result.affectedRows) {
    message = "Sensor data record created successfully";
  }

  return { message };
}

// async function update(id, sensorData) {
//   const result = await db.query(
//     `UPDATE sensor_data
//       SET node_id='${sensorData.nodeId}', sensor_type='${
//       sensorData.sensorType
//     }', value=${sensorData.value}${
//       sensorData.recordedAt === undefined
//         ? ""
//         : ", recorded_at='" + sensorData.recordedAt + "'"
//     }
//       WHERE id=?`,
//     [id]
//   );

//   let message = "Error in updating sensor data record";

//   if (result.affectedRows) {
//     message = "Sensor data record updated successfully";
//   }

//   return { message };
// }

// async function remove(id) {
//   const result = await db.query(`DELETE FROM sensor_data WHERE id=?`, [id]);

//   let message = "Error in deleting sensor data record";

//   if (result.affectedRows) {
//     message = "Sensor data record deleted successfully";
//   }

//   return { message };
// }

module.exports = {
  getMultiple,
  create,
  // update,
  // remove,
};
