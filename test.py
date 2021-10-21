import pyodbc 

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=10.10.1.13;'
                      'Database=almaneaDB;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
if (conn):
    print("Succss")
else:
    print("Error")

# cursor.execute('SELECT * FROM table_name')

# for i in cursor:
#     print(i)