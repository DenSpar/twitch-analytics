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
2) если ничего найти не удалось - кнопка "показать еще" не показыватся
3) если при поиске описание канала отсутствует - выводится "описание отсутствует"
4) сделал оформление про проекту из Фигмы
5) пофиксил алерты, теперь не сдигают контент

08.10.20
1) задеплоил сервис на файрбейс, нашел ошибку - отображается только две трети списка, исправил
2) заменил фавикон
3) пофиксил границы таблиц

09.10.20
1) разделил числа по разрядам узким пробелом
2) сделал роутинг с двумя страницами - дашборд и страница стримера

12.10.20
1) сделал наполнение для страницы стримера, пока без перехода со страницы дашборда
2) сделал обработчик дат
3) сделал индикатор "в эфире"

13.10.20
1) сделал переход по клику с дашборда
2) пофиксил, чтобы при загрузке страницы стримера загружалась вся страница целиком
3) разделительная полоса между блоками на странице стримера
4) переход на страницу стримера в той же вкладке
5) добавил колонку "длинна видео"
6) добавил строкам главной таблицы курсор поинтер и ховер

14.10.20
1) добавил проверку если строка таблицы пустая, то ни ховера ни перехода по клику не должно быть 

15.10.20
1) добавил красный кружочек, если идет стрим, вместо "зрителей всего" выводится текущий онлайн, длинна видео "тикает"
2) потом разделю на разные вкладки - стримы и видео. Убрал из этой вкладки колонки макс и средний онлайн, т.к. не могу их получить через апи. Макс и ср онлайн будут во второй вкладке, из собранной статистике. Вторую вкладку добавлю после того как эта статистика начнет собираться

19.10.20
1) получилось отправить запрос-заявку на подписку, теперь надо обработать ответ, чтобы подтвердить подписку

20.10.20
1) создал на сайте вкладку для тестирования функционала, на ней буду тестить отправку подписок на вебхуки

21.10.20
1) дали сервак, поставил nginx и node, проверил на паре статичных страничек

22.10.20
1) сделал монгоДБ, пока только коллекция со списком стримеров
2) подключил коллекцию к статичному сайту
3) установил pm2, теперь сайт на сервере постоянно работает

23.10.20
1) нашел багу, если зайти на страницу стримера AltaOda, то наблюдается бесконечная загрузка. Видимо он закрыл свои видосы для просмотра, т.к. с апи твича приходит "0 видео" и на самом канале видосов тоже нет. Не учел такой кейс. пофиксил

26-29
серверные настройки

29.10.20
1) мне настроили сервер, начал писать бэк
2) удалить файрбейз

30.10.20
1) подписался на вебхуки, пока на 3 часа, чтобы посмотреть что возвращается
2) написал скрипт для сбора статы. Отработываю на локальном хосте. Все работает, потом добавлю еще полей для статы 

02.11.20
1) заменил twitch-api-v5 на sendRequest и удалил twitch-api-v5

03.11.20
1) пофиксил страницу стримера
2) нашел багу: соединение с БД закрывалось после первого обращения к БД. Пофиксил
3) научил сервер отправлять запросы к api-twitch, кроме поиска каналов по имени, может оставлю на фронте
4) научил сервер получать айди стримеров из БД. Теперь по запросу на сервер, сервер вернет список объектов для дашборда

05.11.20
1) научил приложение обращаться к серверу, а не к твичу. Пока не удалил старый функционал для работы на локал хосте
2) написал скрипт для сбора статы стримера по followers и views, завтра попробую повесить скрипт на таймер

06.11.20
1) скрипт ежедневного обновления кол-ва followers и views
2) пофиксил сбор статы со стрима: добавить медианное значение, в статистике не учитываю отсутствие зрителей первые пять минут, уменьшил время между запросами стрима до 1 мин, в конце удаляю массив зрителей
3) добавил скрипт для определения длины стрима
4) начал писать скрипт проверки подписок

07.11.20
1) написал скрипт проверки подписок. Скрипт разделяет стримеров на "с подпиской", "подписка скоро кончится" и "подписка закончилась"

09.11.20
1) перенес скрипт подписки на вебхуки в бэк, проверил на апи запросах
2) переписал скрипт получения подписок на фронте, чтобы было видно сколько времени осталось
3) написал скрипт для продления подписок, теперь массива айдишников передаются в скрипт подписки
4) нашел 2 бага - скрипт продления работает только если дернуть ручку, автоматически запускаться не хочет. И при проверке подписок приходит только 20 подписок, т.к. у меня их 30, то 10 автоматически идут в over
5) теперь возвращается до 100 подписок
6) пофиксил автообновление, проблема была в том, что обращение к БД происходило до того, как БД успевала развернуться. Итого - скрипт автоматического продления подписок на вебхуки готов

10.11.20
1) перенес videoTimeConverter в бэк
2) начал переделывать скрипт записи статы стрима под ноду

