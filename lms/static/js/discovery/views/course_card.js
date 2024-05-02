(function(define) {
    define([
        'jquery',
        'underscore',
        'backbone',
        'gettext',
        'edx-ui-toolkit/js/utils/date-utils',
        'edx-ui-toolkit/js/utils/html-utils'
    ], function($, _, Backbone, gettext, DateUtils, HtmlUtils) {
        'use strict';

        function formatDate(date, userLanguage, userTimezone) {
            var context;
            context = {
                datetime: date,
                language: userLanguage,
                timezone: userTimezone,
                format: DateUtils.dateFormatEnum.shortDate
            };
            return DateUtils.localize(context);
        }

        return Backbone.View.extend({

            tagName: 'li',
            templateId: '#course_card-tpl',
            className: 'courses-listing-item',

            initialize: function() {
                this.tpl = HtmlUtils.template($(this.templateId).html());
            },

            render: function() {
                var data = _.clone(this.model.attributes);
                var startDate = new Date(data.start);
                var endDate = data.end ? new Date(data.end) : null;
                var today = new Date();
                // start of course tag data	
                let sd = ''	
                let s_y = ''	
                let s_m = ''	
                let s_d = ''	
                sd = new Date(data.start)	
                s_y = sd.getFullYear()	
                s_m = sd.getMonth()	
                s_d = sd.getDay()	
                var start_date = new Date(s_y, s_m, s_d);	
                var ed = new Date(data.end)	
                var e_y = ed.getFullYear()	
                var e_m = ed.getMonth()	
                var e_d = ed.getDay()	
                var end_date = new Date(e_y, e_m, e_d);	
                var today = new Date(Date.now())	
                // console.log(start_date)	
                // console.log(end_date)	
                // console.log(endDate)	;
                if (startDate < today && (endDate != null  && endDate < today)) {
                    // console.log('finished')	
                    data.status_code = "finished"	
                    data.status = "Finalized"	
                } else if (startDate > today && !data.invitation_only) {
                    // console.log('future')	
                    data.status_code = "future"	
                    data.status = "Open for Enrollment"	
                } else if (startDate > today && data.invitation_only) {
                    // console.log('future')	
                    data.status_code = "invitations_only"	
                    data.status = "By Invitation"	
                } else if (startDate < today && !data.invitation_only) {
                    // console.log('ongoing')	
                    data.status_code = "ongoing"	
                    data.status = "Ongoing"	
                } else if (startDate < today && data.invitation_only) {
                    // console.log('ongoing')	
                    data.status_code = "invitations_only"	
                    data.status = "By Invitation"	
                }	
                // end of course tag data
                var userLanguage = '',
                    userTimezone = '';
                if (this.model.userPreferences !== undefined) {
                    userLanguage = this.model.userPreferences.userLanguage;
                    userTimezone = this.model.userPreferences.userTimezone;
                }
                if (data.advertised_start !== undefined) {
                    data.start = data.advertised_start;
                } else {
                    data.start = formatDate(
                        new Date(data.start),
                        userLanguage,
                        userTimezone
                    );
                }
                data.enrollment_start = formatDate(
                    new Date(data.enrollment_start),
                    userLanguage,
                    userTimezone
                );
                HtmlUtils.setHtml(
                    this.$el,
                    this.tpl(data)
                );
                return this;
            }

        });
    });
}(define || RequireJS.define));
