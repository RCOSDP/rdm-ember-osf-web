/* eslint-env node */

function isTruthy(val) {
    return ['true', '1'].includes(val.toString().toLowerCase());
}

let localConfig;

try {
    localConfig = require('./local'); // eslint-disable-line global-require
} catch (ex) {
    localConfig = {};
}

const {
    ORGANIZATION: organization = 'Center for Open Science',
    A11Y_AUDIT = 'true',
    ASSETS_PREFIX: assetsPrefix = '/ember_osf_web/',
    BACKEND: backend = 'local',
    CAS_URL: casUrl = 'http://192.168.168.167:8080',
    CLIENT_ID: clientId,
    ENABLED_LOCALES = 'en, en-US',
    COLLECTIONS_ENABLED = false,
    REGISTRIES_ENABLED = false,
    HANDBOOK_ENABLED = false,
    HANDBOOK_DOC_GENERATION_ENABLED = false,
    FB_APP_ID,
    GIT_COMMIT: release,
    GOOGLE_ANALYTICS_ID,
    KEEN_CONFIG: keenConfig,
    LINT_ON_BUILD: lintOnBuild = false,
    MIRAGE_ENABLED = false,
    OAUTH_SCOPES: scope,
    ORCID_CLIENT_ID: orcidClientId,
    OSF_PAGE_NAME: pageName = 'OSF',
    OSF_SHORT_BRAND: shortBrand = 'OSF',
    OSF_LONG_BRAND: longBrand = 'Open Science Framework',
    OSF_STATUS_COOKIE: statusCookie = 'osf_status',
    OSF_COOKIE_DOMAIN: cookieDomain = 'localhost',
    OSF_URL: url = 'http://localhost:5000/',
    OSF_API_URL: apiUrl = 'http://localhost:8000',
    OSF_API_VERSION: apiVersion = '2.8',
    OSF_RENDER_URL: renderUrl = 'http://localhost:7778/render',
    OSF_FILE_URL: waterbutlerUrl = 'http://localhost:7777/',
    OSF_HELP_URL: helpUrl = 'http://localhost:4200/help',
    OSF_AUTHENTICATOR: osfAuthenticator = 'osf-cookie',
    POLICY_URL_PREFIX = 'https://github.com/CenterForOpenScience/centerforopenscience.org/blob/master/',
    POPULAR_LINKS_NODE: popularNode = '57tnq',
    // POPULAR_LINKS_REGISTRATIONS = '',
    NEW_AND_NOTEWORTHY_LINKS_NODE: noteworthyNode = 'z3sg2',
    /* eslint-disable-next-line max-len */
    // https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha-v2-what-should-i-do
    RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    REDIRECT_URI: redirectUri,
    ROOT_URL: rootURL = '/',
    SHARE_BASE_URL: shareBaseUrl = 'https://staging-share.osf.io/',
    SHARE_API_URL: shareApiUrl = 'https://staging-share.osf.io/api/v2',
    SHARE_SEARCH_URL: shareSearchUrl = 'https://staging-share.osf.io/api/v2/search/creativeworks/_search',
    SOURCEMAPS_ENABLED: sourcemapsEnabled = true,
    NAV_DROPDOWN_ENABLED = true,
    NAV_QUICKFILES_ENABLED = true,
    NAV_REGISTRATIONS_ENABLED = true,
    NAV_SEARCH_ENABLED = true,
    NAV_SUPPORT_ENABLED = true,
    NAV_DONATE_ENABLED = true,
    NAV_SIGNUP_ENABLED = true,
    NAV_EMBEDDEDDS_ENABLED = false,
    USE_SIMPLE_PAGE = false,
    EMBEDDEDDS_URL: dsUrl = '',
} = { ...process.env, ...localConfig };

