$( document ).ready(function() {

    let apiCategories = 'https://api.mercadolibre.com/sites/MLA/categories';

    $.getJSON(apiCategories, function(data) {

            var availableCategories = [];
            $.each(data, function(i,category){
                if(category.id == 'MLA1071' || category.id == 'MLA1540' || category.id == 'MLA1512') {
                } else {
                    availableCategories.push({label:category.name, value:category.id});
                }
            });

            for(t=0;t<availableCategories.length;t++) {
                $("#hidden_categories").append(new Option(availableCategories[t].label, availableCategories[t].value));
            }
                    
    });			

    $( "#main-btn" ).click(function() {
        
        $('#result').hide();
        
        let tope = $('#tope').val();
        let site = 'MLA';
        let category = $('#hidden_categories').val();
        
        if(tope == '' || category == '') {
            $('#result').html('<p>Elegí una categoría y completa cuanto queres gastar 🤔</p>');
            $('#result').show();
            $('#share').html('');
            $('#share').hide();
            return false;
        }

        $('.form-signin').effect( "shake" );

        let url = 'https://api.mercadolibre.com/sites/'+site+'/search?status=active&category='+category;

        $.getJSON(url, function(data) {

            if (typeof data.results === "undefined") {
                $('#result').html('<p> No encontre nada por ese precio 😢</p>');
                $('#share').html('');
                $('#share').hide();
                $('#result').show();
            } else {

                var randomItems = [];

                $.each(data.results, function(i,item){
                    if(item.price <= tope) {
                        randomItems.push({id:item.id, 
                                            price:item.price, 
                                            thumbnail:item.thumbnail,
                                            title:item.title,
                                            permalink:item.permalink,
                                            free_shipping:item.shipping.free_shipping,
                                            listing_type:item.listing_type_id})};
                });

                if(randomItems.length < 1) {
                    $('#result').html('<p> No encontre nada por ese precio 😢</p>');
                    $('#share').html('');
                    $('#share').hide();
                    $('#result').show();    
                    return false;
                }

                Shuffle(randomItems);
                Shuffle(randomItems);

                let result = '<p><img src="'+randomItems[0].thumbnail+'" class="product-img"></p>';
                result += '<p class="title">'+randomItems[0].title+'</p>';
                result += '<p class="price">$ '+randomItems[0].price+'</p>';

                if(randomItems[0].free_shipping) { result += '<p class="shipping">Envío gratis</p>'; }

                if(randomItems[0].listing_type == 'gold_pro') { result += '<p class="listing_type">Cuotas sin interes</p>'; }

                result += '<a target="_blank" href="'+randomItems[0].permalink+'" class="w-100 btn btn-lg btn-primary mb-3">Comprar ahora</a>';
                result += '<p class="divider"></p>'
                                
                let tweet = '¿No sabes qué comprar o regalar? 📦 ';
                tweet += ' 👀 👀 Busca tu próxima compra random de Mercado Libre en 👇 ';
                
                $('#share').html('<a class="twitter-share-button" href="https://twitter.com/intent/tweet" data-size="large"  data-url="https://chcibelli.github.io/shake-n-buy/" data-text="'+tweet+'">Tweet</a>');
                twttr.widgets.load();
                
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
    };

});