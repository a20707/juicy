$(function(){
//start  
   
    $.ajax({
        url:'data.xml',
        type:'GET',
        data:{a:10},
        beforeSend:function(){
            //로딩중
            $('.loading').fadeIn();
        },
        complete:function(){
            //로딩중 삭제
             console.log('2');
            $('.loading').fadeOut();
        },
        
        success:function(data){ 
             console.log('3');

        var product ='', imgSrc,kind,tit,url,type; 
            
        function funList(code){
            console.log(code);
            product = ''; 
            $(data).find('item').each(function(){            

                //↓this는 여기서 말하는 item
                imgSrc = $(this).find('imgSrc').text();
                kind = $(this).find('kind').text();
                name = $(this).find('tit').text();
                url = $(this).find('url').text();   
                
                type =$(this).find('type').text();
                
                
           
                name = name.substr(0,30);           
                name = name.replace(name,name+'...');

            if(code == type || code  == 'p000' ){
 
               product += "<figure>"
               product += "<p><img src='" +imgSrc+ "'alt=''></p>"
               product += "<figcaption>"
               product += "<strong><i>"+kind+"</strong></i>"
               product += "<a href='" +url+"'>"; 
               product += "<p>"+name+"</p>";
               product += "</figcaption>";
               product += "</a>";
               product += "</figure>";
                }
            });  
                $('.list').html(product);
            
        }
        funList('p000');       
    
        $('.tab a').on('click',function(e){
            e.preventDefault();
            var type = $(this).attr('href');             
            funList(type);
            $('.tab a').removeClass('active');
            $(this).addClass('active');
        });
        
            
        }
    });
    
    
    
    
    
    
    
//end    
})



