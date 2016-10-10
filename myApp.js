(function(){

	var weather={
		init:function(){
			this.getLocation();
		},

		getLocation:function(){

			'use stric';
			//check if gelocation is available
			if(!navigator.geolocation){

				outPut.innerHtml= "<h4>Geolocation is not supported by your browser</h4>";

			}if (window.chrome ) {

      			  $.getJSON('http://ip-api.com/json', function(response) {
        			
               latitude = response.lat;
         			 longitude = response.lon;  
               var pos=[latitude,longitude];              
                
         			 weather.getWeather(pos);
         		 
        		});

      			}else{

			function succes(position){

			var latitude=position.coords.latitude;
			var longitude=position.coords.longitude;
			var pos=[latitude,longitude];

		  weather.getWeather(pos);

			};

			function error(){	
			output.innerHTML = "Unable to retrieve your location";
		    	};

			navigator.geolocation.getCurrentPosition(succes,error);

		  }
		},

		getWeather:function(pos){
		
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + pos[0] + '&lon=' + pos[1] + '&units=metric&lang=es&appid=3acc16ffae9e45df92a064e41646355f'
				, function(response){
          
          var wheatherData={
              id:response.weather[0].id,
              cityName:response.name,
              todayTemp:response.main.temp,
              todayDescription:function (){

                 var description= response.weather[0].description;            
                 description= description.toString();
                 description= description.charAt(0).toUpperCase()+description.substring(1).toLowerCase();
                //console.log(description);
                  return description;         
                 },
              icon:response.weather[0].icon.id,
              wind:response.wind.speed,
              humidity:response.main.humidity,
              getIcon:'http://openweathermap.org/img/w/'+this.icon+'.png',
              todayMax:response.main.temp_max,
              getCurrentTime:(function getTime(){

                 var timeNow=new Date();
              timeNow.getMilliseconds();
                return timeNow;

              })(),

              sunset:(function (){
                var sunset=response.sys.sunset;
                return sunset;
                                 })()
            };
        
        //day or nigth? check this for setup the right icon
        if(wheatherData.getCurrentTime>wheatherData.sunset){

          console.log("estamo de noche");
          $('#wheatIcon').attr('class', 'wi wi-owm-night-' + wheatherData.id);
          
        }else{

           $('#wheatIcon').attr('class', "wi wi-owm-day-"+wheatherData.id)
          console.log("NO estamo de noche");
        }        
          
      weather.printInfo(wheatherData);
        
			});

		},
    
    printInfo:function(wheatherData){
  
     	$('#geoLocation').html(wheatherData.cityName);
      var celcius=$('<span/>').addClass("celcius").text("ºc");
      $('#temp').html(Math.round(wheatherData.todayTemp));
      $('#temp').append(celcius);

      
      // conversion from mp/h to km/h
      wind=Math.round(wheatherData.wind*1.609344);
      //$('#wind').html("Vientos: "+"<br>"+wind+" km/h");

      $('#description').html(wheatherData.todayDescription());
      $('#wind').html("Viento soplando a:  "+wind+" km/h");

    }

	};

	weather.init();

})();
