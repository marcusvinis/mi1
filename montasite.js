<script language="javascript" type="text/javascript">

var itensNoticia = new Array();
var itensDestaque = new Array();
var itensUltimosDestaques = new Array();
var listaTags = ['Wii','Wii U','DS','3DS'];
var listaColunas = ['Análises','Análise','Blast from the Past','Blast from Japan','Prévia','Discussão','Perfil','N-Blast Responde','Game Music','Blast from the Trash','Stage Select','Item Box','GameDev','Top 10','Xbox Chronicle','Developers','Blast Battle','Blast Up','Analógico','Fail','Guia DLC','Achievement Blast','Trophy Blast','PlayStation Chronicle','Nintendo Chronicle','Pokémon Blast','Blast Test','MythBlasters','Dicas e Truques','Chronicle','Ranking de Vendas','Future Blast','Blast Log','Hands-on','Iwata Asks','Plug and Blast','Random Blast','Entrevista'];

var urlSite = "http://www.gameblast.com.br/";
var tagBusca = '';

//Verificando o site atual e definindo sua url

	//Nintendo Blast
	urlSite = "https://nblast2017.blogspot.com/";
	var listaConsoles = ['Wii U', 'Wii', '3DS', 'DS', 'GB', 'GBA', 'GBC', 'GC', 'SNES', 'N64', 'NES'];
    tagBusca = '~CrossNB';


/*
Realiza uma chamada JSON e recupera os itens de acordo com a url informada
strBlastId: url do feed JSON
tipo: tipo de item, define em qual variável o retorno será armazenado (0: notícia, 1:destaque, 2:últimos destaques)
*/
function getJsonFeed(strBlastId,tipo){	
	//Encapsulando chamada JSON com deferred
	chamada = $.Deferred(function (def) {
		$.ajax({
				url: strBlastId,
				type: 'get',
				dataType: "jsonp",
				async: true,
				success: function(json){
					$(json.feed.entry).each(function(i, entry){
						if(tipo==0){
							itensNoticia.push(entry);
						}
						else if(tipo==1){
							itensDestaque.push(entry);
						}
						else{
							itensUltimosDestaques.push(entry);
						}
					});
					def.resolve(); //Resolvendo o defered, dizendo que terminou a chamada JSON
				}
		})
	}).promise();
	return chamada;
}

//Ordena os itens de uma lista de posts em data decrescente
function ordenaItens(listaItens){
	listaItens.sort(function(x,y){
		var result = 0;
		if(x.published.$t > y.published.$t){
			result = -1;
		}
		else{
			result = 1;
		}
		return result;
	});
}



//Constroi visualmente a lista de notícias
function montaFeedNoticias(){

	//Chamando os feeds
	
     
			//5 itens do site corrente
			chamada1 = getJsonFeed(urlSite+'/feeds/posts/summary/-/~Not%C3%ADcia?max-results=7&alt=json',0);
			//5 itens do GameBlast
                 chamada2 = getJsonFeed('http://www.gameblast.com.br/feeds/posts/summary/-/~Not%C3%ADcia/'+tagBusca+'?max-results=3&alt=json',0);
            

		
		//Condição para a página de notícias/destaques: recupera 10 notícias do GameBlast somente
		

	
	//Condição especial para o GameBlast
	// 3 itens para GB e NB, 2 itens para PB e XB
	

	//Quando as duas chamadas assíncronas foram executadas, monta visualmente
	

	$.when(chamada1, chamada2).done(function() { 
	
		$('#teste-feed').append($(document.createElement('ul')).attr({'id':'listaNoticias'}));
		ordenaItens(itensNoticia);
		jQuery.each(itensNoticia,function(i,entry){
			var itemNoticia = $(document.createElement('li'));
			var linkNoticia = "";
			var urlImagemThumbnail = "";
			var identificacaoBlast = "";
			var linkComentariosFb = "";
			if(entry.media$thumbnail!=null){
				urlImagemThumbnail=entry.media$thumbnail.url;
			}
			var imgTag = $(document.createElement('img')).attr({'src':urlImagemThumbnail, 'class':'item-thumbnail'});
			jQuery.each(entry.link,function(i,url){
				if(url.rel=="alternate"){
					linkNoticia = url.href;
					if(linkNoticia.indexOf('gameblast')>0){
                        identificacaoBlast = "<div class='gbicon'/>";
						itemNoticia.addClass('gbpost');
					}
					return false;
				}
			});
			itemNoticia.append("<a href='"+linkNoticia+"'><div class='item-content'><div class='item-thumbnail'><img src='"+urlImagemThumbnail+"' width='47'/><div class='item-icon'/></div><div class='item-title'>"+entry.title.$t +identificacaoBlast+" </div></div></div></a>");
			$('#listaNoticias').append(itemNoticia);
		});
	});

}



//Últimos Destaques e marcador de consoles - Páginas Index

           
//Últimos Destaques e marcador de consoles - Demais páginas
           
           

