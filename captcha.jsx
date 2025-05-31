import React, { useState, useRef, useEffect } from "react";

function CaptchaGenerator() {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(null);
  const canvasRef = useRef(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.font = "24px Arial";
    ctx.fillStyle = "#333";
    ctx.setTransform(1, 0.1, 0.1, 1, 0, 0); // add a skew
    ctx.fillText(captchaText, 10, 30);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captchaText) drawCaptcha();
  }, [captchaText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === captchaText) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 300, margin: "0 auto" }}>
      <canvas ref={canvasRef} width={150} height={50} style={{ border: "1px solid #ccc" }} />
      <button onClick={generateCaptcha} style={{ margin: "10px 0" }}>
        Refresh Captcha
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter captcha"
          required
          style={{ width: "100%", padding: "6px" }}
        />
        <button type="submit" style={{ marginTop: "10px" }}>Verify</button>
      </form>
      {isVerified === true && <p style={{ color: "green" }}>Captcha verified!</p>}
      {isVerified === false && <p style={{ color: "red" }}>Incorrect captcha. Try again.</p>}
    </div>
  );
}

export default CaptchaGenerator;
