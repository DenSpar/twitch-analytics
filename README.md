14.09.20
init project

15.09.20
установил модуль Twitch_API_v5

21.09.20
сделал таблицу, пока на заглушках

22.09.20
сделал заполнение стейта из ответов апи-запросов

23.09.20
1) нашел багу - запросы на стримеров идут пока не наполнится стейт. Пофиксил - убрал автоматическую загрузку, добавил кнопку для отправки запросов
2) добавил стили
3) сделал наполнение таблицы после запроса team = 'streamersalliance'

24.09.20
1) переписал скрипт получения списка, чтобы код был красивее
2) нарисовал красивый блок с кнопкой загрузки

28.09.20
1) сделал прелоадер
2) немного порефакторил условие вывода контента, сделал более удобно читаемым
3) сделал деление таблицы на 2 стобца, надо попробовать на 3 столбца
4) разделил таблицу на 3 части - так лучше, аккурат в мой экран влезает

29.09.20
1) сделал блок поиска каналов по имени, результат отображается в новой таблице

30.09.20
1) написал логику для таблицы, в результатах поиска столбец "видео" заменяется на "описание"
2) добавил кнопку добавления каналов, каналы попадают в основной стэк. Пока только в локальный - при перезагрузки именения пропадают
3) добавил текст найдено столько-то вариантов
4) сделал кнопку "скрыть результат поиска"
5) сделал кнопку "показать еще", покажет еще 10 каналов

01.10.20
1) авто-загрузка стримеров из "Streamers Alliance" при старте приложения
2) сделал компонент alert, еще нужно написать стили

06.10.20
1) алерт скрывается через 3 сек
2) сделал анимацию алертов

07.10.20
1) добавить проверку если такой канал уже в стеке + попап "канал уже в стеке"


сделать:
    поиск:        
        2) если ничего найти не удалось - не показывать кнопку "показать еще"
        3) если описаниа е отсутствует - "писать описание отсутствует"

    рестайлинг:
        1) новое оформление
        2) анимация для поиска:
            а) показать результаты поиска
            б) показать еще
            в) скрыть результаты поиска