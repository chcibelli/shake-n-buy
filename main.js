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
        
        let url = 'https://api.mercadolibre.com/sites/'+site+'/search?q='+tope.trim();

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
            return false;
        }
        if (e.which > 31 && (e.which < 48 || e.which > 57)) {
            return false;
        }
        
        return true;
    });

    var availableSites = [ 
        {label:"Argentina 🇦🇷", value:"MLA"}, 
        {label:"Bolivia 🇧🇴",value:"MBO"},
        {label:"Brasil 🇧🇷", value:"MLB"},
        {label:"Chile 🇨🇱", value:"MLC"},
        {label:"Colombia 🇨🇴", value:"MCO"},
        {label:"Costa Rica 🇨🇷", value:"MCR"},
        {label:"Cuba 🇨🇺", value:"MCU"},
        {label:"Dominicana 🇩🇴", value:"MRD"},
        {label:"Ecuador 🇪🇨", value:"MEC"},
        {label:"Guatemala 🇬🇹", value:"MGT"},
        {label:"Honduras 🇭🇳", value:"MHN"},
        {label:"Mexico 🇲🇽", value:"MLM"},
        {label:"Nicaragua 🇳🇮", value:"MNI"},
        {label:"Panama 🇵🇦", value:"MPA"},
        {label:"Paraguay 🇵🇾", value:"MPY"},
        {label:"Perú 🇵🇪", value:"MPE"},
        {label:"Uruguay 🇺🇾", value:"MLU"},
        {label:"Venezuela 🇻🇪", value:"MLV"}
    ];

    for(t=0;t<availableSites.length;t++) {
        $("#hidden_site").append(new Option(availableSites[t].label, availableSites[t].value));
    }    

});