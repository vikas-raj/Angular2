// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { SpecReporter } = require('jasmine-spec-reporter');
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        'e2e/sample.ts'
    ],
    
    // multiCapabilities: [
    //   {
    //     'browserName': 'MicrosoftEdge',      
    //   },
    //   {
    //     'browserName': 'chrome',      
    //   }],
    capabilities: {
        'browserName': 'chrome',
        // 'platform': 'ANY',
        // 'version': 'ANY',
        // 'chromeOptions': {
        //     args: ['--no-sandbox', '--test-type=browser'],
        //     // Set download path and avoid prompting for download even though
        //     // this is already the default on Chrome but for completeness
        //     prefs: {
        //         download: {
        //             'prompt_for_download': false,
        //             'directory_upgrade': true,
        //             //'default_directory': "C:\\downloads\\",
        //         }
        //     }
        //}
    },
    directConnect: true,
    baseUrl: "http://fbisretrievedev:444/",//'http://fbisretrievedev:444/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () { }
    },
    onPrepare() {
        //var trx = require('jasmine-trx-reporter');

        //// ONLY FOR DEV
        require('ts-node').register({
          project: './ClientApp/e2e/tsconfig.e2e.json'
        });

        //// ONLY FOR DEV
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        //jasmine.getEnv().addReporter(new jasmine.TrxReporter('ProtractorTestResults.trx'));;

        //var jasmineTrxConfig = {
        //    reportName: 'ProtractorTestResults',
        //    folder: 'testResults',
        //    groupSuitesIntoSingleFile: false
        //};

        //jasmine.getEnv().addReporter(new trx(jasmineTrxConfig));
    }
};

