//Global scope met name space
var FRISBEE = FRISBEE || {};

//anonymous function
(function ()
{
//local scope = function scope = lexical scope
	FRISBEE.rankingpage =
	{
		title: 'Ranking',
		description: 'See ranking of all teams this season',
		items:
		[
			{ team: "Chasing", win: "2", lost: "2", sw: "7", sl: "9", pw: "35", pl: "39"},
		    { team: "Boomsquad", win: "2", lost: "2", sw: "9", sl: "8", pw: "36", pl: "34"},
		    { team: "Burning Snow", win: "3", lost: "1", sw: "11", sl: "4", pw: "36", pl: "23"},
		    { team: "Beast Amsterdam", win: "2", lost: "2", sw: "6", sl: "8", pw: "30", pl: "34"},
		    { team: "Amsterdam Money Gang", win: "1", lost: "3", sw: "6", sl: "10", pw: "30", pl: "37"}
		]
	};

	FRISBEE.schedulepage = 
	{
		title:'Schedule',
		description:'See schedule for all games',
		items:
		[
		    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
		    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
		    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
		    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
		    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
		    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
		    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
		    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
		    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
		    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
		]

	};

	FRISBEE.gamepage = 
	{
		title:'Game',
		description:'All played games and results',
		items:
		[
			{ score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
		    { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
		    { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
		    { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
		    { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
		    { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
		    { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
		    { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
		    { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
		    { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
		    { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
		    { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
		    { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
		    { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
		    { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
		    { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
		    { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
		    { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
		    { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
		    { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
		    { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
		    { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
		    { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
		]
	};

qwest.get('https://www.dennistel.nl/movies')
     .success(function(response){
        alert(response);
     });


	// Controller Init, wordt uitgevoerd wanneer domgeladen is..?
	FRISBEE.beginning = 
	{	
		init: function () 
		{
			console.log('beginning');
			// pull data: ranking, game, schedule
			FRISBEE.router.init();
		}
	};


	// router
	FRISBEE.router = 
	{
		init: function()
		{
			console.log('router init')
			routie(
			{
				'/rankingpage':function (){
					console.log('router loadRankingPage');
					FRISBEE.page.loadRankingPage();
				},
				'/schedulepage':function (){
					FRISBEE.page.loadSchedulePage();
					console.log('router loadSchedulePage');
				},
				'/gamepage':function (){
					FRISBEE.page.loadGamePage();
					console.log('router loadGamePage');
				},
				'/moviepage':function (){
					FRISBEE.page.loadMoviePage();
				},
				'*':function (){
					FRISBEE.page.loadRankingPage();
					console.log('router loadRankingPage');
				}
			});
		},
		
		// controle welke pagina is geladen in url en welke active moet zijn
		changePage: function() 
		{
			console.log("change");
			var route = window.location.hash.slice(2),
			sections = qwery('section[data-route]'),
			section = qwery('[data-route=' + route + ']')[0];
		
			// Show active section, hide all other
	        if (section) 
	        {
	        	for (var i=0; i < sections.length; i++){
	        		sections[i].classList.remove('active');
	        	}
	        	section.classList.add('active');
	        }

        	// Default route
	    	if (!route) 
	        {
	        	sections[0].classList.add('active');
	        }
		}

	};


	// pagina's
	FRISBEE.page = 
	{
		loadRankingPage: function () {
			console.log('Transparency');
			console.log(qwery('[data-route=rankingpage]')[0]);
			Transparency.render(qwery('[data-route=rankingpage]')[0], FRISBEE.rankingpage);
			FRISBEE.router.changePage();
		},
		loadSchedulePage: function () {
			Transparency.render(qwery('[data-route=schedulepage]')[0], FRISBEE.schedulepage);
			FRISBEE.router.changePage();
		},
		loadGamePage: function () {
			Transparency.render(qwery('[data-route=gamepage]')[0], FRISBEE.gamepage);
			FRISBEE.router.changePage();
		},
		loadMoviePage: function () {
			qwest.get('http://www.dennistel.nl/movies', {type: "json"} )
		     .success(function(response){
		        console.log(response);
		        data = JSON.parse(response)
		        Transparency.render(qwery('[data-route=moviepage]')[0], data);
		     });
			
			FRISBEE.router.changePage();
		}
	}
	// Kijken of DOM klaar is
	domready(function ()
	{	
		console.log("dom is klaar");
		// Kickstart de applicatie wanneer alles geladen is = uitvoeren
		FRISBEE.beginning.init();
	});

})();