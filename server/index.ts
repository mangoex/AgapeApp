import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend en producción
app.use(express.static(path.join(__dirname, '../dist')));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// --- SURVEYS API ---

// Get all surveys
app.get('/api/surveys', async (req, res) => {
  try {
    const surveys = await prisma.survey.findMany();
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
});

// Get single survey with questions and levels
app.get('/api/surveys/:id', async (req, res) => {
  try {
    const survey = await prisma.survey.findUnique({
      where: { id: req.params.id },
      include: {
        questions: true,
        levels: true,
      },
    });
    if (!survey) return res.status(404).json({ error: 'Survey not found' });
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch survey' });
  }
});

// Create survey
app.post('/api/surveys', async (req, res) => {
  try {
    const { name, description } = req.body;
    const survey = await prisma.survey.create({
      data: { name, description },
    });
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create survey' });
  }
});

// --- USERS API ---

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// --- RESULTS API ---

app.get('/api/results', async (req, res) => {
  try {
    const results = await prisma.surveyResult.findMany({
      include: {
        user: { select: { name: true, email: true } },
        survey: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// React Router SPA Fallback - Redirigir todo lo que no sea API a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
