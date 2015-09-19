module.exports = function () {
    return {
        appId: 'linkedin',
        appName: 'LinkedIn',
        accessTokenUrl: function () {
            return '/oauth/linkedin';
        }
    }
};