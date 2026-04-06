import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    console.log('Key loaded:', apiKey ? apiKey.slice(0, 8) + '...' : 'MISSING');

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // Filter to only user/assistant messages (no system role from client)
    const chatMessages = messages.filter((m) => m.role === 'user' || m.role === 'assistant');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are Azaan Supermarket assistant. Help customers with products, delivery, orders. We are located at Ghulam Shah Ln, Lyari, Karachi, 74660, Pakistan. We offer Cash on Delivery payment and delivery in Karachi. Open daily until 11 PM. Keep responses concise and friendly.',
          },
          ...chatMessages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('GROQ Error:', response.status, errorText);
      return NextResponse.json({ error: 'Groq API error', details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    console.log('Chat route error:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
