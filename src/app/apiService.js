export async function getChatResponse(userInput) {
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
      
      if (!response.ok) throw new Error("Failed to fetch chat response");
      
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Chat API Error:", error);
      return "Error getting chat response";
    }
  }
  
  export async function generateImage(prompt) {
    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) throw new Error("Failed to fetch image");
      
      const data = await response.json();
      return data.image; // This is a base64 string
    } catch (error) {
      console.error("Image API Error:", error);
      return null;
    }
  }