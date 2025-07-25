import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: 'models/gemini-1.5-flash',
    generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    },
});

export const transcribePdf = async (pdfUrl) => {
    const PROMPT = `Transcribe and format the contents of the pdf into a single string. Do not alter the contents of the pdf.`

    const pdfResp = await fetch(pdfUrl)
        .then((response) => response.arrayBuffer());

    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(pdfResp).toString("base64"),
                mimeType: "application/pdf",
            },
        },
        PROMPT,
    ]);
    
    return result;
}