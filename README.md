# Лабораторная работа 1
Бочков Андрей БД251-м Вариант №3

## Описание задачи (вариант 3)
Цель: выполнить загрузку данных в HDFS и анализ в Apache Spark (PySpark + Spark SQL), построить визуализацию и сохранить результаты в HDFS.

Требования варианта:
1. **Задание 1:** очистка данных и поиск неликвидных товаров (нет продаж > 30 дней).
2. **Задание 2:** выявить товары с критически низким запасом (ниже точки заказа) и рассчитать коэффициент оборачиваемости.
3. **Задание 3:** построить **heatmap** товарных остатков по категориям.

## Источник данных
Датасет https://www.kaggle.com/datasets/jyotikushwaha545/onlineretail

### 1) Запуск Hadoop
sudo su - hadoop
start-dfs.sh
start-yarn.sh
jps

### 2) Загрузка исходного CSV в HDFS
hdfs dfs -mkdir -p /user/hadoop/lab_01_var3/raw
hdfs dfs -put OnlineRetail.csv /user/hadoop/lab_01_var3/raw
hdfs dfs -ls -h /user/hadoop/lab_01_var3/raw

### 3) Запуск ipynb
Вполнить в JupyterLab ноутбук Lab01_Var03.ipynb

### 4) Результаты
Выходные данные сохраняются в:
/user/hadoop/lab_01_var3/output/dead_stock_30d
/user/hadoop/lab_01_var3/output/low_stock
/user/hadoop/lab_01_var3/output/heatmap_table
/user/hadoop/lab_01_var3/output/plots/heatmap_stock_by_abc.png
