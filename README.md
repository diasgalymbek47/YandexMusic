# Yandex-music
Сайт для топовой музыки

Ссылка на сайт --->  
https://diasgalymbek47.github.io/YandexMusic/

git pull - синхронизация до посл версий.
git fetch и get merge удаленная/локальная <-ветка слияние двух веток


<!-- --------------------------- -->

git config --list 			<-- Посмотреть все конфиги git
git config --global user.name "Name"    <-- Установить глобалное имя для git
git config --global user.email "Email"  <-- Установить глобалное почту для git

git init 				<-- Инициализировать git repository
git status 				<-- Посмотреть статус текущий git repository
git log 				<-- Посмотреть историю git commits
git add fileName 			<-- Добавить в индекс измененные файлы
git add . 	<---------------------- <-- Добавить в индекс все измененные файлы
git commit -m "" 			<-- Добавить commit с описанием
git checkout hash 			<-- Перемещение между версиями проекта
git branch nameBranch 			<-- Создание новой ветки
git checkout nameBranch 		<-- Перемещение между ветками
git checkout -b nameBranch 		<-- Создание и перемещение в этот ветку
git branch 	<---------------------- <-- Посмотреть всех веток
git branch -a				<-- Посмотреть всех веток включая удаленную repository
git branch -m nameBranch		<-- Переименовать текущую ветку
git branch -d nameBranch		<-- Удаление ветки
git merge nameBranch 			<-- Слияние ветки на текущую ветку
git merge -m "" nameBranch 		<-- Слияние ветки на текущую ветку c описанием
git clone url	<---------------------- <-- Клонировать удаленный repository
git pull 				<-- Загружает и применяеть все изменения из удаленного сервера на локального
git push 				<-- Загружает и применяеть все изменения из локального сервера на удаленного (вам будет нужен токен)
git remote add origin url 		<-- Устанавливаем связь удаленного repository с локальным
git remote 	<---------------------- <-- Посмотреть список всех удаленных repository связанный с локальным
git push -u origin branch 		<-- Устанавливаем связь с удаленным веткой repository (вам будет нужен токен)
git rm 					<-- Удалить git repository

cd 					<-- Перейти в папку
mkdir 					<-- Создать папку
echo 					<-- Создать файл
echo fileName.txt < "Text" 		<-- Создать файл и туда записать текст
ls 					<-- Посмотреть содержимое файла
ls -la 					<-- Посмотреть скрытые файлы
cat 					<-- Прочитать содержимое файла
rm 					<-- Удалить файл
