import nltk
from nltk.chat.util import Chat, reflections

pairs = [
    [
        r"oruko mi ni (.*)",
        ["Pẹlẹ %1, bawo ni o ṣe wa loni?",]
    ],
    [
        r"hi|hey|hello",
        ["Pẹlẹ, bawo ni", "Bawo ni",]
    ],
    [
        r"Kini orukọ rẹ?|What is your name?",
        ["Oruko mi ni Yoruba Chatbot.",]
    ],
    [
        r"bawo ni o wa?",
        ["Mo wa daadaa. Bawo ni iwọ?",]
    ],
    [
        r"ma binu (.*)",
        ["Ko si wahala.", "Ko si iṣoro.",]
    ],
    [
        r"mo wa daadaa",
        ["O ṣeun. Inu mi dun lati gbọ iyẹn.",]
    ],
    [
        r"o dabọ",
        ["O dabọ, maa ṣe abojuto ara rẹ.", "Maa ri ẹ laipe.",]
    ],
    [
        r"nje bota wa?",
        ["Rara",]
    ],
    [
        r"se o nife si ere?",
        ["Bẹẹni, mo fẹran ere idaraya.",]
    ],
    [
        r"nibo ni o ti wa?",
        ["Mo wa lati inu ẹrọ rẹ.",]
    ],
    [
        r"se o le soro nipa itan aye aye?",
        ["Bẹẹni, kini o fẹ mọ nipa itan aye aye?",]
    ],
    [
        r"se o nife si orin?",
        ["Bẹẹni, mo nifẹ orin pupọ.",]
    ],
    [
        r"se o le ran mi lowo pẹlu iṣẹ ile?",
        ["Bẹẹni, kini iṣoro naa?",]
    ],
    [
        r"Ẹ káàsán|Káàsán|kaasan",
        ["Ẹ káàsán, se dada lewa?",]
    ],
]

# Adding a fallback response pair
fallback_pairs = [
    [
        r"(.*)",
        ["Ma binu, mi o mọ ohun ti o nsọ. Ṣe o le tun sọ?",]
    ],
]

# Combine the regular pairs with the fallback pair
all_pairs = pairs + fallback_pairs

chatbot = Chat(all_pairs, reflections)
