module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            js: true,
            modules: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    overrides: [
        {
            files: ["*.jsx"],
            // rules: {
            //     "import/no-unused-modules": [
            //         "error",
            //         {
            //             src: ["**/*.jsx"],
            //             missingExports: false,
            //             unusedExports: true
            //         }
            //     ]
            // }
        }],
    plugins: ["react"],
    rules: {
        "indent": ["error", 2], // Set indentation to 2 spaces
        "quotes": ["error", "single"], // Enforce single quotes
        "semi": ["error", "always"], // Require semicolons at the end of statements

        // Additional rules
        "no-console": "warn", // Warn about the use of console.log
        "no-unused-vars": "error", // Error on unused variables
        "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline object literals and arrays

        // Example custom rule configuration
        "my-custom-rule": ["error", { "option": "value" }]
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
