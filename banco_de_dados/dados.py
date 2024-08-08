import pandas as pd
import json

# Carregue o arquivo Excel
df = pd.read_excel('Base de dados.csv')

# Converta para JSON
json_data = df.to_json(orient='records', indent=4)

# Salve em um arquivo JSON
with open('saida.json', 'w', encoding='utf-8') as json_file:
    json_file.write(json_data)

print("Conversão concluída. O arquivo JSON foi salvo como 'saida.json'.")