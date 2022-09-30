import subprocess
import json
def main():
    json_text=open("test.json").read()
    json.loads(json_text)
    print(json_text)

if __name__ == "__main__":
    main()