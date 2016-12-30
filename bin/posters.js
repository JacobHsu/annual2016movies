$http.get('data/posters.json').success(function(data) {
console.warn(data.length);
console.info(data); 
    data.forEach(function(movie, id) {

        var sUrl =checkApi(movie);
        $http.get(sUrl).success(function(oData) {
        	console.info(oData.Title, oData.Poster);
        });
    });
});