11.11.20
1) выкатил скрипт записи статы стрима, жду когда начнется какой-нибудь стрим
2) стрим начался, пока скрипт работает ожидаемо, посмотрим как запишется в БД. Забыл записать название игры и заглавие стрима, поправлю у следующих записей
3) прошлые записи статы стримов в БД не попали. Сейчас все пофиксил, должно работать. Жду новый стрим, тогда будет понятно. Пока буду писать функционал для бэка, на отправку инфы для дашборда
4) оказалось если стример меняет игру или заглавие стрима повторно приходит вебхук
5) фикс - при запросе на получение приходили лишние поля: lastVideo и description
6) написал скрипт для определения дифа подписчиков за 7 дней и просмотров за 30 дней

12.11.20
1) переписал скрипт записи статы стримов - добавил в логи и в финальный объект номер стрима, по идее он не должен меняться, посмотрим что получится
2) переписал скрипт для определения дифов, теперь все работает
3) нашел еще косяк - если стрим перезапустили между api-запросами, скрипт считает что это первый стрим. Пофиксил, посмотрим что получится. Получился еще один косяк - при проверке сравнивалось число и строка, поправил
4) скрипт для определения дифов: теперь значения разделены по разрядам и указаны +/-

13.11.20
1) поправил дату, когда начался сбор статы, чтобы записывала тайм зону
2) яндекс браузер перестал поддерживать % в свойстве min-width, внес изменения
3) написал скрипт проверки, если этот стрим уже идет
4) при записи статы стрима в БД, добавил обработчик сравнивающий дату начала стрима и начала записи. Если разница больше 5 минут появляется запись 'сбор статистики не с начала стрима'. Результат пока не видел(работает)
5) переделал скрипт обновления подписчиков и просмотры, чтобы он срабатывал 9-10 утра
6) добавил скрипт записи названия игр, если они менялись
7) написал скрипты проверки, добавления и удаления записей из БД живых стримов

16.11.20
1) написал скрипт замены записи в БД живых стримов, если был записан старый стрим, пока не проверял(работает)
2) пофиксил ширину таблиц
3) добавил условие проверки стрима перед записью статы, еще не проверял(работает)
4) перенес условие проверки + добавил скрипт на добавление записи о стриме в БД, если таковой не было
5) написал скрипт, который при рестарте сервера очистки коллекции с живыми стримами + заполнение свежими + старт записи тех что идут

17.11.20
1) добавил удаление из живых стримов после записи статы, пока не проверял(работает)
2) добавил скрипт добавления макс и ср онлайн за месяц в стату стримера, пока не проверял(работает)
3) добавил скрипт, формирующий объект стримера для дашборда, чтобы получать maxOnline и midOnline, пока не проверял(работает)
4) вывел на дашборд накопленную стату

18.11.20
1) учел кейс, если стример новый и макс и ср онлайн еще не заполнены
2) подготовил скрипты отправки инфы стримера для страницы стримера, завтра буду проверять -> сегодня идет много долгих стримов

19.11.20
1) проверил - поправил скрипты отправки инфы стримера для страницы стримера
2) нашел ошибку - не собирается массив с архивными видео, пофиксил
3) перевел время начала съемки видео в местное, при отправки списка видео в фронт

20.11.20
1) перед отправкой видео обработал длинну видео, чтобы приходило вв формате Ч:ММ:СС
2) добавил таблицу стримов для страницы стримера
3) начал рестайлинг страницы стримера

23.11.20
1) развернул список стримов, чтобы вверху был самый свежий
2) преобразовал дату начала стрима к нормальному виду
3) переписал объект с онлайн-зрителями. Теперь вот так: onlineViewers: {max:"1 101",middle:"438",inDays:"за 1 д."}. Также переписал компоненты фронта, чтобы отображалась инфа
4) просмотры в табл видео и количество зрит в табл стримов разделил по разрядам
5) добавил примечание, если первые зрители появились не на 1 минуте
6) при передаче инфы о стриме оставил только кол-во зрителей + разделить по разрядам
7) посатвил маркеры рядом с названиями игры для читаемости
8) удалил getList из фронта
9) пофиксил обновление статы стримеров

24.11.20
1) рестайлинг страниц - Денис накидал изменений
2) выделил табл дашборда в отдельный модуль
3) выделил табл поиска в отдельный модуль. Вернул весь функционал, пока только на 

25.11.20
1) добавил на страницу стримера столбец "ссылка на видео"
2) перене сссылку в описание видео, столбец удалил

26.11.20
1) вместо текста "ссылка" вывожу айди номер видео
2) перенес просмотры во вкладку "архивные видео"
3) на странице стримера изменения выделил красным и зеленым -> выделить greenOrRedDiff в отдельный файл
4) если нет записанных стримов в табл стримов выводится "нет стримов"
5) добавил шрифты
6) пофиксил длину никнейма в дашборде

проверить:
4) если нет записанных стримов в табл стримов выводится "нет стримов"
6) пофиксил длину никнейма в дашборде - проверить на проде

дальше:
+ кнопка "<- все стримеры" для возврата в дашборд - куда поставить? можно в поле где должен быть
+ table fix - таблицы грузятся несколько раз. Основная 2 раза, поиск раз 5. На поиске надо попробовать юзЭффект
+ убрать из примечания когда присоединись первые зрители
+ ссылка на канал + добавить в бэк