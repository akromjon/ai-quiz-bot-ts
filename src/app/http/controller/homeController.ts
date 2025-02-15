import { Request, Response } from "express";
import { OpenAIModels, OpenAIService } from "../../class/openai";
import { CONFIG } from "../../../config/app";

const openaiService = new OpenAIService(CONFIG.OPENAI_API_KEY, OpenAIModels.GPT_4);

const index = async (req: Request, res: Response) => {
    try {
        const prompt = "Talk about some facts about US!"; 

        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        await openaiService.stream(
            prompt,
            (chunk) => res.write(chunk), 
            () => res.end(), 
            (error) => {
                console.error("Streaming error:", error);
                res.status(500).json({ status: "error", message: "Failed to stream OpenAI response" });
            }
        );
    } catch (error) {
        console.error("Error in OpenAI request:", error);
        res.status(500).json({ status: "error", message: "Failed to process OpenAI request" });
    }
};

export { index };
