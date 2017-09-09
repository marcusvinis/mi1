//Inclui a sigla do console nos posts, no quadro acima da contagem de comentários
function MontaIdentificacaoConsole(){
    if($('#tilebar'){
	    
	$('#tilebar').prepend("<a class='bigtag' href='#'>"OKOK"</a>");
	    
	var listaTags = $('#marcadores_consoles li');
	var console = '';
	jQuery.each(listaTags,function(i,tag){
		jQuery.each(listaConsoles,function(i,cons){
			if(tag.innerHTML == cons){
                if(console.length > 1){
					console = 'Multi';
					return false;
				}
				else{
					console += cons;
				}
			}
		});
	});
	if(console.length > 1){
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
}
