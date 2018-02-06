import Component from '@ember/component';
import $ from 'jquery';
import { computed } from '@ember/object';
import config from 'ember-get-config';


function sendFeedback(body, followup, { componentID, priorityID, extra } = {}) {
    let { url } = config.microfeedback;
    const payload = {
        body,
        extra: Object.assign({}, {
            followup,
        }, extra),
    };
    if (url) {
        // Add componentID to query params if provided
        const params = {};
        if (componentID) {
            params.componentID = componentID;
        }
        if (priorityID) {
            params.priorityID = priorityID;
        }
        const query = $.param(params);
        url += `?${query}`;

        return $.ajax(url, {
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(payload),
        });
    } else { // Log feedback in development environments
        /* eslint-disable no-console */
        console.warn('MICROFEEDBACK_URL is not configured. Feedback will only be logged to the console.');
        console.debug('DEBUG: MicroFeedback payload:');
        console.debug(payload);
        /* eslint-enable no-console */
    }
}

export default Component.extend({
    body: '',
    text: '',
    followup: false,
    // Valid states: null (unopened), 'active', 'success'
    state: null,
    dialogRows: 5,
    componentID: null,
    open: computed('state', function() {
        const state = this.get('state');
        return state === 'active' || state === 'success';
    }),
    active: computed('state', function() {
        return this.get('state') === 'active';
    }),
    success: computed('state', function() {
        return this.get('state') === 'success';
    }),
    modalClass: computed('styleNamespace', function() {
        return `${this.get('styleNamespace')}Modal`;
    }),
    actions: {
        showDialog() {
            this.set('state', 'active');
        },
        hideDialog() {
            this.set('state', null);
            this.reset();
        },
        submit() {
            const body = this.get('body');
            // Dismiss if no input
            if (!body) {
                this.set('state', null);
                this.reset();
                return;
            }
            const followup = this.get('followup');
            // Optimistically display success message
            this.set('state', 'success');
            this.reset();
            sendFeedback(
                body,
                followup,
                {
                    componentID: this.get('componentID'),
                    priorityID: this.get('priorityID'),
                },
            );
        },
    },
    reset() {
        this.set('body', '');
        this.set('followup', false);
    },
    priorityID: config.microfeedback.JIRA.priorities.Not_Selected,
});
