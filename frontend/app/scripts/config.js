'use strict';

bookmarkApp.constant("apiURL", "http://localhost:3000/");

bookmarkApp.config(['$httpProvider', 'apiURL',
    function($httpProvider, apiURL) {

        $httpProvider.defaults.useXDomain = true;

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }
]);
