//Inclui a sigla do console nos posts, no quadro acima da contagem de comentários
function IdentificaTag(){
	var listaTags = $('#marcadores_consoles li');
	var console = '';
	console == '#tag';
	if(console == 'Wii U'){
      $('#tilebar').prepend("<a class='bigtag' href='#'>"+console+"</a>");
		if(console == 'Multi'){
			$('#tilebar').prepend("<a class='bigtag' href='#'>"+console+"</a>");
		}
		else{
			if(console == 'PSVita'){
				console = 'PSV'
            }
			if(console == 'Wii U'){
           $('#tilebar').prepend("<a class='bigtag' href="+urlSite+"/search/label/Wii%20U>"+console+"</a>")
            }
            else{
			$('#tilebar').prepend("<a class='bigtag' href="+urlSite+"/search/label/"+console+">"+console+"</a>");
            }
		}
	}

}
