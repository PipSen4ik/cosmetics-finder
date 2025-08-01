import re

import pandas

excel_data = pandas.read_excel("Result.xlsx", sheet_name="Result")

articleNumber = excel_data["Артикул"].tolist()
brand = excel_data["Бренд"].tolist()
line = excel_data["Линия"].tolist()
name = excel_data["Название"].tolist()
photo = excel_data["Фото"].tolist()

brands_list = {
    1: {
        "-2": {
            "description": "Позади начальника(-цы) в коробке с дыркой",
            "brands": ["Cil-Glamour"]
        },
        "-1": {
            "description": "Слева на стелаже от начальника(-цы)",
            "brands": ["Purepawpaw"]
        },
        0: {
            "description": "",
            "brands": ["Invisibobble", "Wella"]
        },
        1: {
            "description": "",
            "brands": ["BaByliss", "Dewal", "Gama"]
        },
        2: {
            "description": "",
            "brands": ["Curaprox", "Global", "Vitis", "Waterdent", "Vivax", "Лапка", "CoifIn", "Blanx", "Marvis",
                       "BioRepair",
                       "Klatz", "Сердце", "Andis", "Oster", "Wahl", "Gess", "Dentaid", "Hairway", "Gezatone"]
        },
        "2/3": {
            "description": "Matrix Sync, в конце",
            "brands": ["Matrix"]
        },
        "4/5": {
            "description": "Matrix Beauty, в конце. Dentaid висит на столбе",
            "brands": ["Matrix", "Dentaid"]
        },
        3: {
            "description": "",
            "brands": ["Cerave", "Ecru", "Qtem", "SkinCode", "Librederm", "Batiste", "Lalga", "SebMan", "AmericanCrew",
                       "DreamCatcher", "Reuzel", "Proraso", "Alterna"]
        },
        4: {
            "description": "",
            "brands": ["BioLage", "AridaHome", "Matrix", "Wella"]
        },
        5: {
            "description": "",
            "brands": ["Farmavita", "LaBiosthetique", "GoodSociety", "AromaHarmony", "Natrol", "SmartBee", "PrimeKraft",
                       "Orihiro",
                       "Treaclemoon", "Indola", "Wella", "Schwarzkopf", "Artego", "Uniforce"]
        },
        6: {
            "description": "",
            "brands": ["KayPro", "Insight", "Coiffance", "Epica", "Latinoil", "KV1", "EstheticHouse", "Kativa", "Shot",
                       "Lador", "Brelil"]
        },
        7: {
            "description": "",
            "brands": ["Tefia", "Compliment", "Cocochoco", "Alfaparf", "Likato", "Lorvenn", "Sebastian",
                       "SimSensitive",
                       "Nirvel", "Moroccanoil", "Hadat", "TLabPro", "LittleGreen", "HonmaTokyo"]
        },
        8: {
            "description": "",
            "brands": ["H.AirSpa", "Keune", "Orising", "CrazyColor", "Keen", "LivingProof", "SexyHair", "RedKen",
                       "Macadamia",
                       "CelebLuxury", "GKHair", "DavinesSpa", "Chi", "Fanola", "Cutrin", "Cehko", "Bosley"]
        },
        "8/9": {
            "description": "Все брови в конце, ножницы некоторые в конце некоторые на стелажах",
            "brands": ["SexyBrowHenna", "Metzger", "Kaizer", "Hairway", "Lucas", "SexyLasnBrow", "Ikki", "SilverStar",
                       "Solomeya", "Refectocil", "Bronsun", "Dewal", "Realtechniques", "Duo", "Innovator", "Librederm",
                       "Ardell", "Оксиды"]
        },
        9: {
            "description": "",
            "brands": ["SalermCosmetics", "Joico", "Concept", "Hempz", "Londa", "Revlon"]
        },
        10: {
            "description": "",
            "brands": ["LisapMilano", "Kerastase", "Tigi", "Framesi", "Selective", "Lebel", "Ice"]
        },
        11: {
            "description": "",
            "brands": ["Bouticle", "TogetHair", "Dikson", "Kezy", "ConstantDelight", "Kaaral", "Lakme",
                       "HairCompany", "360hairprof", "Dewal"]
        },
        "11/12": {
            "description": "",
            "brands": ["Vonu"]
        },
        12: {
            "description": "",
            "brands": ["Ollin", "Nioxin", "LorealProf", "Barex"]
        },
        "12/15": {
            "description": "В конце",
            "brands": ["Inki", "Crystal", "DryDry", "Sesderma", "Teana", "NestiDante", "Kosmoteros", "La Florentina",
                       "Beauty Style"]
        },
        13: {
            "description": "",
            "brands": ["Blom", "SkinDom", "Frudia", "Bioderma", "Nuxe", "JapanGals", "Yur", "SkinHouse", "KocoStar",
                       "Lierac",
                       "LSanic", "SomeByMi", "Martiderm", "Petitfee", "Evas", "Lebelage", "Koelf", "DrJart", "Avajar",
                       "Consly"]
        },
        "13/14": {
            "description": "В начале",
            "brands": ["Hairway"]
        },
        14: {
            "description": "",
            "brands": ["Vitabrid", "Steblanc", "Kims", "Sothys", "Amplen", "AlgoMask", "MedicalCollagene", "NollamLab",
                       "EstheticHouse", "Eunyul", "FarmStay"]
        },
        15: {
            "description": "",
            "brands": ["Premium", "KoreaTida", "Plu", "Evas", "Альпика", "HolikaHolika", "Limoni", "Christina",
                       "MediFlower", "Beauugreen"]
        },
        16: {
            "description": "",
            "brands": ["AnnaLotan", "Janssen", "JulietteArmand", "InspiraCosmetics", "AndalouNaturals", "Dr.Sea",
                       "OrganicTai",
                       "Phytomer", "Kosmoteros", "Histomer", "Sesderma"]
        },
        17: {
            "description": "",
            "brands": ["Active", "Directalab", "Rebirth", "Klapp", "SkinDoctors", "DrKadir", "Dermalogica", "IconSkin",
                       "YonKa",
                       "Thalgo", "Academie", "Declare", "HolyLand"]
        },
        18: {
            "description": "",
            "brands": ["Gigi", "Eldan", "Dr.Brandt", "NewLine", "Payot", "Kora", "Гельтек", "Arkadia", "Invit"]
        },
        19: {
            "description": "",
            "brands": ["Zeitun", "Beautific", "EmeraldBay", "TannyMax", "Kolastyna", "Solbianca", "Lancaster", "Morizo",
                       "Teana", "ResedaOdor", "Ahava", "BeautyStyle", "Soleo"]
        },
        20: {
            "description": "",
            "brands": ["Domix", "AromaJazz", "Fabrik", "Iodase", "Guam", "Verde", "Eva", "Evi", "GiorgioCapachini",
                       "Geomar",
                       "Surgi"]
        },
        21: {
            "description": "",
            "brands": ["DepilTouch", "Runail", "DepilFlax100", "Depileve", "Mediterranean", "Helenson", "Gloria",
                       "Vichy", "Svr",
                       "Mesoderm", "Tegor", "Korres", "EtreBelle", "Levissime", "Avene", "HinokiClinical",
                       "MincerPharma",
                       "LaRochePosay", "AlgoLogie", "MesoPharm", "SansSoucis", "BabeLaboratorios", "BeautyImage"]
        },
        22: {
            "description": "",
            "brands": ["Ликоберон", "BeautyStyle", "XTYG"]
        }
    },
    "1/2": {
        1: {
            "description": "В арке (у приемки) между 1 и 2 залом",
            "brands": ["Aravia"]
        }
    },
    2: {
        1: {
            "description": "",
            "brands": ["Frenchi", "Shu", "Kinetics", "Irisk", "Giorgio", "Uno", "Inm", "Aurelia", "PatrisaNail",
                       "RuNail", "TNL",
                       "Orly", "Bandi", "E.MI", "BrigitteBottier", "Pnb", "Solomeya"]
        },
        "1/2": {
            "description": "В конце",
            "brands": ["Wula"]
        },
        2: {
            "description": "",
            "brands": ["PierreRene", "Pupa", "Provoc", "LarteDelBello", "Note", "Trind", "MakeUpFactory", "IqBeauty",
                       "bhm",
                       "MaKeUpRevolution", "DoubleDareOmg", "MaxFactor", "Bourjois", "Ga-De", "Posh", "Mavala", "Era",
                       "Limoni"]
        },
        3: {
            "description": "",
            "brands": ["Kapous", "Studio"]
        },
        4: {
            "description": "",
            "brands": ["Kapous", "Studio"]
        },
        5: {
            "description": "",
            "brands": ["Estel", "Aravia"]
        },
        6: {
            "description": "",
            "brands": ["Estel", "Aravia"]
        },
        7: {
            "description": "",
            "brands": ["Aravia"]
        },
        10: {
            "description": "",
            "brands": ["IgroBeauty"]
        },
        11: {
            "description": "",
            "brands": ["Dgm"]
        },
        12: {
            "description": "",
            "brands": ["Чистовье"]
        },
        13: {
            "description": "",
            "brands": ["GehWol", "LaufWunder", "BeNatural", "SexyHair", "Spol"]
        }
    }
}


