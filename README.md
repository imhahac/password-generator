# Password Generator

A secure, random, and highly customizable password and passphrase generator web application.

## Open the Application

Simply open `index.html` in your modern web browser to start using the application. No server setup is required.

## Features

### 🔐 Dual Generation Modes
*   **Password Mode**: Generate complex random strings based on character sets.
*   **Passphrase Mode**: Generate memorable passwords made of random words (e.g., `Horse-Correct-Battery-Staple`).

### 🛠️ Extensive Customization
*   **Character Sets**: Toggle Uppercase, Lowercase, Numbers, Common Symbols, and Special Symbols.
*   **Include/Exclude**:
    *   Add custom characters to the pool.
    *   Exclude confusing similar characters (e.g., `i`, `l`, `1`, `O`, `0`).
    *   Exclude specific custom characters.
*   **Formatting**:
    *   Set fixed **Prefix** and **Suffix**.
    *   Control exact length.
    *   (Passphrase) Choose separators (hyphen, space, dot, underscore, or random numbers).
    *   (Passphrase) Capitalize words and include random numbers.

### 🚀 Modern UX Tools
*   **Batch Generation**: Generate multiple passwords at once.
*   **History**: Tracks your recently generated passwords (stored locally in your browser).
*   **QR Code**: Instantly generate a QR code for any password to easily transfer it to mobile devices.
*   **Strength Meter**: Real-time visual feedback on password strength.
*   **Export**: Copy individual passwords, copy all, or download as a `.txt` file.

### 🎨 Personalization
*   **Dark/Light Mode**: Automatic theme detection with a manual toggle.
*   **Internationalization**: Fully localized in English and Traditional Chinese (繁體中文).

## Tech Stack

*   **HTML5 & CSS3**: Semantic markup with CSS variables for theming.
*   **Vanilla JavaScript**: No heavy frameworks, fast and lightweight.
*   **Libraries**: [QRCode.js](https://github.com/davidshimjs/qrcodejs) (via CDN) for QR code generation.

## License

This project is open source and available under the [MIT License](LICENSE).