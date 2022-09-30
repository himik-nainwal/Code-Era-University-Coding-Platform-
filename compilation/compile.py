import subprocess
import os
import json


def main():
    # print(os.getcwd())
    json_text = open("test.json").read()
    json_data = json.loads(json_text)
    # print(json_data)
    code_lang = json_data['lang']
    code_text = json_data['code']
    input_text = json_data['input']
    # print(code_text)
    lang_func = {"cpp": compile_cpp}
    lang_func[code_lang](code_text, input_text)


def compile_cpp(code, input):
    code_file = open("code.cpp", "w")
    code_file.write(code)
    compilation = subprocess.run(
        ["g++", "code.cpp", "-o", "code.out", "-Wall", "-O2"])
    if compilation.returncode != 0:  # compilation failed
        print(compilation.)


if __name__ == "__main__":
    main()
