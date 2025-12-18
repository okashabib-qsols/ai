import { GoogleGenAI } from "@google/genai";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ai = new GoogleGenAI({
  apiKey: "",
});

const rl = readline.createInterface({ input, output });

async function askAndGenerate() {
  const prompt = await rl.question("Enter your prompt (or 'exit' to quit): ");
  
  if (prompt.toLowerCase() === "exit") {
    console.log("Goodbye!");
    rl.close();
    return;
  }

  if (prompt.trim() === "") {
    console.log("Empty prompt, try again.\n");
    return askAndGenerate();
  }

  try {
    console.log("Generating response...\n");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log("Response:");
    console.log(response.text);
    console.log("\n");
  } catch (error) {
    console.error("Error generating content:", error.message);
    console.log("\n");
  }

  // Ask again
  askAndGenerate();
}

console.log("Gemini Prompt Tool - Enter prompts below\n");
askAndGenerate();