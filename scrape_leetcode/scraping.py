from selenium import webdriver
import pickle
from pprint import pprint
from bs4 import BeautifulSoup
import json
import time

def main():
    with open('question_details.pkl','rb') as filehandler: 
        ques_dict=pickle.load(filehandler)
    # pprint(ques_dict)

    browser=webdriver.Chrome()  #consider headless
    # browser.implicitly_wait(30)

    cnt=0
    for ques_no in ques_dict:
        ques_slug=ques_dict[ques_no]['question_title_slug']
        browser.get("https://leetcode.com/problems/"+ques_slug)
        soup=BeautifulSoup(browser.page_source,'html5lib')
        desc=soup.find("div", {"class": "content__u3I1 question-content__JfgR"})
        ques_dict[ques_no]['ques_id']=ques_no
        ques_dict[ques_no]['description_html']=str(desc)
        with open(f"ques/{ques_no}.json", "w") as filehandler:
            json.dump(ques_dict[ques_no], filehandler)
        cnt+=1
        if cnt%15==0:
            time.sleep(60)
        if cnt==100:
            break

    browser.quit()

if __name__ == "__main__":
    main()
