"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [result, setResult] = useState<(string | Number)[][]>([[]]);
  const lotteryRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const calc = () => {
    // Get the lottery numbers as an array of integers
    const lotteryInput = lotteryRef.current?.value;
    const lotteryNumbers = lotteryInput
      ? lotteryInput.split(/[ \t]+/).map(Number)
      : [];

    // Get the text area input and split it into a 2D array of numbers
    const textAreaInput = textAreaRef.current?.value;
    const twoDArr = textAreaInput
      ? textAreaInput.split("\n").map((row) => row.split(/[ \t]+/).map(Number))
      : [];

    // Initialize the result array
    const result = twoDArr.map((row) => {
      const matchingNumbers = row.filter((value) =>
        lotteryNumbers.includes(value),
      );
      return matchingNumbers.length === 0 ? ["-"] : matchingNumbers;
    });

    setResult(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-24">
      <h1>Lottery Checking System</h1>
      <Input ref={lotteryRef} type="text" placeholder="Lottery" />
      <Textarea ref={textAreaRef} placeholder="Numbers" rows={7} />
      <Button onClick={calc} className="w-full py-4">
        Find
      </Button>

      {result.length > 0 && (
        <div className="mt-12 self-start ml-4">
          {result.map((x, rowIndex) => (
            <div key={rowIndex}>
              {x.map((y, colIndex) => (
                <span key={colIndex} className="mr-2 last:mr-0">
                  {y.toString()}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
