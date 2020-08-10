const searchForm = document.querySelector('form');
const search = document.querySelector('input');
const totalConfirmed = document.querySelector('#totalCases');
const totalRecovered = document.querySelector('#totalRecovered');
const totalDeaths = document.querySelector('#totalDeaths');
const ptotalConfirmed = document.querySelector('.totalCases');
const ptotalRecovered = document.querySelector('.totalRecovered');
const ptotalDeaths = document.querySelector('.totalDeaths');
const errorMessage = document.querySelector('#errorMessage');
const worldTotal = document.querySelector('#worldTotal');
const virusIcon = document.querySelector('.virus');
const virusSlashIcon = document.querySelector('.virusSlash');
const skullIcon = document.querySelector('.skull');
const baLang = document.querySelector('#langBa');
const gbLang = document.querySelector('#langGb');
var url = window.location.href;


// DOM ready on page load event listener
document.addEventListener("DOMContentLoaded", function(){
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "04a5eb086cmshe96360c1022de3fp16ce0bjsnaec05fc5a075",
		"Access-Control-Allow-Origin" : "*"
	}
}).then(response => response.json().then((data) => {
    if(data.error) {
        totalConfirmed.textContent = data.error;
        totalRecovered.textContent = '';
        totalDeaths.textContent = '';
        virusIcon.style.display = 'none';
    } else {
        if (url.includes('ba')){
            worldTotal.textContent = 'Svijet';
        } else {
            worldTotal.textContent = 'World';
        }
        totalConfirmed.textContent = data.total_cases + ' (+' + data.new_cases + ')';
        totalRecovered.textContent = data.total_recovered;
        totalDeaths.textContent = data.total_deaths + ' (+' + data.new_deaths + ')';
    }
}))
});

// Check url and add active class
if(url.includes('ba')){
    baLang.classList.add('active');

    var drzave = ['Afganistan','Albanija','Alžir','Američka Djevičanska ostrva','Američka Samoa','Američka Vanjska Ostrva','Andora','Angola','Angvila','Antarktika','Antigva i Barbuda','Argentina','Armenija','Aruba','Australija','Austrija','Azerbejdžan','Bahami','Bahrein','Bangladeš','Barbados','Belgija','Belize','Benin','Bermuda','Bjelorusija','Bocvana','Bolivija','Bosna i Hercegovina','Božićno ostrvo','Brazil','Britanska Djevičanska ostrva','Britanska Teritorija u Indijskom Okeanu','Brunej','Bugarska','Burkina Faso','Burundi','Butan','Centralnoafrička Republika','Crna Gora','Čad','Češka','Čile','Danska','Demokratska Republika Kongo','Dominika','Dominikanska Republika','Džibuti','Egipat','Ekvador','Ekvatorijalna Gvineja','Eritreja','Estonija','Esvatini','Etiopija','Farska ostrva','Fidži','Filipini','Finska','Folklandska ostrva','Francuska','Francuska Gvajana','Francuska Polinezija','Francuske Južne Teritorije','Gabon','Gambija','Gana','Gernzi','Gibraltar','Grčka','Grenada','Grenland','Gruzija','Guam','Gvadalupe','Gvajana','Gvatemala','Gvineja','Gvineja-Bisao','Haiti','Herd i arhipelag MekDonald','Holandija','Honduras','Hong Kong','Hrvatska','Indija','Indonezija','Irak','Iran','Irska','Island','Istočni Timor','Italija','Izrael','Jamajka','Japan','Jemen','Jersey','Jordan','Južna Džordžija i Južna Sendvič ostrva','Južna Koreja','Južni Sudan','Južnoafrička Republika','Kajmanska ostrva','Kambodža','Kamerun','Kanada','Kape Verde','Karipska Holandija','Katar','Kazahstan','Kenija','Kina','Kipar','Kirgistan','Kiribati','Kokosova ostrva','Kolumbija','Komori','Kongo','Kostarika','Kuba','Kukova ostrva','Kurasao','Kuvajt','Laos','Latvija','Lesoto','Liban','Liberija','Libija','Lihtenštajn','Litvanija','Luksemburg','Madagaskar','Mađarska','Majote','Makao','Malavi','Maldivi','Malezija','Mali','Malta','Maroko','Maršalova ostrva','Martinik','Mauricijus','Mauritanija','Meksiko','Mikronezija','Mjanmar','Moldavija','Monako','Mongolija','Monserat','Mozambik','Namibija','Nauru','Nepal','Niger','Nigerija','Nikaragva','Niue','Norveška','Nova Kaledonija','Novi Zeland','Njemačka','Obala Slonovače','Olandska ostrva','Oman','Ostrva Turks i Kaikos','Ostrva Valis i Futuna','Ostrvo Buve','Ostrvo Man','Ostrvo Norfolk','Pakistan','Palau','Palestinska Teritorija','Panama','Papua Nova Gvineja','Paragvaj','Peru','Pitkernska Ostrva','Poljska','Porto Riko','Portugal','Reunion','Ruanda','Rumunija','Rusija','Salvador','Samoa','San Marino','Sao Tome i Principe','Saudijska Arabija','Sejšeli','Senegal','Sijera Leone','Singapur','Sint Marten','Sirija','Sjedinjene Države','Sjeverna Koreja','Sjeverna Makedonija','Sjeverna Marijanska ostrva','Slovačka','Slovenija','Solomonska Ostrva','Somalija','Srbija','Sudan','Surinam','Svalbard i Jan Majen','Sveta Helena','Sveta Lucija','Sveti Bartolomej','Sveti Kits i Nevis','Sveti Martin','Sveti Petar i Mikelon','Sveti Vinsent i Grenadin','Španija','Šri Lanka','Švedska','Švicarska','Tadžikistan','Tajland','Tajvan','Tanzanija','Togo','Tokelau','Tonga','Trinidad i Tobago','Tunis','Turkmenistan','Turska','Tuvalu','Uganda','Ujedinjeni Arapski Emirati','Ujedinjeno Kraljevstvo','Ukrajina','Urugvaj','Uzbekistan','Vanuatu','Vatikan','Venecuela','Vijetnam','Zambija','Zapadna Sahara','Zimbabve'];
    autocomplete(search, drzave);
} else {
    gbLang.classList.add('active');

    var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    autocomplete(search, countries);
}


