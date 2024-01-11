import Button from './components/Button'
import Checkbox from './components/Checkbox'
import PasswordStrengthIndicator from './components/StrengthChecker'
import usePasswordGenerator from './hooks/use-password-generator'
import './styles.css'
import { useState } from 'react'

function App() {
  const [length, setLength] = useState(4)
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", status: false },
    { title: "Include Lowercase Letters", status: false },
    { title: "Include Numbers", status: false },
    { title: "Include Symbols", status: false },
  ])
  const [copied, setCopied] = useState(false)

  const handleCheckboxChange = (index) => {
    const updatedCheckboxData = [...checkboxData]
    updatedCheckboxData[index].status = !updatedCheckboxData[index].status
    setCheckboxData(updatedCheckboxData)
    console.log(checkboxData)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <>
      <div className='heading'>
        <span>Password Generator</span>
      </div>
      <div className="container">
        {/* Password Text and Copy  */}
        {password && (<div className='header'>
          <div className='title'>{password}</div>

          <Button
            onClick={handleCopy}
            text={copied ? "Copied" : "Copy"}
            customClass="copyBtn"
          />

        </div>
        )}

        {/* Character Length  */}
        <div className="charLength">
          <span>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Checkboxes  */}
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                title={checkbox.title}
                status={checkbox.status}
                index={index}
                onChange={() => handleCheckboxChange(index)}
              />
            )
          })}
        </div>

        {/* Strength  */}
        <PasswordStrengthIndicator password={password} />

        {/* Error Handling  */}
        {errorMessage && <div className='errorMessage'>{errorMessage}</div>}

        {/* Generate Button  */}
        <Button
          onClick={() => generatePassword(checkboxData, length)}
          text="Generate Password"
          customClass="generateBtn"
        />
      </div>
    </>
  )
}

export default App
