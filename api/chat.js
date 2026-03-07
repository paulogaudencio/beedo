// BEE.DO Chatbot — Vercel Serverless API Proxy for Gemini 2.0 Flash
import { SYSTEM_PROMPT } from './system-prompt.js';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    try {
        const { messages = [], customSystemPrompt, model = 'gemini-2.0-flash' } = req.body;

        // Build Gemini request
        const systemPrompt = customSystemPrompt ? customSystemPrompt : SYSTEM_PROMPT;

        // Convert messages to Gemini format
        const geminiContents = messages.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const geminiPayload = {
            system_instruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: geminiContents,
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            ]
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiPayload),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API error:', errorData);
            return res.status(response.status).json({
                error: 'Gemini API error',
                details: errorData
            });
        }

        const data = await response.json();

        // Extract the text from Gemini response
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Detect lead intent
        const hasLeadIntent = text.includes('[LEAD_INTENT]');
        const cleanText = text.replace(/\[LEAD_INTENT\]/g, '').trim();

        // Simple sentiment analysis based on Gemini's response context
        let sentiment = 'neutral';
        const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content?.toLowerCase() || '';
        if (/aderir|marcar|reunião|contacto|interessad|quero|ligu/i.test(lastUserMsg)) {
            sentiment = 'very_interested';
        } else if (/como|porquê|quanto|diferença|funciona/i.test(lastUserMsg)) {
            sentiment = 'curious';
        } else if (/ajuda|suporte|problema|reclamação/i.test(lastUserMsg)) {
            sentiment = 'support';
        }

        return res.status(200).json({
            text: cleanText,
            hasLeadIntent,
            sentiment,
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
