/**
 * jQuery Gradientify plugin 1.0.0
 *
 * Provides animating CSS gradients.
 * Based on http://opticalcortex.com/animating-css-gradients/ by Mike Byrne.
 *
 * @author  Codefog <http://codefog.pl>
 * @author  Kamil Kuzminski <kamil.kuzminski@codefog.pl>
 * @license MIT License
 * @see     http://opticalcortex.com/animating-css-gradients/
 */
(function ($, window, document, undefined) {

	'use strict';

    	// Create the defaults once
	var pluginName = 'popcornBar',
        defaults = {
		barStructure: null,
		barIcon: null
        };

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			//TODO implement modernizer

			this.buildpopcornBar();
		},

		buildpopcornBar: function () {
			var structure = this.settings.barStructure;

			//Build bar icon
			var $barIcon = $("<div id='barIcon'>");
			//if any icon has been specified

			//Build bar items
			var $barContents = $("<div id='barContents'>");

			var item = new barItem(structure, 0);
			var $barItems = item.buildHTML();

			$barContents.append($barItems);
			$("#bar").append($barIcon);
			$("#bar").append($barContents);

			$("#barIcon").click(function(){
				helpers.toggleBar();
			});

			$("#barContents > ul > li").click(function(){
				helpers.clickSubItem(this);
			});

		},
		


	});

	var helpers = {
		toggleBar: function(){
			var curClass = $("#bar").attr("class");
			if(curClass == "activeBar"){
				$("#bar").removeClass("activeBar");
			}else{
				$("#bar").addClass("activeBar");
			}
		},
		clickSubItem: function(itemTitle){

			var subItem = $(itemTitle).children("ul");
			var itemClasses = subItem.attr("class");
			if(itemClasses != null){
				itemClasses = itemClasses.split(" ");
				var foundActive = false;
				/*
				for(var i = 0; i < itemClasses.length; i++){
					if(itemClasses[i] == "activeBarSubItem"){
						foundActive = true;
					}
				}*/
				var subItemClasses = $("." + $(subItem).attr("id"));
				for (var i = 0; i < subItemClasses.length; i++){
					if(subItemClasses[i].className.includes("activeBarSubItem")){
						foundActive = true;
					}
				}


				//Unexpand all active
				helpers.minimizeSubItems();

				if(!foundActive){
					helpers.expandSubItem(subItem);
				}
			}
		},

		expandSubItem: function(subItem){

			//Take children then append after the parent
			var subItemParent = subItem.parent();
			var subItemChildren = subItem.children();
			for (var i = subItemChildren.length; i >= 0; i--){
				var child = $(subItemChildren[i]).detach();
				$(subItemParent[0]).after(child);
				//Give the children the classname for where they were
				var level = $(subItemChildren[i]).attr("level");
				$(subItemChildren[i]).addClass(subItem[0].id);
				$(subItemChildren[i]).addClass("barItem");
				$(subItemChildren[i]).addClass("activeBarSubItem" + level);
			}

		},

		minimizeSubItems: function(){
			var activeSubItems = $(".activeBarSubItem1");
			$(".activeBarSubItem2").each(function(i){
				activeSubItems.push($(this));
			});
			for (var i = 0; i < activeSubItems.length; i++){
				if(activeSubItems[i] != null){

					//grab the classname refering to it's parents id
					var classNames = activeSubItems[i][0].className;
					if(classNames != null){
						classNames = classNames.split(" ");
						//Find what the id of it's parent used to be
						var idClassName;
						for (var j = 0; j < classNames.length; j++){
							if(classNames[j] != "barItem" && classNames[j].includes("activeBarSubItem")  -1){
								idClassName = classNames[j];
							}
						}
						$(activeSubItems[i][0]).removeClass();
						$(activeSubItems[i][0]).addClass("barSubItem");

						//add back to previous position
						var test = activeSubItems[i][0];
						activeSubItems[i][0].remove();
						$("#" + idClassName).append(test);
					}
				}
			}
		}
	};

	//Helper Class
	var barItem = class {
		constructor(listItem,level){

			if(level == 0 ){
				this.name == null;	
				this.subStructure = listItem;
			}else{
				this.name = listItem.name;
				if(listItem.subStructure == null){
					this.itemType = "Link";
					this.link = listItem.link;
					this.value = listItem.value;
				}else{
					this.itemType = "Substructure";
					this.subStructure = listItem.subStructure;

				}
				//TODO Hybrid list item


			}
			this.level = level;
		};
		buildSubStructure(struct,level, name){

			var listItems = "";
			var subStrc;
			for(var i = 0; i < struct.length; i++){
				subStrc = new barItem(struct[i],level+1);
				listItems = listItems + subStrc.buildHTML();
			}

			if(name == "" || name == null){
				return "<ul>" + listItems + "</ul>";
			}else{
				return "<li id='" + name.replace(' ','') + "'" +
					"class='barSubItem" + level.toString() + "'>" +
					"<a class='noselect' >" + name + "</a>" +
					"<ul id='barItem" + name.replace(' ','') +  "' class='barContents'>" +
					listItems +
					"</ul>" +
					"</li>";
			}
		};

		buildHTML(){
			//Main structure of bar
			if(this.level == 0){
				return this.buildSubStructure(this.subStructure, 0, null);
			}else{
				if(this.itemType == "Link"){
					var className = "";
					if(this.level > 1){
						className = "barSubItem";
					}else{
						className = "barSubItem" + this.level;
					}
					return "<li level='" + this.level + "' class='noselect " + className + "' id='" + this.name+ "'><a href='" +this.link  +"' >" + this.value + "</a></li>";
				}else{

					return this.buildSubStructure(this.subStructure, this.level, this.name);

				}
			}
		};

	};



	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
