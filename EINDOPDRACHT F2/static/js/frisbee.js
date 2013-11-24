//Global scope met name space
var FRISBEE = FRISBEE || {};

//anonymous function
(function ()
{	
	// opslaan van opgevraagde tournament data in object
	FRISBEE.data =
	{
		tournamentData: {},
		rankingData: {},
		loader: qwery('#loader')[0]
	},


	// Controller Init, wordt uitgevoerd wanneer domgeladen is
	FRISBEE.beginning = 
	{	
		init: function () 
		{
			console.log('beginning');

			//Toon loader image bij verkrijgen van data
			FRISBEE.data.loader.classList.remove('hidden');
			// pull data: ranking, game, schedule
			FRISBEE.leaguevineRouter.getTournamentData();
			FRISBEE.leaguevineRouter.getRankingData();
		}
	},

	// request uitvoeren ophalen en verwerken data
	FRISBEE.leaguevineRouter =
	{
		getTournamentData: function ()
		{
			qwest.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&fields=[id%2C%20pool%2C%20team_1%2C%20team_2%2C%20team_1_score%2C%20team_2_score%2C%20start_time]&limit=200&access_token=8051a725ac').success(function(response)
			{
		       FRISBEE.data.tournamentData = response;
		       FRISBEE.data.loader.classList.add('hidden');
		       console.log(FRISBEE.data.tournamentData);
		       FRISBEE.router.init();
		    });
		},
		// hier begin ik weer !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		getRankingData: function()
		{
			qwest.get('https://api.leaguevine.com/v1/stats/ultimate/team_stats_per_tournament/?tournament_ids=%5B19389%5D&limit=200&access_token=8051a725ac').success(function(response)
			{
		       FRISBEE.data.rankingData = response;
		       FRISBEE.data.loader.classList.add('hidden');
		       console.log(FRISBEE.data.rankingData);
		       FRISBEE.router.init();
		    });
		},

		// Haal data uit formulier op
		postScoreData: function(id)
        {	
        	//zoek waarde formulierveld op met behulp van id en stop in variabele
        	var score1 = qwery("#scoreField1")[0].value;
            var score2 = qwery("#scoreField2")[0].value;

            // Zet de te versturen data om in een JSON object zodat Leaguevine data kan verwerken
			var queryData = { game_id: id, team_1_score: score1, team_2_score: score2, is_final: true };
			var queryData = JSON.stringify(queryData);

			// Maak een XMLHttpRequest object aan om de data te versturen naar Leaguevine
			var xhr = new XMLHttpRequest();
			xhr.open("POST","https://api.leaguevine.com/v1/game_scores/", true);
			xhr.setRequestHeader('Content-type','application/json');
			xhr.setRequestHeader('Authorization','bearer 82996312dc');
			xhr.send(queryData);

			// Controleer wat de response van het xhr object is
			xhr.onreadystatechange = function()
			{
				// Als de readyState gelijk is aan 4 dan is het versturen gelukt
				if(xhr.readyState == 4)
				{
					// Wanneer het versturen gelukt is, geef de games pagina weer
			        // DIT MOET JE ZELF DOEN    ??
			        FRISBEE.leaguevineRouter.getTournamentData();
					FRISBEE.leaguevineRouter.getRankingData();

					window.location = 'index.html#/gamepage';
			        // FRISBEE.page.loadGamepage();
				};
			}
		}
	},

	// router
	FRISBEE.router = 
	{
		init: function()
		{
			console.log('router init')
			routie(
			{
				'/schedulepage':function (){
					console.log('router loadSchedulePage');
					FRISBEE.page.loadSchedulePage();
				},
				'/gamepage':function (){
					console.log('router loadGamePage');
					FRISBEE.page.loadGamePage();
				},

				//scorepage pagina herkennen????????????????????????????????????????????
				'/scorepage/:id':function (id){
					console.log('router loadScorePage'+ id);
					FRISBEE.page.loadScorePage(id);
				},
				'/rankingpage':function (){
					console.log('router loadRankingPage');
					FRISBEE.page.loadRankingPage();
				},
				'*':function (){
				console.log('router * loadSchedulePage');
				FRISBEE.page.loadSchedulePage();
				}
			});
		},
		
		// controle welke pagina is geladen in url en welke active moet zijn
		changePage: function() 
		{
			console.log("change");
			var route = window.location.hash.slice(2);
			sections = qwery('section[data-route]');

			console.log("SUBSTRINGING: " + route.substring(0,9));
			
			if (route.substring(0,9) == 'scorepage'){
				route = 'scorepage';
				console.log("ROUTE ROUTE ROUTING: " + route);
			}			

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
	},


	// pagina's
	FRISBEE.page = 
	{
		loadSchedulePage: function () 
		{
			console.log('FRISBEE.page.loadSchedulePage');
			Transparency.render(qwery('[data-route=schedulepage]')[0], FRISBEE.data.tournamentData);
			FRISBEE.router.changePage();
		},

		loadGamePage: function () 
		{
			console.log('FRISBEE.page.loadGamePage');

			// geeft id van de specifieke game mee aan de url van de edit link met class editScore
			var directives = 
			{
				editScore:
				{
					href: function(params)
					{
						return "#/scorepage/" + this.id;
					}
				}
			};

			// transparency koppelt regel uit directive aan data set
			Transparency.render(qwery('[data-route=gamepage]')[0], FRISBEE.data.tournamentData.objects, directives);
			FRISBEE.router.changePage();
		},
		
		// dit is ook nieuw????????????? Hoe moet ik hier id meesturen? overige info??? KLOPTDIT?? LALALALALALALALALALALALALALLALALALAALALALALA
		loadScorePage: function(id)
		{
			console.log('FRISBEE.page.loadScorePage ' + id);
			for (var i=0; i < FRISBEE.data.tournamentData.objects.length; i++)
			{
	        	if (FRISBEE.data.tournamentData.objects[i].id == id)
	        	{
	        		//data koppelen aan 1e van 1e?????????????????????
	        		Transparency.render(qwery('[data-route=scorepage]')[0], FRISBEE.data.tournamentData.objects[i]);
	        		FRISBEE.router.changePage();
	        	}
	        }

			// iets met submitscore knop doen zodat dat post wordt uitgevoerd.
	        var button = qwery(".submitScore")[0];
            button.addEventListener("click", function() {
            	this.removeEventListener("click", arguments.callee, false);
            	FRISBEE.leaguevineRouter.postScoreData(id);
            	console.log("POSTBUTTON");
            });

		},
		loadRankingPage: function () 
		{
			console.log('FRISBEE.page.loadRankingPage');
		    Transparency.render(qwery('[data-route=rankingpage]')[0], FRISBEE.data.rankingData);
		    FRISBEE.router.changePage();
		},
	},

	// Kijken of DOM klaar is
	domready(function ()
	{	
		console.log("dom is klaar");
		// Kickstart de applicatie wanneer alles geladen is = uitvoeren
		FRISBEE.beginning.init();
	});

})();