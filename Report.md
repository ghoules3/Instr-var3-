# Отчет по лабораторной работе 1
Бочков Андрей БД251-м Вариант №3

## 1. Цель работы
1. Загрузить исходные данные в HDFS
2. Выполнить обработку данных в Apache Spark с использованием PySpark и Spark SQL
3. Построить визуализацию (heatmap) и сохранить результаты в HDFS

## 2. Исходные данные
Датасет: https://www.kaggle.com/datasets/jyotikushwaha545/onlineretail

Основные поля:
- `InvoiceNo` - номер счета/документа
- `StockCode` - код товара
- `Description` - описание товара
- `Quantity` - количество (возможны отрицательные значения для возвратов)
- `InvoiceDate` - дата/время
- `UnitPrice` - цена за единицу
- `CustomerID` - идентификатор клиента
- `Country` - страна

## 3. Подготовка окружения и HDFS
### 3.1 Запуск HDFS и YARN
Запуск сервисов и проверка процессов:
![jps](screenshots/01_jps.png)

### 3.2 Создание директорий и загрузка данных в HDFS
Структура директорий в HDFS:
![hdfs_dirs](screenshots/02_hdfs_dirs.png)

Загрузка CSV в HDFS и проверка наличия файла:
![hdfs_raw_ls](screenshots/03_hdfs_raw_ls.png)

Проверка первых строк файла:
![hdfs_head](screenshots/04_hdfs_head.png)

### 3.3 Web UI
HDFS:
![hdfs](screenshots/05_9870.png)

YARN:
![yarn](screenshots/06_8088.png)

## 4. Загрузка данных в Spark и предобработка

### 4.1 Создание SparkSession
SparkSession создан в JupyterLab. Данные читаются из HDFS по URI вида `hdfs://localhost:9000/...`.

![spark_session](screenshots/07_spark_session.png)

### 4.2 Чтение данных из HDFS в DataFrame
Схема данных, первые строки и количество записей:

![spark_read](screenshots/08_spark_read_schema_rows.png)

### 4.3 Предобработка данных
Выполнены преобразования:
- `InvoiceDate` приведён к timestamp (`InvoiceTS`);
- удалены строки с некорректными значениями (`UnitPrice <= 0`, `Quantity == 0`) и пустой датой;
- заполнены пропуски `Description`;
- добавлены поля `Revenue = Quantity * UnitPrice` и `MovementType` (SALE/RETURN);
- проверены/удалены полные дубликаты строк (полных дублей не обнаружено).

![cleaning](screenshots/09_cleaning.png)
![dedup](screenshots/10_dedup.png)

---

## 5. Задание 1 — Неликвидные товары (> 30 дней без продаж)
Неликвид определяется как товар, у которого дата последней **продажи** (SALE) меньше, чем (максимальная дата продаж в данных − 30 дней).

Результат:

![task1_dead_stock](screenshots/11_task1_dead_stock.png)

Результат сохранён в HDFS:
- `/user/hadoop/lab_01_var3/output/dead_stock_30d/`

---

## 6. Задание 2 — Spark SQL: критически низкий запас и оборачиваемость

### 6.1 Формирование витрины дневных продаж
Построена витрина `daily_sales` (продажи по дням и товарам): `StockCode`, `SaleDate`, `qty_sold_day`, `rev_day`.

![daily_sales](screenshots/12_daily_sales.png)

### 6.2 Оценка спроса и точка заказа
Так как в датасете нет реальных остатков, использована модель:
- средний дневной спрос `avg_daily_sales`;
- точка заказа: `reorder_point_qty = avg_daily_sales * lead_time_days`.

![task2_demand](screenshots/13_task2_demand.png)

### 6.3 Критически низкий запас и коэффициент оборачиваемости
Использована упрощённая модель:
- `initial_stock_qty = avg_daily_sales * initial_stock_days`;
- `stock_on_hand_qty = initial_stock_qty - total_sold_qty`;
- товар считается критически низким, если `stock_on_hand_qty < reorder_point_qty`;
- оборачиваемость (в штуках): `turnover_qty = total_sold_qty / (initial_stock_qty/2)`.

Результат:

![task2_low_stock](screenshots/14_task2_low_stock.png)

Результат сохранён в HDFS:
- `/user/hadoop/lab_01_var3/output/low_stock/`

---

## 7. Задание 3 — Визуализация: heatmap остатков по категориям

### 7.1 Категоризация товаров (ABC-анализ)
Категории сформированы по выручке:
- A: до 80% накопленной выручки,
- B: до 95%,
- C: остальные.

![abc_counts](screenshots/15_abc_counts.png)

### 7.2 Heatmap
Построена heatmap: количество товаров по ABC-категории и диапазонам модельного остатка (`stock_on_hand_qty` bins).

![heatmap](screenshots/16_heatmap.png)

График сохранён в HDFS:
- `/user/hadoop/lab_01_var3/output/plots/heatmap_stock_by_abc.png`

---

## 8. Сохранение результатов в HDFS
Перед записью результатов права на директорию `output` были скорректированы.

![chmod_output](screenshots/17_chmod_output.png)

Проверка, что результаты сохранены в HDFS:

![hdfs_output_lsR](screenshots/18_hdfs_output_lsR.png)
![hdfs_plots_ls](screenshots/19_hdfs_plots_ls.png)

---

## 9. Завершение работы
SparkSession остановлен:

![spark_stop](screenshots/20_spark_stop.png)

---

## 10. Выводы
- Данные успешно загружены в HDFS и обработаны в Spark.
- Получен список неликвидных товаров (нет продаж более 30 дней).
- В Spark SQL рассчитаны спрос, точка заказа, критически низкий (модельный) запас и коэффициент оборачиваемости.
- Построена heatmap распределения товаров по ABC-категориям и диапазонам модельного остатка; результаты сохранены в HDFS.
