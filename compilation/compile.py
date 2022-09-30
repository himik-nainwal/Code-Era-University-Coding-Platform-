import subprocess
import os
import json
def main():
    # print(os.getcwd())
    json_text=open("test.json").read()
    json_data=json.loads(json_text)
    # print(json_data)
    code_to_compile=json_data['code']
    print(code_to_compile)

if __name__ == "__main__":
    main()