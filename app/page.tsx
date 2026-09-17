"use client"

import { useState } from "react"

function vigenere(text: string, key: string, action: "encrypt" | "decrypt"): string {
  if (!text || !key) return "Matn va kalitni kiriting!"

  let result = ""
  let keyIndex = 0

  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    const code = char.charCodeAt(0)

    // Katta harflar (A-Z)
    if (code >= 65 && code <= 90) {
      const kChar = key[keyIndex % key.length].toUpperCase()
      const shift = kChar.charCodeAt(0) - 65

      if (action === "encrypt") {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65)
      } else {
        char = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65)
      }
      keyIndex++
    }
    // Kichik harflar (a-z)
    else if (code >= 97 && code <= 122) {
      const kChar = key[keyIndex % key.length].toLowerCase()
      const shift = kChar.charCodeAt(0) - 97

      if (action === "encrypt") {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97)
      } else {
        char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97)
      }
      keyIndex++
    }
    result += char
  }
  return result
}

export default function Page() {
  const [encText, setEncText] = useState("")
  const [encKey, setEncKey] = useState("")
  const [encResult, setEncResult] = useState("")

  const [decText, setDecText] = useState("")
  const [decKey, setDecKey] = useState("")
  const [decResult, setDecResult] = useState("")

  return (
    <>
      <h1>Vijener Shifri</h1>

      <div className="container">
        {/* 1-Qism: Shifrlash */}
        <div className="panel">
          <h2>Shifrlash</h2>
          <div className="form-group">
            <label htmlFor="enc-text">Asliy matn:</label>
            <textarea
              id="enc-text"
              placeholder="Matnni kiriting..."
              value={encText}
              onChange={(e) => setEncText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="enc-key">{"Kalit so'z:"}</label>
            <input
              type="text"
              id="enc-key"
              placeholder="Kalitni kiriting..."
              value={encKey}
              onChange={(e) => setEncKey(e.target.value)}
            />
          </div>
          <button onClick={() => setEncResult(vigenere(encText, encKey, "encrypt"))}>Shifrlash</button>
          <div className="form-group" style={{ marginTop: 15 }}>
            <label>Natija:</label>
            <div className="result-box" id="enc-result">
              {encResult}
            </div>
          </div>
        </div>

        {/* 2-Qism: Deshifrlash */}
        <div className="panel">
          <h2>Deshifrlash</h2>
          <div className="form-group">
            <label htmlFor="dec-text">Shifrlangan matn:</label>
            <textarea
              id="dec-text"
              placeholder="Shifrlangan matnni kiriting..."
              value={decText}
              onChange={(e) => setDecText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dec-key">{"Kalit so'z:"}</label>
            <input
              type="text"
              id="dec-key"
              placeholder="Kalitni kiriting..."
              value={decKey}
              onChange={(e) => setDecKey(e.target.value)}
            />
          </div>
          <button onClick={() => setDecResult(vigenere(decText, decKey, "decrypt"))}>Deshifrlash</button>
          <div className="form-group" style={{ marginTop: 15 }}>
            <label>Natija:</label>
            <div className="result-box" id="dec-result">
              {decResult}
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1>with Bozorqulov Sardor</h1>
    </>
  )
}
