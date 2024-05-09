$.fn.pivot = function(options){
    // 변수를 선언
    let $target=$(this); // 선택자를 $target변수에 넣는다. 변수에 $가붙으면 json변수
    let $items=$target.children(); // this의 children ( 5개의 div ) - jqPlugin_app.html
    let $container = $target.wrap('<div></div>').parent(); // #pivot_slider인 div태그에 wrap을 하고 씌워진 div가 parent()가 되며 그걸 $container에 담는다
    let option = {
        width : 500,
        height : 450
    };
    // 옵션 처리
    $.extend(option,options) // extend(option변수, 매개변수) 매개변수로 받은값이 같은속성이면 덮어쓰기, 새로운 속성이면 추가
    // 스타일을 지정
    $target.css({
        width : $items.length*option.width,
        height : option.height,
        position : 'absolute'
    });
    $items.css({
        width : option.width,
        height : option.height,
        float:'left'
    });
    $container.css({
        width : option.width,
        height : option.height,
        position : 'relative',
        overflow : 'hidden'
    });
    // 이벤트를 연결(플러그인 동작을 코딩)
    let originLeft = 0;
    let oldLeft = 0;
    let nowPosition = 0; // 인덱스
    let isDown = false;
    $target.on({
        mousedown : function(e){
            isDown = true;
            oldLeft = originLeft = e.clientX; // 두 변수에 값을 넣는다.
            e.preventDefault(); // 기본 이벤트 제거
        },
        mousemove : function(e){
            if(isDown){
                let distance = oldLeft - e.clientX;
                oldLeft = e.clientX;
                //이미지 움직임 구현
                $target.animate({
                    left : '-=' + distance
                },0);
                $target.stop(true);
            }
            e.preventDefault();
        },
        mouseup : function(e){
            isDown = false;
            // 내부 함수
            function movePosition(direction){
                // 위치 설정
                let changePosition = nowPosition + direction;
                if(changePosition >= 0 && changePosition < $items.length){
                    nowPosition = changePosition;
                }
            }
            // 요소의 1/4 이상 드래그했을 경우 피벗
            if(originLeft-e.clientX > option.width/4){ // 이미지 슬라이더에 피벗이 기존 이미지크기의 4분의1보다크면 이동
                movePosition(+1);
            }else if(originLeft - e.clientX < -option.width/4){ // 반대로
                movePosition(-1);
            }
            $target.animate({
                left : -nowPosition * option.width
            },500);
            isDown = false;
            e.preventDefault();
        }
    });
}