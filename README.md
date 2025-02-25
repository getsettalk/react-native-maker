# React Native Project Scaffolder 🚀

## Overview

This is a powerful CLI tool for scaffolding React Native projects with a comprehensive, opinionated project structure. It helps developers quickly set up a well-organized React Native application with optional configurations for navigation, state management, and storage.

![image](https://github.com/user-attachments/assets/8fbe7fa3-d902-4810-92cd-1bb0f8ec6b32) ![image](https://github.com/user-attachments/assets/3848ace5-c45c-4b01-88c3-42e30e4b30f4)



## Features

### Project Structure Creation
The scaffolder creates a robust, scalable project structure with carefully organized directories:

```
project-root/
│
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   │   ├── BottomTabIcons/
│   │   │   ├── imageIcons/
│   │   │   └── svgIcons/
│   │   └── images/
│   │       ├── PngAndJpgImages/
│   │       ├── SvgImages/
│   │       └── OtherImages/
│   │
│   ├── components/
│   │   ├── global/      # Reusable global components
│   │   └── forms/       # Form-related components
│   │
│   ├── constants/       # Application-wide constants
│   │
│   ├── context/         # React Context providers
│   │
│   ├── features/        # Feature-based screens
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── chat/
│   │
│   ├── i18n/            # Internationalization
│   │   └── locales/
│   │
│   ├── navigation/      # Navigation setup
│   │
│   ├── service/         # API services
│   │
│   ├── store/           # State management
│   │
│   ├── styles/          # Common styles
│   │
│   ├── theme/           # Theme configurations
│   │
│   ├── types/           # TypeScript types
│   │
│   └── utils/           # Utility functions
│
└── tsconfig.json
```

## Interactive Configuration Options

When you run the scaffolder, you'll be prompted with several configuration choices:

1. **Bottom Tab Navigation**
   - Opt to set up a bottom tab navigation structure
   - Creates dedicated navigation files and icon directories

2. **Storage Solution**
   Choose from:
   - Async Storage
   - React Native MMKV
   - None

3. **Navigation Setup**
   - Comprehensive navigation structure with navigation references

4. **State Management**
   Choose from:
   - Redux Toolkit
   - Zustand
   - Context API
   - None

## Installation And Direct Usage (Required step) ✅
![Uses](https://img.shields.io/badge/Uses-how%20to%20install%20or%20use-green?labelColor=success&style=flat)
### Dependencies (Install it globaly)
- fs-extra
- path
- chalk
- inquirer
- @react-native/typescript-config


```bash
# Navigate to your project directory
yarn add babel-plugin-module-resolver --dev
# Run the scaffolder
npx react-native-maker
```

## Now create babel.config.js (root dir)
and copy and paste these code in that file:

```
module.exports = {
  presets: ['module:@react-native/babel-preset'],
 
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@assets": './src/assets',
          "@features": './src/features',
          "@navigation": './src/navigation',
          "@components": './src/components',
          "@state": './src/state',
          "@store": './src/store',
          "@service": './src/service',
          "@styles": './src/styles',
          "@utils": './src/utils',
          "@i18n": './src/i18n',
          "@theme": './src/theme',
          "@constants": './src/constants',
          "@context": './src/context',
          "@hooks": './src/hooks',
        }
      }
    ],
  // other pluging you can add here 
  ]
};
```


![Easy Command to create ](https://img.shields.io/badge/Easy%20Command%20to%20create-how%20to%20install%20or%20use-green?labelColor=success&style=flat)
> **All folder are created, now you can modify files and folder its create typescript files which you may change or delete**

## Configurations Created

### Storage Utilities
- Async Storage Utility
- MMKV Storage Utility
  - Includes methods for:
    - Setting items
    - Getting items
    - Deleting items
    - Clearing storage

### Navigation
- Root Navigator setup
- Navigation reference for programmatic navigation
- Methods for:
  - Navigating to routes
  - Going back
  - Resetting navigation stack

### State Management
Depending on your choice:
- Redux Toolkit: Configured store with example slice
- Zustand: Basic store with increment/decrement example
- Context API: Provider with example state management

### TypeScript Configuration
- Predefined path aliases
- Type root configurations
- Jest type support

## Recommended Next Steps

1. Install dependencies
2. Configure any additional libraries
3. Customize generated files
4. Start building your app!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License


## Troubleshooting

- Ensure you have the latest version of Node.js
- Check that all peer dependencies are installed
- Verify React Native CLI is set up correctly

## Support

For issues or questions, please file an issue on our GitHub repository.
