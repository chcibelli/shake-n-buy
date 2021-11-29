$( document ).ready(function() {

    var step = 1;
    var showedItems = [];
    
    let apiCategories = 'https://api.mercadolibre.com/sites/MLA/categories';
    
    $.getJSON(apiCategories, function(data) {
        
        var availableCategories = [];

        //availableCategories.push({label:'Todas las categorias', value:'TODO'});

        $.each(data, function(i,category){
            if(category.id == 'MLA1071' || category.id == 'MLA1540' || category.id == 'MLA1512') {
            } else {
                availableCategories.push({label:category.name, value:category.id});
            }
        });
        
        $('#hidden_categories').append(new Option('', ''));
        for(t=0;t<availableCategories.length;t++) {
            $("#hidden_categories").append(new Option(availableCategories[t].label, availableCategories[t].value));
        }
        $('#hidden_categories option:first').attr('disabled', 'disabled');
        
    });			
    
    $( '#hidden_categories' ).change( function() {
        defaultDisplay();
    });

    $( '#main-btn' ).click(function() {
        
        $('.product-img').fadeOut();
        
        let tope = $('#tope').val();
        let site = 'MLA';
        let category = $('#hidden_categories').val();
        
        if(tope == '' || category == '') {
            defaultDisplay();
            return false;
        }
        
        $('.form-signin').effect( "shake" );
        $('#result').html('').hide();
        $('#share').html('').hide();
        var url = 'https://api.mercadolibre.com/sites/'+site+'/search?status=active&category='+category;
        $.getJSON(url, function(data) {
            
            if (typeof data.results === "undefined") {
                noResults();
            } else {
                var randomItems = [];
                
                $.each(data.results, function(i,item){
                    if(item.price <= tope && !showedItems.includes(item.id)) {
                        randomItems.push({id:item.id, 
                            price:item.price, 
                            thumbnail:item.thumbnail,
                            title:item.title,
                            permalink:item.permalink,
                            free_shipping:item.shipping.free_shipping,
                            listing_type:item.listing_type_id,
                            difference:(item.price/tope*100)}
                        )
                    }
                });
                        
                if(randomItems.length < 1) {
                    noResults();
                    return false;
                }
                        
                Shuffle(randomItems);
                Shuffle(randomItems);

                //randomItems.sort(compare);

                        showedItems.push(randomItems[0].id);
                                                
                        randomItems[0].thumbnail = randomItems[0].thumbnail.replace('http://','https://');
                        
                        let result = '<p><a target="_blank" href="'+randomItems[0].permalink+'""><img src="'+randomItems[0].thumbnail+'" class="product-img"></a></p>';
                        result += '<p class="title">'+randomItems[0].title+'</p>';
                        result += '<p class="price">$ '+randomItems[0].price+'</p>';
                        
                        if(randomItems[0].free_shipping) { result += '<p class="shipping">Envío gratis</p>'; }
                        
                        if(randomItems[0].listing_type == 'gold_pro') { result += '<p class="listing_type">Cuotas sin interes</p>'; }
                        
                        result += '<a target="_blank" href="'+randomItems[0].permalink+'" class="w-100 btn btn-lg btn-primary mb-3">Comprar ahora</a>';
                        result += '<p class="divider"></p>'
                        
                        let tweet = '¿No sabes qué regalar esta navidad 🎄🎄🎄 ?';
                        tweet += ' 📦 📦 Busca tu próximo regalo random en Mercado Libre 👇 ';
                        
                        $('#share').html('<a class="twitter-share-button" href="https://twitter.com/intent/tweet" data-size="large"  data-url="https://chcibelli.github.io/shake-n-buy/" data-text="'+tweet+'">Tweet</a>');
                        twttr.widgets.load();

                if(step == 1) {
                    $('#main-btn').html('¡Dame otra opción!');
                    step = 2;
                } else {
                    $('#main-btn').html('¡Mejor otra opción más!');
                    step = 1;
                }

                $('#result').html(result);
                $('#result, #share').show();  
            }
        });			
    });	
            
    $('#tope').on('keypress',function(e) {
        if(e.which == 13) {
            $('#main-btn').click();
            return false;
        }
        if (e.which > 31 && (e.which < 48 || e.which > 57)) {
            return false;
        }
        
        return true;
    });
            
    function Shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    
    function defaultDisplay(){
        $('#main-btn').html('¿Qué me compro?');
        $('#result').html('<p>Elegí una categoría y completá cuanto queres gastar 🤔</p>').show();
        $('#share').html('').hide();
    }

    function noResults(){
        $('#result').html('<p> No encontré nada por ese precio 😢</p>').show();
        $('#share').html('').hide();
    }

    function compare(a, b) {
        const bandA = a.difference;
        const bandB = b.difference;
        
        let comparison = 0;
        if (bandA < bandB) {
            comparison = 1;
        } else if (bandA > bandB) {
            comparison = -1;
        }
        return comparison;
    }
});