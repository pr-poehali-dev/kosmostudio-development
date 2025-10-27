/**
 * Business: Generate website HTML using OpenAI ChatGPT based on user description
 * Args: event with httpMethod, body containing user's site idea
 * Returns: HTTP response with generated HTML code
 */

exports.handler = async (event, context) => {
    const { httpMethod, body } = event;
    
    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            body: '',
            isBase64Encoded: false
        };
    }
    
    if (httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method not allowed' }),
            isBase64Encoded: false
        };
    }

    const requestBody = JSON.parse(body || '{}');
    const { idea } = requestBody;

    if (!idea || idea.trim().length === 0) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Idea is required' }),
            isBase64Encoded: false
        };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'OpenAI API key not configured' }),
            isBase64Encoded: false
        };
    }

    const systemPrompt = `Ты - эксперт по веб-дизайну. Твоя задача - создавать красивые, современные, полностью рабочие HTML страницы.

ТРЕБОВАНИЯ:
1. Создай ПОЛНЫЙ HTML документ (<!DOCTYPE html> до </html>)
2. Используй современный дизайн с градиентами, тенями, анимациями
3. Адаптивная вёрстка (mobile-first)
4. Все стили должны быть внутри <style> тега
5. Используй современные цвета: темный фон, яркие акценты (золотой, красный)
6. Добавь hover эффекты и плавные переходы
7. Шрифты: Inter, SF Pro, или системные
8. JavaScript для интерактивности (если нужно)

СТРУКТУРА:
- Header с логотипом/названием
- Hero секция с заголовком и CTA кнопкой
- 2-3 секции с контентом (особенности, услуги, и т.д.)
- Footer с контактами

СТИЛЬ:
- Темная тема (градиенты от черного к темно-серому)
- Яркие акценты (#FFD700 золотой, #DC2626 красный)
- Карточки с backdrop-filter: blur
- Анимации при hover
- Иконки эмодзи (🚀💎✨)

Ответ должен быть ТОЛЬКО HTML код, без пояснений!`;

    const userPrompt = `Создай красивый современный сайт на тему: ${idea}`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.9,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                statusCode: response.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    error: 'OpenAI API error',
                    details: errorData 
                }),
                isBase64Encoded: false
            };
        }

        const data = await response.json();
        let generatedHtml = data.choices[0].message.content.trim();

        if (generatedHtml.startsWith('```html')) {
            generatedHtml = generatedHtml.replace(/```html\n?/g, '').replace(/```\n?$/g, '');
        } else if (generatedHtml.startsWith('```')) {
            generatedHtml = generatedHtml.replace(/```\n?/g, '');
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                html: generatedHtml,
                tokens: data.usage
            }),
            isBase64Encoded: false
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Failed to generate site',
                message: error.message || 'Unknown error'
            }),
            isBase64Encoded: false
        };
    }
};
