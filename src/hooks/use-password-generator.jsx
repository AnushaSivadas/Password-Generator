import { useState } from "react";

function usePasswordGenerator() {
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const generatePassword = (checkboxData, length) => {
        let charset = "",
            generatedPassword = "";
    
        const selectedOption = checkboxData.filter((checkbox) => checkbox.status)
    
        if (selectedOption.length === 0) {
            setErrorMessage("Select at least one option!");
            setPassword("");
            return;
        }
    
        selectedOption.forEach(option => {
            switch (option.title) {
                case "Include Uppercase Letters":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    break;
                case "Include Lowercase Letters":
                    charset += "abcdefghijklmnopqrstuvwxyz"
                    break;
                case "Include Numbers":
                    charset += "0123456789"
                    break;
                case "Include Symbols":
                    charset += "!@#$%^&*()"
                    break;
                default:
                    break;
            }
        });
    
        const charsetsIncluded = selectedOption.map(option => option.title);
    
        // Ensure at least one character from each selected charset is included
        const requiredCharsets = [];
    
        if (charsetsIncluded.includes("Include Uppercase Letters")) {
            requiredCharsets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        }
        if (charsetsIncluded.includes("Include Lowercase Letters")) {
            requiredCharsets.push("abcdefghijklmnopqrstuvwxyz");
        }
        if (charsetsIncluded.includes("Include Numbers")) {
            requiredCharsets.push("0123456789");
        }
        if (charsetsIncluded.includes("Include Symbols")) {
            requiredCharsets.push("!@#$%^&*()");
        }
    
        requiredCharsets.forEach(set => {
            const randomIndex = Math.floor(Math.random() * set.length);
            generatedPassword += set[randomIndex];
        });
    
        // Generate the remaining characters for the password
        for (let i = generatedPassword.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }
    
        //Shuffle the charaters
        const array = generatedPassword.split(""); // Convert string to array of characters
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements randomly
        }

        generatedPassword=array.join(""); // Convert back to string
        

        setPassword(generatedPassword);
        setErrorMessage("");
    }
    
    return { password, errorMessage, generatePassword }
}

export default usePasswordGenerator;