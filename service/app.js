const express = require("express");

const app = express.Router();

const Pool = require("pg").Pool;

global.request = require("request");

module.exports = app;

// 34. กำหนดการเชื่อมต่อฐานข้อมูล (start)
const db = new Pool({
  host: "localhost",
  database: "postgres",
  port: 5432,
  user: "postgres",
  password: "10112531",
});
// 34. กำหนดการเชื่อมต่อฐานข้อมูล (end)

// 35. api แบบ post ไม่ส่งตัวแปร (start)
// 35.1 ตั้งชื่อ api "/..."
app.post("/api_all", (req, res) => {

  try {
    // 35.2 เขียน sql ดึงข้อมูล
    const sql = {
      text: "select p_name_t, st_asgeojson(geom) as geojson \
      from admin_prov_4326 "
    };

    db.query(sql).then((data) => {

      var rows = data.rows;

      res.status(200).json(rows);

    });
  } catch (error) {

    res.status(200).json(error);

  }
});
// 35. api แบบ post ไม่ส่งตัวแปร (end)

// api แบบ post ไม่ส่งตัวแปร
// เรียกชื่อจังหวัดมาแสดง
app.post("/api_all_p_name_t", (req, res) => {

  try {
    // เขียน sql ดึงข้อมูล
    const sql = {
      text: "select p_code,p_name_t \
      from admin_prov_4326 \
      order by p_code"
    };

    db.query(sql).then((data) => {

      var rows = data.rows;

      res.status(200).json(rows);

    });
  } catch (error) {

    res.status(200).json(error);

  }
});

// api แบบ post ส่งตัวแปร
app.post("/api_var", (req, res) => {

  // รับค่าที่โพสเข้ามา
  const { p_code } = req.body;

  try {
    // เขียน sql ดึงข้อมูล 
    const sql = {
      text: "select p_name_t, st_asgeojson(geom) as geojson \
      from admin_prov_4326 \
      where p_code = $1;",
      values: [p_code],
    };

    db.query(sql).then((data) => {

      var rows = data.rows;

      res.status(200).json(rows);

    });
  } catch (error) {

    res.status(200).json(error);

  }
});

// api แบบ post ส่งตัวแปรเชิงพื้นที่
app.post("/api_var_spa", (req, res) => {

  // รับค่าที่โพสเข้ามา
  const { geojson } = req.body;

  try {
    // เขียน sql ดึงข้อมูล 
    const sql = {
      text: "select p_name_t, st_asgeojson(geom) as geojson \
      from admin_prov_4326 \
      where st_intersects(geom,st_setsrid(st_geomfromgeojson($1),4326));",
      values: [geojson],
    };

    db.query(sql).then((data) => {

      var rows = data.rows;

      res.status(200).json(rows);

    });
  } catch (error) {

    res.status(200).json(error);

  }
});

// api แบบ post ส่งตัวแปรเชิงพื้นที่ clip
app.post("/api_var_spa_clip", (req, res) => {

  // รับค่าที่โพสเข้ามา
  const { geojson } = req.body;

  try {
    // เขียน sql ดึงข้อมูล 
    const sql = {
      text: "select p_name_t, st_asgeojson(st_intersection(geom,st_setsrid(st_geomfromgeojson($1),4326))) as geojson \
      from admin_prov_4326 \
      where st_intersects(geom,st_setsrid(st_geomfromgeojson($1),4326));",
      values: [geojson],
    };

    db.query(sql).then((data) => {

      var rows = data.rows;

      res.status(200).json(rows);

    });
  } catch (error) {

    res.status(200).json(error);

  }
});