// Language image click event listener
baLang.addEventListener('click', (e) => {
    if(url.includes('ba')){
    } else {
        window.location.href = url + 'ba';
    }
});

gbLang.addEventListener('click', (e) => {
    if(url.includes('ba')){
        window.location.href = url.replace('/ba', '');
    } else {
    }
});

// Search button event listener
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch('/korona?address=' + location, {
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true 
        },
    })
    .then(response => response.json().then((data) => {
        if(data.error) {
            errorMessage.style.display = '';
            errorMessage.textContent = data.error;
            totalRecovered.textContent = '';
            totalDeaths.textContent = '';
            worldTotal.style.display = 'none';
            virusIcon.style.display = 'none';
            virusSlashIcon.style.display = 'none';
            skullIcon.style.display = 'none';
            ptotalConfirmed.style.display = 'none';
            ptotalRecovered.style.display = 'none';
            ptotalDeaths.style.display = 'none';

        } else {
            worldTotal.style.display = '';
            virusIcon.style.display = '';
            virusSlashIcon.style.display = '';
            skullIcon.style.display = '';
            ptotalConfirmed.style.display = '';
            ptotalRecovered.style.display = '';
            ptotalDeaths.style.display = '';
            errorMessage.style.display = 'none';
            var cases = data.latest_stat_by_country[0].total_cases;
            var newCases = data.latest_stat_by_country[0].new_cases;
            var recovered = data.latest_stat_by_country[0].total_recovered;
            var deaths = data.latest_stat_by_country[0].total_deaths;
            var newDeaths = data.latest_stat_by_country[0].new_deaths;

            worldTotal.textContent = search.value;
            totalConfirmed.textContent = cases + ' (+' + newCases + ')';
            totalRecovered.textContent = recovered;
            totalDeaths.textContent = deaths + ' (+' + newDeaths + ')';
        }
    }));
});

function autocomplete(inp, arr) {

    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}