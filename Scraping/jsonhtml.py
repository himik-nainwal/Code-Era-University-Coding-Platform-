import json
import codecs

# Load the JSON file by specifying the location and filename
with codecs.open(filename="C:/Users/Simik/OneDrive/Documents/Code-Era-University-Coding-Platform-/Scraping/file.json", mode="r", encoding="utf-8") as jsonf:
    
    json_file = json.loads(jsonf.read())

# Load the HTML file by specifying the location and filename
with codecs.open(filename="C:/Users/Simik/OneDrive/Documents/Code-Era-University-Coding-Platform-/out.html", mode='r', encoding="utf-8") as htmlf:
    html_file = htmlf.read()

# Chose the key name where the HTML source code will live as a string
json_file['Key1']['Key2'] = html_file

# Dump the dictionary to JSON object and save it in a specific location 
json_object = json.dumps(json_file, indent=4)
with codecs.open(filename="final_json_file.json", mode="w", encoding="utf-8") as ojsonf:
    ojsonf.write(json_object)