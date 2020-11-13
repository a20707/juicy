$(function(){
//start  
   
    $.ajax({
        url:'data.json',
        type:'get',
        data:{a:10},
        beforeSend:function(){
            //로딩중           
            $('.loading').fadeIn();
//            console.log('1');//이렇게 콘솔을 넣어서 나오는 숫자가 무슨 순서로 나오는지 확인해볼수있다
        },
        complete:function(){
            //로딩중 삭제
            $('.loading').fadeOut();
        },        
        success:function(data){ 
//            console.log('성공');//파일이 제대로 잘 들어오는지 콘솔로그로 간략하게 찍어보기, 개발자 도구->네트워크에서 불러오는 파일들이 들어와있는지 확인
            
            var type,kind,imgSrc,tit,url,tagList='';
        
            
            function funList(thum){
                console.log(thum);

                tagList ='';
                //↑띄워야할 목록을 비워두지 않으면 값들이 계속 중첩되서 밑으로 쌓이기 때문에 funList를 실행할때 리셋을 넣어준다
                
                //forEach(function(value)하나쓰면 밸류, 2개 쓰면 밸류와 키(index)
                data.product.forEach(function(value,key){
                    
                type = value.type;
                kind = value.kind;
                imgSrc = value.imgSrc;
                tit = value.tit;
                url = value.url;
                
                //글자수가 25자보다 작은 경우가 있으니 조건문을 추가해준다
                if(25<tit.length){
                    tit=tit.substr(0,25)+'...';
                }
                if(thum == type || thum == 'p000'){
                                                    
                    tagList += "<figure>";                        
                    tagList += "<p><img src='" +imgSrc+ "'alt=''></p>";
                    tagList += "<figcaption>";
                    tagList += "<strong><i>"+kind+"</strong></i>";    
                    tagList += "<a href='" +url+"'>"; 
                    tagList += "<p>"+tit+"</p>";
                    tagList += "</figcaption>";
                    tagList += "</a>";
                    tagList += "</figure>";    
                   }
                });
                
                $('.list').html(tagList);
            }
            funList('p000');
            
            $('.tab a').on('click',function(a){
            //preventDefault로 리셋하지 않으면 링크시 화면이 전환되버림. 방지
                a.preventDefault();
                
                //attr = 더하는 기능
                var type = $(this).attr('href');
                funList(type);
                
        //↓처음엔 this.addclass로 active를 추가해주는데, 이렇게 넣으면 내가 클릭하는 모든 tab a에 active가 생성되므로 그 전에 tab a에서 removeClass로 클래스를 제거해주고 내가 클릭하는 this에만 active가 활성되도록 이렇게 한번 remove->add 한다
                $('.tab a').removeClass('active');
                $(this).addClass('active');
                
               
            });
            
        }
    });
    
    
    
    
    
    
    
//end    
})