def findRoomRow(brandt):
    brandfromexcel = str(brandt).lower().replace(" ", "").replace("-", "").replace(".", "").replace("’", "")
    brandfromexcel = brandfromexcel.replace("/", "").replace("\\", "")

    answer = []

    for hallNumber in brands_list:
        hall = brands_list[hallNumber]
        for rowNumber in hall:
            shelf = hall[rowNumber]
            brands_on_shelf = shelf["brands"]
            description_of_shelf = shelf["description"]

            elements = str(";".join(brands_on_shelf)).lower().replace(" ", "").replace("-", "").replace(".", "")
            elements = elements.replace("’", "").replace("/", "").replace("\\", "").split(";")
            for brandfrombase in elements:
                regexresult = re.search("^{brandfrombase}".format(brandfrombase=brandfrombase),
                                        brandfromexcel)
                if regexresult is not None:
                    temp_obj_of_answer = {
                        "room": hallNumber,
                        "row": rowNumber,
                        "description": description_of_shelf
                    }

                    answer.append(temp_obj_of_answer)

    return answer


text = ""

for number in range(len(articleNumber)):
    founded = findRoomRow(brand[number])

    for numberSecond in range(len(founded)):
        room = founded[numberSecond]["room"]
        row = founded[numberSecond]["row"]
        description = founded[numberSecond]["description"]

        tempObj = {
            "articleNumber": articleNumber[number],
            "brand": brand[number],
            "room": room,
            "row": row,
            "description": description,
            "line": line[number],
            "name": name[number],
            "photo": photo[number],
            "altPhoto": name[number]
        }

        text += repr(tempObj) + ","

tempList = list(text)
del (tempList[len(tempList) - 1])
text = "".join(tempList)
text = "[" + text + "]"

text = str(text)

file = open("text.txt", "w", encoding="utf-8")
file.write(text)
