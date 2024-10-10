"use client"; // Enables client-side rendering for this component

// Importing necessary hooks and components from React and custom components
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Type definition for the NumberGuessingComponent's state
interface NumberGuessing{
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

// Defining the NumberGuessingComponent function component
export default function NumberGuessing(): JSX.Element {
  // State variables to manage the game state
  const [gameStarted, setGameStarted] = useState<boolean>(false); // Indicates if the game has started
  const [gameOver, setGameOver] = useState<boolean>(false); // Indicates if the game is over
  const [paused, setPaused] = useState<boolean>(false); // Indicates if the game is paused
  const [targetNumber, setTargetNumber] = useState<number>(0); // The number to be guessed
  const [userGuess, setUserGuess] = useState<number | string>(""); // The user's guess (can be a number or an empty string)
  const [attempts, setAttempts] = useState<number>(0); // Number of attempts made by the user
  // const [message , setMessage] = useState('');

  // useEffect to generate a new target number when the game starts or resumes
  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 to 6
      setTargetNumber(randomNumber); // Set the target number
    }
  }, [gameStarted, paused]); // Dependencies: gameStarted and paused

  // Function to handle the start of the game
  const handleStartGame = (): void => {
    setGameStarted(true); // Start the game
    setGameOver(false); // Reset the game over state
    setAttempts(0); // Reset the attempts counter
    setPaused(false); // Ensure the game is not paused
  };

  // Function to handle pausing the game
  const handlePauseGame = (): void => {
    setPaused(true); // Pause the game
  };

  // Function to handle resuming the game
  const handleResumeGame = (): void => {
    setPaused(false); // Resume the game
  };

  // Function to handle the user's guess
  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true); // If the guess is correct, end the game
    } 
    else {
      setAttempts(attempts + 1); // Increment the attempts counter
    }
  };

  // Function to handle restarting the game
  const handleTryAgain = (): void => {
    setGameStarted(false); // Reset the game state
    setGameOver(false); // Reset the game over state
    setUserGuess(""); // Clear the user's guess
    setAttempts(0); // Reset the attempts counter
  };

  // Function to handle input change for user's guess
  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };

  // JSX to render the game UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Main container for the game */}
      <div className="bg-teal-950 rounded-2xl p-8 w-full max-w-md">
        {/* Title of the game */}
        <h1 className="text-3xl font-bold text-center mb-2 text-teal-300">
          Number Guessing Game
        </h1>
        {/* Description of the game */}
        <p className="text-center text-teal-200 mb-4">
          Try to guess the number between 1 to 6!
        </p>
        {/* Conditional rendering: show start button if game hasn't started */}
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            {/* Button to start the game */}
            <Button
              onClick={handleStartGame}
              className="bg-blue-700 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {/* Conditional rendering: show game controls if game started and not over */}
        {gameStarted && !gameOver &&(
          <div>
            <div className="flex justify-center mb-4">
              {/* Button to resume the game if paused */}
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-blue-800 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                /* Button to pause the game */
                <Button
                  onClick={handlePauseGame}
                  className="bg-blue-800 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-4">
              {/* Input field for user's guess */}
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border-gray-300 rounded-full py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guessing number here"
                min={1}
                max={6}
              />
              {/* Button to submit the guess */}
              <Button
                onClick={handleGuess}
                disabled={attempts >= 10}
                className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl ml-4"
              >
                Guess
              </Button>
            </div>

              {/* limited attempts set */}
            <div className="text-center">
              <p className="text-teal-500 font-mono text-lg">you have <b className="text-yellow-300">{10 - attempts}</b> attempts are left</p>
              
              {attempts >= 10 && (
                <Button
                onClick={handleStartGame}
                className="bg-red-700 hover:bg-green-500 rounded-2xl text-white">
                  Restart Game!
                </Button>
              )}
              </div>
              {attempts >= 10 && (
            <div className="text-center text-black">
              {/* Display number of attempts */}
              <p className="text-yellow-500 font-mono">Attempts: <b className="text-blue-300">{attempts}</b></p>
              <p className="text-red-500 font-bold text-xs">Sorry , you have reached the maximum attempts.. Restart Game!</p>
            </div>
            )}
          </div>
        )}
        {/* Conditional rendering: show game over message if game is over */}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-white">
              {/* Game over message */}
              <h2 className="text-4xl font-bold text-yellow-300">You Win!</h2>
              <h1 className="text-green-600 font-bold text-2xl">Congratulations!</h1>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              {/* Button to try the game again */}
              <Button
                onClick={handleTryAgain}
                className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              >
                Play Again
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="text-black font-mono">Made by <b className="text-blue-600">MARYAM ANSARI</b></p>
      </div>
    </div>
  );
}