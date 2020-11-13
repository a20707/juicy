$(function(){
//start  
   
    $.ajax({
        url:'data.xml',
        type:'GET',
        data:{a:10},
        beforeSend:function(){
            //로딩중
            console.log('1');//이렇게 콘솔을 넣어서 나오는 숫자가 무슨 순서로 나오는지 확인해볼수있다
            $('.loading').fadeIn();
        },
        complete:function(){
            //로딩중 삭제
             console.log('2');
            $('.loading').fadeOut();
        },
        
        success:function(data){ 
             console.log('3');
//            console.log('성공');//파일이 제대로 잘 들어오는지 콘솔로그로 간략하게 찍어보기, 개발자 도구->네트워크에서 불러오는 파일들이 들어와있는지 확인  
            
        //↓변수를 하나 만들어주면서 ''(빈칸)을 주는 이유는 만약에 첫번째 값이 =이 아니라 += 상황이 온다면 값이 없는 곳에 
        var product ='', imgSrc,kind,tit,url,type; 
            
        function funList(code){
            product = ''; //프로덕트를 비워두지 않으면 값들이 계속 중첩되서 밑으로 쌓이기 때문에 funList를 실행할때 리셋을 넣어준다
            $(data).find('item').each(function(){            

                //↓this는 여기서 말하는 item
                imgSrc = $(this).find('imgSrc').text();
                kind = $(this).find('kind').text();
                name = $(this).find('tit').text();
                url = $(this).find('url').text();   
                
                type =$(this).find('type').text();
                
                
            //↓글자가 너무 기니까 몇 글자 이상 넘어가면 잘라주기 위해서 substr을 사용한다
                name = name.substr(0,30);
            //  name 이란 변수에 name에 .substr로 0번째부터 20번째 글자까지만 나오게
                
            //↓substr만 하면 글자가 걍 잘려서 뒤가 없어보이기 때문에 ...을 추가해주기 위하여 replace 사용   
                
                name = name.replace(name,name+'...');
            //replace(name -> 위에서 자른 글자,name+'...' ->네임에 ...을 더해줌)    
                
                //↓if가 없으면 그냥 모든 제품이 다 뜨기 때문에 조건문을 생성해서 원하는 타입들만 뜨도록 if문 설정
            if(code == type || code  == ''){
              //↓인덱스파일에 있던 내용을 그대로 가져와서 일단 기재해본다. 그리고 거기에 변수를 대입한다   
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
        funList('');
        //함수 실행시 p000을 넣어주는 이유는 맨 처음 화면에 진입했을 때 all을 띄워주기 위해서. 여기에 뭔가를 넣기 싫을 때에는 html 자체에 p000자리를 href=''으로 빈 값으로 두고 여기도 비우면 된다. 대신 if code=='p000'부분도 비워줘야함
    
        $('.tab a').on('click',function(e){
            e.preventDefault();
            
            //↓this=내가 클릭하는 대상 tab a의 속성 href라는 속성을 attr 가져온다
            var type = $(this).attr('href'); 
            
            funList(type); //a태그를 클릭할 때 함수를 실행
            
        //처음엔 this.addclass로 active를 추가해주는데, 이렇게 넣으면 내가 클릭하는 모든 tab a에 active가 생성되므로 그 전에 tab a에서 removeClass로 클래스를 제거해주고 내가 클릭하는 this에만 active가 활성되도록 이렇게 한번 remove->add 한다
            
            /*
            액티브 클래스 추가를 위해서 처음에는 이렇게 넣어줬는데 아래와 중첩이 되기 때문에 지워줬다. */
            
            $('.tab a').removeClass('active');
            $(this).addClass('active');
           
            
            //history
            history.pushState({page:type},'pageHistory','');
   
        });
            
            $(window).on('popstate',function(){
                var type = history.state.page;
                funList(type);
                
                //그냥 뒤로가기를 하면 tab a에 들어가는 액티브가 죽어서 한번 더 선언
                
                $('.tab a').removeClass('active');
                $(".tab a[href='"+type+"']").addClass('active');
                
            });   
            
        }
    });
    
    
    
    
    
    
    
//end    
})



