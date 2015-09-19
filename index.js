exports.installModule = function (injection) {
    injection.bindMultiple('integrationProviders', ['linkedInIntegrationProvider']);
    injection.bindFactory('linkedInIntegrationProvider', require('./linked-in-integration-provider'));
    injection.bindMultiple('appConfigurators', ['linkedInOauthRoute']);
    injection.bindFactory('linkedInOauthRoute', require('./oauth-route'));
};