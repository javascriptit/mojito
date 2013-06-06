/*jslint anon:true, sloppy:true, nomen:true*/
/*global YUI*/
YUI.add('galleryModelYQL', function (Y, NAME) {
    Y.mojito.models[NAME] = {
        init: function (config) {
            this.config = config;
        },

        getData: function (params, tablePath, callback) {
            Y.log("gallery getData called");
            var query = "use '{table}' as gallerylogs; select * from gallerylogs",
                queryParams = {
                    table: tablePath
                },
                cookedQuery = Y.Lang.sub(query, queryParams);

                //Y.log("cookedQuery: " + cookedQuery);

            Y.YQL(cookedQuery, Y.bind(this.onDataReturn, this, callback));
        },

        onDataReturn: function (cb, result) {
            Y.log("onDataReturn called");
            var itemLimit = 10;

            if (result.error === undefined) {

                //Y.log("result:");
                //Y.log(result);

                var results = result.query.results.json;
                results.json = results.json.slice(0, itemLimit);
                //Y.log("results.json:");
                //Y.log(results);


                cb(results);
            } else {
                cb(result.error);
            }
        }
    };


}, '0.0.1', {requires: ['yql', 'substitute']});
