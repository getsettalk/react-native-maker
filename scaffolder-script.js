#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class ReactNativeProjectScaffolder {
    /**
     * Constructor for the React Native maker
     * @param {string} rootPath - Root path for project scaffolding 
     */
    constructor(rootPath = process.cwd()) {
        this.rootPath = rootPath;
        this.config = {
            bottomNavigation: false,
            storageType: null,
            navigationSetup: false,
            stateManagement: null
        };
    }

    /**
     * Main scaffolding method to guide user through project setup
     */
    async scaffold() {
        console.log(chalk.bold.magenta('🚀 React Native Maker (Project Scaffolder)'));

        try {
            // Interactive prompts
            await this.promptBottomNavigation();
            await this.promptStorageSetup();
            await this.promptNavigationSetup();
            await this.promptStateManagement();

            // Create base directories
            this.createBaseDirectories();

            // Ensure navigation directory exists
            this.ensureNavigationDirectory();

            // Conditional directory and file creation based on user choices
            if (this.config.bottomNavigation) {
                this.setupBottomNavigation();
            }

            if (this.config.storageType) {
                this.setupStorage();
            }

            if (this.config.navigationSetup) {
                this.setupNavigation();
            }

            if (this.config.stateManagement) {
                this.setupStateManagement();
            }

            // Create utility and configuration files
            this.createUtilityFiles();
            this.createTsConfig();

            console.log(chalk.bold.green('✅ Project structure created successfully!'));
        } catch (error) {
            console.error(chalk.red('❌ Scaffolding failed:'), error);
        }
    }

    /**
     * Prompt user about Bottom Tab Navigation setup
     * @returns {Promise<void>}
     */
    async promptBottomNavigation() {
        const { bottomNav } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'bottomNav',
                message: 'Do you want to set up Bottom Tab Navigation?',
                default: false
            }
        ]);
        this.config.bottomNavigation = bottomNav;
    }

    /**
     * Prompt user about storage type
     * @returns {Promise<void>}
     */
    async promptStorageSetup() {
        const { storageType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'storageType',
                message: 'Select a storage solution:',
                choices: [
                    'Async Storage',
                    'React Native MMKV',
                    'None'
                ]
            }
        ]);
        this.config.storageType = storageType;
    }

    /**
     * Prompt user about navigation setup
     * @returns {Promise<void>}
     */
    async promptNavigationSetup() {
        const { navigationSetup } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'navigationSetup',
                message: 'Do you want to set up a comprehensive navigation structure?',
                default: false
            }
        ]);
        this.config.navigationSetup = navigationSetup;
    }

    /**
     * Prompt user about state management
     * @returns {Promise<void>}
     */
    async promptStateManagement() {
        const { stateManagement } = await inquirer.prompt([
            {
                type: 'list',
                name: 'stateManagement',
                message: 'Select a state management solution:',
                choices: [
                    'Redux Toolkit',
                    'Zustand',
                    'Context API',
                    'None'
                ]
            }
        ]);
        this.config.stateManagement = stateManagement;
    }

    /**
     * Ensure navigation directory exists
     */
    ensureNavigationDirectory() {
        const navigationPath = path.join(this.rootPath, 'src/navigation');
        fs.mkdirpSync(navigationPath);
        console.log(chalk.green(`Ensured navigation directory exists: src/navigation`));
    }

    /**
     * Create base project directories
     */
    createBaseDirectories() {
        const baseDirectories = [
            // Assets
            'src/assets/fonts',
            'src/assets/icons/imageIcons',
            'src/assets/icons/svgIcons',

            'src/assets/images/PngAndJpgImages',
            'src/assets/images/SvgImages',
            'src/assets/images/OtherImages',

            // Components
            'src/components/global', // Global reusable components (e.g., buttons, modals)
            'src/components/forms',  // Form-related components (e.g., input fields, validations)

            'src/store', // for state management


            // Constants
            'src/constants',
            'src/hooks', // Custom hooks
            'src/context', // Context providers and consumers

            // Features (Screens by functionality)
            'src/features/auth',     // Authentication screens (e.g., login, register)

            'src/features/dashboard', // Dashboard screens
            'src/features/settings',  // Settings and preferences screens
            'src/features/chat',      // Chat and messaging screens

            // Internationalization
            'src/i18n/locales',      // Localization files (e.g., en.json, es.json)

            // Services
            'src/service',           // API services and integrations

            // Styles and Theme
            'src/styles',            // Common styles (e.g., React Native Styles Which Commonly Used, StyleSheet)
            'src/theme',             // Theme-related files (e.g., colors, typography, dark and light more )

            // Types
            'src/types',             // TypeScript types and interfaces

            // Utilities
            'src/utils',             // Utility functions and helpers
        ];


        baseDirectories.forEach(dir => {
            const fullPath = path.join(this.rootPath, dir);
            fs.mkdirpSync(fullPath);
            console.log(chalk.green(`Created directory: ${dir}`));
        });
    }

    /**
     * Setup Bottom Tab Navigation specific files and folders
     */
    setupBottomNavigation() {
        const bottomNavDirectories = [
            'src/assets/icons/BottomTabIcons',
        ];

        const bottomNavFiles = [
            'src/navigation/BottomTabNavigator.tsx'
        ];

        // Create directories
        bottomNavDirectories.forEach(dir => {
            const fullPath = path.join(this.rootPath, dir);
            fs.mkdirpSync(fullPath);
            console.log(chalk.blue(`Created Bottom Nav directory: ${dir}`));
        });

        // Create files with basic implementations
        bottomNavFiles.forEach(file => {
            const fullPath = path.join(this.rootPath, file);
            const content = this.generateBottomTabContent(file);
            fs.writeFileSync(fullPath, content);
            console.log(chalk.yellow(`Created Bottom Nav file: ${file}`));
        });
    }

    /**
     * Setup Storage solution specific files
     */
    setupStorage() {
        const storageFiles = {
            'Async Storage': [
                {
                    path: 'src/utils/asyncStorage.ts',
                    content: this.generateAsyncStorageContent()
                }
            ],
            'React Native MMKV': [
                {
                    path: 'src/utils/mmkvStorage.ts',
                    content: this.generateMMKVStorageContent()
                }
            ]
        };

        const files = storageFiles[this.config.storageType] || [];
        files.forEach(file => {
            const fullPath = path.join(this.rootPath, file.path);

            // Ensure directory exists
            fs.mkdirpSync(path.dirname(fullPath));

            fs.writeFileSync(fullPath, file.content);
            console.log(chalk.cyan(`Created storage file: ${file.path}`));
        });
    }

    /**
     * Setup Navigation reference files
     */
    setupNavigation() {
        const navigationFiles = [
            {
                path: 'src/navigation/RootNavigator.tsx',
                content: this.generateRootNavigatorContent()
            },
            {
                path: 'src/navigation/NavigationRef.ts',
                content: this.generateNavigationRefContent()
            }
        ];

        navigationFiles.forEach(file => {
            const fullPath = path.join(this.rootPath, file.path);

            // Ensure directory exists
            fs.mkdirpSync(path.dirname(fullPath));

            // Write file
            fs.writeFileSync(fullPath, file.content);
            console.log(chalk.magenta(`Created navigation file: ${file.path}`));
        });
    }

    /**
     * Setup State Management solution
     */
    setupStateManagement() {
        const stateManagementFiles = {
            'Redux Toolkit': [
                {
                    path: 'src/store/index.ts',
                    content: `
                            import { configureStore } from '@reduxjs/toolkit';
                            export const store = configureStore({
                                reducer: {
                                    // Add your reducers here
                                },
                            });
                            export type RootState = ReturnType<typeof store.getState>;
                            export type AppDispatch = typeof store.dispatch;
                            `
                },
                {
                    path: 'src/store/slices/exampleSlice.ts',
                    content: `
                            import { createSlice } from '@reduxjs/toolkit';
                            
                            const initialState = {
                                value: 0,
                            };
                            
                            const exampleSlice = createSlice({
                                name: 'example',
                                initialState,
                                reducers: {
                                    increment: (state) => { state.value += 1; },
                                    decrement: (state) => { state.value -= 1; }
                                },
                            });
                            
                            export const { increment, decrement } = exampleSlice.actions;
                            export default exampleSlice.reducer;
                                            `
                }
            ],
            'Zustand': [
                {
                    path: 'src/store/zustand/exampleStore.ts',
                    content: `
                                import create from 'zustand';
                                
                                type ExampleState = {
                                    value: number;
                                    increment: () => void;
                                    decrement: () => void;
                                };
                                
                                const useExampleStore = create<ExampleState>((set: any) => ({
                                    value: 0,
                                    increment: () => set((state: any) => ({ value: state.value + 1 })),
                                    decrement: () => set((state: any) => ({ value: state.value - 1 })),
                                }));
                                
                                export default useExampleStore;
                                                `
                }
            ],
            'Context API': [
                {
                    path: 'src/context/providers/ExampleProvider.tsx',
                    content: `
                            import React, { createContext, useContext, useState, ReactNode } from 'react';
                            
                            type ExampleContextType = {
                                value: number;
                                increment: () => void;
                                decrement: () => void;
                            };
                            
                            const ExampleContext = createContext<ExampleContextType | undefined>(undefined);
                            
                            const ExampleProvider = ({ children }: { children: ReactNode }) => {
                                const [value, setValue] = useState(0);
                            
                                const increment = () => setValue((prev) => prev + 1);
                                const decrement = () => setValue((prev) => prev - 1);
                            
                                return (
                                    <ExampleContext.Provider value={{ value, increment, decrement }}>
                                        {children}
                                    </ExampleContext.Provider>
                                );
                            };
                            
                            const useExampleContext = () => {
                                const context = useContext(ExampleContext);
                                if (!context) throw new Error('useExampleContext must be used within an ExampleProvider');
                                return context;
                            };
                            
                            export { ExampleProvider, useExampleContext };
                                            `
                }
            ]
        };

        const files = stateManagementFiles[this.config.stateManagement] || [];
        files.forEach(file => {
            const fullPath = path.join(this.rootPath, file.path);

            // Ensure directory exists
            fs.mkdirpSync(path.dirname(fullPath));

            fs.writeFileSync(fullPath, file.content);
            console.log(chalk.cyan(`Created state management file: ${file.path}`));
        });
    }


    /**
     * Create utility files
     */
    createUtilityFiles() {
        const utilFiles = [
            {
                path: 'src/utils/MediaHandler.ts',
                content: this.generateMediaHandlerContent()
            },
            {
                path: 'src/utils/responsive-screen.ts',
                content: this.generateResponsiveScreenContent()
            }
        ];

        utilFiles.forEach(file => {
            const fullPath = path.join(this.rootPath, file.path);

            // Ensure directory exists
            fs.mkdirpSync(path.dirname(fullPath));

            fs.writeFileSync(fullPath, file.content);
            console.log(chalk.yellow(`Created utility file: ${file.path}`));
        });
    }

    /**
     * Create TypeScript Configuration
     */
    createTsConfig() {
        const tsConfigPath = path.join(this.rootPath, 'tsconfig.json');
        const defaultConfig = {
            extends: "@react-native/typescript-config/tsconfig.json",
            compilerOptions: {
                typeRoots: ["node_modules/@types", "src/types"],
                types: ["jest"],
                baseUrl: "./src",
                paths: {
                    "@assets/*": ["assets/*"],
                    "@features/*": ["features/*"],
                    "@navigation/*": ["navigation/*"],
                    "@components/*": ["components/*"],
                    "@state/*": ["state/*"],
                    "@store/*": ["store/*"],
                    "@service/*": ["service/*"],
                    "@styles/*": ["styles/*"],
                    "@utils/*": ["utils/*"],
                    "@i18n/*": ["i18n/*"],
                    "@theme/*": ["theme/*"],
                    "@types/*": ["types/*"],
                    "@constants/*": ["constants/*"],
                    "@context/*": ["context/*"],
                    "@hooks/*": ["hooks/*"]
                }
            }
        };

        fs.writeJsonSync(tsConfigPath, defaultConfig, { spaces: 2 });
        console.log(chalk.blue('Created/Updated tsconfig.json'));
    }

    // Content generation methods
    generateBottomTabContent() {
        return `// Bottom Tab Navigation Placeholder`;
    }

    generateAsyncStorageContent() {
        return `import AsyncStorage from '@react-native-async-storage/async-storage';
      
    /**
     * A utility class for managing AsyncStorage.
     */
    class StorageUtil {
    /**
     * Set a value in AsyncStorage
     * @param key - The key to store the value under
     * @param value - The value to store
     */
    static async setItem(key: string, value: string): Promise<void> {
        try {
        await AsyncStorage.setItem(key, value);
        console.log(\`✅ Successfully saved item with key: \${key}\`);
        } catch (error) {
        console.error(\`❌ Error saving item to AsyncStorage with key \${key}:\`, error);
        }
    }
    
    /**
     * Get a value from AsyncStorage
     * @param key - The key to fetch value from
     * @returns The value or null if not found
     */
    static async getItem(key: string): Promise<string | null> {
        try {
        const value = await AsyncStorage.getItem(key);
        console.log(\`✅ Successfully fetched item with key: \${key}\`);
        return value;
        } catch (error) {
        console.error(\`❌ Error fetching item from AsyncStorage with key \${key}:\`, error);
        return null;
        }
    }
    
    /**
     * Delete an item from AsyncStorage
     * @param key - The key to delete
     */
    static async deleteItem(key: string): Promise<void> {
        try {
        await AsyncStorage.removeItem(key);
        console.log(\`✅ Successfully deleted item with key: \${key}\`);
        } catch (error) {
        console.error(\`❌ Error deleting item from AsyncStorage with key \${key}:\`, error);
        }
    }
    
    /**
     * Clear all items in AsyncStorage
     */
    static async clearAll(): Promise<void> {
        try {
        await AsyncStorage.clear();
        console.log('✅ Successfully cleared all AsyncStorage items');
        } catch (error) {
        console.error('❌ Error clearing AsyncStorage:', error);
        }
    }
    }
    
    export default StorageUtil;
      `;
    }

    generateMMKVStorageContent() {
        return `import { MMKV } from 'react-native-mmkv';
        
        /**
         * A utility class for managing MMKV storage.
         */
        const storage = new MMKV();
        
        class MMKVStorageUtil {
            /**
             * Set a value in MMKV storage.
             * @param key - The key to store the value under.
             * @param value - The value to store.
             */
            static setItem(key: string, value: string): void {
            try {
                storage.set(key, value);
                console.log(\`✅ Successfully saved item with key: \${key}\`);
            } catch (error) {
                console.error(\`❌ Error saving item to MMKV with key \${key}:\`, error);
            }
            }
        
            /**
             * Get a value from MMKV storage.
             * @param key - The key to fetch value from.
             * @returns The value or null if not found.
             */
            static getItem(key: string): string | null {
            try {
                const value = storage.getString(key);
                console.log(\`✅ Successfully fetched item with key: \${key}\`);
                return value;
            } catch (error) {
                console.error(\`❌ Error fetching item from MMKV with key \${key}:\`, error);
                return null;
            }
            }
        
            /**
             * Delete an item from MMKV storage.
             * @param key - The key to delete.
             */
            static deleteItem(key: string): void {
            try {
                storage.delete(key);
                console.log(\`✅ Successfully deleted item with key: \${key}\`);
            } catch (error) {
                console.error(\`❌ Error deleting item from MMKV with key \${key}:\`, error);
            }
            }
        
            /**
             * Clear all data in MMKV storage.
             */
            static clearAll(): void {
            try {
                storage.clearAll();
                console.log('✅ Successfully cleared all MMKV storage items');
            } catch (error) {
                console.error('❌ Error clearing MMKV storage:', error);
            }
            }
        }
        
        export default MMKVStorageUtil;
      `;
    }


    generateRootNavigatorContent() {
        return `// Root Navigator Placeholder`;
    }

    generateNavigationRefContent() {
        return `import { NavigationContainerRef, createNavigationContainerRef } from '@react-navigation/native';
      
      /**
       * Create a navigation reference to use outside of React components.
       */
      export const navigationRef: NavigationContainerRef = createNavigationContainerRef();
      
      /**
       * Navigate to a specific route.
       * @param routeName - The name of the route to navigate to.
       * @param params - The params to pass to the route.
       */
      export function navigate(routeName: string, params?: Record<string, any>): void {
        if (navigationRef.isReady()) {
          navigationRef.navigate(routeName, params);
        } else {
          console.error('Navigation is not ready');
        }
      }
      
      /**
       * Go back to the previous route.
       */
      export function goBack(): void {
        if (navigationRef.canGoBack()) {
          navigationRef.goBack();
        } else {
          console.error('No routes to go back to');
        }
      }
      
      /**
       * Reset the navigation stack to a new route.
       * @param routes - The list of routes to reset to.
       */
      export function resetNavigationStack(routes: Array<{ name: string; params?: Record<string, any> }>): void {
        if (navigationRef.isReady()) {
          navigationRef.reset({
            index: routes.length - 1,
            routes,
          });
        } else {
          console.error('Navigation is not ready');
        }
      }
      `;
    }


    generateMediaHandlerContent() {
        return `// Media Handler Utility Placeholder`;
    }

    generateResponsiveScreenContent() {
        return `// Responsive Screen Utility Placeholder`;
    }


}

// CLI entry point
if (require.main === module) {
    const scaffolder = new ReactNativeProjectScaffolder();
    scaffolder.scaffold().catch(console.error);
}

module.exports = ReactNativeProjectScaffolder;