import time

import pandas as pd
import requests as req
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from requests.exceptions import ConnectionError

host = "https://www.proficosmetics.ru"

proficosmetics_adapter = HTTPAdapter(max_retries=10)

session = req.Session()
session.mount('https://www.proficosmetics.ru', proficosmetics_adapter)


# get_time
def get_time():
    result_time = time.localtime()
    return "День: " + str(result_time.tm_mday) + "\nЧас: " + str(result_time.tm_hour) + "\nМинута: " + str(
        result_time.tm_min)


startTime = get_time()


# create_links_page
def create_pages(page_number_first_indef, page_number_last_indef):
    templisturl = []

    for page_number in range(page_number_first_indef, page_number_last_indef + 1):
        if page_number == 1:
            templisturl.append(host + "/catalog/")
        elif page_number > 1:
            templisturl.append(host + "/catalog/p" + str(page_number) + "/")

    return templisturl


page_number_first = 1
page_number_last = 805

urls_pages = create_pages(page_number_first, page_number_last)


def take_url_items():
    urls_item = []

    for page_url in urls_pages:
        response_page = None
        try:
            response_page = session.get(str(page_url), timeout=30)
        except ConnectionError as ce:
            print(ce)

        soup_page = BeautifulSoup(response_page.text, 'lxml')

        if soup_page.find("div", attrs={"class": "catalogprice"}) is not None:
            html_catalog_price_ul = soup_page.find("div", attrs={"class": "catalogprice"}).find("ul")
        else:
            continue
        htmllist_li = html_catalog_price_ul.find_all("li")

        for html_li in htmllist_li:
            print("Page: " + page_url, "Item: " + host + str(html_li.find("a", attrs={"class": "title"})["href"]))
            urls_item.append(host + str(html_li.find("a", attrs={"class": "title"})["href"]))

            df = pd.DataFrame({'Ссылки': urls_item})
            df.to_excel('./Urls.xlsx', sheet_name="Urls", index=False)


def take_info_from_urls_item():
    excel_data = pd.read_excel("Urls.xlsx", sheet_name="Urls")

    links_item = excel_data["Ссылки"].tolist()

    temp_obj = {
        "article": [],
        "brand": [],
        "line": [],
        "name": [],
        "photo": []
    }

    nextP = False

    for link_item in links_item:
        if link_item == "https://www.proficosmetics.ru/catalog/3082291/":
            nextP = True
            continue
        if nextP:
            response_item = None
            try:
                response_item = session.get(str(link_item), timeout=30)
            except ConnectionError as error:
                print(error)

            soup_item = BeautifulSoup(response_item.text, 'lxml')

            try:
                article_text = soup_item.find("div", attrs={"class": "kr_product_info"}).find("p", attrs={
                    "class": "light_gray_color kr_product_info__item"}).text.replace("Артикул: ", "")
                if soup_item.find("div", attrs={"class": "product_main_desc"}).find("h4") is not None:
                    brand_text = soup_item.find("div", attrs={"class": "product_main_desc"}).find("h4").find(
                        "span").text
                else:
                    brand_text = " "
                if soup_item.find("div", attrs={"class": "product_main_desc"}).find("h5") is not None:
                    line_text = soup_item.find("div", attrs={"class": "product_main_desc"}).find("h5").find("a").text
                else:
                    line_text = " "
                name_text = soup_item.find("div", attrs={"class": "product_main"}).find("div",
                                                                                        attrs={
                                                                                            "itemprop": "name"}).find(
                    "h1").text
                photo_text = host + soup_item.find("div", attrs={"class": "product_preview"}).find("a",
                                                                                                   attrs={
                                                                                                       "itemprop": "image"})[
                    "href"]

                temp_obj["article"].append(article_text)
                temp_obj["brand"].append(brand_text)
                temp_obj["line"].append(line_text)
                temp_obj["name"].append(name_text)
                temp_obj["photo"].append(photo_text)

                print(link_item)

                dfp = pd.DataFrame({'Артикул': temp_obj["article"],
                                    'Бренд': temp_obj["brand"],
                                    'Линия': temp_obj["line"],
                                    'Название': temp_obj["name"],
                                    'Фото': temp_obj["photo"]})

                dfp.to_excel('./Result2.xlsx', sheet_name="Result", index=False)
            except Exception as e:
                print("next")
                continue


take_info_from_urls_item()

endTime = get_time()
print("Успешно!")
print("Начало: {0}".format(startTime))
print("Конец: {0}".format(endTime))