module.exports = function(environment) {
    const devMode = environment !== 'production';

    const ENV = {
        organization,
        modulePrefix: 'ember-osf-web',
        environment,
        lintOnBuild,
        sourcemapsEnabled,
        rootURL,
        assetsPrefix,
        locationType: 'auto',
        sentryDSN: null,
        sentryOptions: {
            release,
            ignoreErrors: [
                // https://github.com/emberjs/ember.js/issues/12505
                'TransitionAborted',
            ],
        },
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false,
            },
        },
        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },
        i18n: {
            defaultLocale: 'en-US',
            enabledLocales: ENABLED_LOCALES.split(/[, ]+/),
        },
        moment: {
            includeTimezone: 'all',
            outputFormat: 'YYYY-MM-DD h:mm A z',
        },
        metricsAdapters: [
            {
                name: 'GoogleAnalytics',
                environments: ['all'],
                config: {
                    id: GOOGLE_ANALYTICS_ID,
                    setFields: {
                        anonymizeIp: true,
                    },
                },
                dimensions: {
                    authenticated: 'dimension1',
                    resource: 'dimension2',
                    isPublic: 'dimension3',
                },
            },
            {
                name: 'Keen',
                environments: keenConfig ? ['all'] : [],
                config: {
                    ...keenConfig,
                },
            },
        ],
        FB_APP_ID,
        microfeedback: {
            enabled: true,
            url: null,
            pageParams: {
                // Mapping of pageName to query params to add
                // to the base MicroFeedback URL
                // e.g. {
                //    QuickFiles: {
                //        componentID: '13836',
                //        priorityID: '10100',
                //    }
                // }
                QuickFiles: {},
            },
        },
        OSF: {
            pageName,
            shortBrand,
            longBrand,
            clientId,
            scope,
            apiNamespace: 'v2', // URL suffix (after host)
            backend,
            redirectUri,
            url,
            apiUrl,
            apiVersion,
            apiHeaders: {
                ACCEPT: `application/vnd.api+json; version=${apiVersion}`,
            },
            renderUrl,
            waterbutlerUrl,
            helpUrl,
            shareBaseUrl,
            shareApiUrl,
            shareSearchUrl,
            devMode,
            cookieDomain,
            authenticator: `authenticator:${osfAuthenticator}`,
            cookies: {
                status: statusCookie,
                keenUserId: 'keenUserId',
                keenSessionId: 'keenSessionId',
                analyticsDismissAdblock: 'adBlockDismiss',
                cookieConsent: 'osf_cookieconsent',
                maintenance: 'maintenance',
                csrf: 'api-csrf',
                authSession: 'embosf-auth-session',
            },
            localStorageKeys: {
                authSession: 'embosf-auth-session',
                joinBannerDismissed: 'slide', // TODO: update legacy UI to use a more unique key
            },
            orcidClientId,
            casUrl,
            simplePage: Boolean(USE_SIMPLE_PAGE),
        },
        social: {
            twitter: {
                viaHandle: 'OSFramework',
            },
        },
        signUpPolicy: {
            termsLink: `${POLICY_URL_PREFIX}TERMS_OF_USE.md`,
            privacyPolicyLink: `${POLICY_URL_PREFIX}PRIVACY_POLICY.md`,
            cookiesLink: `${POLICY_URL_PREFIX}PRIVACY_POLICY.md#f-cookies`,
        },
        footerLinks: {
            cos: 'https://cos.io',
            statusPage: 'https://status.cos.io/',
            apiDocs: 'https://developer.osf.io/',
            topGuidelines: 'http://cos.io/top/',
            rpp: 'https://osf.io/ezcuj/wiki/home/',
            rpcb: 'https://osf.io/e81xl/wiki/home/',
            twitter: 'http://twitter.com/OSFramework',
            facebook: 'https://www.facebook.com/CenterForOpenScience/',
            googleGroup: 'https://groups.google.com/forum/#!forum/openscienceframework',
            github: 'https://www.github.com/centerforopenscience',
        },
        support: {
            preregUrl: 'https://cos.io/prereg/',
            statusPageUrl: 'https://status.cos.io',
            faqPageUrl: 'http://help.osf.io/m/faqs/l/726460-faqs',
            supportEmail: 'support@osf.io',
            contactEmail: 'contact@osf.io',
            consultationUrl: 'https://cos.io/stats_consulting/',
            twitterUrl: 'https://twitter.com/OSFSupport',
            mailingUrl: 'https://groups.google.com/forum/#!forum/openscienceframework',
            facebookUrl: 'https://www.facebook.com/CenterForOpenScience/',
            githubUrl: 'https://github.com/centerforopenscience',
        },
        dashboard: {
            popularNode,
            noteworthyNode,
        },
        featureFlagNames: {
            routes: {
                'guid-node.forks': 'ember_project_forks_page',
                'guid-registration.forks': 'ember_project_forks_page',
                'guid-node.analytics.index': 'ember_project_analytics_page',
                'guid-registration.analytics.index': 'ember_project_analytics_page',
                'guid-node.registrations': 'ember_project_registrations_page',
                'settings.tokens': 'ember_user_settings_tokens_page',
                'settings.tokens.index': 'ember_user_settings_tokens_page',
                'settings.tokens.create': 'ember_user_settings_tokens_page',
                'settings.tokens.edit': 'ember_user_settings_tokens_page',
                'settings.developer-apps': 'ember_user_settings_apps_page',
                'settings.developer-apps.index': 'ember_user_settings_apps_page',
                'settings.developer-apps.create': 'ember_user_settings_apps_page',
                'settings.developer-apps.edit': 'ember_user_settings_apps_page',
                register: 'ember_auth_register',
            },
            navigation: {
                institutions: 'institutions_nav_bar',
            },
            storageI18n: 'storage_i18n',
        },
        gReCaptcha: {
            siteKey: RECAPTCHA_SITE_KEY,
        },
        home: {
            youtubeId: '2TV21gOzfhw',
        },
        navbar: {
            useDropdown: Boolean(NAV_DROPDOWN_ENABLED),
            useQuickfiles: Boolean(NAV_QUICKFILES_ENABLED),
            useRegistrations: Boolean(NAV_REGISTRATIONS_ENABLED),
            useSearch: Boolean(NAV_SEARCH_ENABLED),
            useSupport: Boolean(NAV_SUPPORT_ENABLED),
            useDonate: Boolean(NAV_DONATE_ENABLED),
            useSignup: Boolean(NAV_SIGNUP_ENABLED),
            useEmbeddedDS: Boolean(NAV_EMBEDDEDDS_ENABLED),
        },
        embeddedDS: {
            dsUrl,
        },
        secondaryNavbarId: '__secondaryOSFNavbar__',
        engines: {
            // App Engines should always be enabled in production builds
            // as they will be enabled/disabled at runtime rather than buildtime
            collections: {
                enabled: !devMode || isTruthy(COLLECTIONS_ENABLED),
            },
            registries: {
                enabled: !devMode || isTruthy(REGISTRIES_ENABLED),
            },
            handbook: {
                enabled: isTruthy(HANDBOOK_ENABLED),
                docGenerationEnabled: HANDBOOK_DOC_GENERATION_ENABLED,
            },
        },
        'ember-cli-tailwind': {
            shouldIncludeStyleguide: false,
        },
        'ember-cli-mirage': {
            enabled: Boolean(MIRAGE_ENABLED),
        },

        defaultProvider: 'osf',
        dsconfig: {
          wayf_URL: "https://test-ds.gakunin.nii.ac.jp/WAYF",
          wayf_sp_entityID: "https://accounts.test.rdm.nii.ac.jp/shibboleth-sp",
          wayf_sp_handlerURL: "https://accounts.test.rdm.nii.ac.jp/Shibboleth.sso",
          wayf_return_url: "https://accounts.test.rdm.nii.ac.jp/login?service=https://test.rdm.nii.ac.jp/",
          wayf_width: 430,
          wayf_height: "auto",
          wayf_show_remember_checkbox: false,
          wayf_force_remember_for_session: false,
          wayf_use_small_logo: true,
          wayf_hide_logo: true,
          wayf_show_categories: false,
          wayf_overwrite_intro_text: "",
          wayf_font_size: 11,
          wayf_font_color: "#000000",
          wayf_border_color: "#00247D",
          wayf_background_color: "#F4F7F7",
          wayf_auto_login: true,
          wayf_hide_after_login: false,
          wayf_hide_categories:  new Array("all"),
          wayf_unhide_idps: new Array(
            "https://openidp.nii.ac.jp/idp/shibboleth",
            "https://idp.rdm.nii.ac.jp/idp/shibboleth",
            "https://shib.nagoya-u.ac.jp/idp/shibboleth",
            "https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth"
         ),
         wayf_additional_idps: [
           {name: "OpenIdP",
              entityID: "https://openidp.nii.ac.jp/idp/shibboleth",
              SAML1SSOurl: "https://openidp.nii.ac.jp/idp/profile/Shibboleth/SSO"},
           {name: "GakuNin RDM IdP",
              entityID: "https://idp.rdm.nii.ac.jp/idp/shibboleth",
              SAML1SSOurl: "https://idp.rdm.nii.ac.jp/idp/profile/Shibboleth/SSO"},
         ],
         wayf_sp_cookie_path: "/",
         wayf_list_height: 350,
         additional_html: `
<style>  
div#wayfInMenu {
 float: left !important;
}
div#wayf_div {
 padding: 5px !important;
 width: auto !important;
 max-width: 430px !important;
}
.wayf_col .wayf_col {
 flex-direction: row !important;
 padding-left: 0px !important;
 padding-right: 0px !important;
}
div.wayf_radioArea {
 display: none !important;
}
div.wayf_row {
 padding-left: 5px !important;
 padding-right: 5px !important;
}
div.wayf_linkArea {
 align-content: center !important;
}
form#IdPList table tbody {
 display: flex !important;
 flex-direction: row !important;
}
form#IdPList table tbody tr td div#clear_a {
 text-decoration: none;
 margin-top: 10px;
 margin-left: 5px;
 margin-right: 3px;
}
@media only screen and (max-width: 768px) {
 #wayf_div .wayf_inputArea {
  flex-wrap: nowrap !important;
 }
 #wayf_submit_div {
  width: auto !important;
 }
}
@media only screen and (max-width: 767px) {
 #wayf_div .wayf_inputArea {
  flex-wrap: wrap !important;
 }
 #wayf_submit_div {
  width: 100% !important;
 }
}
</style>
        `
      }

    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;

        ENV.metricsAdapters[0].config.cookieDomain = 'none';

        Object.assign(ENV, {
            'ember-a11y-testing': {
                componentOptions: {
                    turnAuditOff: !isTruthy(A11Y_AUDIT),
                },
            },
        });
    }

    if (environment === 'test') {
        Object.assign(ENV, {
            // Testem prefers this...
            locationType: 'none',
            // Test environment needs to find assets in the "regular" location.
            assetsPrefix: '/',
            // Always enable mirage for tests.
            'ember-cli-mirage': {
                enabled: true,
            },
            APP: {
                ...ENV.APP,
                // keep test console output quieter
                LOG_ACTIVE_GENERATION: false,
                LOG_VIEW_LOOKUPS: false,
                rootElement: '#ember-testing',
                autoboot: false,
            },
            engines: {
                ...ENV.engines,
                collections: {
                    enabled: true,
                },
                registries: {
                    enabled: true,
                },
            },
        });
    }

    if (devMode) {
        // Fallback to throwaway defaults if the environment variables are not set
        ENV.metricsAdapters[0].config.id = ENV.metricsAdapters[0].config.id || 'UA-84580271-1';
        ENV.FB_APP_ID = ENV.FB_APP_ID || '1039002926217080';
    }

    return ENV;
};
