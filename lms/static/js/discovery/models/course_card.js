(function(define) {
    define(['backbone'], function(Backbone) {
        'use strict';

        return Backbone.Model.extend({
            defaults: {
                modes: [],
                course: '',
                enrollment_start: '',
                number: '',
                content: {
                    overview: '',
                    display_name: '',
                    number: ''
                },
                start: '',
		end: '',
                status_code: '',
                status: '',
                image_url: '',
                org: '',
                id: '',
                cluster: '',
		catalog_visibility: '',
		invitation_only: ''
            }
        });
    });
}(define || RequireJS.define));