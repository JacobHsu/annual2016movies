'use strict';

var moviesApp = angular.module('moviesApp', []);

moviesApp.controller('listCtrl', function($scope, $http) {

    var checkApi = function(title) {
		switch(title) {
			case "Time Raider":
			case "The Magnificent Seven":
				return 'https://www.omdbapi.com/?t=' + title + '&y=2016&tomatoes=true';
		        break;
			case "Sherlock: The Abominable Bride":
			   	return 'https://www.omdbapi.com/?i=' + 'tt3845232' + '&type=movie&tomatoes=true';
		        break;
		    default:
		        return 'https://www.omdbapi.com/?t=' + title + '&type=movie&tomatoes=true';
		}
  	}

  	var checkData = function(oData) {
		oData.Website  = (oData.Website == "N/A") ? 'https://www.google.com.tw/search?q='+oData.Title : oData.Website ;
    	return oData;
  	}

	$http.get('data/movies.json').success(function(data) {

		$scope.movies = data;
		data.forEach(function(section, id) {
			$scope.movie = [];

			var sApi = checkApi(section.title);
			$http.get(sApi).success(function(oData) {
				oData = checkData(oData);
			    $scope.movie[id] = oData;
			});

			$scope.list = [];

			var list = [];
			section.list.forEach(function(name) {

				var sApi = checkApi(name);

				$http.get(sApi).success(function(oData) {
					oData = checkData(oData);
					list.push(oData);
					$scope.list[id] = list;
				});

			});

		});

	});



});

moviesApp.directive('bgImg', function(){
    return function(scope, element, attrs){
        var url = attrs.bgImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});