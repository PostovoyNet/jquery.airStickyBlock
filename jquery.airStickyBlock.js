/**
 * Created by mero.push on 01.02.2015.
 */


;(function($){

    $.fn.airStickyBlock = function(options){
        $.airStickyBlock = function($this, options){
            // Объявляем переменные
            var settings,
                stopBlock,
                stickyParent,
                windowHeight,
                stopBlockHeight,
                stopBlockWidth,
                stopBlockOffset,
                stickyParentOffset,
                stickyParentWidth,
                stickyHeight,
                stickyWidth,
                stickyStop,
                stickyStart,
                stickyAbsolute,
                scrollTop;

            /** Константы */
            // Настройки по умолчанию
            settings = $.extend({
                debug           : false,
                stopBlock       : '.airSticky_stop-block',
                offsetTop       : 0
            }, options);
            // Sticky Stop Block
            stopBlock = $(settings.stopBlock);
            // Сайдбар
            stickyParent = $this.parent();

            /**
             * Пересчитываем все переменные
             * (выполняется при изменении размера окна браузера, ориентации девайса)
             */
            function setAmount(){
                /* Разное */
                // Высота рабочей области
                windowHeight = $(window).height();

                /**
                 * Sticky Stop Block
                 * родительский блок для контента и колонки в которой будет Sticky Block,
                 * Sticky Block остановится по достижению низа этого блока
                 */
                // Высота
                stopBlockHeight = stopBlock.height();
                // Ширина
                stopBlockWidth = stopBlock.width();
                // Отступ от начала координат
                stopBlockOffset = stopBlock.offset().top;

                /**
                 * Sticky Parent Block
                 * блок в котором находится Sticky Block (Сайдбар)
                 */
                // Ширина сайдбара
                stickyParentWidth = stickyParent.width();
                // Отступ сайдбара от начала координат
                stickyParentOffset = stickyParent.offset().top;

                /**
                 * Sticky Block
                 * блок который будет фиксироваться при прокрутке
                 */
                // Высота Sticky Block
                stickyHeight = $this.outerHeight(true);
                // Ширина Sticky Block
                stickyWidth = stickyParentWidth;
                // Момент остановки Sticky Block
                stickyStop = stopBlockHeight + stopBlockOffset - stickyHeight;
                // Отступ Sticky Block от начала координат
                stickyStart = stickyParentOffset + $this.position().top;
                // Отступ Sticky Block от начала сайдбара при абсолютном позиционировании
                stickyAbsolute = stickyStop - stickyParentOffset;
            } setAmount();

            /**
             * Выполнение скрипта
             */
            function airStickyGo(){
                // Прокрутка от начала координат
                scrollTop = $(window).scrollTop()+settings.offsetTop;

                if(settings.debug){
                    console.clear();
                    console.warn('airStickyBlock debugger \n');
                    var debugTable = {
                        'windowHeight': {value: windowHeight},
                        'stopBlockHeight': {value: stopBlockHeight},
                        'stopBlockWidth': {value: stopBlockWidth},
                        'stopBlockOffset': {value: stopBlockOffset},
                        'stickyParentOffset': {value: stickyParentOffset},
                        'stickyParentWidth': {value: stickyParentWidth},
                        'stickyHeight': {value: stickyHeight},
                        'stickyWidth': {value: stickyWidth},
                        'stickyStop': {value: stickyStop},
                        'stickyStart': {value: stickyStart},
                        'stickyAbsolute': {value: stickyAbsolute},
                        'scrollTop': {value: scrollTop}
                    };
                    console.table(debugTable);
                }

                // Если прокрутка больше чем отступ Sticky Block от начала координат
                if(scrollTop >= stickyStart && scrollTop <= stickyStop){
                    setPosition('fixed');
                }
                else if($this.css('position') != 'relative') {
                    setDefault(stickyParent);
                    setPosition('relative');
                }

                // Если прокрутка больше чем значение момента остановки Sticky Block
                if(scrollTop >= stickyStart && scrollTop >= stickyStop){
                    setPosition('absolute');
                }
                if(scrollTop > stickyStop + stickyHeight) {
                    setPosition('relative');
                }

            } airStickyGo();

            function setDefault(element){ element.removeAttr('style');}
            function setPosition(position){
                switch (position){
                    case 'fixed':
                        $this.css({
                            'position': position,
                            'top': settings.offsetTop + 'px'
                        }).removeClass('airSticky_absolute airSticky_relative').addClass('airSticky_fixed');
                        break;
                    case 'absolute':
                        $this.css({
                            'position': position,
                            'top': stickyAbsolute + 'px'
                        }).removeClass('airSticky_fixed airSticky_relative').addClass('airSticky_absolute');
                        break;
                    case 'relative':
                        $this.css({
                            'position': 'relative',
                            'top': 'auto'
                        }).removeClass('airSticky_fixed airSticky_absolute').addClass('airSticky_relative');
                        break;
                }
            }
            function setWidthSticky(){
                $this.css({
                    'width': stickyWidth + 'px'
                });
            } setWidthSticky();

            /**
             * Перерисовка
             */
            function render(){
                setDefault($this);
                setAmount();
                if(stickyStop > stickyStart && stopBlockWidth > stickyWidth){
                    setWidthSticky();
                    airStickyGo();
                }
            }

            /**
             * Обработка событий
             */
            $(window).bind('resize.airStickyBlock scroll.airStickyBlock orientationchange.airStickyBlock', function(event) {

                if(event.type == 'scroll' && stickyStop > stickyStart && stopBlockWidth > stickyWidth){
                    airStickyGo();
                }
                else {
                    render();
                }

            });

            /**
             * Свой обработчик перерисовки
             */
            $(window).bind('render.airStickyBlock', function(event) {
                render();
            });

        };

        return this.each(function(){
            (new $.airStickyBlock($(this), options));
        });

    };

})(jQuery);
