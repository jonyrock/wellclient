sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller) {
	"use strict";
	return Controller.extend("com.lambda.sberdeal.controller.Main", {
	    onInit: function() {
	        
	    },
	    
		/**
    	*@memberOf com.lambda.sberdeal.controller.Main
    	*/
        onSearch: function () {
            var query = this.byId("searchView").getValue();
            
	        var that = this;
	        jQuery
	            .get("https://wellcontractp1941992242trial.hanatrial.ondemand.com/calc?company=" + query)
	            .done(function(response) {
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(response);
                    that.getView().setModel(oModel);
	                
                    var container = that.byId("featuresContainer");
                    
                    container.removeAllItems();
                    
                    for (var key in response) {
                        if (response.hasOwnProperty(key)) {
                            debugger;
                            var fragment = sap.ui.xmlfragment("com.lambda.sberdeal.view.ResponseItem");
                            fragment.byId("paramName").bindText("/" + key + "/name");
                            fragment.byId("paramMin").bindText("/" + key + "/start");
                            fragment.byId("paramMax").bindText("/" + key + "/end");
                            var slider = fragment.byId("paramValue");
                            // slider
            	            container.addItem(fragment);
                        }
                    }
	            });
		}
	});
});