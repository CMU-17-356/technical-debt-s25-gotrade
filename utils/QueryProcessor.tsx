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

  if (query.toLowerCase().includes("minus")) {
    const match = query.match(/What is (\d+)\s+plus\s+(\d+)/i);
    if (!match) {
      throw new Error("Question format not recognized. Expected: 'What is X plus Y'");
    }

    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return `${num1 - num2}`;
  }

  if (query.toLowerCase().includes("largest")) {
    const match = query.match(/Which of the following numbers is the largest: ([\d,\s]+)/i);
    if (!match) {
      throw new Error("Question format not recognized. Expected: 'Which of the following numbers is the largest: X, Y, Z'");
    }

    const numbers = match[1].split(",").map(num => parseInt(num.trim(), 10));
    const largest = Math.max(...numbers);
    return `${largest}`;
  }

  return "";
}
