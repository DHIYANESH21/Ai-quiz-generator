import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_AI_GEMINI_API_KEY;
  console.log(apiKey)
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "give me 10 mcq's medium level questions with 4 options as a,b,c,d each and right answer below each question on the topic american television which belongs to the category entertainment in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"question\": \"Which long-running animated sitcom features the Simpson family?\",\n    \"options\": [\"a) Family Guy\", \"b) The Simpsons\", \"c) Futurama\", \"d) South Park\"],\n    \"answer\": \"b\"\n  },\n  {\n    \"question\": \"What popular 1990s sitcom featured six friends living in New York City?\",\n    \"options\": [\"a) Seinfeld\", \"b) Friends\", \"c) Frasier\", \"d) ER\"],\n    \"answer\": \"b\"\n  },\n  {\n    \"question\": \"Which reality competition show features aspiring singers competing for a recording contract?\",\n    \"options\": [\"a) American Idol\", \"b) The Voice\", \"c) America's Got Talent\", \"d) Survivor\"],\n    \"answer\": \"a\"\n  },\n  {\n    \"question\": \"Who hosted the late-night talk show 'The Tonight Show' for over 30 years?\",\n    \"options\": [\"a) David Letterman\", \"b) Jay Leno\", \"c) Conan O'Brien\", \"d) Jimmy Fallon\"],\n    \"answer\": \"b\"\n  },\n  {\n    \"question\": \"Which medical drama aired on NBC for 15 seasons?\",\n    \"options\": [\"a) Grey's Anatomy\", \"b) House\", \"c) ER\", \"d) Scrubs\"],\n    \"answer\": \"c\"\n  },\n  {\n    \"question\": \"Which science fiction series featured the voyages of the Starship Enterprise?\",\n    \"options\": [\"a) Star Wars\", \"b) Battlestar Galactica\", \"c) Star Trek\", \"d) Stargate SG-1\"],\n    \"answer\": \"c\"\n  },\n  {\n    \"question\": \"Which game show features contestants answering general knowledge questions for increasing amounts of money?\",\n    \"options\": [\"a) Wheel of Fortune\", \"b) Jeopardy!\", \"c) The Price is Right\", \"d) Family Feud\"],\n    \"answer\": \"b\"\n  },\n  {\n    \"question\": \"Which animated series features a dysfunctional family living in Quahog, Rhode Island?\",\n    \"options\": [\"a) The Simpsons\", \"b) Family Guy\", \"c) American Dad!\", \"d) Bob's Burgers\"],\n    \"answer\": \"b\"\n  },\n  {\n    \"question\": \"Which drama series focuses on the lives of firefighters, paramedics, and police officers in Chicago?\",\n    \"options\": [\"a) Law & Order\", \"b) Chicago Fire\", \"c) Blue Bloods\", \"d) NYPD Blue\"],\n    \"answer\": \"b\"\n  },\n  {\n    \"question\": \"Which reality show follows the lives of a wealthy family living in Los Angeles?\",\n    \"options\": [\"a) The Real Housewives\", \"b) Keeping Up with the Kardashians\", \"c) Jersey Shore\", \"d) The Osbournes\"],\n    \"answer\": \"b\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
    