import json
from pprint import pprint
import pickle
from sortedcontainers import SortedDict


def main():
    with open("leetcode.json") as ques_file:
        ques_json = ques_file.read()
    ques_data = json.loads(ques_json)
    # print(ques_data['stat_status_pairs'][0])
    ques_dict = {}
    for ques in ques_data['stat_status_pairs']:
        if not ques['paid_only']:
            ques_dict[ques['stat']['frontend_question_id']] = {
                'ques_id': ques['stat']['frontend_question_id'],
                'question_title': ques['stat']['question__title'],
                'question_title_slug': ques['stat']['question__title_slug'],
                'difficulty_level': ques['difficulty']['level']
            }
    # pprint(ques_dict)

    ques_dict=SortedDict(ques_dict)

    with open('question_details.pkl', 'wb') as filehandler:
        pickle.dump(ques_dict, filehandler)
    
    with open("ques.json","w") as fjson:
        json.dump(ques_dict,fjson)


if __name__ == "__main__":
    main()
