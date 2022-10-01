# test/develop on linux?
import subprocess
import os
import json


def main():
    # print(os.getcwd())
    json_file = open("test.json")
    json_text = json_file.read()
    json_file.close()
    json_data = json.loads(json_text)
    # print(json_data)
    code_lang = json_data['lang']
    code_text = json_data['code']
    input_text = json_data['input']
    # print(code_text)
    lang_func = {"cpp": compile_cpp}
    result = lang_func[code_lang](code_text, input_text)
    # result is a compilation/execution object.
    # send stuff back in json as per necessity of each case (returncode/stderr/stdout etc.)
    # del result?

def compile_cpp(code, stdin_input):
    code_file = open("code.cpp", "w")
    code_file.write(code)
    code_file.close()
    # t=subprocess.run("type code.cpp", shell=True, capture_output=True, text=True)
    # print(t.stdout, t.stderr)
    compilation = subprocess.run(
        "g++ code.cpp -o code.exe -Wall -O2", shell=True, capture_output=True, text=True)
    print(compilation)
    if compilation.returncode != 0:
        # print(compilation.stderr)
        return compilation
    else:
        execution = subprocess.run(
            "code.exe", shell=True, capture_output=True, text=True, input=stdin_input)
        print(execution)
        return execution


if __name__ == "__main__":
    main()
