import OpenAI from "@openai/openai";


enum OpenAIModels {
    GPT_3_5_TURBO = "gpt-3.5-turbo",
    GPT_4 = "gpt-4",
    GPT_4_TURBO = "gpt-4-turbo"
}

interface OpenAIInterface {
    model: OpenAIModels;
    client: OpenAI;
    create(prompt: string): Promise<object>;
    stream(prompt: string, onData: (chunk: string) => void, onEnd?: () => void, onError?: (error: Error) => void): Promise<void>;
}

class OpenAIService implements OpenAIInterface {
    model: OpenAIModels;
    client: OpenAI;

    constructor(apiKey: string, model: OpenAIModels = OpenAIModels.GPT_4) {
        this.client = new OpenAI({ apiKey });
        this.model = model;
    }

    async create(prompt: string): Promise<object> {
        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [{ role: "user", content: prompt }],
            });
            return response;
        } catch (error) {
            console.error("Error creating OpenAI response:", error);
            return { error: "Failed to generate response" };
        }
    }

    async stream(
        prompt: string,
        onData: (chunk: string) => void,
        onEnd?: () => void,
        onError?: (error: Error) => void
    ): Promise<void> {
        try {
            const stream = await this.client.chat.completions.create({
                model: this.model,
                messages: [{ role: "user", content: prompt }],
                stream: true,
            });

            for await (const chunk of stream) {
                if (chunk.choices[0]?.delta?.content) {
                    onData(chunk.choices[0].delta.content);
                }
            }

            if (onEnd) onEnd();
        } catch (error) {
            console.error("Streaming error:", error);
            if (onError) onError(error as Error);
        }
    }
}

export { OpenAIService, OpenAIModels };
