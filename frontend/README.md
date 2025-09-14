# Daily Peace 🌅

A React Native mobile application built with Expo, designed to bring daily moments of peace and mindfulness to your life.

## 📱 About

Daily Peace is a mobile app that helps you find tranquility in your daily routine. Whether you're looking to start your day with intention, take mindful breaks, or end your day with gratitude, Daily Peace provides a beautiful and intuitive interface to support your wellness journey.

## ✨ Features

- **Clean, Modern UI**: Beautiful and calming interface designed for relaxation
- **Cross-Platform**: Works on iOS, Android, and Web
- **Built with Expo**: Easy development and deployment
- **React Native**: Native performance with web-like development experience

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go app](https://expo.dev/client) on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/skebila/daily-peace.git
   cd daily-peace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `i` for iOS simulator, `a` for Android emulator, `w` for web

## 🛠️ Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Start the app on iOS simulator
- `npm run android` - Start the app on Android emulator
- `npm run web` - Start the app in web browser

## 📁 Project Structure

```
daily-peace/
├── App.js                 # Main application component
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── package.json          # Project dependencies and scripts
├── assets/               # App icons and images
│   ├── icon.png         # App icon
│   ├── splash.png       # Splash screen
│   ├── adaptive-icon.png # Android adaptive icon
│   └── favicon.png      # Web favicon
└── README.md            # This file
```

## 🎨 Customization

### App Configuration

Edit `app.json` to customize:
- App name and slug
- Icons and splash screens
- Platform-specific settings
- Bundle identifiers

### Styling

The app uses React Native's StyleSheet for styling. Main styles are defined in `App.js`:
- Colors: Calming blues and grays
- Typography: Clean, readable fonts
- Layout: Centered, spacious design

### Assets

Replace the placeholder images in the `assets/` folder:
- `icon.png`: 1024x1024 app icon
- `splash.png`: Splash screen image
- `adaptive-icon.png`: Android adaptive icon
- `favicon.png`: Web favicon

## 📦 Dependencies

- **Expo SDK 54**: Latest Expo framework
- **React 19.1.0**: Latest React version
- **React Native 0.81.4**: Latest React Native
- **expo-status-bar**: Status bar management

## 🚀 Deployment

### Building for Production

1. **Configure app.json** with your app details
2. **Build the app**:
   ```bash
   npx expo build:android  # For Android
   npx expo build:ios      # For iOS
   ```

### Publishing Updates

```bash
npx expo publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [React Native](https://reactnative.dev/)
- Icons and assets are placeholders - replace with your own designs

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Look through existing [Issues](https://github.com/skebila/daily-peace/issues)
3. Create a new issue if your problem isn't already addressed

---

**Daily Peace** - Finding tranquility in every moment. 🌸
