# jQuery.airStickyBlock

jQuery скрипт фиксации "липкого" блока при скроллинге для адаптивных сайтов

Подробнее [http://postovoy.net](http://postovoy.net/jquery-plagin-fiksiruyuschegosya-lipkogo-bloka.html)

### Fork
* Добавлена возможность устанавливать отступ сверху
* Добавлен обработчик перерисовки

#### Инициализация: 
<pre>$('.airSticky').airStickyBlock();</pre>

#### Настройки:
<pre>$('.airSticky').airStickyBlock({
  debug: false, // Режим отладки, по умолчанию false
  stopBlock: '.airSticky_stop-block', // Класса контейнера, в котором находится сетка, по умолчанию .airSticky_stop-block
  offsetTop: 0 // отступ сверху
});</pre>

#### Событие перерисовки позиции:
*пересчитает позицию*
<pre>$('.some_class').trigger('render.airStickyBlock');</pre>