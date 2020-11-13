$(function(){
//start  
    
   
    $.ajax({
        url:'data.xml',
        type:'GET',
        data:{a:10},
        beforeSend:function(){
            //로딩중
            $('.menu_loading').fadeIn();
        },
        complete:function(){
            $('.menu_loading').fadeOut();
        },
        
        success:function(data){ 
            
             console.log('3');
            
        //↓변수를 하나 만들어주면서 ''(빈칸)을 주는 이유는 만약에 첫번째 값이 =이 아니라 += 상황이 온다면 값이 없는 곳에 
        var product ='', type,imgSrc,name; 
            
        function funList(code){
            product = ''; 
            
            $(data).find('item').each(function(){
                //↓this는 여기서 말하는 item
                type =$(this).find('type').text();
                imgSrc = $(this).find('imgSrc').text();
                name = $(this).find('name').text(); 
                
                
            //↓글자가 너무 기니까 몇 글자 이상 넘어가면 잘라주기 위해서 substr을 사용한다
                name = name.substr(0,10);
            //  name 이란 변수에 name에 .substr로 0번째부터 20번째 글자까지만 나오게
                
            //↓substr만 하면 글자가 걍 잘려서 뒤가 없어보이기 때문에 ...을 추가해주기 위하여 replace 사용
//                name = name.replace(name,name+'...');
            //replace(name -> 위에서 자른 글자,name+'...' ->네임에 ...을 더해줌)    

            if(code == type){ //|| code  == 'menu00'
 
               product += "<li>"
               product += "<div>"
               product += "<img src='" +imgSrc+ "'alt=''>"
               product += "<p>"+name+"</p>";
               product += "</div>";
               product += "</li>";
                
                }
            });  
                $('.menu-content').html(product);            
                $('.menu-list li a').removeClass('active');            
                $(".menu-list a[href='"+code+"']").addClass('active');            
        }            
        funList('menu00');
            
        //함수 실행시 p000을 넣어주는 이유는 맨 처음 화면에 진입했을 때 all을 띄워주기 위해서. 여기에 뭔가를 넣기 싫을 때에는 html 자체에 p000자리를 href=''으로 빈 값으로 두고 여기도 비우면 된다. 대신 if code=='p000'부분도 비워줘야함
    
        $('.menu-list a').on('click',function(e){
            e.preventDefault();            
            //↓this=내가 클릭하는 대상 menu-list a의 속성 href라는 속성을 attr 가져온다
            var type = $(this).attr('href');             
            funList(type); //a태그를 클릭할 때 함수를 실행
            
        //처음엔 this.addclass로 active를 추가해주는데, 이렇게 넣으면 내가 클릭하는 모든 menu-list a에 active가 생성되므로 그 전에 menu-list a에서 removeClass로 클래스를 제거해주고 내가 클릭하는 this에만 active가 활성되도록 이렇게 한번 remove->add 한다
            
            /*
            액티브 클래스 추가를 위해서 처음에는 이렇게 넣어줬는데 아래와 중첩이 되기 때문에 지워줬다.
            $('.menu-list a').removeClass('active');
            $(this).addClass('active');
            */
            
            //history (state, title, url)순서 
            history.pushState({page:type},'pageHistory','');
   
        });
   
            //뒤로가기나 넥스트를 눌렀을때 일어나는 히스토리..
            $(window).on('popstate',function(){
                var type;
                try{
                    type = history.state.page;
                }catch{
                    type ='menu00';
            }
                funList(type);
            }); 
            
            
        }
    });
    
    
    
    
    
    
    
//end    
})


