
     $(window).on('load', function () {
         $('.loading').css({display:'none'}); 
     });    
    
/*로딩 화면 */
//    $(window).on('load', function () {
//        setTimeout(function() {
//            $('.loading').fadeOut();
//            $('body').removeClass('active');            
//        }, 1000); 
//        $('body').addClass('active');
// });


$(window).scroll(function (e) {

    var winH = window.innerHeight, // = $(window).height();
        scrollY =$(window).scrollTop(),
        mainImg = document.querySelectorAll('.frame div'),
        mainSec = $('main').find('section');

    
    mainSec.each(function(val,ix){
        
        /* main 01 메인 로고 제어 */
        if(scrollY > winH*0.15){
            $('.main01 img').removeClass('active');
        }else if(scrollY < winH*0.2){
            $('.main01 img').addClass('active');
         };

        
        /*main02 글자 제어*/                
        
        if( scrollY > (mainSec.eq(1).height())/2 ){
            mainSec.eq(1).find('h2').removeClass('trans_active');
            mainSec.eq(1).find('div').eq(1).removeClass('trans_active');
        }else{
            mainSec.eq(1).find('h2').addClass('trans_active');
            mainSec.eq(1).find('div').eq(1).addClass('trans_active');
        }
                
        /*main04 글자 제어*/      
        
        if( scrollY > (mainSec.eq(3).offset().top)- (winH * 0.8) ){    
            mainSec.eq(3).find('h2').removeClass('trans_active');
        }else{           
            mainSec.eq(3).find('h2').addClass('trans_active');
        }     

        
        /*main06 글자 제어*/       

        
        if( scrollY > (mainSec.eq(5).offset().top) - (winH * 0.9)  ){    
        mainSec.eq(5).find('h2').removeClass('trans_active'); 
        mainSec.eq(5).find('.main06_1').removeClass('trans_active');

        }else{           
            mainSec.eq(5).find('h2').addClass('trans_active');
            mainSec.eq(5).find('.main06_1').addClass('trans_active');

        }
        
        /*main08 글자 제어*/  
        
        if( scrollY > (mainSec.eq(6).offset().top) ){    
            mainSec.eq(7).find('h2').removeClass('trans_active_right');
        }else{           
            mainSec.eq(7).find('h2').addClass('trans_active_right');
        }
        
    });
    

    //section 이동을 위한 배열 생성
    var secArr = [];

    // - 하버 메뉴 페이지가 열렸을때 하위 메뉴 클릭시 페이지 이동             
    $('.menu-overlay li a').each(function(ix){
        $(this).on('click',function(){
            //data-num 가진 섹션 변수로 지정                    
            $.each( $('section[data-num]'),function(i,val){
                secArr.push(val.offsetTop);
            });
            e.preventDefault();
            $('.menu-overlay').hide(); //전체메뉴 비활성
            $('.menu-trigger').parents('div').removeClass('trans');
            $('body').removeClass('active'); //바디 제어 해제

            $(window).scrollTop(secArr[ix]);
        })
    });    
    
    
    /* 메인 fixed 이벤트 + 메뉴 활성 */   
    
    mainImg.forEach (function(val,idx){
        
        if(scrollY>100){
            mainImg[idx].classList.add('active'); //고정 이미지 액티브           
            
            // - 스크롤이 100 이상이면 버거 메뉴 오른쪽 상단 활성
            $('.menu-trigger').parent('div').addClass('active'); // 버거메뉴 활성
            
            
            // - 버거 메뉴 클릭시 화면 실행             
            $('.menu-trigger').on('click',function(e){

//                e.preventDefault();
//                e.preventDefault(); // preventDefault는 자기 속성을 죽이는 함수 
//                e.stopImmediatePropagation(); //이건 다른 걸 다 방지시키는 제일 강력한 함수
                
                e.stopPropagation(); // stopPropagation은 다른 걸 방지시키는 함수, 자꾸스크롤이 딸려올라가는 것 때문에 넣어줌 

                $('.menu-overlay').show(); //전체메뉴 활성                
                $(this).parent('div').addClass('trans');
                $('body').addClass('active'); //바디 제어
            });
            
            // - 닫기 버튼 눌렀을 시 하버 페이지 닫히고 원 페이지로 
            $('.btnCloseMenu').on('click',function(){
                e.preventDefault();
//                 e.stopPropagation();
                $('.menu-overlay').hide(); //전체메뉴 비활성
                $('.menu-trigger').parents('div').removeClass('trans');
                $('body').removeClass('active'); //바디 제어 해제
                });
        }     
        
        if(scrollY < winH*0.1){
            mainImg[idx].classList.remove('active'); //스크롤이 적으면 fix이미지크게
            $('.menu-trigger').parent('div').removeClass('active'); //버거메뉴 다시 없어지게
        }
    }); //스크롤(메뉴,이미지) 관련 이벤트    
    

     
    
    
});    
    
