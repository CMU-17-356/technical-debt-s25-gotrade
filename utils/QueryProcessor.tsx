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
      return "";
    }

    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return `${num1 + num2}`;
  }

  if (query.toLowerCase().includes("minus")) {
    const match = query.match(/What is (\d+)\s+minus\s+(\d+)/i);
    if (!match) {
      return "";
    }

    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return `${num1 - num2}`;
  }

  if (query.toLowerCase().includes("largest")) {
    const match = query.match(/Which of the following numbers is the largest: ([\d,\s]+)/i);
    if (!match) {
      return "";
    }

    const numbers = match[1].split(",").map(num => parseInt(num.trim(), 10));
    const largest = Math.max(...numbers);
    return `${largest}`;
  }

  if (query.toLowerCase().includes("both a square and a cube")) {
    const match = query.match(/Which of the following numbers is both a square and a cube: ([\d,\s]+)/i);
    if (!match) {
      return "";
    }

    const numbers = match[1].split(",").map(num => parseInt(num.trim(), 10));
    
    // A number that is both a square and a cube is a perfect sixth power
    const isPerfectSixthPower = (num: number) => {
      const root = Math.round(Math.pow(num, 1 / 6));
      return root ** 6 === num;
    };

    const validNumbers = numbers.filter(isPerfectSixthPower);
    return validNumbers.length > 0 ? validNumbers.join(", ") : "None";
  }

  if (query.toLowerCase().includes("multiplied by")) {
    const match = query.match(/What is (\d+)\s+multiplied by\s+(\d+)/i);
    if (!match) {
      return "";
    }

    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return `${num1 * num2}`;
  }

  if (query.toLowerCase().includes("are primes")) {
    const match = query.match(/Which of the following numbers are primes: ([\d,\s]+)/i);
    if (!match) {
      return "";
    }

    const numbers = match[1].split(",").map(num => parseInt(num.trim(), 10));

    // Function to check if a number is prime
    const isPrime = (num: number) => {
      if (num < 2) return false;
      for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
      }
      return true;
    };

    const primeNumbers = numbers.filter(isPrime);
    return primeNumbers.length > 0 ? primeNumbers.join(", ") : "None";
  }

  if (query.toLowerCase().includes("to the power of")) {
    const match = query.match(/What is (\d+)\s+to\s+the\s+power\s+of\s+(\d+)/i);
    if (!match) {
      return "";
    }

    const base = parseInt(match[1], 10);
    const exponent = parseInt(match[2], 10);
    const result = Math.pow(base, exponent);
    return `${result}`;
  }

  if (query.toLowerCase().includes("plus") && (query.match(/plus/g) || []).length >= 2) {
    const match = query.match(/What is (.+) plus/i);
    if (!match) {
      return "";
    }
  
    const numbers = match[1].split("plus").map(num => parseInt(num.trim(), 10));
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return `${sum}`;
  }

  if (query.toLowerCase().includes("to the power of")) {
    const match = query.match(/What is (\d+)\s+to the power of\s+(\d+)/i);
    if (!match) {
      return "";
    }

    const base = parseInt(match[1], 10);
    const exponent = parseInt(match[2], 10);
    
    // Use `BigInt` for handling large numbers
    const result = BigInt(base) ** BigInt(exponent);

    return result.toString(); // Convert BigInt to string for output
  }

  if (query.toLowerCase().includes("plus") && query.toLowerCase().includes("multiplied by")) {
    const match = query.match(/What is ([\d\s\+*]+) multiplied by (\d+) plus (\d+)/i);
    if (!match) {
      throw new Error("Question format not recognized. Expected: 'What is X multiplied by Y plus Z'");
    }
  
    const num1 = parseInt(match[1].trim(), 10);
    const num2 = parseInt(match[2].trim(), 10);
    const num3 = parseInt(match[3].trim(), 10);
  
    const multiplicationResult = num1 * num2;
    const result = multiplicationResult + num3;
  
    return `${result}`;
  }

  return "";
}
