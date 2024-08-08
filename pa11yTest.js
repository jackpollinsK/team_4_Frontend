/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const pa11y = require('pa11y');

// Define URLs and actions to test
const URLsToTest = [
    {
        url: 'http://localhost:3000/',
        actions: []
    },
    {
        url: 'http://localhost:3000/loginForm',
        actions: []
    },
    {
        url: 'http://localhost:3000/logoutForm',
        actions: []
    },
    {
        url: 'http://localhost:3000/notLoggedIn',
        actions: []
    },
    {
        url: 'http://localhost:3000/notAuthorised',
        actions: [
            'navigate to http://localhost:3000/loginForm',
            'set field #email to eoghan@random.com',
            'set field #password to password321',
            'click element #submit',
            'wait for path to be /',
            'navigate to http://localhost:3000/notAuthorised',
        ]
    },
    {
        url: 'http://localhost:3000/AIJobSearch',
        actions: [
            'navigate to http://localhost:3000/loginForm',
            'set field #email to adam@random.com',
            'set field #password to pass123',
            'click element #submit',
            'wait for path to be /',
            'navigate to http://localhost:3000/AIJobSearch',
        ]
    },
    {
        url: 'http://localhost:3000/jobRoles',
        actions: [
            'navigate to http://localhost:3000/loginForm',
            'set field #email to eoghan@random.com',
            'set field #password to password321',
            'click element #submit',
            'wait for path to be /',
            'navigate to http://localhost:3000/jobRoles',
        ]
    },
    {
        url: 'http://localhost:3000/jobRoles-1',
        actions: [
            'navigate to http://localhost:3000/loginForm',
            'set field #email to eoghan@random.com',
            'set field #password to password321',
            'click element #submit',
            'wait for path to be /',
            'navigate to http://localhost:3000/jobRoles-1',
        ]
    },
    {
        url: 'http://localhost:3000/jobRolesApply-1',
        actions: [
            'navigate to http://localhost:3000/loginForm',
            'set field #email to adam@random.com',
            'set field #password to pass123',
            'click element #submit',
            'wait for path to be /',
            'navigate to http://localhost:3000/jobRolesApply-1',
        ]
    },
];

(async () => {
    for (const test of URLsToTest) {
        try { 
            // Run Pa11y for the URL with Puppeteer options including --no-sandbox
            const results = await pa11y(test.url, {
                actions: test.actions || [],
                // Include the Puppeteer options
                puppeteer: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                }
            });

            // Log results
            if (results.issues.length === 0) {
                console.log(`No accessibility issues found for ${test.url}`);
            } else {
                console.log(`Accessibility issues for ${test.url}:`);
                results.issues.forEach(issue => {
                    console.log(`- ${issue.message} (Context: ${issue.context})`);
                });
            }

        } catch (error) {
            console.error(`Error testing ${test.url}:`, error);
        }
    }
})();