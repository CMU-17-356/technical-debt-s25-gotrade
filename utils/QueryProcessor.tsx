import { evaluate } from "mathjs";  

export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Shivam, Khuslen, Dhanya";
  }

  if (query.toLowerCase().includes("plus")) {
    const match = query.match(/What is (\d+)\s+plus\s+(\d+)/i);
    if (!match) {
      throw new Error("Question format not recognized. Expected: 'What is X plus Y'");
    }

    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return `${num1 + num2}`;
  }

  if (query.toLowerCase().includes("Which of the following numbers is the largest: ")) {
      const numbersMatch = query.match(/\d+/g);
      if (!numbersMatch) {
        throw new Error("No numbers found in the question.");
      }
      const numbers = numbersMatch.map(Number);
  
      if (numbers.length === 0) {
        throw new Error("No numbers found in the question.");
      }
  
      return String(Math.max(...numbers)); //
  }

  return "";
}
