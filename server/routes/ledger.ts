import { Router } from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const getDbClient = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

router.get('/transactions', async (req, res) => {
  const client = getDbClient();
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM transactions ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
});

router.get('/summary', async (req, res) => {
  const client = getDbClient();
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM v_summary');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
});

router.get('/tithe', async (req, res) => {
  const client = getDbClient();
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM v_tithe_accumulation');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching tithe accumulation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
});

router.get('/revenue-by-source', async (req, res) => {
  const client = getDbClient();
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM v_revenue_by_source');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching revenue by source:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
});

export default router;
