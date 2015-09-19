var Q = require('q');

module.exports = function (appAccessRouter, integrationService) {
    var route = {};

    route.configure = function () {
        var linkedIn = function (req) {
            return require('node-linkedin')('TODO', 'TODO', 'http://localhost:9080/oauth/linkedin/callback?integrationId=' + req.query.integrationId);
        };

        appAccessRouter.get('/oauth/linkedin', function(req, res) {
            // This will ask for permisssions etc and redirect to callback url.
            var Linkedin = linkedIn(req);
            Linkedin.auth.authorize(res, ['r_basicprofile', 'r_emailaddress']);
        });

        appAccessRouter.get('/oauth/linkedin/callback', function(req, res, next) {
            var Linkedin = linkedIn(req);

            var getAccessToken = Q.nfbind(Linkedin.auth.getAccessToken.bind(Linkedin.auth));

            getAccessToken(res, req.query.code, req.query.state).then(function(results) {
                return integrationService.updateIntegrationAccessToken(req.query.integrationId, results.access_token).then(function () {
                    return res.redirect('/entity/Integration');
                });
            }).catch(next);
        });
    };

    return route;
};