//Constroi visualmente os destaques da home
function montaFeedDestaques(){
    if($('#destaque0').length>0){
	//Chamando os feeds
	
	
	//Destaques do site corrente
	chamada1 = getJsonFeed(urlSite+'/feeds/posts/summary/-/~Destaque?max-results=4&alt=json',1);
	//Destaques do GameBlast
                           chamada2 = getJsonFeed('http://www.gameblast.com.br/feeds/posts/summary/-/~Destaque/'+tagBusca+'?max-results=3&alt=json',1);
	

	//Condição especial para o GameBlast
	// 3 itens para GB, 2 itens para NB, PB e XB
	

	//Quando as duas chamadas assíncronas foram executadas, monta visualmente
	

	$.when(chamada1, chamada2).done(function() { 
	
		ordenaItens(itensDestaque);
		jQuery.each(itensDestaque,function(i,entry){
			var destaque = $('#destaque'+i);
			var linkDestaque = "";
			var urlImagem = "";
			var identificacaoBlast = "";
			if(entry.media$thumbnail!=null){
				urlImagem=entry.media$thumbnail.url;
			}
			jQuery.each(entry.link,function(i,url){
				if(url.rel=="alternate"){
					linkDestaque = url.href;
					if(linkDestaque.indexOf('gameblast')>0){
						identificacaoBlast = " <div class='gbicon'/>";
						destaque.addClass('gbpost');
					}
					return false;
				}
			});
			var tags = "";
			var coluna = "";
			jQuery.each(entry.category,function(i,obj){
				jQuery.each(listaConsoles,function(i,tag){
					if(obj.term == tag){
						if(obj.term == 'PSVita'){
							tags += "<div class='bigtag narrow'>PSV</div>";
						}
						else{
							tags += "<div class='bigtag'>"+obj.term+"</div>";
						}
					}
				});
				jQuery.each(listaColunas,function(i,tag){
					if(obj.term == tag){
						if((obj.term == 'Análises')||(obj.term == 'Análise')){
							coluna = 'Jogamos';
						} else if(obj.term == 'Prévia') {
							coluna = 'Vem aí';
						} else if(obj.term == 'N-Blast Responde'){
							coluna = 'Perguntas dos Leitores';
						} else if(obj.term == 'Blast Up'){
							coluna = 'Espaço do Leitor';
                        } else if(obj.term == 'GameDev'){
							coluna = 'Desenvolvendo em XNA';
						} else if(obj.term == 'BlastCast '){
							coluna = 'Podcast';
						} else {
							coluna += obj.term;
						}
						return false;
					}
				});
				
			});
			if(tags.match(/bigtag/g)!=null){
				if(tags.match(/bigtag/g).length>1){
					tags = "<div class='bigtag narrow'>Multi</div>";
				}
			}
			if(i==0){ //Destaque grande
              if(urlImagem.indexOf('/s72-c/')>0){
                  urlImagem = urlImagem.replace('/s72-c/','/s640/');
                }
                if(urlImagem.indexOf('/w640-h300/')>0){
                  urlImagem = urlImagem.replace('/w640-h300/','/s640/');
                }
                if(urlImagem.indexOf('/w640-h300-no/')>0){
                      urlImagem = urlImagem.replace('/w640-h300-no/','/s640/');
                }
				destaque.find('.imgdestaquegrande').css('background-image',"url('"+urlImagem+"')");
			}
			else{
                if(urlImagem.indexOf('/s72-c/')>0){
                  urlImagem = urlImagem.replace('/s72-c/','/s313/');
                }
                if(urlImagem.indexOf('/w640-h300/')>0){
                  urlImagem = urlImagem.replace('/w640-h300/','/s313/');
                }
              	if(urlImagem.indexOf('/w640-h300-no/')>0){
                  urlImagem = urlImagem.replace('/w640-h300-no/','/s313/');
            	}
				destaque.find('.imgdestaque').css('background-image', "url( '"+urlImagem+"') ");
			}
			destaque.children()[0].href = linkDestaque;
			destaque.find('a').append(tags);
			destaque.find('h1').html(entry.title.$t);
			destaque.find('h1').append(identificacaoBlast);
			destaque.find('.toptag').html(coluna);
		});
	});
    }
}
    	
//Faz com que a barra lateral acompanhe a rolagem da página
function fixaBarraLateral(){
	if($('#main-wrapper').height()>$('#sidebar-wrapper').height()){
		var $barraDireita   = $("#sidebar3"),
		rodape = $("#footer-wrapper").offset().top;
		var verificacao = false;
        
		if($('#infoautor').length > 0){
			verificacao = $(window).scrollTop() > (offsetBarraDireita.top-(14*5)+40+$("#sidebar-wrapper").offset().top);
		}
		else{
			verificacao = $(window).scrollTop() > (offsetBarraDireita.top-(14));
            if($("#sidebar3").css('position')=='static'){
            	offsetBarraDireita = $barraDireita.offset();
            }
		}
		if (verificacao){
			$barraDireita.css({'position':'fixed', 'top':'14px','width':'300px'})
		}else {
			 $barraDireita.css({'position':'static', 'top':'14px','width':'300px'})
		}
		if((($barraDireita.offset().top+$barraDireita.height())>rodape)&&($barraDireita.css('position')=='fixed')){
			$barraDireita.css({'position':'absolute', 'top':rodape-151-($barraDireita.height())})
                                                                                                       if(($barraDireita.offset().top+$barraDireita.height())>rodape){
              $barraDireita.css({'position':'absolute', 'top':rodape-261-($barraDireita.height())});
            }
		}
	}
}

                                //Inclui a sigla do console nos posts, no quadro acima da contagem de comentários
function MontaIdentificacaoConsole(){
    if($('#tilebar').length>0){
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
//Inicializa as várias funções após o carregamento da página
$(document).ready(function () {
	
	
	
		montaFeedNoticias();
	

	MontaIdentificacaoConsole();
	
	
		montaFeedDestaques();
	

    offsetBarraDireita = $("#sidebar3").offset();
    $(window).scroll(function() {
		fixaBarraLateral();
	});
});
</script>
