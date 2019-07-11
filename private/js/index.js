$(document).ready( function () {


   	var data_yaml;
    $.get('../assets/yaml/modal-data.yaml')
        .done(function (data) {
        data_yaml = jsyaml.load(data);
		for (var key in data_yaml) {
			// skip loop if the property is from prototype
			if (!data_yaml.hasOwnProperty(key)) continue;

			var obj = data_yaml[key];
            var item_html_string = "<div class=\"card\" style=\"width: 18rem;\">";
			item_html_string += "<div class=\"card-body\">";
			item_html_string += "<h5 class=\"card-title\">"+ key +"</h5>";
			item_html_string += "<a href=\"#\" class=\"btn btn-primary\">Edit Me</a>";
			item_html_string += "</div></div>";
			$("#card_section").append(item_html_string);
			for (var prop in obj) {
				// skip loop if the property is from prototype
				if(!obj.hasOwnProperty(prop)) continue;
				// your code
				console.log(prop + " = " + obj[prop]);
			}
		}
     }); 


});
