$( document ).ready(function() {

    $( "#main-btn" ).click(function() {
        
        $('#result').hide();
        
        let tope = $('#tope').val();
        
        if(tope == '') {
            $('#result').html('<p>Completa cuanto queres gastar 🤔</p>');
            $('#result').show();
            $('#share').html('');
            $('#share').hide();
            return false;
        }
        
        let url = 'https://api.mercadolibre.com/sites/'+site+'/search?valor='+tope.trim();
        
        $.getJSON(url, function(data) {
            
            if (typeof data.seller === "undefined") {
                $('#result').html('<p> No encontre nada 😢</p>');
                $('#share').html('');
                $('#share').hide();    
                $('#result').show();
            } else {
                let result = '<p>XXXX</p>';
                
                result += '<p>XXXXX ';
                result += '</p>';
                
                result += '<p class="divider"></p>'
                                
                let tweet = 'XXXX ';
                tweet += ' 👀 👀 Averigualo en 👇 ';
                
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
        }
    });

    $("#tope").inputFilter(function(value) {
        return /^\d*$/.test(value);
      });
  
});